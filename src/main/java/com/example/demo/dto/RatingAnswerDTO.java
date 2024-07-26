package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class RatingAnswerDTO {
  private Double score;
  private String name;
  private String imgUrl;
  private List<Integer> scores;
}
