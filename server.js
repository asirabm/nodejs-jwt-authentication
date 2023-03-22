const express=require('express')
const app=express()
const jwt = require('jsonwebtoken')
app.use(express.json())
const users=[
    {
    name:'Asir'
    },
    {
    name:'Aazir'
    }
]


app.post('/user',(req,res)=>{
    const u1={name:req.body.name}
    users.push(u1)
    res.sendStatus(201).send()

})
app.get('/users',Authentication,(req,res)=>{
    console.log(req.user)
    res.json(req.user)
})
app.post('/login',(req,res)=>{
    //auth
    const u1={name:req.body.name}
    const token = jwt.sign(u1, 'asirsnakcnaskksalkcnlaksnclk')
    res.json({token:token})
})

function Authentication(req,res,next){
   const authHeder=req.headers['auth']
   const token=authHeder && authHeder.split(' ')[1]
   if(token==null) return res.sendStatus(401)

   jwt.verify(token,'asirsnakcnaskksalkcnlaksnclk',(err,user)=>{
    if(err) return res.sendStatus(403)
    req.user=user
    next()
   })
   
   
}


app.listen(4000)