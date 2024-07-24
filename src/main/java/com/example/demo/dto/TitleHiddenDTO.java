package com.example.demo.dto;

import java.util.List;

import lombok.Data;

@Data
public class TitleHiddenDTO {
  private String type;
  private String published;
  private Double score;
  private Integer members;
  private List<String> genres;
  private String title;
  private Integer chapters;
  private Integer volumes;
}
