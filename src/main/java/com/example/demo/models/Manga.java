package com.example.demo.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.example.demo.models.Anime.AnimeId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@ToString
@Document(collection = "Manga")
@NoArgsConstructor
@AllArgsConstructor
public class Manga {
  @Id
  private AnimeId id;

  private String malId; // MyAnimeList ID
  private Integer realVotes;
  private Integer aiVotes;

  // Only used in case get API rate limit
  private String type; // Manga or Light Novel
  private String published;
  private Double score;
  private Integer members;
  private List<String> genres;
  private String title;
  private Integer chapters;
  private Integer volumes;
  private String imgUrl; // Only for real

  private Boolean fake;
}
