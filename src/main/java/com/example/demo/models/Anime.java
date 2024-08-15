package com.example.demo.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@Document(collection = "Anime")
@NoArgsConstructor
@AllArgsConstructor
public class Anime {
  @Id
  private AnimeId id;

  private String oneLiner;
  private String summary;
  private String malId; // MyAnimeList ID
  private Integer realVotes;
  private Integer aiVotes;

  // Only used in case get API rate limit
  private String type;
  private Integer year;
  private Double score;
  private Integer members;
  private List<String> genres;
  private String name;
  private Integer episodes;
  private String imgUrl; // Only for real

  // Rating mode
  private List<Double> options; // List of size 3 for the score 3 options
  private List<Integer> scores; // List of size 3 counting number of times it was rated from options 1 to 3

  // Anime mode
  private Boolean fake;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class AnimeId {
    // Composite key / index
    private String date;
    private String mode; // anime, rating, or lightnovel
  }
}
