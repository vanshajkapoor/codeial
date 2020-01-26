module.exports.home=function(req,res){

    console.log(req.cookies);
    res.cookie('user_id',500);
    return res.render('home',{
        title:"Home"
    });
};

module.exports.trending=function(req,res){

    return res.end('<h1>These Users are Trending </h1>');

};