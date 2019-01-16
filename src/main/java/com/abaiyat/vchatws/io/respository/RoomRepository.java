package com.abaiyat.vchatws.io.respository;

import com.abaiyat.vchatws.io.entity.Room;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface RoomRepository extends CrudRepository<Room, Long> {
    List<Room> findByRoomID(int roomID);
    boolean existsByRoomID(int roomID);

    @Transactional
    void deleteByRoomID(int roomID);
}
