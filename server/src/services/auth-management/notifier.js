/**
 * Notifier sends emails for auth-management with tokens
 * @function
 */
module.exports = function(app) {
  function getLink(type, hash) {
    let protocol = app.get('protocol');
    protocol += "://";
    let host = app.get('host');
    let port = app.get('port');
    let link = `${protocol}${host}:${port}/#/${type}/${hash}`
    console.log(link) // Logging links until email works
    return link;
  }

  function sendEmail(email) {
    return app.service('mailer').create(email).then(function(result){
      console.log('Email Sent', result);
    }).catch(err => {
      console.log('Error sending email', err);
    });
  }
  
  return {
    notifier: function(type, user, notifierOptions) {
      let tokenLink
      let email
      switch (type) {
        case 'resendVerifySignup': //sending the user the verification email
          tokenLink = getLink('verify', user.verifyToken)
          email = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: 'Verify Signup',
              html: '<div><p>Click here to verify your account: <a href="' + tokenLink + '">Link</a></p><div>',
          }
          return sendEmail(email)
        case 'verifySignup': // confirming verification
          tokenLink = getLink('verify', user.verifyToken)
          email = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: 'Confirm Signup',
              html: '<div><p>Thanks for verifying your email</p></div>',
          }
          return sendEmail(email)
        case 'sendResetPwd':
          tokenLink = getLink('reset', user.resetToken)
          email = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: 'Password Reset',
              html: '<div><p>Click here to reset your password: <a href="' + tokenLink + '">Link</a></p></div>',
          }
          console.log(__dirname);
          return sendEmail(email);
        case 'resetPwd':
          tokenLink = getLink('reset', user.resetToken)
          email = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: 'Password Was Reset',
              html: '<div><p>Your password was reset</p></div>',
            }
          return sendEmail(email)
        case 'passwordChange':
          email = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: 'Password Change',
              html: '<div><p>Your password was changed</p></div>',
            }
          return sendEmail(email)
        case 'identityChange':
          tokenLink = getLink('verify', user.verifyToken)
          email = {
              from: process.env.SMTP_FROM,
              to: user.email,
              subject: 'Identity Changed',
              html: '<div><p>Click here to verify your account: <a href="' + tokenLink + '">Link</a></p></div>',
            }
          return sendEmail(email)
        default:
          break;
        }
      }
    }
  }