const mongoose = require('mongoose');
const AdminPostSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);
const AdminPost = mongoose.model('AdminPosts', AdminPostSchema);
module.exports = AdminPost;  