package com.codevui.react_springboot_crud.service.impl;

import com.codevui.react_springboot_crud.entity.Tutorial;
import com.codevui.react_springboot_crud.repository.TutorialRepository;
import com.codevui.react_springboot_crud.service.TutorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TutorialServiceImpl implements TutorialService {

    private final TutorialRepository tutorialRepository;

    @Override
    public ResponseEntity<List<Tutorial>> getAllTutorials() {
        return ResponseEntity.ok(tutorialRepository.findAll());
    }

    @Override
    public ResponseEntity<Tutorial> getTutorialById(int id) {

        Optional<Tutorial> tutorialOptional = tutorialRepository.findById(id);
        if(tutorialOptional.isPresent()){
            Tutorial tutorial = tutorialOptional.get();
            return ResponseEntity.ok(tutorial);
        }else{

            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Tutorial> createTutorial(Tutorial tutorial) {

        Tutorial addTutorial = tutorialRepository.save(tutorial);

        return ResponseEntity.ok(addTutorial);
    }

    @Override
    public ResponseEntity<Tutorial> updateTutorial(int id, Tutorial tutorial) {
        Optional<Tutorial> tutorialOptional = tutorialRepository.findById(id);
        if(tutorialOptional.isPresent()){
            Tutorial tutorialUpdate = tutorialOptional.get();
            tutorialUpdate.setTitle(tutorial.getTitle());
            tutorialUpdate.setDescription(tutorial.getDescription());
            tutorialUpdate.setPublished(tutorialUpdate.isPublished());
            return new ResponseEntity<>(tutorialRepository.save(tutorialUpdate), HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<Tutorial> deleteTutorialById(int id) {
        Optional<Tutorial> tutorialOptional = tutorialRepository.findById(id);
        if(tutorialOptional.isEmpty()){
            throw new IllegalStateException("Tutorial not found");
        }
       tutorialRepository.deleteById(id);
        return ResponseEntity.ok(tutorialOptional.get());
    }

    @Override
    public ResponseEntity<HttpStatus> deleteAllTutorials() {
        tutorialRepository.deleteAll();
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<List<Tutorial>> getByPublished() {
    try{
        List<Tutorial> tutorialList = tutorialRepository.findByPublished(true);
        if(tutorialList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(tutorialList, HttpStatus.OK);

    }catch (Exception e){
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }
    }

    @Override
    public ResponseEntity<List<Tutorial>> getTutorialByTitle(String title) {

        if (title == null || title.isEmpty()) {
            List<Tutorial> tutorialList = tutorialRepository.findAll();
            return ResponseEntity.ok(tutorialList);
        } else {
            List<Tutorial> list = tutorialRepository.findByTitleContaining(title);
            return ResponseEntity.ok(list);
        }

    }

    @Override
    public ResponseEntity<Tutorial> updateTutorialStatus(int id) {
        Optional<Tutorial> tutorialOptional = tutorialRepository.findById(id);
        if(tutorialOptional.isPresent()){
            Tutorial tutorialUpdate = tutorialOptional.get();
            tutorialUpdate.setPublished(!tutorialUpdate.isPublished());
            return new ResponseEntity<>(tutorialRepository.save(tutorialUpdate), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
