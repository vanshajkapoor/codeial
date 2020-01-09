module.exports.home=function(req,res){
    return res.end('<h1>Express is Up for codeial</h1>');
}

module.exports.trending=function(req,res){

    return res.end('<h1>These Users are Trending </h1>');

}