package com.marklester.wildoasis.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cabin {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long cabinId;

  @Column(name = "created_at")
  private LocalDateTime createdAt;

  private String name;
  private String description;
  private String imageUrl;
  private String imagePath;

  public String getImageUrl() {
    return imageUrl;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public String getImagePath() {
    return imagePath;
  }

  public void setImagePath(String imagePath) {
    this.imagePath = imagePath;
  }

  @Column(name = "max_capacity")
  private Short maxCapacity;

  @Column(name = "regular_price")
  private Short regularPrice;

  public Cabin() {}

  public Cabin(
      Long cabinId,
      LocalDateTime createdAt,
      String name,
      String description,
      String imageUrl,
      Short maxCapacity,
      Short regularPrice) {
    this.cabinId = cabinId;
    this.createdAt = createdAt;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.maxCapacity = maxCapacity;
    this.regularPrice = regularPrice;
  }

  public Long getCabinId() {
    return cabinId;
  }

  public void setCabinId(Long cabinId) {
    this.cabinId = cabinId;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public String getImage() {
    return imageUrl;
  }

  public void setImage(String imageUrl) {
    this.imageUrl = imageUrl;
  }

  public Short getMaxCapacity() {
    return maxCapacity;
  }

  public void setMaxCapacity(Short maxCapacity) {
    this.maxCapacity = maxCapacity;
  }

  public Short getRegularPrice() {
    return regularPrice;
  }

  public void setRegularPrice(Short regularPrice) {
    this.regularPrice = regularPrice;
  }
}
