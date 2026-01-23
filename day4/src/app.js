// server create krna
// server ko config krna

const express = require("express");

const app = express();

app.use(express.json())

const notes = []

app.post("/notes",(req,res)=>{

    console.log(req.body)
    notes.push(req.body)

    console.log(notes)
    
    res.send("note created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

// DELETE /nodes 
// params
// delete /notes/0

app.delete("/notes/:index",(req,res)=>{

    delete notes[req.params.index]

    res.send("note deleted sucessfully")
})

// PATCH /notes
// req.body = {description} :- "sample modified description"

app.patch("/notes/:index",(req,res)=>{

    notes[req.params.index].description = req.body.description

    res.send("note updated sucessfully")
})

module.exports = app;
