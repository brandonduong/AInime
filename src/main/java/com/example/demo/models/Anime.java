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

  // Only used for fake anime
  private String name; // Empty if real anime
  private String type;
  private List<String> genres;
}
