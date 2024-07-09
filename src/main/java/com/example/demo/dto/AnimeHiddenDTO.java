package com.example.demo.dto;

import java.util.List;

import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class AnimeHiddenDTO {
  private ObjectId id;
  private String oneLiner;
  private String summary;
  private String type;
  private Integer year;
  private Double score;
  private Integer members;
  private List<String> genres;
}
