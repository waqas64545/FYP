const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    selleremail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},
    { timestamps: true }
);
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;  