const MailSend = require("../../../utils/helpers/mail-send")

const makeMailSend = () => {
  const mail = new MailSend()
  return mail
}

module.exports = {
  makeMailSend
}