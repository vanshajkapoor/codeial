const express=require('express');
const cookieParser=require('cookie-parser');


const port =8000;
const app=express();

//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const passportJWT=require('./config/passport-jwt-strategy');
const MongoStore=require('connect-mongo')(session);
const flash=require('connect-flash');
const customMware=require('./config/middleware');

//sass middleware
const sassMiddleware=require('node-sass-middleware');
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const db=require('./config/mongoose');

//setting up static access
app.use(express.static('./assets'));
//make the uploads path available to browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//using  my layout library
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);



//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'

    },{
        function(err){
            console.log(err||'error in connect-mongo');
        }
    })

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//routes
app.use('/',require('./routes/index'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in Running Server: ${err}`);
        
    }
    console.log(`Server Up And Running Bro On Port : ${port} `);
});
