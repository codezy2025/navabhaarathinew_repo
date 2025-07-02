package com.java.coreTemplate.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.java.coreTemplate.repository.ValidatorpyRepository;
import com.java.coreTemplate.model.dto.Validatorpy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ValidatorpyService {

    private final ValidatorpyRepository repository;

    @Transactional
    @CacheEvict(value = "validatorpyCache", allEntries = true)
    public Validatorpy save(Validatorpy entity) {
        log.info("Saving Validatorpy entity: {}", entity);
        return repository.save(entity);
    }

    @Cacheable(value = "validatorpyCache", key = "#id")
    public Optional<Validatorpy> findById(Long id) {
        log.debug("Fetching Validatorpy by id: {}", id);
        return repository.findById(id);
    }

    @Cacheable("validatorpyCache")
    public List<Validatorpy> findAll() {
        log.debug("Fetching all Validatorpy entities");
        return repository.findAll();
    }

    @Cacheable("validatorpyCache")
    public Page<Validatorpy> findAll(Pageable pageable) {
        log.debug("Fetching all Validatorpy entities with pagination");
        return repository.findAll(pageable);
    }

    public List<Validatorpy> findAllActive() {
        log.debug("Fetching all active Validatorpy entities");
        return repository.findByIsActiveTrue();
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", key = "#id")
    public void deleteById(Long id) {
        log.info("Deleting Validatorpy with id: {}", id);
        repository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "validatorpyCache", allEntries = true)
    public Validatorpy update(Validatorpy entity) {
        log.info("Updating Validatorpy entity: {}", entity);
        return repository.save(entity);
    }

    public boolean existsById(Long id) {
        log.debug("Checking existence of Validatorpy with id: {}", id);
        return repository.existsById(id);
    }

    public long count() {
        log.debug("Counting Validatorpy entities");
        return repository.count();
    }
}