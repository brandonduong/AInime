package com.example.demo.validation;

import java.time.Instant;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NotFutureDateValidator implements ConstraintValidator<NotFutureDate, String> {
  @Override
  public boolean isValid(String date, ConstraintValidatorContext context) {
    return !Instant.parse(String.format("%sT00:00:00.00Z", date)).isAfter(Instant.now());
  }
}