const express = require('express');
const mongoose = require('mongoose');
// const creds = require('./Credentials_Save.json');
require('dotenv').config();

const connectToMongoose = () =>{
    mongoose.connect(process.env.MONGO_URL, ()=>{
        console.log('mongoose connected');
    })    
}

module.exports = connectToMongoose;
