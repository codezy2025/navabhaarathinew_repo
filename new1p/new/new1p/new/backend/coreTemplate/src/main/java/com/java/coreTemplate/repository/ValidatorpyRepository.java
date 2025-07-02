package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Validatorpy;

import java.util.List;
import java.util.Optional;

public interface ValidatorpyRepository extends JpaRepository<Validatorpy, Long> {

    // Find by exact name match
    Optional<Validatorpy> findByName(String name);

    // Find by name containing string (case-insensitive)
    List<Validatorpy> findByNameContainingIgnoreCase(String nameFragment);

    // Find by active status using modern boolean naming convention
    List<Validatorpy> findByIsActive(boolean isActive);

    // Custom JPQL query with named parameters
    @Query("SELECT v FROM Validatorpy v WHERE v.version = :version AND v.isActive = true")
    List<Validatorpy> findActiveByVersion(@Param("version") String version);

    // Native query for complex operations
    @Query(value = "SELECT * FROM validatorpy WHERE created_at > CURRENT_DATE - INTERVAL '7 days'", nativeQuery = true)
    List<Validatorpy> findRecentValidators();

    // Projection query returning only specific fields
    @Query("SELECT v.name, v.version FROM Validatorpy v WHERE v.category = :category")
    List<Object[]> findNameAndVersionByCategory(@Param("category") String category);

    // Exists check with modern naming
    boolean existsByNameAndVersion(String name, String version);

    // Delete by status with return count
    long deleteByIsActive(boolean isActive);
}