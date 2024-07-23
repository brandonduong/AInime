package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AnimeAnswerDTO;
import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.dto.AnimeVoteRequest;
import com.example.demo.dto.RatingHiddenDTO;
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

  @GetMapping("/anime/{date}")
  public AnimeHiddenDTO getSummaryByDate(@PathVariable String date) {
    return animeService.getSummaryByDate(date);
  }

  @GetMapping("/rating/{date}")
  public RatingHiddenDTO getRatingByDate(@PathVariable String date) {
    return animeService.getRatingByDate(date);
  }

  @PatchMapping("/anime/{date}")
  public AnimeAnswerDTO voteSummaryByDate(@PathVariable String date, @RequestBody AnimeVoteRequest vote) {
    return animeService.voteSummaryByDate(date, vote);
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
