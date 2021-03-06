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
    username: {
        type: String,
        unique: true
    },
    age: {
        type: Number
    },
    tel : {
      type: Number
    },
    gender: {
        type: String
    },
    password: {
        type: String
    },
    situation: {
        type: String
    },
    emergencyType: {
        type: String
    },
    email: {
        type: String
    },
    lat: {
        type: Number
    },
    lng: {
        type: Number
    },
    messages: {
        type: []
    },
    image: {
        type: String
    }
}, {
    timestamps: true
}))
