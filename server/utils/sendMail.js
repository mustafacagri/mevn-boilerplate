const nodemailer = require('nodemailer')

module.exports = payload => {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: process.env.NODEMAILER_PORT == '465' ? true : false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${process.env.NODEMAILER_SENDERNAME}" <${process.env.NODEMAILER_USER}>`, // sender address
      to: payload.to, // list of receivers
      subject: payload.subject, // Subject line
      text: payload.text || payload.html, // plain text body
      html: payload.html || payload.text // html body
    })

    // console.log('Message sent: %s', info.messageId)
    // console.log(payload.to, payload.subject, payload.text, payload.html)
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }

  main().catch(console.error)
}
