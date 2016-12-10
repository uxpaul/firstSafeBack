'use strict'

let Controller = require('./Controller')
const AIDREC = require('../models/aidreceivers')
const AIDPRO = require('../models/aidproviders')
const USER = require('../models/users')

class usersController extends Controller {
    constructor(io) {
        super(USER)
        this.io = io
        var numClients = 0;
        this.io.on('connection', (socket) => {
            this._onConnection(socket)
        });

        //my-namespace
        var nsp = io.of('/iller');
        nsp.on('connection', (socket) => {
            console.log(socket.id)
            this._onSpace(socket)
            numClients++;
            nsp.emit('stats', {
                numClients: numClients
            });

            console.log('Connected clients:', numClients);

            socket.on('disconnect', function() {
                numClients--;
                nsp.emit('stats', {
                    numClients: numClients
                });

                console.log('Connected clients:', numClients);
            });

        });
        // nsp.to('iller').emit('hi', 'everyone!');

    }

    _onSpace(socket) {

        socket.on('user', (profession) => {
            console.log(profession)
            profession === 'aidReceiver' ? socket.join('aidReceiver') : socket.join('aidProvider')
        });

        socket.on('emergency', (user) => {
            socket.to('aidProvider').emit('emergency', {
                user: user,
                id: socket.id
            })
        });

        // Traite l'acceptation du medecin et envoie au malade ses infos
        socket.on('accept', (user) => {
            socket.to(user.id).emit('accept', user.user)
        })

    }

    _onConnection(socket) {
        console.log('User connect _onConnection');

        socket.on('authenticate', function(data, callback) {
            socket.auth = false;

            //Data du client
            var name = data.name;
            var password = data.password;

            USER.find({
                name: name
            }, function(err, user) {
                user.forEach((element) => {

                    // auth success/failure
                    if (!(password === element.password && name === element.name))
                        socket.emit('Try again');
                    else {
                        socket.auth = true;
                        socket.emit('authenticated', element.name)
                        console.log("Authenticated socket ", socket.id);
                        console.log(element.profession)

                        if (element.profession === "iller") {
                            socket.join('/iller')
                        } else {
                            socket.join('/Doctor')
                        }

                    }
                })
            });

            setTimeout(function() {
                //If the socket didn't authenticate, disconnect it
                if (!socket.auth) {
                    console.log("Disconnecting socket ", socket.id);
                    socket.emit('Try again');
                    socket.disconnect('unauthorized');
                }
            }, 15000);
        })

        socket.on('pseudo', (user) => {
            user = ent.encode(user);
            console.log(user)
            socket.user = user
            socket.broadcast.emit('pseudo', ` Connection de : ${socket.user}`)

        })


        socket.on('chat message', (message) => {
            message = ent.encode(message);
            console.log(message)
            socket.broadcast.emit('chat message', {
                pseudo: socket.user,
                content: message
            });
        });


    }




    findById(req, res, next) {
        this.model.findById(req.params.id).exec((err, document) => {
            if (err) next(err)
            else res.json(document)
        })
    }

}
module.exports = usersController