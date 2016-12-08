'use strict'

let mongoose = require('mongoose')

module.exports = mongoose.model('Providers', new mongoose.Schema({

  nom: {
      type: String
  },
  prenom: {
      type: String
  },
  password : {
    type: String
  },
  pseudo: {
      type: Number,
      unique: true
  },
  tel: {
      type: Number,
      unique: true
  },
  lat: {
      type: Number
  },
  lng: {
      type: Number
  },
  messages: {
    type : []
  },
  aidreceivers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receivers'
  }]
}, {
    timestamps: true
}))
