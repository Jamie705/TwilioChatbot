// Require/import the HTTP module
const http = require('http');

//Require/Express
const express = require('express');

//Require Twilio twiml
const MessagingResponse = require ('twilio').twiml.MessagingResponse;

//Use app to shortcut express
const app = express();

// Define a port to listen for incoming requests
const PORT = 3000;

//Create response to incoming sms message
// app.post('/sms', (req, res) => {
//     const twiml = new MessagingResponse();

//     twiml.message('Thanks for reaching out. What can I help you with today?');

//     res.writeHead(200, {'Content-Type': 'text/xml'});
//     res.end(twiml.toString());
// });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const chatDefault = process.env.CHATDEFAULT;

client.autopilot.assistants(chatDefault)
                .defaults()
                .update({defaults: {
                     defaults: {
                         assistant_initiation: 'task://greeting',
                         fallback: 'task://fallback'
                     }
                 }})
                .then(defaults => console.log(defaults.assistantSid));

//server listener
http.createServer(app).listen(PORT, () => {
  // Log (server-side) when our server has started
  console.log('Server listening on: http://localhost:' + PORT);
});