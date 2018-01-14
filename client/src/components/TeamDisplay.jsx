import React from 'react';
import { Link } from 'react-router-dom';
import TeamRosterItem from './TeamRosterItem.jsx';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 8,
};


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1400,
    height: 550,
    padding: 10,
    overflowY: 'auto'
  },
};


const teamDisplayPaperStyle = {
  height: 900,
  width: 1200,
  pardding: 10,
  background: 'white',
  textAlign: 'center',
  display: 'inline-block',
};

class TeamDisplay extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        selectedTeam:{},
        teamRoster: [],
        allPastGames: [],
        overallSeasonStats:[],
        selectedPlayer:''
    }
  }

  getSelectedTeam() {
    axios.get('/team',{params: {teamAbbrev: this.props.match.params.teamName}})
    .then((response) => {
      this.setState({selectedTeam:response.data}, () => {
        var backgroundLogo = {
          backgroundImage: `url(${this.state.selectedTeam.logo})`
        };        
      });
      this.getOverallSeasonStats();
      this.getTeamRoster();
      this.getPastGames();
    })
  }
  
  getTeamRoster() { 
    axios.get('/roster', {params: {teamAbbrev: this.props.match.params.teamName}})
    .then((response) => {
      console.log(response.data.activeplayers.playerentry);
      let sortedPlayersWithImages = response.data.activeplayers.playerentry
        .filter((player) => player.player.officialImageSrc !== null && player.player.JerseyNumber)
        .sort((a, b) => a.player.LastName - b.player.LastName);
      this.setState({teamRoster: sortedPlayersWithImages})
    })
  }
  
  getOverallSeasonStats() {
    axios.get('/season', {params: {teamAbbrev: this.props.match.params.teamName}})
    .then((response) => {
      this.setState({overallSeasonStats:response.data[0]})
    })
  }

  getPastGames() {
    let teamAbbrev = this.state.selectedTeam.abbreviation;
    axios.get('/games', {params: {teamAbbrev: teamAbbrev}})
    .then((response)=> {
      this.setState({allPastGames: response.data.teamgamelogs.gamelogs})
    })
  }
  
  calculateStreak(games) {
    let streak = 0;
    var WL = games.map(function(game, i) {
      return game.stats.Wins['#text'] === '1' ? 'W' : 'L';
    });
    let streakType = WL[0];
    WL.forEach(function(result, i) {
      if (result === streakType) {
        streak++;
      } else {
        streak = 1;
        streakType = result;
      }
    });
    return streakType + streak;
  }

  componentWillMount() {
    this.getSelectedTeam();
  }

  render() {
    return (
      <div className ='center'>
        <Paper style={teamDisplayPaperStyle} zDepth={2}>
          <div className = "teamDisplayContainer">
          <div className = "teamBannerContainer" >
          <div className = "logoName">
            <img style={{display: 'inline', height: '170px' ,width:'auto'}} src = {this.state.selectedTeam.logo}/>
            <div>
              <h1 className = "teamCity" >{`${this.state.selectedTeam.city}`}</h1>
              <h2 className = "teamName"> {`${this.state.selectedTeam.teamname}`}</h2>
            </div>
          </div>
          
          {/* <div className = 'record'>
              {(this.state.overallSeasonStats.stats) ? `${this.state.overallSeasonStats.stats.Wins['#text']} - ${this.state.overallSeasonStats.stats.Losses['#text']}` : ''}
            </div> */}

          <div className="group">
          <div className="item">
              <span className="categoryTitle">RECORD</span>
              <div className="teamStat">{(this.state.overallSeasonStats.stats) ? `${this.state.overallSeasonStats.stats.Wins['#text']} - ${this.state.overallSeasonStats.stats.Losses['#text']}` : ''}</div>
            </div>
            <div className="divider"></div>
            <div className="item">
              <span className="categoryTitle">PPG</span>
              <div className="teamStat">{(this.state.overallSeasonStats.stats) ?  Math.round(this.state.overallSeasonStats.stats.Pts['#text']/this.state.overallSeasonStats.stats.GamesPlayed['#text']*10)/10 : ''}</div>
            </div>
            <div className="divider"></div>
            <div className="item">
              <span className="categoryTitle">OPPG</span>
              <div className="teamStat">{(this.state.overallSeasonStats.stats) ?  Math.round(this.state.overallSeasonStats.stats.PtsAgainst['#text']/this.state.overallSeasonStats.stats.GamesPlayed['#text']*10)/10  : ''}</div>
            </div>
            <div className="divider"></div>
            <div className="item">
              <span className="categoryTitle">RPG</span>
              <div className="teamStat">{(this.state.overallSeasonStats.stats) ?  Math.round(this.state.overallSeasonStats.stats.Reb['#text']/this.state.overallSeasonStats.stats.GamesPlayed['#text']*10)/10  : ''}</div>
            </div>
            <div className="divider"></div>
            <div className="item">
              <span className="categoryTitle">APG</span>
              <div className="teamStat">{(this.state.overallSeasonStats.stats) ?  Math.round(this.state.overallSeasonStats.stats.Ast['#text']/this.state.overallSeasonStats.stats.GamesPlayed['#text']*10)/10  : ''}</div>
            </div>
            <div className="divider"></div>
            <div className="item">
              <span className="categoryTitle">STREAK</span>
              <div className="teamStat">{(this.state.allPastGames.length > 0) ? this.calculateStreak(this.state.allPastGames): ''}</div>  
            </div>
            </div>
            <RaisedButton label="Change Teams" style={style} containerElement={<Link to='/'></Link>}/>
          </div>
          
          <h3>2017-2018 Roster</h3>
          <div style={styles.root}>
          <GridList
            cellHeight={180}
            style={styles.gridList}
            cols={5}
            rows={3}
          >
            {this.state.teamRoster.map((player, i) => 
              <Link 
                key={i} 
                to= {`/${this.state.selectedTeam.abbreviation}/${player.player.ID}`} 
              >
                <GridTile
                  key={i}
                  title={<b>{`${player.player.FirstName} ${player.player.LastName}`}</b>}
                  titleStyle={{fontSize :'20px'}}
                  subtitle={<div><span>#{player.player.JerseyNumber} {player.player.Position}</span></div>}
                  subtitleStyle={{fontSize :'15px'}}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                >
                <img style= {{height: '40px', width: 'auto'}} src={player.player.officialImageSrc} />
                </GridTile>
              </Link>
            )}
          </GridList>
          </div>
        </div>
        </Paper>
      </div>
    )
  }
}

export default TeamDisplay;
