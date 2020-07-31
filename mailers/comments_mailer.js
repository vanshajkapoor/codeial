const nodemailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
    console.log('inside newComments mailer');
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from:'kapurvanshaj@gmail.com',
        to:comment.user.email,
        subject:'New Comment Published',
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }

        console.log('Message Sent',info);
        return;
    });
}