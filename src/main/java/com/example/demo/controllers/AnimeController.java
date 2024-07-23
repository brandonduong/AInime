package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AnimeAnswerDTO;
import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.dto.AnimeVoteRequest;
import com.example.demo.models.Anime.AnimeId;
import com.example.demo.services.AnimeService;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@CrossOrigin
@RequestMapping("/api")
public class AnimeController {
  @Autowired
  private AnimeService animeService;

  @GetMapping("/newPlay")
  public AnimeHiddenDTO newPlay() {
    return animeService.getRandomAnimeSummary();
  }

  @GetMapping("/daily/{date}")
  public AnimeHiddenDTO getSummaryByDate(@PathVariable AnimeId animeId) {
    return animeService.getSummaryByDate(animeId);
  }

  @PatchMapping("/daily/{date}")
  public AnimeAnswerDTO voteSummaryByDate(@PathVariable AnimeId animeId, @RequestBody AnimeVoteRequest vote) {
    return animeService.voteSummaryByDate(animeId, vote);
  }

  // TODO: Do not push to production. This is only here to learn consuming other APIs through Spring Boot.
  @GetMapping("/getUrls")
  public List<String> getUrls() {
    return animeService.getListOfRandomMALURLs();
  }

  // TODO: Do not push to production. This is only here to learn saving to MongoDB Atlas through Spring Boot.
  @GetMapping("/createAnime")
  public void createAnime() throws IOException {
    animeService.createAnime();
  }

  // TODO: Do not push to production. This is only here to learn saving to MongoDB Atlas through Spring Boot.
  @GetMapping("/createRating")
  public void createRating() throws IOException {
    animeService.createRating();
  }
}
