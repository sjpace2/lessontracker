let {ACCOUNT_SID, AUTH_TOKEN} = process.env



const accountSid = 
;
const authToken = ;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+',
     to: '+'
   })
  .then(message => console.log(message.sid))
  .done();