package com.java.coreTemplate.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.java.coreTemplate.model.dto.Validatorpy;

import java.util.List;
import java.util.Optional;

public interface ValidatorpyRepository extends JpaRepository<Validatorpy, Long> {

    // Find by exact name match using derived query
    Optional<Validatorpy> findByName(String name);

    // Find by name containing string (case-insensitive)
    List<Validatorpy> findByNameContainingIgnoreCase(String namePart);

    // Find by active status using derived query
    List<Validatorpy> findByIsActive(boolean isActive);

    // Custom JPQL query with join (assuming Validatorpy has a rules relationship)
    @Query("SELECT v FROM Validatorpy v JOIN v.rules r WHERE r.severity = :severity")
    List<Validatorpy> findByRuleSeverity(@Param("severity") String severity);

    // Native query for complex operations
    @Query(value = "SELECT * FROM validatorpy WHERE created_at > CURRENT_DATE - INTERVAL '7 days'", nativeQuery = true)
    List<Validatorpy> findRecentValidators();

    // Projection query returning only specific fields
    @Query("SELECT v.name, v.version FROM Validatorpy v WHERE v.language = :language")
    List<Object[]> findNameAndVersionByLanguage(@Param("language") String language);

    // Exists check using derived query
    boolean existsByNameAndVersion(String name, String version);

    // Delete by status using derived query
    long deleteByIsActiveFalse();
}