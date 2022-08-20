const router = require("express").Router();
const userModel = require("../models/User.js");
const postModel = require("../models/Post.js");
const bcrypt = require("bcrypt");

//UPDATE
router.put("/:id", async (req,res)=>{
    if(req.body.userId === req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const userUpdate = await userModel.findByIdAndUpdate(
                req.params.id,{
                    $set: req.body,
            },
            {new:true});

            res.status(200).json(userUpdate);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(401).json("you can update only your account!");
    }
})

//GET USER 
router.get("/:id", async(req,res)=>{
    try{
        const user = await userModel.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            const user = await userModel.findById(req.params.id);
            try{
                await postModel.deleteMany({username : user.username})
                await userModel.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted...");
            }catch(error){
                res.status(500).json(error);
            }
        }catch(error){
            res.status(404).json("User not found!");
        }
        }else{
        res.status(401).json("You can delete only your account!");
    }
})



module.exports = router;

