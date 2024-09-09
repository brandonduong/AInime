package com.example.demo.dto;

import lombok.Data;

@Data
public class VerifyCaptchaRequest {
  private String secret;
  private String response;
}
