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
import com.example.demo.validation.NotFutureDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin
@RequestMapping("/api")
@Validated
public class AnimeController {
  @Autowired
  private AnimeService animeService;

  @GetMapping("/anime/{date}")
  public AnimeHiddenDTO getAnimeByDate(@PathVariable @NotFutureDate String date) {
    return animeService.getAnimeByDate(date);
  }

  @GetMapping("/rating/{date}")
  public RatingHiddenDTO getRatingByDate(@PathVariable @NotFutureDate String date) {
    return animeService.getRatingByDate(date);
  }

  @GetMapping("/anime/stats/{date}")
  public VotesDTO getAnimeStatsByDate(@PathVariable @NotFutureDate String date) {
    return animeService.getAnimeStatsByDate(date);
  }

  @GetMapping("/rating/stats/{date}")
  public RatingDTO getRatingStatsByDate(@PathVariable @NotFutureDate String date) {
    return animeService.getRatingStatsByDate(date);
  }

  @PatchMapping("/anime/{date}")
  public AnimeAnswerDTO voteAnimeByDate(@PathVariable @NotFutureDate String date, @RequestBody AnimeVoteRequest vote) {
    return animeService.voteAnimeByDate(date, vote);
  }

  @PatchMapping("/rating/{date}")
  public RatingAnswerDTO voteRatingByDate(@PathVariable @NotFutureDate String date,
      @RequestBody RatingVoteRequest vote) {
    return animeService.voteRatingByDate(date, vote);
  }

  // TODO: Do not push to production. This is only here to learn consuming other
  // APIs through Spring Boot.
  /*
   * @GetMapping("/getUrls")
   * public List<String> getUrls() {
   * return animeService.getListOfRandomMALURLs();
   * }
   * 
   * // TODO: Do not push to production. This is only here to learn saving to
   * MongoDB Atlas through Spring Boot.
   * 
   * @GetMapping("/createAnime")
   * public void createAnime() throws IOException {
   * animeService.createAnime();
   * }
   * 
   * // TODO: Do not push to production. This is only here to learn saving to
   * MongoDB Atlas through Spring Boot.
   * 
   * @GetMapping("/createRating")
   * public void createRating() throws IOException {
   * animeService.createRating();
   * }
   * 
   * // TODO: Do not push to production. This is only here to learn saving to
   * MongoDB Atlas through Spring Boot.
   * 
   * @GetMapping("/createTitle")
   * public void createTitle() throws IOException {
   * animeService.createTitle();
   * }
   */
}
