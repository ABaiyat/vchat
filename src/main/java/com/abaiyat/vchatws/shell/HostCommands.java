package com.abaiyat.vchatws.shell;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.shell.standard.ShellComponent;
import org.springframework.shell.standard.ShellMethod;
import org.springframework.shell.standard.ShellOption;

@ShellComponent
public class HostCommands {

    @Autowired
    public HostCommands() {
    }

    @ShellMethod("Create a room as a host")
    public String createRoom(String text) {
        return "A room has been created";
    }

    @ShellMethod("Close a specific room")
    public String closeRoom(String text) {
        return "Room " + text + " will now close";
    }

    @ShellMethod("List out all of the current rooms")
    public String listRooms() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Here is a list of all open rooms:\n");
        stringBuilder.append("1\n");
        stringBuilder.append("2\n");
        stringBuilder.append("3");
        return stringBuilder.toString();
    }
}