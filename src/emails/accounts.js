const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//   to: 'ailton1234@hotmail.com',
//   from: 'ailton1234@hotmail.com',
//   subject: 'this is my first email',
//   text: 'I hope this one actually get to you.',
// })

const sendWellcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ailton1234@hotmail.com',
    subject: 'Thanks for joining in!',
    text: `Wellcome to the app, ${name}. Let me know how you get along with the app`
  })
}

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'ailton1234@hotmail.com',
    subject: 'Sorry to see you go',
    text: `Goodbye, ${name}. I hope to see you back sometime soon`
  })
}

module.exports = {
  sendWellcomeEmail,
  sendCancelationEmail
}