package com.codevui.react_springboot_crud.service;

import com.codevui.react_springboot_crud.entity.Tutorial;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TutorialService {
    ResponseEntity<List<Tutorial>> getAllTutorials();

    ResponseEntity<Tutorial> getTutorialById(int id);

    ResponseEntity<Tutorial> createTutorial(Tutorial tutorial);

    ResponseEntity<Tutorial> updateTutorial(int id, Tutorial tutorial);

    ResponseEntity<Tutorial> deleteTutorialById(int id);

    ResponseEntity<HttpStatus> deleteAllTutorials();

    ResponseEntity<List<Tutorial>> getByPublished();

    ResponseEntity<List<Tutorial>> getTutorialByTitle(String title);

    ResponseEntity<Tutorial> updateTutorialStatus(int id);
}
