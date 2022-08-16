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

app.get("/cheeses/:cheese", async (req,res)=> {
    let cheeseTitle = req.params.cheese.charAt(0).toUpperCase() + req.params.cheese.slice(1);
    const cheese = await Cheese.findOne({where: {title: cheeseTitle}});
    if (!cheese) {
        res.send(404);
    }
    let length = Number(req.query.n);
    let {title, description} = cheese;
    let payload = {
        title: title,
        description: description.slice(0,length)
    }
    res.send(payload);
});

app.get("/cheeses", async (req,res)=> {
    let letter = req.query.char;
    const cheeses = await Cheese.findAll();
    let filterCheeses = cheeses.filter((cheese) => {
        if (cheese.title[0] === letter.toUpperCase()) {
            return true;
        }
    })
    if (filterCheeses.length > 0) {
        res.send(filterCheeses);
    }
    else {
        res.send(404);
    }
});

app.listen(port, () => {
    console.log("The server is live and listening at http://localhost:3001");
});


