'use strict'

let jwt = require('jsonwebtoken')
let Controller = require('./Controller')
const USER = require('../models/users')


class usersController extends Controller {
    constructor(io) {
        super(USER)
      }


      findOne(req,res,next) {
        let username = req.params.username
        console.log(username)
        this.model.find({'username' : username},(err, document)=>{
          if(err) next(err)
          else res.json(document)
        })
      }

    findById(req, res, next) {
        this.model.findById(req.params.id).exec((err, document) => {
            if (err) next(err)
            else res.json(document)
        })
      }


}
module.exports = usersController
