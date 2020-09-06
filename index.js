const express = require('express')
const mongoose = require('mongoose')
const libraryRoutes = require('./components/router')
const fs = require("fs")

require('dotenv').config()

const PORT = process.env.PORT

const mongooseConfig = {
    ip: process.env.MONGO_IP,
    port: process.env.MONGO_PORT,
    collection: process.env.DB_COLLECTION_NAME,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD
}

const app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(libraryRoutes)

async function start(){
    try{
        await mongoose.connect(`mongodb://${mongooseConfig.user}:${mongooseConfig.password}@${mongooseConfig.ip}:${mongooseConfig.port}/${mongooseConfig.collection}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, ()=>{
            console.log("Server has been started...")
        })
    }
    catch(e){
        fs.mkdir("logs", ()=>{
            fs.appendFile("logs/error.log", "[" + new Date() + "] - " + e + "\n", () => {
                console.log(String(e))
            })
        })
        
    }
}

start()