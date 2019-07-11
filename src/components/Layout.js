import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import { USER_CONNECTED, LOGOUT } from '../Events';

import LoginForm from './LoginForm';
import ChatContainer from './chats/ChatContainer';

function Layout(props) {
    const { title } = props;

    const [socket, setSocket] = useState(null);
    const [user, setUserToState] = useState(null);
    const [name, setUserName] = useState('');

    const initSocket = () => {
        const socket = io('http://localhost:4037');
        socket.on('connect', () => console.log('Connected'));
        setSocket(socket);
    };

    useEffect(() => initSocket(), []);

    const setUser = user => {
        socket.emit(USER_CONNECTED, user);
        setUserToState(user);
    };

    const logout = () => {
        socket.emit(LOGOUT);
        setUserToState(null);
    };

    return (
        <div className='container'>
            {!user ? (
                <LoginForm
                    socket={socket}
                    setUser={setUser}
                    name={name}
                    setUserName={setUserName}
                />
            ) : (
                <ChatContainer
                    socket={socket}
                    user={user}
                    logout={logout}
                    title={title}
                />
            )}
        </div>
    );
}

export default Layout;
