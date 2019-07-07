const io = require('./server').io;

const { createUser, createMessage, createChat } = require('../Factories');
const {
    VERIFY_USER,
    USER_CONNECTED,
    USER_DISCONNECTED,
    LOGOUT,
    COMMUNITY_CHAT,
    MESSAGE_SENT,
    MESSAGE_RECEIVED,
    TYPING
} = require('../Events');

let connectedUsers = [];

let communityChat = createChat();

module.exports = function(socket) {
    console.log(`Socket id: ${socket.id}`);

    let sendMessageToChatFromUser, sendTypingFromUser;

    socket.on(VERIFY_USER, (name, setUserCallback) => {
        if (isUser(connectedUsers, name)) {
            setUserCallback({
                isUser: true,
                user: null
            });
        } else {
            setUserCallback({
                isUser: false,
                user: createUser({ name })
            });
        }
    });

    socket.on(USER_CONNECTED, user => {
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        sendMessageToChatFromUser = sendMessageToChat(user.name);
        sendTypingFromUser = sendTypingToChat(user.name);

        io.emit(USER_CONNECTED, connectedUsers);
    });

    socket.on('disconnect', () => {
        if ('user' in socket) {
            handleUserDeparture(socket);
        }
    });

    socket.on(LOGOUT, () => handleUserDeparture(socket));

    socket.on(COMMUNITY_CHAT, callback => {
        callback(communityChat);
    });

    socket.on(MESSAGE_SENT, ({chatId, message}) => {
        sendMessageToChatFromUser(chatId, message);
    })
};

const addUser = (userList, user) => {
    return [...userList, user];
};

const removeUser = (userList, username) => {
    const newList = [...userList].filter(user => {
        return user.name !== username;
    });
    return newList;
};

const isUser = (userList, username) => {
    if (!username) {
        return true;
    }
    return userList.filter(user => user.name === username).length;
};

const handleUserDeparture = (socket) => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    io.emit(USER_DISCONNECTED, connectedUsers);
}

const sendTypingToChat = user => (chatId, isTyping) => {
    io.emit(`${TYPING}-${chatId}`, { user, isTyping });
};

const sendMessageToChat = sender => (chatId, message) => {
    console.log(sender, chatId, message)
    io.emit(
        `${MESSAGE_RECEIVED}-${chatId}`,
        createMessage({ message, sender })
    );
};
