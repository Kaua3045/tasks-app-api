const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const mailConfig = require('../../main/config/mail')

module.exports = class MailSend {
  async send(emailToSend, subject, templateName, context) {
    const transport = nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.password
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    transport.use('compile', hbs({
      viewEngine: {
        extname: '.hbs',
        partialsDir: path.resolve(__dirname, '..', '..', 'templates'),
        defaultLayout: false
      },
      viewPath: path.resolve(__dirname, '..', '..', 'templates'),
      extName: '.hbs'
    }))

    const message = {
      from: 'tasksApp@domain.com',
      to: emailToSend,
      subject,
      template: `${templateName}`,
      context
    }

    transport.sendMail(message)
  }
}