package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AnimeHiddenDTO;
import com.example.demo.services.AnimeService;

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
  
  @GetMapping("/getUrls")
  public List<String> getUrls() {
    return animeService.getListOfRandomMALURLs();
  }

  // TODO: @GetMapping("/getRandomLightNovelTitle")
}
