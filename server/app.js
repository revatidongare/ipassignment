const express = require('express')
const app = express()
// const cors = require('cors')
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')


// mongoose.connect('mongodb+srv://coderbee:8108@Reva@cluster0.lboes.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology:true })
// app.use(express.urlencoded({extended:true}))
// app.use(cors())

// app.use('/api', require('./routes/index'))
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedToplogy: true
})
mongoose.connection.on('connected',()=>{
    console.log("connected")
})

mongoose.connection.on('error',(err)=>{
    console.log("error",err)
})


require('./models/user')
require('./models/post')

app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(4000, () => {
    console.log('listening on app 4000');
    });
