package com.example.demo.dto;

import java.util.List;

import com.example.demo.dto.AnimeAPIResponse.Genre;
import com.example.demo.dto.AnimeAPIResponse.Images;

import lombok.Data;

@Data
public class MangaAPIResponse {
  private MangaAPIData data;

  @Data
  public static class MangaAPIData {
    private String mal_id;
    private String url;
    private String type;
    private Double score;
    private Integer members;
    private List<Genre> genres;
    private Images images;
    private Integer chapters;
    private Integer volumes;
    private Published published;
  }

  @Data
  public static class Published {
    private String string;
  }
}
