'use strict'

let jwt = require('jsonwebtoken')
let Controller = require('./Controller')
const USER = require('../models/users')
class usersController extends Controller {
    constructor(io) {
        super(USER)
      }

      connect(req, res, next) {
          if (!req.body.nom ||  !req.body.password) {
              res.status(400).send("Please enter your email and password")
          } else {
              USER.findOne(req.body, {
                  password: 0
              }, (err, user) => {
                  if (err)
                      next(err)
                  else if (!user)
                      res.sendStatus(403)
                  else {
                      let token = jwt.sign(user, ENV.token, {
                          expiresIn: "24h"
                      })

                      res.json({
                          success: true,
                          user: user,
                          token: token
                      })

                  }
              })
          }
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
