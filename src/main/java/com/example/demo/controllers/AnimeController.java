package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AnimeAnswerDTO;
import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.dto.AnimeVoteRequest;
import com.example.demo.dto.RatingAnswerDTO;
import com.example.demo.dto.RatingDTO;
import com.example.demo.dto.RatingHiddenDTO;
import com.example.demo.dto.RatingVoteRequest;
import com.example.demo.dto.VotesDTO;
import com.example.demo.services.AnimeService;

import java.time.Instant;

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

  @GetMapping("/anime/{date}")
  public AnimeHiddenDTO getAnimeByDate(@PathVariable String date) {
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return null;
    }
    return animeService.getAnimeByDate(date);
  }

  @GetMapping("/rating/{date}")
  public RatingHiddenDTO getRatingByDate(@PathVariable String date) {
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return null;
    }
    return animeService.getRatingByDate(date);
  }

  @GetMapping("/anime/stats/{date}")
  public VotesDTO getAnimeStatsByDate(@PathVariable String date) {
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return null;
    }
    return animeService.getAnimeStatsByDate(date);
  }

  @GetMapping("/rating/stats/{date}")
  public RatingDTO getRatingStatsByDate(@PathVariable String date) {
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return null;
    }
    return animeService.getRatingStatsByDate(date);
  }

  @PatchMapping("/anime/{date}")
  public AnimeAnswerDTO voteAnimeByDate(@PathVariable String date, @RequestBody AnimeVoteRequest vote) {
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return null;
    }
    return animeService.voteAnimeByDate(date, vote);
  }

  @PatchMapping("/rating/{date}")
  public RatingAnswerDTO voteRatingByDate(@PathVariable String date, @RequestBody RatingVoteRequest vote) {
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return null;
    }
    return animeService.voteRatingByDate(date, vote);
  }

  // TODO: Do not push to production. This is only here to learn consuming other APIs through Spring Boot.
  /*
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

  // TODO: Do not push to production. This is only here to learn saving to MongoDB Atlas through Spring Boot.
  @GetMapping("/createTitle")
  public void createTitle() throws IOException {
    animeService.createTitle();
  }
  */
}
