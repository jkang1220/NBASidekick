import React from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

const convertPosition = (positionAbbrev) => {
  let position = '';
  if (positionAbbrev === 'PG') {
    position = 'Point Guard'
  } else if (positionAbbrev === 'SG') {
    position = 'Shooting Guard'
  } else if (positionAbbrev === 'SF') {
    position = 'Small Forward'
  } else if (positionAbbrev === 'PF') {
    position = 'Power Forward'
  } else {
    position = 'Center'
  }
  return position;
}

const style = {
    margin: 8,
  };  

const convertBROtoBRK = (abbrev) => {
  if (abbrev === 'BRO') {
    return 'BKN'
  }
  return abbrev;
}

const PlayerBioBox = (props) => (
    <div>
      <div className="playerProfileContainer">
        <div className="square">
          <img style={{width: 'auto', height: '230px', display:'inline-block', backgroundWhite: 'white', background: `white url(http://i.cdn.turner.com/nba/nba/assets/logos/teams/secondary/web/${convertBROtoBRK(props.teamName)}.svg) no-repeat top left`}} src ={props.player.officialImageSrc} />
        </div>
        <div className="square">
          <div className = "playerName"><b>{(props.playerSeasonStats.length > 0) ? `${props.playerSeasonStats[0].player.FirstName} ${props.playerSeasonStats[0].player.LastName}` : ''}</b></div>
          <div className = "position"><b>{props.playerSeasonStats.length > 0 ? convertPosition(props.playerSeasonStats[0].player.Position) : ''}</b></div>
          <div className = "jerseyNumber"><b>#{props.playerSeasonStats.length > 0 ? props.playerSeasonStats[0].player.JerseyNumber : ''}</b></div>
          <div className="profileData"><b>Height: </b>{props.player.Height}</div>
          <div className="profileData"><b>Weight: </b>{props.player.Weight}</div>
          <div className="profileData"><b>Birth Date: </b>{props.player.BirthDate || 'Unknown'}</div>
          <div className="profileData"><b>Birth City: </b>{props.player.BirthCity || 'Unknown' }</div>
          <div className="profileData"><b>Birth Country: </b>{props.player.BirthCountry || 'Unknown'}</div>
        </div>
      </div>
      <div className ="buttonContainer">
        <RaisedButton label="Return to Team" style={{style}} containerElement={<Link to={`/${props.teamName}`}></Link>}/>
      </div>
    </div>)

export default PlayerBioBox;