package com.java.coreTemplate.model.dto;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.Optional;

@Entity
@Table(name = "validator.py")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Validatorpy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "is_verified")
    private boolean isVerified;

    @Column(name = "email", unique = true, length = 255)
    private String email;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Column(name = "score", precision = 5, scale = 2)
    private Double score;

    @Column(name = "metadata", columnDefinition = "TEXT")
    private String metadata;

    @Version
    private Long version;

    // Boolean getter with 'is' prefix
    public boolean isActive() {
        return isActive;
    }

    // Boolean getter with 'is' prefix
    public boolean isVerified() {
        return isVerified;
    }

    // Optional getter for nullable field
    public Optional<String> getMetadata() {
        return Optional.ofNullable(metadata);
    }

    @PrePersist
    protected void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }
}