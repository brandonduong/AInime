package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class RatingHiddenDTO {
  private String oneLiner;
  private String summary;
  private String type;
  private Integer year;
  private Integer members;
  private List<String> genres;
  private Integer episodes;
  private List<Double> options;
}
