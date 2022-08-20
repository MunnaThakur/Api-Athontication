const router = require("express").Router();
const userModel = require("../models/User.js");
const postsModel = require("../models/Post.js");
// const bcrypt = require("bcrypt");


//CREATE POSTs
router.post("/", async (req, res) => {
  const newPosts = new postsModel(req.body);
  try {
    const savePosts = await newPosts.save();
    res.status(200).json(savePosts);
  } catch (err) {
    res.status(500).json(err);
  }
});


//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
        const posts = await postsModel.findById(req.params.id);
        if (posts.username === req.body.username) {
            try {
                const updatePosts = await postsModel.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
                );
                res.status(200).json(updatePosts);
            } catch (err) {
                res.status(500).json(error);
            }
        }else{
            res.status(401).json("You can update only your posts!");
        }
    } catch (error) {
    res.status(500).json(error);
  }
});




//DELETE POSTS
router.delete("/:id", async (req,res)=>{
    try{
        const posts = await postsModel.findById(req.params.id);
        if(posts.username === req.body.username){
            try{
                await posts.delete();
                res.status(200).json("posts has been deleted...");
            }catch(err){
                res.status(500).json(err);
            }
        }else{
            res.status(401).json("You can delete only your posts!");
        }
    }catch(err){
        res.status(500).json(err);
    }
});



//GET POSTS
router.get("/:id", async (req,res)=>{
    try{
        const posts = await postsModel.findById(req.params.id);
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});



//GET ALL POSTS
router.get("/", async (req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        if(username){
            posts = await postsModel.find({username});
        }else if(catName){
            posts = await postsModel.find({
                categories : {
                    $in : [catName],
                },
            });
        }else{
            posts = await postsModel.find();
        }
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json(error);
    }
});




module.exports = router;
