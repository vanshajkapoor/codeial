const User=require('../models/user');
module.exports.profile=function(req,res){
    return res.render('user',{
        title:"User"
    });
};

module.exports.displayPic=function(req,res){
    return res.end('<h1>Users Display Picture</h1>');
};

module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('sign-up',{
        title:"Sign Up"
    });
};

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('sign-in',{
        title:"Sign In"
    });
};

//get the sign up data and add it to mongo db in user schema

module.exports.create =function(req,res){

    // console.log(req.body.enterpassword);
    // console.log(req.body.confirmpassword);
    // console.log(req.body);
    if(req.body.enterpassword!=req.body.confirmpassword){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("error in finding user while sign up");
            return;
        };

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log("error in creating the user",err);return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
        

    })
    
    
}

//sign in and create the session for the user
module.exports.createSession =function(req,res){
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(); //this is method of logging out passed by passport
    req.session.destroy(function(err){
        if(err){
            console.log("cannot destroy session");
            return;
        }
        return res.redirect('/');
    });
    // res.clearCookie('codeial');
    
    // return res.redirect('/');
}
