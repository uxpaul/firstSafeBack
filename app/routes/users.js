'use strict'

let usersController = require('../controllers/usersController')
let auth = require('../middlewares/authorization')

module.exports = (app, io) => {

    let ctrl = new usersController(io)

    app.post('/admin', ctrl.connect)


    app.get('/users', auth.user.isAuthenticate, (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/users/:username', auth.user.isAuthenticate, (req, res, next) => {
        return ctrl.findOne(req, res, next)
    })

    app.get('/users/:id', auth.user.isAuthenticate, (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/users', (req, res, next) => {
        return ctrl.create(req, res, next)
    })


    app.put('/users/:id', auth.user.isAuthenticate, (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    app.delete('/users/:id', auth.user.isAuthenticate, (req, res, next) => {
        return ctrl.delete(req, res, next)
    })

}
