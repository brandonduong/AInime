package com.example.demo.services;

import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.AnimeAPIResponse;
import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.dto.AnimeListAPIResponse;
import com.example.demo.dto.AnimeVoteRequest;
import com.example.demo.dto.AnimeAPIResponse.AnimeAPIData;
import com.example.demo.models.Anime;
import com.example.demo.repositories.AnimeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class AnimeService {
  @Autowired
  private AnimeRepository animeRepository;

  @Autowired
  private WebClient webClient;

  @Autowired
	private ModelMapper modelMapper;

  @Autowired
  private ObjectMapper objectMapper;

  private Random random = new Random();
  private String BEGINNING_DAILY = "2024-07-17";

  public AnimeHiddenDTO getSummaryByDate(String date) {
    // Do not return anything if request into the future
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return modelMapper.map(new Anime(), AnimeHiddenDTO.class);
    }

    Optional<Anime> anime = animeRepository.findById(date);
    if (anime.isPresent()) {
      Anime fetched = anime.get();
      // Get stats from MyAnimeList
      AnimeAPIResponse apiData = webClient.get().uri(String.format("/anime/%s",fetched.getMalId())).retrieve().bodyToMono(AnimeAPIResponse.class).block();

      // If not rate limited, use live stats
      // FUTURE: For higher scalability, can use only live data for recent anime
      if (apiData.getData() != null) {
        AnimeAPIData data = apiData.getData();
        fetched.setType(data.getType());
        fetched.setYear(data.getYear());
        fetched.setMembers(data.getMembers());
        fetched.setEpisodes(data.getEpisodes());

        // If not a fake anime, update genres
        if (fetched.getFake() == false) {
          fetched.setGenres(data.getGenres().stream().map(g -> g.getName()).toList());
        }
      }

      return modelMapper.map(fetched, AnimeHiddenDTO.class);
    }
    return modelMapper.map(new Anime(), AnimeHiddenDTO.class);
  }

  public void voteSummaryByDate(String date, AnimeVoteRequest vote) {
    Optional<Anime> anime = animeRepository.findById(date);
    if (anime.isPresent()) {
      Anime fetched = anime.get();

      // Update votes
      if (vote.getFake()) {
        fetched.setAiVotes(fetched.getAiVotes() + 1);
      } else {
        fetched.setRealVotes(fetched.getRealVotes() + 1);
      }

      // Update scores
      List<Integer> scores = fetched.getScores();
      Integer ind = (int) (vote.getScore() / 0.5); // Score in steps of 0.5 from 0 to 10
      scores.set(ind, scores.get(ind) + 1);
      fetched.setScores(scores);
      animeRepository.save(fetched);
    }

    // TODO: Return Anime after guessing
  }

  public AnimeHiddenDTO getRandomAnimeSummary() {
    // Randomly get an existing summary
    Integer next = random.nextInt(10);
    Anime anime = new Anime();
    Boolean real = false;
    if (next >= 5) { // 50%
      // Summary for an existing anime
      anime = animeRepository.findRandomRealAnime();
      real = true;
    } else { // 50%
      // Summary for a fake anime
      anime = animeRepository.findRandomFakeAnime();
    }
    // Get data from MyAnimeList API
    AnimeAPIData apiData = webClient.get().uri(String.format("/anime/%s", anime.getMalId())).retrieve().bodyToMono(AnimeAPIResponse.class).block().getData();
    if (real) {
      anime.setGenres(apiData.getGenres().stream().map(g -> g.getName()).toList());
      anime.setType(apiData.getType());
    }
    AnimeHiddenDTO res = modelMapper.map(anime, AnimeHiddenDTO.class);
    res.setMembers(apiData.getMembers());
    res.setYear(apiData.getYear());
    
    return res;
  }

  public List<String> getListOfRandomMALURLs() {
    // Get random anime
    List<Mono<AnimeAPIResponse>> reqs = new ArrayList<>();
    for (Integer i = 0; i < 10; i++) {
      // Mono = 0 to 1 value, Flux = N values
      reqs.add(webClient.get().uri("/random/anime").retrieve().bodyToMono(AnimeAPIResponse.class));
    }

    // Wait for all to complete, filter out anime with no/short synopsis or score
    List<String> urls = Flux.fromIterable(reqs).flatMap(mono -> mono).filter(response -> response.getData().getSynopsis() != null && response.getData().getSynopsis().length() > 100 && response.getData().getScore() != null).map(response -> response.getData().getUrl()).collectList().block();

    return urls;
  }

  public void createAnime() throws IOException {
    Resource resource = new ClassPathResource("summaries.json");
    List<Anime> animes = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Anime>>() {});
    Collections.shuffle(animes);
    Integer MAX_PAGE = 193;

    // For assigning daily date
    LocalDate date = LocalDate.parse(BEGINNING_DAILY);
    date = date.plusDays(animeRepository.count());

    // Get random MyAnimeList ID to fake score, members, and year
    Integer page = random.nextInt(MAX_PAGE) + 1;
    // Only include where score exists
    List<AnimeAPIData> apiData = webClient.get().uri(String.format("anime?min_score=0.1&page=%d&order_by=title&type=tv", page)).retrieve().bodyToMono(AnimeListAPIResponse.class).block().getData();
    Collections.shuffle(apiData);
    for (Anime anime : animes) {
      anime.setAiVotes(0);
      anime.setRealVotes(0);
      anime.setDate(date.toString());
      List<Integer> scores = new ArrayList<Integer>();
      for (int i = 0; i < 21; i++) {
        scores.add(0);
      }
      anime.setScores(scores);
      date = date.plusDays(1);

      // If fake anime, randomly pick genre list size and stats
      if (anime.getGenres() != null) {
        anime.setFake(true);
        anime.setGenres(anime.getGenres().subList(0, random.nextInt(1, anime.getGenres().size() + 1)));
      
        Boolean found = false;
        while (!found) {
          Integer item = random.nextInt(apiData.size());
          AnimeAPIData test = apiData.get(item);

          // Only include where synopsis exists
          if (test.getSynopsis() != null && test.getSynopsis().length() > 100) {
            found = true;
            anime.setMalId(test.getMal_id());
            anime.setScore(test.getScore());
            anime.setMembers(test.getMembers());
            anime.setEpisodes(test.getEpisodes());
          }
          apiData.remove(item.intValue());

          if (apiData.size() == 0) {
            page = random.nextInt(MAX_PAGE) + 1;
            apiData = webClient.get().uri(String.format("anime?min_score=0.1&page=%d&order_by=title&type=tv", page)).retrieve().bodyToMono(AnimeListAPIResponse.class).block().getData();
          }
        }
      } else {
        // Real anime, get and store stats
        // Get data from MyAnimeList API
        AnimeAPIData data = webClient.get().uri(String.format("/anime/%s", anime.getMalId())).retrieve().bodyToMono(AnimeAPIResponse.class).block().getData();
        anime.setType(data.getType());
        anime.setYear(data.getYear());
        anime.setScore(data.getScore());
        anime.setMembers(data.getMembers());
        anime.setName(data.getTitle());
        anime.setImgUrl(data.getImages().getJpg().getLarge_image_url());
        anime.setEpisodes(data.getEpisodes());
        anime.setFake(false);
      }
    }
    animeRepository.saveAll(animes);
  }
}
