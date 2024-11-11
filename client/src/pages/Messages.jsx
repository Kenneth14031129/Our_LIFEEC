import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header.jsx";
import "../styles/Messages.css";

// Utility function to generate a color based on the first letter of the contact's name
const getAvatarColor = (name) => {
    if (name === "Nurse") return "#000000"; // Black color for Nurse
    if (name === "Family of the Resident") return "#32CD32"; // Green for Family of the Resident
    return "#FF69B4"; // Pink for Nutritionist
};

const Messages = () => {
    const [contacts] = useState([
        { id: 1, name: "Nutritionist", message: "Please review the diet plan.", time: "10:00 AM" },
        { id: 2, name: "Family of the Resident", message: "How is the patient doing?", time: "9:45 AM" },
        { id: 3, name: "Nurse", message: "Medication has been given.", time: "9:30 AM" }
    ]);

    const [selectedContact, setSelectedContact] = useState(contacts[2]); // Start with Nurse as selected
    const [messages, setMessages] = useState([
        { id: 1, sender: "Nurse", text: "The medication was administered at 9 AM.", time: "9:30 AM" },
        { id: 2, sender: "me", text: "Thank you for the update.", time: "9:32 AM" }
    ]);
    const [newMessage, setNewMessage] = useState("");

    const chatMessagesRef = useRef(null);

    // Scroll to the bottom when messages change
    useEffect(() => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    }, [messages]);

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
        // Dynamically load messages based on the selected contact
        if (contact.name === "Nurse") {
            setMessages([
                { id: 1, sender: "Nurse", text: "The medication was administered at 9 AM.", time: "9:30 AM" },
                { id: 2, sender: "me", text: "Thank you for the update.", time: "9:32 AM" }
            ]);
        } else if (contact.name === "Nutritionist") {
            setMessages([
                { id: 1, sender: "Nutritionist", text: "Please ensure the patient follows the new diet.", time: "10:00 AM" },
                { id: 2, sender: "me", text: "Sure, I'll communicate that to the staff.", time: "10:01 AM" }
            ]);
        } else if (contact.name === "Family of the Resident") {
            setMessages([
                { id: 1, sender: "Family of the Resident", text: "How is the patient doing today?", time: "9:45 AM" },
                { id: 2, sender: "me", text: "The patient is doing better, thanks for asking.", time: "9:46 AM" }
            ]);
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                id: messages.length + 1,
                sender: "me",
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMsg]);
            setNewMessage("");
        }
    };

    return (
        <div className="messages-container">
            <Header />
            <div className="messages-body">
                <aside className="sidebar">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-bar"
                    />
                    <ul className="contact-list">
                        {contacts.map(contact => (
                            <li
                                key={contact.id}
                                className={`contact-item ${selectedContact && selectedContact.id === contact.id ? 'active' : ''}`}
                                onClick={() => handleContactClick(contact)}
                            >
                                <div className="contact-avatar" style={{ backgroundColor: getAvatarColor(contact.name) }}>
                                    {contact.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="contact-details">
                                    <div className="contact-name">{contact.name}</div>
                                    <div className="contact-message">{contact.message}</div>
                                </div>
                                <div className="contact-time">{contact.time}</div>
                            </li>
                        ))}
                    </ul>
                    <button className="add-contact-btn">+</button>
                </aside>
                <main className="message-content">
                    {selectedContact ? (
                        <>
                            <div className="chat-header">
                                <div className="chat-avatar" style={{ backgroundColor: getAvatarColor(selectedContact.name) }}>
                                    {selectedContact.name.charAt(0).toUpperCase()}
                                </div>
                                <h2>{selectedContact.name}</h2>
                                <div className="chat-actions">
                                    <button className="call-btn">📞</button>
                                    <button className="video-call-btn">📹</button>
                                    <button className="delete-btn">🗑️</button>
                                </div>
                            </div>
                            <div className="chat-messages" ref={chatMessagesRef}>
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`chat-bubble ${msg.sender === 'me' ? 'right' : 'left'}`}>
                                        <div className="chat-text">
                                            {msg.text}
                                        </div>
                                        <div className="chat-time">{msg.time}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="message-input">
                            <button className="file-btn">📎</button> {/* File send button */}
                            <input
                                type="text"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button onClick={handleSendMessage}>Send</button>
                        </div>
                        </>
                    ) : (
                        <h2>Select a contact to view messages</h2>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Messages;
