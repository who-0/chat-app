const express = require('express')
const jwt = require('jsonwebtoken')
const { COOKIE_ACCESS , COOKIE_REFRESH } = process.env;
const refresRouter = express.Router();

refresRouter.get('/',(req,res)=>{
    const { refreshToken } = req.cookies;
    if(!refreshToken){
        return res.status(400).json({
            error:'You refresh token not found'
        })
    }else{
        jwt.verify(refreshToken,COOKIE_REFRESH,(error,result)=>{
            if(error){
                return res.status(400).json({
                    error:'You refresh token is not verify.'
                })
            }else{
                const {id,email} = result;
                const accessToken = jwt.sign({id,email},COOKIE_ACCESS ,{expiresIn:'1d'})
                const refreshToken = jwt.sign({id,email},COOKIE_REFRESH )
                res.cookie('accessToken',accessToken,{httpOnly:true})
                res.cookie('refreshToken',refreshToken);
                res.redirect('/')
            }
        })
    }
})

module.exports = refresRouter