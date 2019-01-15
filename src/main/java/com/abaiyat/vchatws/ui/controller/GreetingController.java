package com.abaiyat.vchatws.ui.controller;

import com.abaiyat.vchatws.ui.model.Greeting;
import com.abaiyat.vchatws.ui.model.WelcomeMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @MessageMapping("/welcome")
    @SendTo("/topic/greetings")
    public Greeting greeting(WelcomeMessage message) throws Exception {
        Thread.sleep(1000); //Simulated Delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }
}
