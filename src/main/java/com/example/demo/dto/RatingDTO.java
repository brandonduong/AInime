package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class RatingDTO {
  private Double score;
  private List<Integer> scores;
}
