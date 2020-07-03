const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({

    service: "gmail",
    auth: {
        user: process.env.USEREMAIL,
        pass: process.env.PASSWORD
    }
})

const sendEmail = (to, subject, text) => {


    let mailOptions = {
        from: "saksham5sachdeva@gmail.com",
        to: to,
        subject: subject,
        text: text
    }


    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("email Sent")
        }
    })

}


module.exports.sendEmail = sendEmail
