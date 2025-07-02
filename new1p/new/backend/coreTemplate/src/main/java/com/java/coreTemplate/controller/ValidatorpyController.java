package com.java.coreTemplate.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.ValidatorpyService;
import com.java.coreTemplate.model.dto.Validatorpy;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/v1/validators")
public class ValidatorpyController {
    private final ValidatorpyService service;
    
    public ValidatorpyController(ValidatorpyService service) {
        this.service = service;
    }
    
    @PostMapping
    public ResponseEntity<Validatorpy> create(@Valid @RequestBody Validatorpy entity) {
        Validatorpy savedEntity = service.save(entity);
        return ResponseEntity.created(URI.create("/api/v1/validators/" + savedEntity.getId()))
                .body(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Validatorpy> getById(@PathVariable Long id) {
        return service.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<Page<Validatorpy>> getAll(
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(service.findAll(pageable));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Validatorpy> update(
            @PathVariable Long id, 
            @Valid @RequestBody Validatorpy entity) {
        return service.update(id, entity)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (service.deleteById(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<Validatorpy>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(service.search(query, pageable));
    }
}