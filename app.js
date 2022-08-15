const {buildDB} = require('./db/populateDataBase')
buildDB();

const express = require("express");
const app = express();
const {Cheese,Board} = require("./models") 
const path = require("path");
const port = 3001;

app.get("/", (req,res)=> {
    res.sendStatus(200);
});

app.get("/camembert", async (req,res)=> {
    //res.send("Gathering Camembert data");
    const cheese = await Cheese.findOne({where: {title: "Camembert"}});
    let {title, description} = cheese;
    let payload = {
        title: title,
        description: description
    }
    res.send(payload);
});

app.get("/c-cheese", async (req,res)=> {
    //res.send("Gathering Camembert data");
    const cheeses = await Cheese.findAll();
    let cCheeses = cheeses.filter((cheese) => {
        if (cheese.title[0] === "C") {
            return true;
        }
    })
    res.send(cCheeses);
});

app.listen(port, () => {
    console.log("The server is live and listening at http://localhost:3001");
});


