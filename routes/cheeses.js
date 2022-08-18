const {Cheese,User} = require("../models");
const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");

router.get("/:cheese", async (req,res)=> {
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

router.get("/", async (req,res)=> {
    console.log("Testing...");
    let letter = req.query.char;
    const cheeses = await Cheese.findAll();
    if (letter) {
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
    }
    else {
        res.send(cheeses);
    }
});

router.post("/",[
    check("title").trim().not().isEmpty(),
    check("description").trim().not().isEmpty()
], async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({error: errors.array()});
    }
    let newCheese = req.body;
    await Cheese.create({
        title: newCheese.title,
        description: newCheese.description
    });
    console.log("New cheese added:",newCheese.title);
    const cheeses = await Cheese.findAll();
    res.status(202).send(cheeses);
});

router.put("/:id", async (req,res)=> {
    const cheese = await Cheese.findByPk(req.params.id);
    if (!cheese) {
        res.send(404);
    }
    else {
        let newCheese = req.body;
        if (!newCheese.title || !newCheese.description) {
            res.send(500);
        }
        else {
            await cheese.update( {
                title: newCheese.title,
                description: newCheese.description
            });
            res.send(200);
        }
    }
});

router.delete("/:id", async (req,res)=> {
    const cheese = await Cheese.findByPk(req.params.id);
    if (!cheese) {
        res.send(404);
    }
    else {
        cheese.destroy();
        res.send(200);
    }
});

module.exports = router;