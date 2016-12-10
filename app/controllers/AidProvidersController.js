'use strict'

let Controller = require('./Controller')
const AIDREC = require('../models/aidreceivers')
const AIDPRO = require('../models/aidproviders')

class AidProvidersController extends Controller {
    constructor(io) {
        super(AIDPRO)
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

        //    console.log('Connected clients:', numClients);

            socket.on('disconnect', function() {
                numClients--;
                nsp.emit('stats', {
                    numClients: numClients
                });

            //    console.log('Connected clients:', numClients);
            });

        });

    }

    _onSpace(socket) {
        console.log('User connect _onSpace');

        socket.on('user', (profession) => {
            profession === 'aidReceiver' ? socket.join('aidReceiver') : socket.join('aidProvider')
        });

        //
        socket.on('location', (location) => {
            socket.emit('location', location)
            this.location = location
                //  console.log(location)
        })


        // Reception des infos de l'AR et redirection vers l'AP
        socket.on('emergency', (user) => {
          //  console.log(this.location)
            if (this.location) {
                user.lat = this.location.lat
                user.lng = this.location.lng
            }
            socket.to('aidProvider').emit('emergency', {
                user: user,
                id: socket.id
            })
            console.log(`Id de l'aidReceiver : ${socket.id}`)
        });

        // Traite l'acceptation du medecin et envoie au malade ses infos
        socket.on('accept', (user) => {
          console.log(this.location)
          console.log("L'aidProvider qui a accepté est" + user)
          if (this.location) {
              user.user.lat = this.location.lat
              user.user.lng = this.location.lng
          }
            socket.to(user.id).emit('accept', {
            user : user.user,
            id : socket.id
            })
            console.log(`L'id de aidProvider est : ${socket.id}`)
        })

        // Disconnect the selected socket
        socket.on('disconnect me', () => {
            console.log("Disconnected")
            socket.disconnect()
        })

    }

    _onConnection(socket) {

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
    }




    findById(req, res, next) {
        this.model.findById(req.params.id).populate({
            path: 'aidreceivers'
        }).exec((err, document) => {
            if (err) next(err)
            else res.json(document)
        })
    }

}
module.exports = AidProvidersController
