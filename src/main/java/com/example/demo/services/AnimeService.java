package com.example.demo.services;

import java.io.IOException;
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
import com.example.demo.dto.AnimeAnswerDTO;
import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.dto.AnimeListAPIResponse;
import com.example.demo.dto.AnimeVoteRequest;
import com.example.demo.dto.MangaAPIResponse;
import com.example.demo.dto.MangaListAPIResponse;
import com.example.demo.dto.RatingHiddenDTO;
import com.example.demo.dto.RatingVoteRequest;
import com.example.demo.dto.AnimeAPIResponse.AnimeAPIData;
import com.example.demo.dto.MangaAPIResponse.MangaAPIData;
import com.example.demo.models.Anime;
import com.example.demo.models.Manga;
import com.example.demo.models.Anime.AnimeId;
import com.example.demo.repositories.AnimeRepository;
import com.example.demo.repositories.MangaRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class AnimeService {
  @Autowired
  private AnimeRepository animeRepository;

  @Autowired
  private MangaRepository mangaRepository;

  @Autowired
  private WebClient webClient;

  @Autowired
	private ModelMapper modelMapper;

  @Autowired
  private ObjectMapper objectMapper;

  private Random random = new Random();
  private String BEGINNING_DAILY = "2024-07-22";

  public AnimeHiddenDTO getAnimeByDate(String date) {
    String MODE = "anime";
    // Do not return anything if request into the future
    // TODO: uncomment for production
    /*
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return modelMapper.map(new Anime(), AnimeHiddenDTO.class);
    }
      */

    AnimeId animeId = new AnimeId(date, MODE);
    Optional<Anime> anime = animeRepository.findById(animeId);
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
        fetched.setScore(data.getScore());

        // If not a fake anime, update genres
        if (fetched.getFake() == false) {
          fetched.setGenres(data.getGenres().stream().map(g -> g.getName()).toList());
        }
      }

      return modelMapper.map(fetched, AnimeHiddenDTO.class);
    }
    return modelMapper.map(new Anime(), AnimeHiddenDTO.class);
  }

  public RatingHiddenDTO getRatingByDate(String date) {
    String MODE = "rating";
    // Do not return anything if request into the future
    // TODO: uncomment for production
    /*
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return modelMapper.map(new Anime(), AnimeHiddenDTO.class);
    }
      */

    AnimeId animeId = new AnimeId(date, MODE);
    Optional<Anime> anime = animeRepository.findById(animeId);
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
        fetched.setGenres(data.getGenres().stream().map(g -> g.getName()).toList());
      }

      return modelMapper.map(fetched, RatingHiddenDTO.class);
    }
    return modelMapper.map(new Anime(), RatingHiddenDTO.class);
  }

  public AnimeAnswerDTO voteAnimeByDate(String date, AnimeVoteRequest vote) {
    String MODE = "anime";
    AnimeId animeId = new AnimeId(date, MODE);
    Optional<Anime> anime = animeRepository.findById(animeId);
    if (anime.isPresent()) {
      Anime fetched = anime.get();

      // Update votes
      if (vote.getFake()) {
        fetched.setAiVotes(fetched.getAiVotes() + 1);
      } else {
        fetched.setRealVotes(fetched.getRealVotes() + 1);
      }

      Anime res = animeRepository.save(fetched);

      return modelMapper.map(res, AnimeAnswerDTO.class);
    }
    return modelMapper.map(new Anime(), AnimeAnswerDTO.class);
  }

  public AnimeAnswerDTO voteRatingByDate(String date, RatingVoteRequest vote) {
    String MODE = "rating";
    AnimeId animeId = new AnimeId(date, MODE);
    Optional<Anime> anime = animeRepository.findById(animeId);
    if (anime.isPresent()) {
      Anime fetched = anime.get();

      // Update scores
      List<Integer> scores = fetched.getScores();
      Integer ind = ((int) (vote.getScore() / 0.5)) - 1; // Score in steps of 0.5 from 0.5 to 10
      scores.set(ind, scores.get(ind) + 1);
      fetched.setScores(scores);
      Anime res = animeRepository.save(fetched);

      return modelMapper.map(res, AnimeAnswerDTO.class);
    }
    return modelMapper.map(new Anime(), AnimeAnswerDTO.class);
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

  // For anime mode
  public void createAnime() throws IOException {
    Resource resource = new ClassPathResource("summaries.json");
    List<Anime> animes = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Anime>>() {});
    Collections.shuffle(animes);
    Integer MAX_PAGE = 193;

    // For assigning daily date
    LocalDate date = LocalDate.parse(BEGINNING_DAILY);
    long count = animeRepository.countByIdMode("anime");
    date = date.plusDays(count);
    System.out.println(count);

    // Get random MyAnimeList ID to fake score, members, and year
    Integer page = random.nextInt(MAX_PAGE) + 1;
    // Only include where score exists
    List<AnimeAPIData> apiData = webClient.get().uri(String.format("anime?min_score=0.1&page=%d&order_by=title&type=tv", page)).retrieve().bodyToMono(AnimeListAPIResponse.class).block().getData();
    Collections.shuffle(apiData);
    for (Anime anime : animes) {
      anime.setAiVotes(0);
      anime.setRealVotes(0);
      AnimeId animeId = new AnimeId(date.toString(), "anime");
      anime.setId(animeId);
      date = date.plusDays(1);
      wait(1000); // For jikan rate limit

      // If fake anime, randomly pick genre list size and stats
      if (anime.getGenres() != null) {
        anime.setFake(true);
        List<String> genreSubList = anime.getGenres();
        Collections.shuffle(genreSubList);
        genreSubList = genreSubList.subList(0, random.nextInt(1, anime.getGenres().size() + 1));
        Collections.sort(genreSubList); // Sort by alphabetical
        anime.setGenres(genreSubList);
      
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

  // For rating mode
  public void createRating() throws IOException {
    Resource resource = new ClassPathResource("ratingSummaries.json");
    List<Anime> animes = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Anime>>() {});
    Collections.shuffle(animes);

    // For assigning daily date
    LocalDate date = LocalDate.parse(BEGINNING_DAILY);
    long count = animeRepository.countByIdMode("rating");
    date = date.plusDays(count);
    System.out.println(count);

    for (Anime anime : animes) {
      AnimeId animeId = new AnimeId(date.toString(), "rating");
      anime.setId(animeId);
      List<Integer> scores = new ArrayList<Integer>();
      for (int i = 0; i < 20; i++) { // Scores from 0.5 to 10 inclusive
        scores.add(0);
      }
      anime.setScores(scores);
      date = date.plusDays(1);
      wait(1000); // For jikan rate limit

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
    }
    animeRepository.saveAll(animes);
  }

  // For title mode
  public void createTitle() throws IOException {
    Resource resource = new ClassPathResource("titles.json");
    List<Manga> manga = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Manga>>() {});
    Collections.shuffle(manga);
    Integer MANGA_MAX_PAGE = 816;
    Integer LIGHT_NOVEL_MAX_PAGE = 40;

    // For assigning daily date
    LocalDate date = LocalDate.parse(BEGINNING_DAILY);
    long count = animeRepository.countByIdMode("title");
    date = date.plusDays(count);
    System.out.println(count);

    // Get random MyAnimeList ID to fake score, members, and year
    Integer mangaPage = random.nextInt(MANGA_MAX_PAGE) + 1;
    Integer lightPage = random.nextInt(LIGHT_NOVEL_MAX_PAGE) + 1;
    // Only include where score exists
    List<MangaAPIData> mangaApiData = webClient.get().uri(String.format("manga?min_score=0.1&page=%d&order_by=title&type=%s", mangaPage, "manga")).retrieve().bodyToMono(MangaListAPIResponse.class).block().getData();
    Collections.shuffle(mangaApiData);
    List<MangaAPIData> lightApiData = webClient.get().uri(String.format("manga?min_score=0.1&page=%d&order_by=title&type=%s", lightPage, "lightnovel")).retrieve().bodyToMono(MangaListAPIResponse.class).block().getData();
    Collections.shuffle(lightApiData);

    for (Manga mangi : manga) {
      mangi.setAiVotes(0);
      mangi.setRealVotes(0);
      AnimeId animeId = new AnimeId(date.toString(), "title");
      mangi.setId(animeId);
      date = date.plusDays(1);
      wait(1000); // For jikan rate limit

      // If fake title, fake stats and genres
      if (mangi.getMalId() == null) {
        List<String> genreSubList = mangi.getGenres();
        Collections.shuffle(genreSubList);
        genreSubList = genreSubList.subList(0, random.nextInt(1, mangi.getGenres().size() + 1));
        Collections.sort(genreSubList); // Sort by alphabetical
        mangi.setGenres(genreSubList);
      
        Boolean found = false;
        while (!found) {
          Integer item;
          if (mangi.getType() == "Manga") { 
            item = random.nextInt(mangaApiData.size());
          } else {
            item = random.nextInt(lightApiData.size());
          }
          MangaAPIData test = mangaApiData.get(item);
          
          // Conditionally fake stats
          if (true) {
            found = true;
            mangi.setMalId(test.getMal_id());
            mangi.setScore(test.getScore());
            mangi.setMembers(test.getMembers());
            mangi.setChapters(test.getChapters());
            mangi.setVolumes(test.getVolumes());
            mangi.setFake(true);
          }

          if (mangi.getType() == "Manga") { 
            mangaApiData.remove(item.intValue());
            if (mangaApiData.size() == 0) {
              mangaPage = random.nextInt(MANGA_MAX_PAGE) + 1;
              mangaApiData = webClient.get().uri(String.format("manga?min_score=0.1&page=%d&order_by=title&type=%s", mangaPage, "manga")).retrieve().bodyToMono(MangaListAPIResponse.class).block().getData();
            }
          } else {
            lightApiData.remove(item.intValue());
            if (lightApiData.size() == 0) {
              lightPage = random.nextInt(LIGHT_NOVEL_MAX_PAGE) + 1;
              lightApiData = webClient.get().uri(String.format("manga?min_score=0.1&page=%d&order_by=title&type=%s", lightPage, "lightnovel")).retrieve().bodyToMono(MangaListAPIResponse.class).block().getData();
            }
          }
        }
      } else {
        // Real anime, get and store stats
        // Get data from MyAnimeList API
        MangaAPIData data = webClient.get().uri(String.format("/manga/%s", mangi.getMalId())).retrieve().bodyToMono(MangaAPIResponse.class).block().getData();
        mangi.setType(data.getType());
        mangi.setPublished(data.getPublished().getString());
        mangi.setScore(data.getScore());
        mangi.setMembers(data.getMembers());
        mangi.setImgUrl(data.getImages().getJpg().getLarge_image_url());
        mangi.setChapters(data.getChapters());
        mangi.setVolumes(data.getVolumes());
        mangi.setFake(false);
      }
    }
    mangaRepository.saveAll(manga);
  }

  public static void wait(int ms) {
    try {
      Thread.sleep(ms);
    } catch(InterruptedException ex) {
      Thread.currentThread().interrupt();
    }
  }
}
