package com.example.demo.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@Document(collection = "Anime")
@NoArgsConstructor
@AllArgsConstructor
public class Anime {
  @Id
  private String date;
  private String oneLiner;
  private String summary;
  private String malId; // MyAnimeList ID
  private Integer realVotes;
  private Integer aiVotes;

  // Only used in case get API rate limit
  private String type;
  private Integer year;
  private Double score;
  private Integer members;
  private List<String> genres;
  private String name;

  private Boolean fake;
}
