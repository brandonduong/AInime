package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class RatingAnswerDTO {
  private String malId;
  private Double score;
  private String name;
  private String imgUrl;
  private List<Double> options;
  private List<Integer> scores;
}
