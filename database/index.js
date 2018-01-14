const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getAllTeams = function(callback) {
    connection.query('SELECT * FROM teams ORDER BY city', function(error, results) {
      if (error) { console.log('error getting all transactions', error); }
      callback(results);
    });
  };

const getTeam = function(teamAbbrev, callback) {
  connection.query(`SELECT * FROM teams WHERE abbreviation = '${teamAbbrev}'`, function(error, results) {
    if (error) { console.log('error getting all transactions', error); }
    callback(results);
  });
};


module.exports = {
    getAllTeams,
    getTeam
};