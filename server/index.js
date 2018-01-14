const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const axios = require('../node_modules/axios');
var authorization = require('../config.js');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));

app.get('/teams', (req, res) => {
  db.getAllTeams(function(allTeamsData) {
    res.send(allTeamsData);
  })
});

app.get('/team', (req, res) => {
  db.getTeam(req.query.teamAbbrev, function(teamData) {
    res.send(teamData[0])
  })
});

app.get('/games', (req, res) => {
  let teamAbbreviation = req.query.teamAbbrev;
  axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/team_gamelogs.json?team=${teamAbbreviation}&sort=date`, authorization)
  .then(function(response) {
    res.send(response.data);
  }).catch(function(err){
    console.log(err);
  })
});

// app.get('/roster', (req, res) => {
//   let teamAbbreviation = req.query.teamAbbrev;
//   axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/roster_players.json?team=${teamAbbreviation}`, authorization)
//   .then(function(response) {
//     res.send(response.data);
//   }).catch(function(err){
//     console.log(err);
//   })
// });
app.get('/roster', (req, res) => {
  let teamAbbreviation = req.query.teamAbbrev;
  axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/active_players.json?team=${teamAbbreviation}`, authorization)
  .then(function(response) {
    res.send(response.data);
  })
  .catch(function(err) {
    console.log(err);
  });
});

app.get('/season', function(req, res) {
  let teamAbbreviation = req.query.teamAbbrev;
  axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/overall_team_standings.json?team=${teamAbbreviation}&teamstats=W,L,PTS,PTSA,REB,AST`, authorization).then((response) => {
    res.send(response.data.overallteamstandings.teamstandingsentry);
  });
});

app.get('/playergames', function(req, res) {
  let playerID = req.query.playerID
  axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/player_gamelogs.json?player=${playerID}`, authorization).then((response) => {
    res.send(response.data.playergamelogs.gamelogs);
  });
});

app.get('/playerseason', function(req, res) {
  let playerID = req.query.playerID
  axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/cumulative_player_stats.json?player=${playerID}`, authorization).then((response) => {
    res.send(response.data.cumulativeplayerstats.playerstatsentry);
  });
});

app.get('/player', function (req,res) {
  let playerID = req.query.playerID
  axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/active_players.json?player=${playerID}`, authorization).then((response) => {
    res.send(response.data.activeplayers.playerentry);
  });
});

app.get('/player', function (req,res) {
  let playerID = req.query.playerID
  axios.get(`https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/active_players.json?player=${playerID}`, authorization).then((response) => {
    console.log('serverresponsevvvv', response.data);
    res.send(response.data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

