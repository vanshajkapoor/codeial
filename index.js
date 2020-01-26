const express=require('express');


const port =8000;



const app=express();


//using  my layout library
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);


//routes
app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error in Running Server: ${err}`);
        
    }
    console.log(`Server Up And Running Bro On Port : ${port} `);
});
