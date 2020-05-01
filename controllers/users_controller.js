const User=require('../models/user');
const fs=require('fs');
const path=require('path');
module.exports.profile=function(req,res){

    User.findById(req.params.id,function(err,users){
        return res.render('user',{
            title:"User",
            profile_users:users
        });

    })

    
};

// module.exports.update=function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
//             return res.redirect('back');
//         });
//     }else{
//         return res.status(401).send('Unauthorized');
//     }
// }
module.exports.update=async function(req,res){
    if(req.user.id==req.params.id){
        try{
            let user=await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*** Multer error',err)}
                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }


                    //this is saving path of uploaded file into the avatar field in the user
                    user.avatar=User.avatarPath+'/'+req.file.filename; 
                }
                user.save();
                return res.redirect('back');
            });



        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
}
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
    req.flash('success','Logged in Sucessfully !')
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
    req.logout(); //this is method of logging out passed by passport
    req.flash('success','You have Logged Out !');
    return res.redirect('/');
    // res.clearCookie('codeial');
    
    // return res.redirect('/');
}
