'use strict'

let AidProvidersController = require('../controllers/AidProvidersController')

module.exports = (app,io) => {

    let ctrl = new AidProvidersController(io)

    app.get('/providers', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/providers/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/providers', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/providers/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    app.delete('/providers/:id', (req, res, next) => {
        return ctrl.delete(req, res, next)
    })

}
