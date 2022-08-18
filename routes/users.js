const {Cheese,User} = require("../models");
const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");

router.get("/", async (req,res)=> {
    const users = await User.findAll();
    res.send(users);
});

router.post("/",[
    check("name").trim().not().isEmpty(),
    check("email").trim().not().isEmpty()
], async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({error: errors.array()});
    }
    let newUser = req.body;
    await User.create({
        name: newUser.name,
        email: newUser.email
    });
    console.log("New user added:",newUser.name);
    const users = await User.findAll();
    res.status(202).send(users);
});

module.exports = router;