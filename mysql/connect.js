const mysql = require('mysql');

// First you need to create a connection to the db
const connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user: 'b738903ba26a53',
    password: '67097168',
    database: 'heroku_878bd6029270326',
});

connection.connect((err) => {
if(err){
    console.log('Error connecting to Db');
    return;
}
console.log('Connection established');
});

exports.connection = connection;

exports.endConnections = function endConnections(connection) {
    connection.end((err) => {
       
    });
};
