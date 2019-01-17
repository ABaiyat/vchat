package com.abaiyat.vchatws.shell;

import com.abaiyat.vchatws.io.entity.Room;
import com.abaiyat.vchatws.io.respository.RoomRepository;
import com.abaiyat.vchatws.ui.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
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

    @Autowired
    private SimpMessagingTemplate template;

    @ShellMethod("Create a room as a host")
    public String createRoom(int roomID) {
        //TODO: Implement logic to create an endpoint with this text

        String roomIDString = Integer.toString(roomID);
        if (roomRepository.existsByRoomID(roomID)) {
            return "Room " + roomIDString + " already exists";
        }
        roomRepository.save(new Room(roomID));

        String rooms = this.listRooms();
        template.convertAndSend("/topic/rooms", rooms);

        return "Room " + roomIDString + " has been created";
    }

    @ShellMethod("Close a specific room")
    public String closeRoom(int roomID) {
        String roomIDString = Integer.toString(roomID);
        if (roomRepository.existsByRoomID(roomID)) {
            roomRepository.deleteByRoomID(roomID);
            String rooms = this.listRooms();
            if (roomRepository.count() == 0) {
                template.convertAndSend("/topic/rooms", "");
            } else {
                template.convertAndSend("/topic/rooms", rooms);
            }
            Message message = new Message();
            message.setType(Message.MessageType.CLOSE);
            message.setContent("The HOST has closed the room. Redirecting you to the rooms list");
            message.setSender("HOST-SERVER");
            message.setDate(1001);
            template.convertAndSend("/topic/rooms/" + roomID, message);
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
        for (Room room : roomRepository.findAll()) {
            stringBuilder.append(room.getRoomID()).append("\n");
        }
        return stringBuilder.toString().trim();
    }
}