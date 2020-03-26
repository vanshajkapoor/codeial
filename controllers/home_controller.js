const Post = require('../models/posts');

module.exports.home=function(req,res){

    //this syntax does not provide the provision of prepopulating the database which is very important to get the user information related to that id
    /*Post.find({},function(err,posts){
        return res.render('home',{
            title:'Codial | Home',
            posts:posts
        });
    });*/

    //pre populating the user with getting its information from user table inside field of user in posts

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path:'user'
        }

    })
    .exec(function(err,posts){
        return res.render('home',{
            title:'Codial | Home',
            posts:posts
        });

    });


};

module.exports.trending=function(req,res){

    return res.end('<h1>These Users are Trending </h1>');

};