package com.abaiyat.vchatws.io.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
public class Room implements Serializable {
    private static final long serialVersionID = 1L;

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private int roomID;

    @Column(nullable = false)
    private long createDate;

    protected Room() {}

    public Room(int roomID) {
        this.roomID = roomID;
        this.createDate = new Date().getTime();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getRoomID() {
        return roomID;
    }

    public void setRoomID(int roomID) {
        this.roomID = roomID;
    }

    public long getCreateDate() {
        return createDate;
    }

    public void setCreateDate(long createDate) {
        this.createDate = createDate;
    }
}
