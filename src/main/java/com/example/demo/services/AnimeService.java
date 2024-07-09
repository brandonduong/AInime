package com.example.demo.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
    res.setScore(apiData.getScore());
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

    // Wait for all to complete, filter out anime with no synopsis or score
    List<String> urls = Flux.fromIterable(reqs).flatMap(mono -> mono).filter(response -> response.getData().getSynopsis() != null && response.getData().getScore() != null).map(response -> response.getData().getUrl()).collectList().block();

    return urls;
  }

  public void createRealAnime() throws IOException {
    Resource resource = new ClassPathResource("realSummaries.json");
    List<Anime> animes = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Anime>>() {});
    for (Anime anime : animes) {
      anime.setAiVotes(0);
      anime.setRealVotes(0);
    }
    animeRepository.saveAll(animes);
  }

  public void createFakeAnime() throws IOException {
    Resource resource = new ClassPathResource("fakeSummaries.json");
    List<Anime> animes = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Anime>>() {});
    Integer OVA_PAGES = 137;
    Integer TV_PAGES = 193;
    Integer MOVIE_PAGES = 107;
    Integer SPECIAL_PAGES = 59;
    Integer ONA_PAGES = 84;
    Integer MUSIC_PAGES = 79;
    Integer CM_PAGES = 13;
    Integer PV_PAGES = 6;
    Integer TV_SPECIAL_PAGES = 22;

    Map<String, Integer> PAGES_MAP = Map.of(
      "OVA", OVA_PAGES,
      "TV", TV_PAGES,
      "Movie", MOVIE_PAGES,
      "Special", SPECIAL_PAGES,
      "ONA", ONA_PAGES,
      "Music", MUSIC_PAGES,
      "CM", CM_PAGES,
      "PV", PV_PAGES,
      "TV Special", TV_SPECIAL_PAGES
    );

    Integer PER_PAGE = 25; // items per page


    for (Anime anime : animes) {
      anime.setAiVotes(0);
      anime.setRealVotes(0);
      anime.setGenres(anime.getGenres().subList(0, random.nextInt(1, anime.getGenres().size() + 1)));
      
      // Get random MyAnimeList ID with same type to fake score, members, and year
      Integer page = random.nextInt(1, PAGES_MAP.get(anime.getType()));
      // Only include where score exists
      List<AnimeAPIData> apiData = webClient.get().uri(String.format("anime?type=%s&min_score=0.1&page=%d", anime.getType().toLowerCase(), page)).retrieve().bodyToMono(AnimeListAPIResponse.class).block().getData();
      Boolean found = false;
      Integer tries = 0;
      // Only include where synopsis exists
      while (!found && tries < PER_PAGE) {
        Integer item = random.nextInt(PER_PAGE - tries);
        AnimeAPIData test = apiData.get(item);
        if (test.getSynopsis() != null) {
          found = true;
          anime.setMalId(test.getMal_id());
        } else {
          apiData.remove(item.intValue());
          tries += 1;
        }
      }
    }
    animeRepository.saveAll(animes);
  }

}
