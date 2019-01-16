package com.abaiyat.vchatws.ui.model;

public class Message {
    private String sender;
    private String content;
    private long date;
    private MessageType type;

    public enum MessageType {
        CONNECTED,
        DISCONNECTED,
        SENT
    }

    public MessageType getType() {
        return type;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getDate() {
        return date;
    }

    public void setDate(long date) {
        this.date = date;
    }
}
