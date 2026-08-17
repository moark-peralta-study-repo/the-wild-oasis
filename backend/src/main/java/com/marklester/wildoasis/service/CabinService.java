package com.marklester.wildoasis.service;

import java.util.List;

import com.marklester.wildoasis.entity.Cabin;
import com.marklester.wildoasis.repository.CabinRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CabinService {
  private final CabinRepository cabinRepository;
  private final SupabaseStorageService supabaseStorageService;

  public CabinService(
      CabinRepository cabinRepository, SupabaseStorageService supabaseStorageService) {
    this.cabinRepository = cabinRepository;
    this.supabaseStorageService = supabaseStorageService;
  }

  public List<Cabin> findAllCabins() {
    return cabinRepository.findAll();
  }

  public Cabin findCabinById(Long id) {
    Cabin cabin =
        cabinRepository.findById(id).orElseThrow(() -> new RuntimeException("Cabin not found"));
    return cabin;
  }

  // TODO Custom Exception
  public void deleteCabin(Long id) {
    Cabin cabin =
        cabinRepository.findById(id).orElseThrow(() -> new RuntimeException("Cabin not found"));

    String imagePath = cabin.getImagePath();

    cabinRepository.deleteById(id);
    supabaseStorageService.delete(imagePath);
  }

  public Cabin updateCabin(Long id, Cabin updatedCabin, MultipartFile image) {
    Cabin cabin =
        cabinRepository.findById(id).orElseThrow(() -> new RuntimeException("Cabin not found"));

    String oldImagePath = cabin.getImagePath();

    // Update cabin values
    //
    cabin.setName(updatedCabin.getName());
    cabin.setMaxCapacity(updatedCabin.getMaxCapacity());
    cabin.setRegularPrice(updatedCabin.getRegularPrice());
    cabin.setDiscount(updatedCabin.getDiscount());
    cabin.setDescription(updatedCabin.getDescription());

    if (image != null && !image.isEmpty()) {
      StorageUploadResult upload = supabaseStorageService.upload(image);

      cabin.setImageUrl(upload.imageUrl());
      cabin.setImagePath(upload.imagePath());
    }

    Cabin savedCabin = cabinRepository.save(cabin);

    if (image != null && !image.isEmpty() && oldImagePath != null) {
      supabaseStorageService.delete(oldImagePath);
    }
    return savedCabin;
  }
}
