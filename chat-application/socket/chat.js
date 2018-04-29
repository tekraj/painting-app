module.exports = function (io){
    var clients = {};
    io.sockets.on('connection', function (socket) {

        socket.on('add-user', function(data){
            clients[data.username] = {
                "socket": socket.id
            };
            io.sockets.emit('update-online-users',clients);
        });

        socket.on('private-mesage', function(data){

            if (clients[data.username]){
                data.socket = socket.id;
                io.sockets.connected[clients[data.username].socket].emit("new-message", data);
            } else {

            }
        });

        //Removing the socket on disconnect
        socket.on('disconnect', function() {
            var client = '';
            for(var name in clients) {
                if(clients[name].socket === socket.id) {
                    delete clients[name];
                    break;
                }
            }
            io.sockets.emit('user-disconnect',socket.id);
        })

    });


};


