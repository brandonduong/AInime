package com.example.demo.dto;

import lombok.Data;

@Data
public class AnimeAnswerDTO {
  private String malId;
  private Integer realVotes;
  private Integer aiVotes;
  private String name;
  private String imgUrl;
  private Boolean fake;
}
