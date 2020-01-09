module.exports.profile=function(req,res){
    return res.end('<h1>This is User Profile</h1>');
}

module.exports.displayPic=function(req,res){
    return res.end('<h1>Users Display Picture</h1>');
}