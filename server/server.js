const express = require('express');
const PORT = 3005;
const app = express();
require('dotenv').config();
const axios = require('axios');
const massive = require('massive');
const session = require('express-session');
const bodyParser = require('body-parser');

let {
   REACT_APP_CLIENT_ID,
   CLIENT_SECRET,
   REACT_APP_DOMAIN,
   CONNECTION_STRING,
   SESSION_SECRET
} = process.env

const ctrl = require('./controller');

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DB Connected');
}).catch( err => console.log(err));

app.use(ctrl.ignoreAuthInDevelopment)

app.get('/auth/callback', async (req, res) => {
    if(req.session.user){
        return res.redirect('http://localhost:3000/#/dashboard');
    }

    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    };

   
    let responseWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);
    
    let userData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`);

    const db = req.app.get('db');
    let {sub, name, picture} = userData.data;
    let userExists = await db.find_user([sub])
    if(userExists[0]) {
        req.session.user = userExists[0];
        res.redirect('http://localhost:3000/#/dashboard');
    } else {
        db.create_user([sub, name, picture]).then( createdUser => {
            req.session.user = createdUser[0];
            res.redirect('http://localhost:3000/#/dashboard');
        })
    }

});

app.get('/api/user-data', (req, res)=>{
    if(req.session.user) {
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Nice try')
    }
})

app.get('/api/logout', (req, res)=>{
    req.session.destroy()
    res.redirect('http://localhost:3000/#/')
})

app.post('/api/students', ctrl.addStudent);
app.get('/api/students', ctrl.getAllStudents);
app.delete('/api/students/:id', ctrl.deleteStudent, ctrl.getAllStudents);
app.get('/api/users', ctrl.getNameOfUser);


app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});



