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
    age : {
      type:Number
    },
    gender : {

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
        tyep: String
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
        type: []
    },
    image: {
        type: String
    }
}, {
    timestamps: true
}))
