package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class AnimeAnswerDTO {
  private String malId;
  private Integer realVotes;
  private Integer aiVotes;
  private Double score;
  private String name;
  private String imgUrl;
  private List<Integer> scores;
  private Boolean fake;
}
