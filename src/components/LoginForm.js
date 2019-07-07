import React, { useState } from 'react';

import { VERIFY_USER } from '../Events';

function LoginForm(props) {
    const { socket, setUser, name, setUserName } = props;

    const [error, setError] = useState('');

    const setUserHandler = ({ user, isUser }) => {
        if (isUser) {
            setError('Username is already taken');
            return false;
        }
        setError('');
        setUser(user);
    };

    const handleSubmit = e => {
        e.preventDefault();
        socket.emit(VERIFY_USER, name, setUserHandler);
    };

    const handleChange = e => {
        setUserName(e.target.value);
    };

    return (
        <div className='login'>
            <form onSubmit={handleSubmit} className='login-form'>
                <label htmlFor='name'>
                    <h2>Got a nickname?</h2>
                    <input
                        type='text'
                        id='name'
                        value={name}
                        onChange={handleChange}
                        placeholder={'Default Nickname'}
                    />
                    <div className='error'>{error && error}</div>
                </label>
            </form>
        </div>
    );
}

export default LoginForm;
