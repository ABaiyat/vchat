package com.abaiyat.vchatws.ui.controller;

import com.abaiyat.vchatws.ui.model.Greeting;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class RoomController {
    @MessageMapping("/rooms/{roomID}")
    @SendTo("/topic/rooms")
    public Greeting listRooms(@DestinationVariable("roomID") String roomID) throws Exception {
        Thread.sleep(10); //Simulated Delay
        return new Greeting("A new room has been created with id: " + roomID);
    }
}
