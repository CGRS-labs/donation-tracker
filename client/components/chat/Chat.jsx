import React, { useEffect, useState } from "react";
import "./chat.css";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";

export default function Chat() {
  const [chatActive, setChatActive] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [mockMessages, setMockMessages] = useState([
    {
      author: "michael",
      message: "This is a test message",
    },
    {
      author: "Bronx chapter",
      message: "This is a test response",
    },
    {
      author: "michael",
      message: "This is yet another message",
    },
  ]);

  useEffect(() => {
    const chat = document.querySelector(".chat");
    const chatCloseAndChapter = document.querySelector(".chatCloseAndChapter");
    const chatMessages = document.querySelector(".chatMessages");
    const userInput = document.querySelector(".userInput");
    const chatIcon = document.querySelector(".chatIcon");
    const chatButton = document.querySelector(".chatButton");

    if (!chatActive) {
      chat.classList.remove("active");
      chatCloseAndChapter.classList.remove("active");
      chatMessages.classList.remove("active");
      userInput.classList.remove("active");
      chatIcon.style.display = "block";
      chatButton.style.display = "none";
    } else {
      chat.classList.add("active");
      chatCloseAndChapter.classList.add("active");
      chatMessages.classList.add("active");
      userInput.classList.add("active");
      chatIcon.style.display = "none";
      chatButton.style.display = "block";
    }
  }, [chatActive]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage !== "") {
      setMockMessages([
        { author: "michael", message: userMessage },
        ...mockMessages,
      ]);
      setUserMessage("");
    }
  };

  return (
    <div className="chat">
      <div className="chatCloseAndChapter">
        <div className="chatClose" onClick={() => setChatActive(false)}>
          X
        </div>
        <p>Chatting with: Bronx Chapter...</p>
      </div>
      <div className="chatMessages">
        {mockMessages.map((messageObject, index) => (
          <p key={index} className="chatMessage">
            <b>{messageObject.author}</b>: {messageObject.message}
          </p>
        ))}
      </div>
      <ChatIcon
        sx={{ fontSize: "2em", color: "#fff" }}
        onClick={() => setChatActive(true)}
        className="chatIcon"
      />
      <form className="chatForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="userInput"
          placeholder="type your message..."
          onChange={(e) => setUserMessage(e.target.value)}
          value={userMessage}
          autoFocus={true}
        />
        <Button
          className="chatButton"
          variant="contained"
          sx={{ width: "50%", mt: '7px' }}
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  );
}
