const express = require('express');
const path = require('path');
const crypto = require('crypto');
const ejslint = require('ejs-lint');
const opn = require('opn');
const fs = require('fs');
const alert = require('alert');

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded());

// variables
var userDetails = []
var activeUsers = 0


// routes
app.get('/', (req, res) => {
    res.render('pages/index')
})

app.post('/', (req, res) => {
    var toStore = {
        userId : Date.now().toString(),
        email: `${req.body.email}`,
        password: `${req.body.password}`,
        Name: `${req.body.name}`,
        jobDesignation: `${req.body.jobDesignation}`,
        companyName: `${req.body.companyName}`,
        companyAddress: `${req.body.companyAddress}`
    }
    var data = fs.readFileSync('users.json');
    var json;
    try {
        json = JSON.parse(data);
    } catch {
        json = null;
    }
    activeUsers++
    if (json != null)
        userDetails = json
    userDetails.push(toStore)
    fs.writeFile('users.json', JSON.stringify(userDetails), (err) => {
        if (err) throw err;
        console.log('saved');
    })
    res.render('pages/login', {
        companyDetails: toStore
    })
})

app.get('/login', (req, res) => {
    res.render('pages/beforeLogin')
})

app.post('/login', (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;
    var data = fs.readFileSync('users.json');
    var json;
    try {
        json = JSON.parse(data);
    } catch {
        json = null;
    }
    if (json == null) {
        res.redirect('/login')
    }

    var object;
    for(i = 0; i < json.length; i++) {
        object = json[i];
        if (object.email == email && object.password == pass) {
            break;
        }
    }

    activeUsers = activeUsers + 1

    res.render('pages/login', {
        companyDetails: object
    })

})

app.get('/companyDetails', (req, res) => {
    var companyName = req.query.companyName
    console.log(req.query);

    var data = fs.readFileSync('users.json');
    var json;
    try {
        json = JSON.parse(data);
    } catch {
        json = null;
    }
    if (json == null) {
        res.redirect('/login')
    }
    for(i = 0; i < json.length; i++) {
        var object = json[i];
        if (object.companyName == companyName) {
            companyName = json[i];
            break;
        }
    }
    res.render('pages/details.ejs', {
        companyDetails: companyName,
        activeUsers: activeUsers
    })
})

app.get('/logout', (req, res) => {
    activeUsers = Math.max(0, activeUsers - 1)
    res.render('pages/index')
})

app.post('/search', (req, res) => {
    var data = fs.readFileSync('users.json');
    var json;
    try {
        json = JSON.parse(data);
    } catch {
        json = null;
    }
    if (json == null) {
        res.redirect('/login')
    }
    // console.log(res.query.key)
    var data = null;
    for (i = 0; i < json.length; i++) {
        console.log(json[i].companyName);
        if (json[i].companyName == req.body.search)
            {data = json[i]; break;}
    }
    console.log(data)
    if (data == null) {
        alert("Company Not Found");
        res.redirect('/');
    }
    else res.render('pages/details.ejs', {
        companyDetails: data,
        activeUsers: activeUsers
    })
})

app.listen(port)
