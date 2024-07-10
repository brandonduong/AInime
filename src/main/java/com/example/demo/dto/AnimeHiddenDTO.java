package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class AnimeHiddenDTO {
  private String date;
  private String oneLiner;
  private String summary;
  private String type;
  private Integer year;
  private Double score;
  private Integer members;
  private List<String> genres;
}
