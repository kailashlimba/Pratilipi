// road map :-> first of all users should be able to fill out their companies, for that i would need a users.json
// file, -> userId, jobDesignation, company : that's it for the time being
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const ejslint = require('ejs-lint');
const opn = require('opn');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded());

console.log(ejslint('pages/index'));

app.get('/', function(req, res) {
    res.render('pages/index');
});

// this would be our opening function
app.post('/', (req, res) => {
    console.log(req.body);
    var shortenedURL = generateShorthandURL(req.body.longURI);
    var toStore = {
        longUri : `${req.body.longURI}`,
        shortenedURL : `${shortenedURL}`
    }; // this is how we store some variable
    var data = fs.readFileSync('myDatabase.json');
    var json = JSON.parse(data);
    console.log(json);
    json.ShortenedURLs.push(toStore);
    fs.writeFile('myDatabase.json', JSON.stringify(json), (err) => {
        if (err) throw err;
        console.log("saved");
    });
    // performQuery.insertIntoDatabase(connect.connection, req.body.longURI, shortenedURL);
    res.render('pages/about', {
        longURI : shortenedURL
    });
});

app.get('/:shortenedURL', (req, res) => {
    var value = req.params.shortenedURL;
    var data = fs.readFileSync('myDatabase.json');
        // console.log("mydata " + data);
    var redirectedURL = '$';
    var json = JSON.parse(data);
    console.log(json);
    var urls = json.ShortenedURLs;
    console.log("urlsurlsurls" + urls[0].longURI);
    console.log(urls.length);
    for (i = 0; i < urls.length; i++) {
        // console.log("i is " + JSON.stringify(i));
        if (urls[i].shortenedURL == value) {
            redirectedURL = urls[i].longUri;
        }
    }
    console.log(redirectedURL + " -----------<>");
    if (redirectedURL == '$')
        res.render('pages/index');
    else
        res.redirect(redirectedURL);
});



// generate shorthand url
function generateShorthandURL(longURL) {
    const hash = crypto.createHash('md5').update(longURL).digest('base64').replace(/\//g, '_').replace(/\+/g, '-');
    return hash.substring(0, 6);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
