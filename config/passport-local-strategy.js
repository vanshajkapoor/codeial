const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('../models/user');

//authentication using passport.js
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("Error in finding user-->Passport");
                return done(err);
            }

            if(!user || user.enterpassword!=password){
                console.log("Invalid Username/Password");
                return done(null,false);
            }
            
            return done(null,user);

        });
    }

));

//serialize user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialize user from key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user --> Passport");
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication=function(req,res,next){
    //if user is signed in then pass on the request to controller to do the next action
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
    // next();
    
    next();
}

module.exports=passport;
