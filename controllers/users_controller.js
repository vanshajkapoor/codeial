module.exports.profile=function(req,res){
    return res.render('user',{
        title:"User"
    });
};

module.exports.displayPic=function(req,res){
    return res.end('<h1>Users Display Picture</h1>');
};