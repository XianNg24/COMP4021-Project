const Socket = (function() {
    // This stores the current Socket.IO socket
    let socket = null;

    // This function gets the socket from the module
    const getSocket = function() {
        return socket;
    };

    // This function connects the server and initializes the socket
    const connect = function() {
        socket = io();

        // Wait for the socket to connect successfully
        socket.on("connect", () => {
            // Get the online user list
            socket.emit("get users");

            // Get the chatroom messages
            // socket.emit("get messages");

            // Get leaderboard score
            socket.emit("get scores")
        });

        // Set up the users event
        socket.on("users", (onlineUsers) => {
            onlineUsers = JSON.parse(onlineUsers);

            // Show the online users
            OnlineUsersStatus.update(onlineUsers);
        });

        // Set up the add user event
        socket.on("add user", (user) => {
            user = JSON.parse(user);

            // Add the online user
            OnlineUsersStatus.addUser(user);
        });

        // Set up the scores event
        socket.on("scores", (leaderboard) => {
            leaderboard = JSON.parse(leaderboard);

            // Show the chatroom messages
            BoardPanel.update(leaderboard);
        });


         // Set up the add message event
         socket.on("add scores", (message) => {
            message = JSON.parse(message);

            // Add the message to the chatroom
            BoardPanel.addScores(message);
        });

        socket.on("initiate player move", (message) => {

            message = JSON.parse(message);
            // Add the message to the chatroom
            GamePanel.initiatePlayerMove(message.type, message.onlineUsers);
        });

        socket.on("initiate player stop", (message) => {

            message = JSON.parse(message);
            // Add the message to the chatroom
            GamePanel.initiatePlayerStop(message.type, message.onlineUsers);
        });

        socket.on("initiate player attack start", (message) => {

            message = JSON.parse(message);
            // Add the message to the chatroom
            GamePanel.initiatePlayerAttackStart(message.type, message.onlineUsers);
        });

        socket.on("initiate player attack stop", (message) => {

            message = JSON.parse(message);
            // Add the message to the chatroom
            GamePanel.initiatePlayerAttackStop(message.type, message.onlineUsers);
        });

        socket.on("check game start", (message) => {

            message = JSON.parse(message);
            // Add the message to the chatroom
            GamePanel.checkGameStart(message);
        });

    };

    // This function disconnects the socket from the server
    const disconnect = function() {
        socket.disconnect();
        socket = null;
    };

    // This function sends a post message event to the server
    const postMessage = function(content) {
        if (socket && socket.connected) {
            socket.emit("post message", content);
        }
    };

    // This function sends a post message event to the server
    const postScores = function(content) {
        if (socket && socket.connected) {
            socket.emit("post scores", content);
        }
    };

    const typeEvent = function(){
        if (socket && socket.connected) {
            socket.emit("typing");
        }
    }

    const playerMoveEvent = function(type){
        if (socket && socket.connected) {
            socket.emit("player move", type);
        }
    }

    const playerStopEvent = function(type){
        if (socket && socket.connected) {
            socket.emit("player stop", type);
        }
    }

    const playerAttackStartEvent = function(type){
        if (socket && socket.connected) {
            socket.emit("player attack start", type);
        }
    }

    const playerAttackStopEvent = function(type){
        if (socket && socket.connected) {
            socket.emit("player attack stop", type);
        }
    }

    const GameStartEvent = function(){
        if (socket && socket.connected) {
            socket.emit("game start");
        }
    }

    return { getSocket, connect, disconnect, postMessage, typeEvent, playerMoveEvent, playerStopEvent, 
        playerAttackStartEvent, playerAttackStopEvent, GameStartEvent, postScores};
})();
