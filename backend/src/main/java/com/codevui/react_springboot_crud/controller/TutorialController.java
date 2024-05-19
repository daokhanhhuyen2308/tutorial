package com.codevui.react_springboot_crud.controller;

import com.codevui.react_springboot_crud.entity.Tutorial;
import com.codevui.react_springboot_crud.service.TutorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin("*")
public class TutorialController {

    private final TutorialService tutorialService;

    @GetMapping("/tutorials")
    public ResponseEntity<List<Tutorial>> getAllTutorials(){
        return tutorialService.getAllTutorials();
    }

    @GetMapping("/tutorials/{id}")
    public ResponseEntity<Tutorial> getTutorialById(@PathVariable int id){
        return tutorialService.getTutorialById(id);
    }

    @GetMapping("")
    public ResponseEntity<List<Tutorial>> getTutorialByTitle(@RequestParam(name = "title", required = false) String title){
        return tutorialService.getTutorialByTitle(title);
    }

    @PostMapping("/tutorials")
    public ResponseEntity<Tutorial> addTutorial(@RequestBody Tutorial tutorial){
        return tutorialService.createTutorial(tutorial);
    }

    @PutMapping("/tutorials/{id}")
    public ResponseEntity<Tutorial> updateTutorial(@PathVariable int id, @RequestBody Tutorial tutorial){
//        tutorial.setId(id);
        return tutorialService.updateTutorial(id, tutorial);
    }

    @DeleteMapping("/tutorials/{id}")
    public ResponseEntity<Tutorial> deleteTutorialById(@PathVariable int id){
        return tutorialService.deleteTutorialById(id);
    }

    @DeleteMapping("/tutorials")
    public ResponseEntity<HttpStatus> deleteAllTutorials() {
        return tutorialService.deleteAllTutorials();
    }

    @GetMapping("/tutorials/published")
    public ResponseEntity<List<Tutorial>> getByPublished() {
        return tutorialService.getByPublished();
    }

    @PutMapping("/tutorials/published/{id}")
        public ResponseEntity<Tutorial> updatePublishedStatus(@PathVariable int id){
        return tutorialService.updateTutorialStatus(id);
    }
}

