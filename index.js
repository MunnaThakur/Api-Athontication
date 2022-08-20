const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const authRouter = require("./routes/auth.js")
const userRouter = require("./routes/user.js")
const postRouter = require("./routes/post.js")
const categoryRouter = require("./routes/categories.js");
// const { rawListeners } = require("./models/User.js");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

const mongoDbUri = "mongodb+srv://munna:Thakur@housingapi.9jmbm.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoDbUri, {
    useUnifiedTopology: true,
    useNewUrlParser : true,
})
.then(console.log("connect to Mongodb..."))
.catch((error)=>{console.log(`${error} did not connect to database!`);});


const storage = multer.diskStorage({
    distination : (req,file,cb)=>{
        cb(null, "images");
    },
    filename : (req,file,cb)=>{
        cb(null, "image.png");
    },
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("File has been uploaded");
});


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/category", categoryRouter);


app.listen(PORT, ()=>{console.log(`Server is listning on port No http://localhost/${PORT}`);})

