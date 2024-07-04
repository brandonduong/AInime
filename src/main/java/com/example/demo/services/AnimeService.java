package com.example.demo.services;

import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.AnimeAPIResponse;
import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.models.Anime;
import com.example.demo.repositories.AnimeRepository;

@Service
public class AnimeService {
  @Autowired
  private AnimeRepository animeRepository;

  @Autowired
  private WebClient webClient;

  @Autowired
	private ModelMapper modelMapper;

  public AnimeHiddenDTO getRandomAnimeSummary() {
      // Randomly get an existing summary or generate new
      Random random = new Random();
      if (random.nextInt(10) > 10) { // 70%
        AnimeAPIResponse res = webClient.get().uri("/random/anime").retrieve().bodyToMono(AnimeAPIResponse.class).block(); // Mono = 0 to 1 value, Flux = N values
        System.out.println(res);
      }

      animeRepository.save(new Anime(1, "test", "testsum", "testname", "testmalid", 0, 0));
      return modelMapper.map(animeRepository.findById(1), AnimeHiddenDTO.class);
    }
}
