'use strict'

let mongoose = require('mongoose')

module.exports = mongoose.model('User', new mongoose.Schema({

  nom: {
      type: String,
      unique: true
  },
  prenom: {
      type: String
  },
  password : {
    type: String
  },
  situation: {
      type: String
  },
  tel: {
      type: Number
  },
  lat: {
      type: Number,
      unique: true
  },
  lng: {
      type: Number,
      unique: true
  },
  messages: {
    type : []
  }
}, {
    timestamps: true
}))
