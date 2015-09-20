module.exports.email = {
  //service ((string))  A "well-known service" that Nodemailer knows how to communicate with (see this list of services)

  //auth  ((object))  Authentication object as {user:"...", pass:"..."}
  auth: {user: 'mharris7190', pass: 'oUxert3y'},
  //transporter ((object))  Custom transporter passed directly to nodemailer.createTransport (overrides service/auth) (see Available Transports)

  //templateDir ((string))  Path to view templates relative to sails.config.appPath (defaults to views/emailTemplates)

  //from  ((string))  Default from email address
  from: 'mharris7190@gmail.com',
  //testMode  ((boolean)) Flag indicating whether the hook is in "test mode". In test mode, email options and contents are written to a .tmp/email.txt file instead of being actually sent. Defaults to true.
  testMode: false,
  //alwaysSendTo  ((string))  If set, all emails will be sent to this address regardless of the to option specified. Good for testing live emails without worrying about accidentally spamming people.
  alwaysSendTo: 'mharris7190@gmail.com'
};