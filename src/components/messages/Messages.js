import React, { useEffect } from 'react';

function Messages({ messages, user, typingUsers }) {
    console.log(messages);
    let container = React.createRef();

    const scrollDown = () => {
        container.scrollTop = container.scrollHeight;
    };

    useEffect(() => scrollDown(), []);

    return (
        <div
            ref={el => {
                container = el;
            }}
            className='thread-container'
        >
            <div className='thread'>
                {messages.map((mes, i) => (
                    <div
                        key={mes.id}
                        className={`message-container ${mes.sender ===
                            user.name && 'right'}`}
                    >
                        <div className='time'>{mes.time}</div>
                        <div className='data'>
                            <div className='message'>{mes.message}</div>
                            <div className='name'>{mes.sender}</div>
                        </div>
                    </div>
                ))}
                {typingUsers.map(name => (
                    <div key={name} className='typing-user'>
                        {`${name} is typing . . .`}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Messages;
