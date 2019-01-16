package com.abaiyat.vchatws.ui.controller;

import com.abaiyat.vchatws.io.entity.User;
import com.abaiyat.vchatws.io.respository.UserRepository;
import com.abaiyat.vchatws.ui.model.Greeting;
import com.abaiyat.vchatws.ui.model.WelcomeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @Autowired
    UserRepository userRepository;

    @MessageMapping("/welcome")
    @SendTo("/topic/greetings")
    public Greeting addUser(WelcomeMessage message,
                            SimpMessageHeaderAccessor headerAccessor) throws Exception {
        userRepository.save(new User(message.getName()));
        headerAccessor.getSessionAttributes().put("username", message.getName());
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }
}
