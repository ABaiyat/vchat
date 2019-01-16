package com.abaiyat.vchatws.ui.controller;

import com.abaiyat.vchatws.io.entity.Room;
import com.abaiyat.vchatws.io.respository.RoomRepository;
import com.abaiyat.vchatws.ui.model.Greeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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
}
