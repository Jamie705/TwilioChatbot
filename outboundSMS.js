const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'Hello, Welcome to my Twilio account',
     from: process.env.FLEX_NUMBER,
     to: '+16784287080'
   })
  .then(message => console.log(message.sid));
