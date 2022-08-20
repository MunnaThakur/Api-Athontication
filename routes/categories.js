const router = require("express").Router();
const categoriesModel = require("../models/Category.js");

router.post("/", async (req,res)=>{
    const newCat = new categoriesModel(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }catch(error){
        res.status(500).json(error);
    }
});


//GET ALL CATEGORIES
router.get("/", async (req,res)=>{
    try{
        const cats = await categoriesModel.find();
        res.status(200).json(cats);
    }catch(error){
        res.status(500).json(error);
    }
})


module.exports = router;
