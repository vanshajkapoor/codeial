const Post = require('../models/posts');
const User =require('../models/user');

module.exports.home=async function(req,res){

    //this syntax does not provide the provision of prepopulating the database which is very important to get the user information related to that id
    /*Post.find({},function(err,posts){
        return res.render('home',{
            title:'Codial | Home',
            posts:posts
        });
    });*/

    //pre populating the user with getting its information from user table inside field of user in posts
    try{
        let posts=await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path:'user'
            }

        })
   
        let users=await User.find({});
            
            
    
        return res.render('home',{
            title:'Codial | Home',
            posts:posts,
            all_users:users
        });


    }catch(err){
        console.log(err);
        return ;
    }
    

};

module.exports.trending=function(req,res){

    return res.end('<h1>These Users are Trending </h1>');

};