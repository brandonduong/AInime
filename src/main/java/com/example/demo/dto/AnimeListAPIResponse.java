package com.example.demo.dto;

import java.util.List;

import com.example.demo.dto.AnimeAPIResponse.AnimeAPIData;

import lombok.Data;

@Data
public class AnimeListAPIResponse {
  private List<AnimeAPIData> data;
}
