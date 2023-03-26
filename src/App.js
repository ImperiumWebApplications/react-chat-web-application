import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setMessages((messages) => [...messages, msg]);
    };
    socket.on("message", handleNewMessage);

    // Cleanup the event listener
    return () => {
      socket.off("message", handleNewMessage);
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <Container maxWidth="sm">
      <List>
        {messages.map((msg, i) => (
          <ListItem key={i}>
            <ListItemText primary={msg} />
          </ListItem>
        ))}
      </List>
      <form onSubmit={sendMessage}>
        <TextField
          label="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
}

export default App;
