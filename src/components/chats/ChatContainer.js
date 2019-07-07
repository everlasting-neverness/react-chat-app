import React, { useState, useEffect } from 'react';

import {
    MESSAGE_SENT,
    MESSAGE_RECEIVED,
    TYPING,
    COMMUNITY_CHAT
} from '../../Events';

import SideBar from './SideBar';
import ChatHeading from './ChatHeading';
import Messages from '../messages/Messages';
import MessageInput from '../messages/MessageInput';

function ChatContainer(props) {
    const { socket, user, logout } = props;

    const [chats, updateChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    const addMessageToChat = chatId => message => {
        debugger
        let newChats = chats.map(chat => {
            if (chat.id === chatId) {
                chat.messages.push(message);
            }
            return chat;
        });
        updateChats(newChats);
    };

    const updateTypingInChat = chatId => {};

    const addChat = (chat, reset) => {
        debugger
        const newChats = reset ? [chat] : [...chats, chat];
        updateChats(newChats);

        const messageEvent = `${MESSAGE_RECEIVED}-${chat.id}`;
        const typingEvent = `${TYPING}-${chat.id}`;

        socket.on(typingEvent);
        socket.on(messageEvent, addMessageToChat(chat.id));
    };

    const resetChat = chat => {
        debugger
        addChat(chat, true)
    };

    const sendMessage = (chatId, message) => {
        socket.emit(MESSAGE_SENT, { chatId, message });
    };

    const sendTyping = (chatId, isTyping) => {
        socket.emit(TYPING, { chatId, isTyping });
    };

    const initChat = () => {
        debugger;
        socket.emit(COMMUNITY_CHAT, resetChat);
    };

    useEffect(() => initChat(), []);

    return (
        <div className='container'>
            <SideBar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
            />
            <div className='chat-container'>
                {activeChat !== null ? (
                    <div className='chat-room'>
                        <ChatHeading name={activeChat.name} />
                        <Messages
                            messages={activeChat.messages}
                            user={user}
                            typingUsers={activeChat.typingUsers}
                        />
                        <MessageInput
                            sendMessage={message =>
                                sendMessage(activeChat.id, message)
                            }
                            sendTyping={isTyping =>
                                sendTyping(activeChat.id, isTyping)
                            }
                        />
                    </div>
                ) : (
                    <div className='chat-room choose'>
                        <h3>Choose a chat</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatContainer;
