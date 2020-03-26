const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    //comment belongs to a user so referencing it here
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    //comments are on post so referencing it here
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

},{
    timestamps: true

});

const Comment=mongoose.model('Comment',commentSchema);
module.exports = Comment;