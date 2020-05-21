const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Models
const User = require('../models/User')

router.get('/', (req, res, next) => {

})

router.post('/register', (req, res, next) => {
     const { username, password } = req.body

     bcrypt.hash(password, 10).then((hash) => { // promise yapılı
          const user = new User({
               username,  // ES6 ya göre username = username password = password şeklindedir.
               password:hash // hashlenmiş şifre artık gelmeli bu kısma onu kaydetmeli onun için onu verioyruz
          })
          const promise = user.save()
          promise.then((data) => {
               res.json(data)
          }).catch((err) => {
               res.json(err)
          })
     })

})

router.post('/authenticate',(req,res,next)=>{
     const { username, password} = req.body
     User.findOne({
          username
     },(err,user)=>{
          if(err) throw err;
          if(!user){
               res.json({
                    status:false,
                    message: 'Authentication failed, user not found.'
               })
          }else {
               bcrypt.compare(password,user.password).then((result)=>{
                    if(!result){
                         res.json({
                              status:false,
                              message: 'Authentication failed, wrong password'
                         })
                    }else{
                         const payload = {
                              username
                         };
                         const token = jwt.sign(payload,req.app.get('api_secret_key'), {
                            expiresIn : 720 // 12 saat  
                         })
                         res.json(token)

                    }
               })
          }
     })
})

module.exports = router;