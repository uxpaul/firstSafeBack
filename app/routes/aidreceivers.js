'use strict'

let AidReceiversController = require('../controllers/AidReceiversController')

module.exports = (app, io) => {

    let ctrl = new AidReceiversController(io)

    app.get('/receivers', (req, res, next) => {
        return ctrl.find(req, res, next)
    })

    app.get('/receivers/:id', (req, res, next) => {
        return ctrl.findById(req, res, next)
    })

    app.post('/receivers', (req, res, next) => {
        return ctrl.create(req, res, next)
    })

    app.put('/receivers/:id', (req, res, next) => {
        return ctrl.update(req, res, next)
    })

    app.delete('/receivers/:id', (req, res, next) => {
        return ctrl.delete(req, res, next)
    })

}
