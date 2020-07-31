const nodemailer=require('nodemailer');
const path=require('path');
const ejs=require('ejs');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:'587',
    secure:false,
    auth:{
        user:'vanshajkapoor73',
        pass:'Vanshaj@1234'
    }
});

let renderTemplate=(data,relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            
            }
            mailHtml=template;

        }
    )

    return mailHtml;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}