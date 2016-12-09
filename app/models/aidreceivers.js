'use strict'

let mongoose = require('mongoose')

module.exports = mongoose.model('Receivers', new mongoose.Schema({

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
        type: Number,
        unique: true
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
    },
    aidproviders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Providers'
    }]
  }, {
      timestamps: true
  }))
