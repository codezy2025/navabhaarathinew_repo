package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.ValidatorpyRepository;
import com.java.coreTemplate.model.dto.Validatorpy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class ValidatorpyService {

    private final ValidatorpyRepository repository;

    public ValidatorpyService(ValidatorpyRepository repository) {
        this.repository = repository;
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", allEntries = true)
    public Validatorpy save(Validatorpy entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "validatorpyCache", key = "#id")
    public Optional<Validatorpy> findById(Long id) {
        return repository.findById(id);
    }

    @Cacheable(value = "validatorpyCache")
    public List<Validatorpy> findAll() {
        return repository.findAll();
    }

    public Page<Validatorpy> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    @Cacheable(value = "validatorpyCache", key = "'active'")
    public List<Validatorpy> findAllActive() {
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", key = "#id")
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", allEntries = true)
    public Validatorpy update(Validatorpy entity) {
        return repository.save(entity);
    }

    @Cacheable(value = "validatorpyCache", key = "'count'")
    public long count() {
        return repository.count();
    }

    @Cacheable(value = "validatorpyCache", key = "#name")
    public Optional<Validatorpy> findByName(String name) {
        return repository.findByName(name);
    }
}