import React from 'react';
import { Link } from 'react-router-dom';

class TeamRosterItem extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (<div>
    <img src={this.props.selectedTeam.logo}/>
    <img src={this.props.player.player.officialImageSrc}/>
    <div>{this.props.player.player.FirstName}</div>
    <div>{this.props.player.player.LastName}</div>
    <div>{this.props.player.player.Position}</div>
    <div>#{this.props.player.player.JerseyNumber}</div>
  </div>)
  }
}

export default TeamRosterItem;