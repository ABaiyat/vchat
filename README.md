# VChat

## A Full Stack Chatroom Application

### Instructions
Clone this repository and run it from an IDE. In the running console, you can run a 
few different commands as the host.

### Commands
The following commands can be used to interact as a host from the project directory:

#### Creating a room:
To create a room clients can connect to and chat in, use the `create-room` command:
```
create-room 'room-number'
```
Example
```
create-room 123
```
Output
```
Room 123 has been created
```

#### Closing a room:
To create a room clients can connect to and chat in, use the `close-room` command:
```
close-room 'room-number'
```
Example
```
close-room 123
```
Output
```
Now closing Room 123
```

#### Listing Open Rooms:
To list out all of the open rooms, use the `list-rooms` command:

Usage
```
list-rooms
```
Output
```
123
2019
902
```