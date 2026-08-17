package com.marklester.wildoasis.controller;

import java.util.List;

import com.marklester.wildoasis.entity.Cabin;
import com.marklester.wildoasis.service.CabinService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class CabinController {

  private final CabinService cabinService;

  public CabinController(CabinService cabinService) {
    this.cabinService = cabinService;
  }

  @GetMapping("/cabins")
  public List<Cabin> getCabins() {
    return cabinService.findAllCabins();
  }

  @GetMapping("/cabins/{id}")
  public Cabin getCabin(@PathVariable Long id) {
    return cabinService.findCabinById(id);
  }

  @DeleteMapping("/cabins/{id}")
  public void deleteCabin(@PathVariable Long id) {
    cabinService.deleteCabin(id);
  }

  @PatchMapping("/cabins/{id}")
  public Cabin updateCabin(
      @PathVariable Long id,
      @RequestPart("cabin") Cabin cabin,
      @RequestPart(value = "image", required = false) MultipartFile image) {

    return cabinService.updateCabin(id, cabin, image);
  }
}
