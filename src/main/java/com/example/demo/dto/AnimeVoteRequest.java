package com.example.demo.dto;

import com.example.demo.validation.Captcha;

import lombok.Data;

@Data
public class AnimeVoteRequest {
  private Boolean fake;

  @Captcha
  private String captchaToken;
}
