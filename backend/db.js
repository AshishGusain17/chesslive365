const express = require('express');
const mongoose = require('mongoose');
const creds = require('./Credentials_Save.json');


const connectToMongoose = () =>{
    mongoose.connect(creds.MONGO_URL, ()=>{
        console.log('mongoose connected');
    })    
}

module.exports = connectToMongoose;