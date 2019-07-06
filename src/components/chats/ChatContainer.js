import React, { useState } from 'react';

import SideBar from './SideBar';

function ChatContainer(props) {
    const { socket, user, logout } = props;

    const [chats, updateChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);

    return (
        <div className='container'>
            <SideBar
                logout={logout}
                chats={chats}
                user={user}
                activeChat={activeChat}
                setActiveChat={setActiveChat}
            />
        </div>
    );
}

export default ChatContainer;
