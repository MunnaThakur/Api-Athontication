const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
        required: true
    },
    categories:{
        type:Array,
        required: false
    },
    photo:{
        type: String,
        default :"",
    },
},
{timestamps: true}
);

module.exports = mongoose.model("Super-post", postSchema);

