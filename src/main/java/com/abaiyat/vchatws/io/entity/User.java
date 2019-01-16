package com.abaiyat.vchatws.io.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

public class User implements Serializable {
    private static final long serialVersionID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private int username;

    public User(int username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getUsername() {
        return username;
    }

    public void setUsername(int username) {
        this.username = username;
    }
}
