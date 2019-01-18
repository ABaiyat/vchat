package com.abaiyat.vchatws.ui.controller;

import com.abaiyat.vchatws.io.entity.Room;
import com.abaiyat.vchatws.io.respository.RoomRepository;
import com.abaiyat.vchatws.ui.model.Message;
import com.abaiyat.vchatws.ui.model.WelcomeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RoomController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    RoomRepository roomRepository;

    @MessageMapping("/rooms")
    public void listRooms() throws Exception {
        Thread.sleep(10); //Simulated Delay
        StringBuilder stringBuilder = new StringBuilder();
        for (Room room :roomRepository.findAll()) {
            stringBuilder.append(room.getRoomID()).append("\n");
        }
        this.template.convertAndSend("/topic/rooms", stringBuilder.toString().trim());
    }

    @MessageMapping("/rooms/{roomID}")
    public void getRoom(@DestinationVariable("roomID") String roomID,
                        SimpMessageHeaderAccessor headerAccessor,
                        WelcomeMessage welcomeMessage) {
        if (!roomRepository.existsByRoomID(Integer.parseInt(roomID))) {
            this.template.convertAndSend("/topic/rooms/" + roomID, "THIS ROOM DOES NOT EXIST");
        } else {
            headerAccessor.getSessionAttributes().put("username", welcomeMessage.getName());
            headerAccessor.getSessionAttributes().put("roomID", roomID);
            Message message = new Message();
            message.setType(Message.MessageType.CONNECTED);
            message.setContent(welcomeMessage.getName() + " has joined the chatroom");
            message.setSender("HOST-SERVER");
            message.setDate(1001);
            this.template.convertAndSend("/topic/rooms/" + roomID, message);
        }
    }

    @MessageMapping("/rooms/{roomID}/sendMessage")
    public void sendMessage(@DestinationVariable("roomID") String roomID,
                            @Payload Message message) {
        this.template.convertAndSend("/topic/rooms/" + roomID + "/sendMessage", message);
    }
}
