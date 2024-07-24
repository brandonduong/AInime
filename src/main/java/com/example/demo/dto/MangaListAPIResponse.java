package com.example.demo.dto;

import java.util.List;

import com.example.demo.dto.MangaAPIResponse.MangaAPIData;

import lombok.Data;

@Data
public class MangaListAPIResponse {
  private List<MangaAPIData> data;
}
