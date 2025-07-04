import nodemailer from "nodemailer";
import {config} from 'dotenv'
config()
//working
const mailSender = async (email, title, body) => {
    try{
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })
       
            let info = await transporter.sendMail({
                from: 'CollegX',
                to:`${email}`,
                subject: `${title}`,
                html: `${body}`,
            })
          
            return info;
    }
    catch(error) {
        console.log('an error occured' , error ,  error.message);
    }
}


 
export default mailSender;