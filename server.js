const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()


const app = express()


app.use(express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//Routes
app.get('/', (req, res)=>{
    res.status(200).json("Git Integration")
})

const pull = require('./backend/src/routes/pullRequest.router')
app.use('/pull', pull);


//Connection with DB
passwordMongoDB = process.env.PASSWORD_MONGO_DB
userMongoDB = encodeURIComponent(process.env.USER_MONGO_DB)

mongoose
    .connect(`mongodb+srv://${userMongoDB}:${passwordMongoDB}@app-onboarding.mfeolue.mongodb.net/gitGeolabor?retryWrites=true&w=majority`)
    .then(()=> {
        console.log("Conectado ao MongoDB!")
        app.listen(5000)
    })
    .catch((error) => console.log(error))


