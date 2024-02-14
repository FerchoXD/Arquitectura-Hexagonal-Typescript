import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'user@gmail.com',
        pass: 'Pass'
    }
})

transporter.verify().then(() => {
    console.log('Ready for sends emails')
})

export { transporter }