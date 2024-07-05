package com.example.demo.dto;

import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class AnimeHiddenDTO {
  private ObjectId id;
  private String oneLiner;
  private String summary;
  private String name;
}
