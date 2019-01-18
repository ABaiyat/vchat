# VChat

## A Full Stack Chatroom Application

### Instructions
Clone this repository and run it from an IDE. In the running console, you can run a 
few different commands as the host. Once the application is running, it can be viewed
on port `8080`.

```
http://localhost:8080
```

### Commands
The following commands can be used to interact as a host from the running terminal in
the project directory:

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

#### Clients
Clients who view the site at
```
http://localhost:8080
```
will be prompted to enter a name. After a name is entered, clients will be redirected
to a room list where they can see all of the rooms the host has created. If a room
is created or closed by the host while the client is in this view, they will see these
changes in real time.

When a client connects to a room, every client in the room will be notified of the new
user joining as a message. Similarly, when a client disconnects, every client in the room
will be notified of this user leaving. Clients can also exchange their own messages here.

If clients are in a room that a host closes, those clients will be redirected to the
room list.

#### Tech Stack
The backend of this application was built with `Spring Boot`. `H2` was used
as an in-memory solution for rapid development to persist the rooms that are created
by the host. `WebSocket` and `STOMP` were used for real-time messages.

The frontend was built with `React`, using `semantic-ui-react` for UI components. 
It can be viewed in the following directory:
```
src/main/resources/client
```
