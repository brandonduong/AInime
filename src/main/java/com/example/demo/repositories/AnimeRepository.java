package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Anime;

@Repository
public interface AnimeRepository extends MongoRepository<Anime, Integer> {
  
}
