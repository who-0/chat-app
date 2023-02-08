const express = require("express");
const homeRouter = require("./home.router");
const loginRouter = require("./login.router");
const refresRouter = require("./refresh.router");
const signinRouter = require("./signin.router");
const api = express.Router();

api.use("/", homeRouter);
api.use('/refresh',refresRouter)
api.use("/signin", signinRouter);
api.use("/login", loginRouter);
api.get('/*',(req,res)=>{
    res.status(400).json({
        error:'You request is not defined.'
    })
})

module.exports = api;
