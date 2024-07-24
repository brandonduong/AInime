package com.example.demo.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.Manga;
import com.example.demo.models.Anime.AnimeId;

@Repository
public interface MangaRepository extends MongoRepository<Manga, AnimeId> {
}
