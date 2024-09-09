package com.example.demo.dto;

import com.example.demo.validation.Captcha;

import lombok.Data;

@Data
public class RatingVoteRequest {
  private Integer ind;

  @Captcha
  private String captchaToken;
}
