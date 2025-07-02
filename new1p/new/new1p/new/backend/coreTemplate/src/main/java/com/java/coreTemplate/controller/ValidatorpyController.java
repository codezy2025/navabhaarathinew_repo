package com.java.coreTemplate.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import com.java.coreTemplate.service.ValidatorpyService;
import com.java.coreTemplate.model.dto.Validatorpy;

@RestController
@RequestMapping("/api/v1/validators")
public class ValidatorpyController {
    private final ValidatorpyService service;

    public ValidatorpyController(ValidatorpyService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Validatorpy> create(@RequestBody Validatorpy entity) {
        Validatorpy savedEntity = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .header("Location", "/api/v1/validators/" + savedEntity.getId())
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
        Page<Validatorpy> validators = service.findAll(pageable);
        return ResponseEntity.ok(validators);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Validatorpy> update(
            @PathVariable Long id, 
            @RequestBody Validatorpy entity) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        entity.setId(id);
        Validatorpy updatedEntity = service.save(entity);
        return ResponseEntity.ok(updatedEntity);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Validatorpy> partialUpdate(
            @PathVariable Long id,
            @RequestBody Validatorpy partialEntity) {
        return service.partialUpdate(id, partialEntity)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Validatorpy>> search(
            @RequestParam(required = false) String query,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<Validatorpy> results = service.search(query, pageable);
        return ResponseEntity.ok(results);
    }
}