import React from 'react';
import { FaChevronDown, FaListUl, FaSearch } from 'react-icons/fa';
import { MdEject } from 'react-icons/md';

function SideBar(props) {
    const { title, logout, chats, user, activeChat, setActiveChat } = props;
    return (
        <div id='side-bar'>
            <div className='heading'>
                <div className='app-name'>
                    {title} <FaChevronDown />
                </div>
                <div className='menu'>
                    <FaListUl />
                </div>
            </div>
            <div className='search'>
                <i className='search-icon'>
                    <FaSearch />
                </i>
                <input placeholder='Search' type='text' />
                <div className='plus' />
            </div>
            <div
                className='users'
                onClick={e => {
                    
                }}
            >
                {chats.map(chat => {
                    if (chat.name) {
                        const lastMessage =
                            chat.messages[chat.messages.length - 1];
                        const currentUser = chat.users.find(({ name }) => {
                            return name !== user.name;
                        }) || { name: 'Community' };
                        const classNames =
                            activeChat && activeChat.id === chat.id
                                ? 'active'
                                : '';

                        return (
                            <div
                                key={chat.id}
                                className={`user ${classNames}`}
                                onClick={() => {
                                    setActiveChat(chat);
                                }}
                            >
                                <div className='user-photo'>
                                    {user.name[0].toUpperCase()}
                                </div>
                                <div className='user-info'>
                                    <div className='name'>{user.name}</div>
                                    {lastMessage && (
                                        <div className='last-message'>
                                            {lastMessage.message}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
            <div className='current-user'>
                <span>{user.name}</span>
                <div
                    onClick={() => {
                        logout();
                    }}
                    title='Logout'
                    className='logout'
                >
                    <MdEject />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
