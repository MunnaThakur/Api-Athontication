const router = require("express").Router();
const userModel = require("../models/User.js");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = userModel({
            username: req.body.username.toLowerCase(),
            email : req.body.email,
            password : hashedPass
        });
        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json("Internal Server Error");
    }
})

//LOGIN 
router.post("/login",async (req,res)=>{
    try{
        const user = await userModel.findOne({username: req.body.username.toLowerCase()});
        !user && res.status(400).json("Wrong Credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong Credentials!");

        // const {password, ...others} = user._doc;
        res.status(200).json(await userModel.find());

    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
