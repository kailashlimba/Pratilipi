exports.insertIntoDatabase = function insertIntoDatabase(connection, longURI, shortURI) {   
  const vari = { longURI : `${longURI}`, shortenedURI : `${shortURI}` };
  console.log(vari);
  connection.query('INSERT INTO urlShort SET ?', vari, (err) => {
          if (err) throw err;
  });
};

exports.expandURL = function(connection, shortURI) {
  return new Promise (function (resolve, reject) {
  // select longURI from urlShort where shortenedURI = ?
  const vari = { shortenedURI : `${shortURI}` };
  var expandedURL = "";
  connection.query('SELECT longURI FROM urlShort WHERE shortenedURI = "' + shortURI + '"', (err, results, fields) => {
          if (err) throw err;
          console.log("result obtained : " + JSON.stringify(results));
          resolve(results);
  });
})};
