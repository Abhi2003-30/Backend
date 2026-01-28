const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDb () {
    mongoose.connect(
      "connection string",
    ).then(()=>{
        console.log("Connected to DataBase")
    })
}
connectToDb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
    
})