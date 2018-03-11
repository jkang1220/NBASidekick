const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');
const axios = require('../node_modules/axios');
var authorization = require('../config.js');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.static(__dirname + '/../node_modules'));


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

app.get('/allplayers', function (req,res) {
  axios.get(`https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/cumulative_player_stats.json?playerstats`, authorization).then((response) => {
  const organizePlayerData = (data) => {
    return data.cumulativeplayerstats.playerstatsentry.filter(player => {return player.player.JerseyNumber !== undefined}).map(player => {
      return {
        'TEAM': player.team.Abbreviation || '-',
        'FN': player.player.FirstName.toLowerCase() || '-',
        'LN': player.player.LastName.toLowerCase() || '-',	
        'NUM': parseFloat(player.player.JerseyNumber) || '-',	
        'POS': player.player.Position || '-',
        'GP': parseFloat(player.stats.GamesPlayed['#text']) || 0,
        'MIN/G': parseFloat(((player.stats.MinSecondsPerGame['#text']/60).toFixed(2))) || 0,	
        'PTS/G': parseFloat(player.stats.PtsPerGame['#text']) || 0,	
        '2PA/G': parseFloat(player.stats.Fg2PtAttPerGame['#text']) || 0 ,	
        '2PM/G': parseFloat(player.stats.Fg2PtMadePerGame['#text']) || 0,	
        '2PT%': parseFloat(player.stats.Fg2PtPct['#text']) || 0,
        '3PA/G': parseFloat(player.stats.Fg3PtAttPerGame['#text']) || 0,	
        '3PM/G': parseFloat(player.stats.Fg3PtMadePerGame['#text']) || 0,
        '3PT%': parseFloat(player.stats.Fg3PtPct['#text']) || 0,
        'FTA/G': parseFloat(player.stats.FtAttPerGame['#text']) || 0,
        'FTM/G': parseFloat(player.stats.FtMade['#text']) || 0,
        'FT%': parseFloat(player.stats.FtPct['#text']) || 0,
        'REB/G': parseFloat(player.stats.RebPerGame['#text']) || 0,
        'AST/G': parseFloat(player.stats.AstPerGame['#text']) || 0,
        'STL/G': parseFloat(player.stats.StlPerGame['#text']) || 0,	
        'BLK/G': parseFloat(player.stats.BlkPerGame['#text']) || 0,
        'TO/G': parseFloat(player.stats.TovPerGame['#text']) || 0,
        'SLRY' : (Math.floor(Math.random() * (10000000 - 1000000 + 1)) + 1000000)
      }
    });
  }
  res.send(organizePlayerData(response.data).sort((a, b) => {
    if (a['PTS/G'] < b['PTS/G']) {
      return 1;
    }
    if (a['PTS/G'] > b['PTS/G']) {
      return -1;
    }
    return 0;
  }));
  }).catch((error)=> {
    res.send(error);
  });
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

