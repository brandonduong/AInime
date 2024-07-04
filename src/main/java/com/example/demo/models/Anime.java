package com.example.demo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Document(collection = "Anime")
public class Anime {
  @Id
  private Integer id;
  private String oneLiner;
  private String summary;
  private String name;
  private String malId; // MyAnimeList ID, empty if made by ai
  private Integer realVotes;
  private Integer aiVotes;

  // @NoArgsConstructor
  public Anime() {
  }

  // @AllArgsConstructor
  public Anime(Integer id, String oneLiner, String summary, String name, String malId, Integer realVotes, Integer aiVotes) {
    this.id = id;
    this.oneLiner = oneLiner;
    this.summary = summary;
    this.name = name;
    this.malId = malId;
    this.realVotes = realVotes;
    this.aiVotes = aiVotes;
  }
}
