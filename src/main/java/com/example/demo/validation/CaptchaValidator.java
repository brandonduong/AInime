package com.example.demo.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.dto.VerifyCaptchaResponse;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CaptchaValidator implements ConstraintValidator<Captcha, String> {
  @Autowired
  private WebClient webClient;

  @Value("${RECAPTCHA_SECRET}")
  private String CAPTCHA_SECRET;

  @Override
  public boolean isValid(String captcha, ConstraintValidatorContext context) {
    VerifyCaptchaResponse data = webClient.post()
        .uri("https://www.google.com/recaptcha/api/siteverify")
        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
        .body(BodyInserters.fromFormData("secret", CAPTCHA_SECRET)
            .with("response", captcha))
        .retrieve()
        .bodyToMono(VerifyCaptchaResponse.class)
        .block();
    return data.getSuccess();
  }
}