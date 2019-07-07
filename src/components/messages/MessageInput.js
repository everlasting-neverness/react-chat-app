import React, { useState } from 'react';

function MessageInput(props) {
    const { sendMessage, sendTyping } = props;

    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    return (
        <div className='message-input'>
            <form onSubmit={handleSubmit} className='message-form'>
                <input
                    type='text'
                    className='form-control'
                    id='message'
                    value={message}
                    autoComplete={'off'}
                    placeholder='Type something'
                    onKeyUp={e => e.keyCode !== 13 && sendTyping}
                    onChange={e => setMessage(e.target.value)}
                />
                <button className='send' disabled={!message.length}>
                    Send
                </button>
            </form>
        </div>
    );
}

export default MessageInput;
