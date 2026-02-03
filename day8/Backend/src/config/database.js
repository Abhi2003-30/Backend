const mongoose = require('mongoose')

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connnected to DataBase')
    })
}

module.exports = connectToDB