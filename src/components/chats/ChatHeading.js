import React from 'react';
import { FaVideo, FaUserPlus } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

function ChatHeading({ name, numberOfUsers }) {
    return (
        <div className='chat-header'>
            <div className='user-info'>
                <div className='user-name' />
                <div className='status'>
                    <div className='indicator' />
                    <span>{numberOfUsers ? numberOfUsers : null}</span>
                </div>
            </div>
            <div className='options'>
                <FaVideo />
                <FaUserPlus />
                <MdMenu />
            </div>
        </div>
    );
}

export default ChatHeading;
