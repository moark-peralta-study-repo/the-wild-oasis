package com.marklester.wildoasis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class WildOasisApplication {
  public static void main(String[] args) {
    SpringApplication.run(WildOasisApplication.class, args);
  }
}
