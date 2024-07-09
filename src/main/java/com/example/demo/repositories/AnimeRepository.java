package com.example.demo.repositories;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Anime;

@Repository
public interface AnimeRepository extends MongoRepository<Anime, ObjectId> {
  @Aggregation(pipeline = {"{ $match: { name: { $exists: true } } }", "{ $sample: { size: 1 } }"})
  Anime findRandomFakeAnime();

  @Aggregation(pipeline = {"{ $match: { name: { $exists: false } } }", "{ $sample: { size: 1 } }"})
  Anime findRandomRealAnime();
}
