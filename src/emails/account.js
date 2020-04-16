const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendWelcomeEmail=async(email,name)=>{

   await sgMail.send({
        to:email,
        from:'mehdi.motahari@gmail.com',
        subject:"Thank you for joining us",
        text:`welcome to the app `
    })
}

const sendCancelationEmail=async(email,name)=>{

    await sgMail.send({
         to:email,
         from:'mehdi.motahari@gmail.com',
         subject:"Sorry you leave",
         text:`good by i hope to sse you ${nmae }  soon `
     })
 }


module.exports={sendWelcomeEmail,sendCancelationEmail}