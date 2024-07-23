package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Anime;
import com.example.demo.models.Anime.AnimeId;

@Repository
public interface AnimeRepository extends MongoRepository<Anime, AnimeId> {
  @Aggregation(pipeline = {"{ $match: { name: { $exists: true } } }", "{ $sample: { size: 1 } }"})
  Anime findRandomFakeAnime();

  @Aggregation(pipeline = {"{ $match: { name: { $exists: false } } }", "{ $sample: { size: 1 } }"})
  Anime findRandomRealAnime();

  long countByIdMode(String mode);
}
