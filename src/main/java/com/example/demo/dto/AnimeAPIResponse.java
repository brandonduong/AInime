package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class AnimeAPIResponse {
  private AnimeAPIData data;

  @Data
  public static class AnimeAPIData {
    private String mal_id;
    private String url;
    private String title;
    private String type;
    private Integer year;
    private double score;
    private Integer members;
    private Integer favorites;
    private String synopsis;
    private List<Genre> genres;
  }

  @Data
  public static class Genre {
    private String name;
  }
}
