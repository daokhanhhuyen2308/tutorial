package com.codevui.react_springboot_crud.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tutorials")
public class Tutorial extends BaseEntity{

    String title;
    String description;
    boolean published = false;

    public Tutorial(int id, String title, String description, boolean published) {
        super(id);
        this.title = title;
        this.description = description;
        this.published = published;
    }

    public Tutorial(String title, String description, boolean published) {
        this.title = title;
        this.description = description;
        this.published = published;
    }

    public Tutorial() {

    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }
}
