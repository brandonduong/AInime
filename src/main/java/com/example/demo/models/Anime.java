package com.example.demo.models;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.demo.dto.AnimeAPIResponse.Genre;

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
  private ObjectId id;
  private String oneLiner;
  private String summary;
  private String malId; // MyAnimeList ID, empty if made by ai
  private Integer realVotes;
  private Integer aiVotes;

  // Only used for fake anime (malId is empty)
  private String name;
  private String type;
  private Integer year;
  private Double score;
  private Integer members;
  private List<String> genres;
}
