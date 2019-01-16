package com.abaiyat.vchatws.shell;

import com.abaiyat.vchatws.io.entity.Room;
import com.abaiyat.vchatws.io.respository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

@ShellComponent
public class HostCommands {

    @Autowired
    public HostCommands() {
    }

    @Autowired
    RoomRepository roomRepository;

    @ShellMethod("Create a room as a host")
    public String createRoom(int roomID) {
        //TODO: Implement logic to create an endpoint with this text

        String roomIDString = Integer.toString(roomID);
        if (roomRepository.existsByRoomID(roomID)) {
            return "Room " + roomIDString + " already exists";
        }
        roomRepository.save(new Room(roomID));
        return "Room " + roomIDString + " has been created";
    }

    @ShellMethod("Close a specific room")
    public String closeRoom(int roomID) {
        String roomIDString = Integer.toString(roomID);
        if (roomRepository.existsByRoomID(roomID)) {
            roomRepository.deleteByRoomID(roomID);
            return "Now closing Room " + roomIDString;
        }
        return "Room " + roomIDString + " does not exist. No changes were made";
    }

    @ShellMethod("Lists out all of the current rooms")
    public String listRooms() {
        StringBuilder stringBuilder = new StringBuilder();
        if (roomRepository.count() == 0) {
            return "There are currently no chat rooms";
        }
        for (Room room :roomRepository.findAll()) {
            stringBuilder.append(room.getRoomID()).append("\n");
        }
        return stringBuilder.toString().trim();
    }
}