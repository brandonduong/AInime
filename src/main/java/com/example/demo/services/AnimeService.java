package com.example.demo.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.AnimeAPIResponse;
import com.example.demo.dto.AnimeHiddenDTO;
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
    if (next > 10) { // 50%
      // Generate new summary for an existing one
      // Get random anime
    } else if (next > 10){ // 50%
      // Generate new summary for a fake one
    } else { // 50%
      // Get an existing one from MongoDB
    }

    // animeRepository.save(new Anime(null, "test", "testsum", "testname", "testmalid", 0, 0));
    // animeRepository.findAll().stream().map(a -> modelMapper.map(a, AnimeHiddenDTO.class)).collect(Collectors.toList())
    return modelMapper.map(anime, AnimeHiddenDTO.class);
  }

  public List<String> getListOfRandomMALURLs() {
    // Get random anime
    List<Mono<AnimeAPIResponse>> reqs = new ArrayList<>();
    for (Integer i = 0; i < 10; i++) {
      // Mono = 0 to 1 value, Flux = N values
      reqs.add(webClient.get().uri("/random/anime").retrieve().bodyToMono(AnimeAPIResponse.class));
    }

    // Wait for all to complete
    List<String> urls = Flux.fromIterable(reqs).flatMap(mono -> mono).map(response -> response.getData().getUrl()).collectList().block();

    return urls;
  }

  public void createRealAnime() throws IOException {
    Resource resource = new ClassPathResource("realSummaries.json");
    List<Anime> animes = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Anime>>() {});
    for (Anime anime : animes) {
      anime.setAiVotes(0);
      anime.setRealVotes(0);
      anime.setScore(null);
    }
    animeRepository.saveAll(animes);
  }
}
