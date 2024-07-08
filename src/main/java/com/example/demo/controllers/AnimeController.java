package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.services.AnimeService;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

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

  // TODO: Get request for replaying a summary
  

  // TODO: Do not push to production. This is only here to learn consuming other APIs through Spring Boot.
  @GetMapping("/getUrls")
  public List<String> getUrls() {
    return animeService.getListOfRandomMALURLs();
  }

  // TODO: Do not push to production. This is only here to learn saving to MongoDB Atlas through Spring Boot.
  @GetMapping("/createReal")
  public void createReal() throws IOException {
    animeService.createRealAnime();
  }

  // TODO: Do not push to production. This is only here to learn saving to MongoDB Atlas through Spring Boot.
  @GetMapping("/createFake")
  public void createFake() throws IOException {
    animeService.createFakeAnime();
  }
}
