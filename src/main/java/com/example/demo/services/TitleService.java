package com.example.demo.services;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.AnimeAnswerDTO;
import com.example.demo.dto.AnimeVoteRequest;
import com.example.demo.dto.MangaAPIResponse;
import com.example.demo.dto.MangaAPIResponse.MangaAPIData;
import com.example.demo.dto.TitleHiddenDTO;
import com.example.demo.dto.VotesDTO;
import com.example.demo.models.Anime;
import com.example.demo.models.Anime.AnimeId;
import com.example.demo.models.Manga;
import com.example.demo.repositories.MangaRepository;

@Service
public class TitleService {
  @Autowired
  private MangaRepository mangaRepository;

  @Autowired
  private WebClient webClient;

  @Autowired
	private ModelMapper modelMapper;

  public TitleHiddenDTO getTitleByDate(String date) {
    String MODE = "title";
    // Do not return anything if request into the future
    // TODO: uncomment for production
    /*
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return modelMapper.map(new Anime(), AnimeHiddenDTO.class);
    }
      */

    AnimeId animeId = new AnimeId(date, MODE);
    Optional<Manga> manga = mangaRepository.findById(animeId);
    if (manga.isPresent()) {
      Manga fetched = manga.get();
      // Get stats from MyAnimeList
      MangaAPIResponse apiData = null;
      try {
        apiData = webClient.get().uri(String.format("/manga/%s",fetched.getMalId())).retrieve().bodyToMono(MangaAPIResponse.class).block();
      } catch (Exception e) {
      }

      // If not rate limited, use live stats
      // FUTURE: For higher scalability, can use only live data for recent anime
      if (apiData != null) {
        MangaAPIData data = apiData.getData();
        fetched.setType(data.getType());
        fetched.setPublished(data.getPublished().getString());
        fetched.setMembers(data.getMembers());
        fetched.setChapters(data.getChapters());
        fetched.setVolumes(data.getVolumes());
        fetched.setScore(data.getScore());

        // If not a fake anime, update genres
        if (fetched.getFake() == false) {
          fetched.setGenres(data.getGenres().stream().map(g -> g.getName()).toList());
        }
      }

      return modelMapper.map(fetched, TitleHiddenDTO.class);
    }
    return modelMapper.map(new Anime(), TitleHiddenDTO.class);
  }  

  public AnimeAnswerDTO voteTitleByDate(String date, AnimeVoteRequest vote) {
    String MODE = "title";
    AnimeId animeId = new AnimeId(date, MODE);
    Optional<Manga> manga = mangaRepository.findById(animeId);
    if (manga.isPresent()) {
      Manga fetched = manga.get();

      // Update votes
      if (vote.getFake()) {
        fetched.setAiVotes(fetched.getAiVotes() + 1);
      } else {
        fetched.setRealVotes(fetched.getRealVotes() + 1);
      }

      Manga res = mangaRepository.save(fetched);
      AnimeAnswerDTO fin = modelMapper.map(res, AnimeAnswerDTO.class);
      fin.setName(res.getTitle());

      return fin;
    }
    return modelMapper.map(new Anime(), AnimeAnswerDTO.class);
  }

  public VotesDTO getTitleStatsByDate(String date) {
    String MODE = "title";
    // Do not return anything if request into the future
    // TODO: uncomment for production
    /*
    if (Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now())) {
      return modelMapper.map(new Anime(), AnimeHiddenDTO.class);
    }
      */

    AnimeId animeId = new AnimeId(date, MODE);
    Optional<Manga> manga = mangaRepository.findById(animeId);
    if (manga.isPresent()) {
      Manga fetched = manga.get();
      
      return modelMapper.map(fetched, VotesDTO.class);
    }
    return modelMapper.map(new VotesDTO(), VotesDTO.class);
  }  
}
