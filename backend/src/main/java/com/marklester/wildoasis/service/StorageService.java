package com.marklester.wildoasis.service;

import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
  StorageUploadResult upload(MultipartFile file);

  void delete(String imagePath);
}
