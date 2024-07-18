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
    private Double score;
    private Integer members;
    private Integer favorites;
    private String synopsis;
    private List<Genre> genres;
    private Images images;
    private Integer episodes;
  }

  @Data
  public static class Genre {
    private String name;
  }

  @Data
  public static class Images {
    private ImageType jpg;
  }

  @Data
  public static class ImageType {
    private String large_image_url;
  }
}
