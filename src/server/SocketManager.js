const io = require('./server').io;

const { createUser, createMessage, createChat } = require('../Factories');
const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT } = require('../Events');

let connectedUsers = [];

module.exports = function(socket) {
    console.log(`Socket id: ${socket.id}`);

    socket.on(VERIFY_USER, (name, setUserCallback) => {
        if (isUser(connectedUsers, name)) {
            setUserCallback({
                isUser: true,
                user: null
            });
        } else {
            setUserCallback({
                isUser: false,
                user: createUser({name})
            })
        }
    })

    socket.on(USER_CONNECTED, user => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;
        io.emit(USER_CONNECTED, connectedUsers);
    })

};

const addUser = (userList, user) => {
    return [ ...userList, user ];
}

const removeUser = (userList, username) => {
    const newList = [ ...userList ];
    newList.filter(user => user.name !== username);
    return newList;
}

const isUser = (userList, username) => {
    console.log(userList, username);
    if (!username) {
        return true;
    }
    return userList.filter(user => user.name === username).length;
}