import React from 'react'
import { FaVideo, FaUserPlus } from 'react-icons/fa';
import { MdMenu } from 'react-icons/md';

function ChatHeading({ name, numberOfUsers }) {
    return (
        <div className="chat-header">
            <div className="user-info">
                <div className="user-name"></div>
                <div className="status">
                    <div className="indicator"></div>
                    <span>{numberOfUsers ? numberOfUsers : null}</span>
                </div>
            </div>
            <div className="options">
                <FaVideo></FaVideo>
                <FaUserPlus></FaUserPlus>
                <MdMenu></MdMenu>
            </div>
        </div>
    )
}

export default ChatHeading
