module.exports.home=function(req,res){
    return res.render('home',{
        title:"Home"
    });
};

module.exports.trending=function(req,res){

    return res.end('<h1>These Users are Trending </h1>');

};