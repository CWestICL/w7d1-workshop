const {buildDB} = require('./db/populateDataBase')
buildDB();

const express = require("express");
const app = express();
const {Cheese,User} = require("./models") 
const path = require("path");
const port = 3000;
const cheeses = require("./routes/cheeses");
const users = require("./routes/users");

app.use(express.json());
app.use("/users",users);
app.use("/cheeses",cheeses);
app.use(express.urlencoded({extended:true}));

app.get("/", (req,res)=> {
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("The server is live and listening at http://localhost:" + port);
});


