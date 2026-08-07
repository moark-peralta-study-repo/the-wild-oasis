package com.marklester.wildoasis.service;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

import com.marklester.wildoasis.config.SupabaseProperties;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SupabaseStorageService implements StorageService {
  private final SupabaseProperties properties;
  private final RestClient restClient;

  public SupabaseStorageService(SupabaseProperties properties, RestClient restClient) {
    this.properties = properties;
    this.restClient = restClient;
  }

  public String upload(MultipartFile file) {

    // Generate name
    String original = Objects.requireNonNull(file.getOriginalFilename());
    String filename = UUID.randomUUID() + "-" + original;

    String uploadUrl =
        String.format(
            "%s/storage/v1/object/%s/%s", properties.getUrl(), properties.getBucket(), filename);

    String imageUrl =
        String.format(
            "%s/storage/v1/object/public/%s/%s",
            properties.getUrl(), properties.getBucket(), filename);

    // Send HTTP request to supabse storage
    try {
      restClient
          .post()
          .uri(uploadUrl)
          .header("Authorization", "Bearer " + properties.getServiceKey())
          .header("apikey", properties.getServiceKey())
          .header("Content-Type", file.getContentType())
          .body(file.getBytes())
          .retrieve()
          .toBodilessEntity();
    } catch (IOException e) {
      throw new RuntimeException("Failed to read uploaded file", e);
    }
    return imageUrl;
  }

  @Override
  public void delete(String imagePath) {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'delete'");
  }
}
