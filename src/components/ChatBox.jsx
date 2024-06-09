import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase";
import { ref, push, onValue, remove, set } from "firebase/database";
import "../css/ChatBox.css";

//Creates the chatbox, controls the new messages and the already existing ones
//Handles the delete functionality aswell
function Chatbox({ currentUser }) {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    const messageRef = ref(db, "messages");

    onValue(messageRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setChatHistory(loadedMessages);
    });
  }, []);

  async function sendMessage(event) {
    event.preventDefault();
    if (currentMessage.trim() !== "") {
      try {
        const username = currentUser.email.split("@")[0];
        const messageRef = ref(db, "messages");
        const newMessageRef = push(messageRef);
        await set(newMessageRef, {
          text: currentMessage,
          user: username,
          userId: currentUser.uid,
        });
        setCurrentMessage("");
        setMessageError("");
      } catch (error) {
        setMessageError("Something went wrong while adding the message");
        console.error(error);
      }
    }
  }

  async function removeMessage(messageId) {
    try {
      const specificMessageRef = ref(db, `messages/${messageId}`);
      await remove(specificMessageRef);
      setMessageError("");
    } catch (error) {
      setMessageError("Something went wrong while deleting the message");
      console.error(error);
    }
  }

  return (
    <div className="chatbox">
      <h2>Important notes</h2>
      {messageError && <p className="error">{messageError}</p>}
      <div className="messages">
        {chatHistory.map((message) => (
          <div key={message.id} className="message">
            <p>
              <strong>{message.user}:</strong> {message.text}
            </p>
            {currentUser.uid === message.userId && (
              <button onClick={() => removeMessage(message.id)}>Delete</button>
            )}
          </div>
        ))}
      </div>
      <div className="new-message">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chatbox;