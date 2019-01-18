package com.abaiyat.vchatws.listener;

import com.abaiyat.vchatws.io.respository.UserRepository;
import com.abaiyat.vchatws.ui.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {
    @Autowired
    private SimpMessageSendingOperations template;

    @Autowired
    UserRepository userRepository;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {}

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        String roomID = (String) headerAccessor.getSessionAttributes().get("roomID");
        if (username != null) {
            userRepository.deleteByUsername(username);
            Message message = new Message();
            message.setType(Message.MessageType.DISCONNECTED);
            message.setContent(username + " has disconnected");
            message.setSender("HOST-SERVER");
            message.setDate(1001);
            this.template.convertAndSend("/topic/rooms/" + roomID + "/sendMessage", message);
        }
    }
}
