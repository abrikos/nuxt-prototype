import express from "express";
import * as dotenv from 'dotenv';
import {json} from "body-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import Controllers from "./controllers";
import * as Models from "./models";
import passport from "passport";
const session = require( "express-session");
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();
app.use(cookieParser());
const fileUpload = require('express-fileupload');
app.use(fileUpload())

const fileStoreOptions = {};
app.use(json({limit:'200mb'}));
app.set('trust proxy', 1)
app.use(passport.initialize())
app.use(session({
  secret: 'fdsdfs&%dfsd',
  name: 'secretname',
  cookie: {
    maxAge: 360000000 // Time is in miliseconds
  },
  saveUninitialized: true,
  store: new MongoStore({mongoUrl: process.env.MONGODB_URI}),
  // store: new FileStore(fileStoreOptions),
  resave: true,
}));
app.use(passport.session())
const port = process.env.SERVER_PORT; // default port to listen

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connect MongoDB:', process.env.MONGODB_URI)
    })
    .catch(e => {
        console.log('Mongoose error:', e.message)
    })

//Attach models
app.set("Models",Models)

//Attach controllers
for(const controller of Controllers){
    controller(app)
}

app.use(function(req, res) {
    res.status(404).send('404 Not found');
});

app.use(session({
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    secret: 'HYYD%$#',
    resave: false,
    saveUninitialized: false
}))

// start the express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
