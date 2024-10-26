import React, { useState } from "react";
import axios from "axios";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput) return;

    const userMessage = { sender: "user", text: userInput };
    setMessages([...messages, userMessage]);

    const response = await axios.post("http://localhost:3000/api/ask", {
      question: userInput,
    });

    const botMessage = { sender: "bot", text: response.data.answer };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setUserInput("");
  };

  return (
    <div className="chatbot">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatBot;
