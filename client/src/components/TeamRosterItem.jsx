import React from 'react';
import { Link } from 'react-router-dom';

class TeamRosterItem extends React.Component {
  constructor(props){
    super(props);
  }

  // getPlayerImage(firstName, lastName) {
  //   console.log('withspace', firstName, lastName); 
  //   let spacelessfirstName = firstName.split(" ").join("_");
  //   let spacelesslastName = lastName.split(" ").join("_");
  //   console.log('spaceless', spacelessfirstName, spacelesslastName);
  //   console.log(`https://nba-players.herokuapp.com/players/${spacelesslastName}/${spacelessfirstName}`);
  //   return `https://nba-players.herokuapp.com/players/${spacelesslastName}/${spacelessfirstName}`
  // }

  render() {
    return (<div>
    <img src={this.props.selectedTeam.logo}/>
    <div>{console.log('imgsrc', this.props.player.player.officialImageSrc)}</div>
    <img src={this.props.player.player.officialImageSrc}/>
    <div>{this.props.player.player.FirstName}</div>
    <div>{this.props.player.player.LastName}</div>
    <div>{this.props.player.player.Position}</div>
    <div>#{this.props.player.player.JerseyNumber}</div>
    {/* <div>{props.player.player.Height}</div>
    <div>{props.player.player.Weight} lb</div> */}
  </div>)
  }
}




// const TeamRosterItem = (props) => (
//   <div>
//     <img src={props.selectedTeam.logo}/>
//     <div>{props.player.player.FirstName}</div>
//     <div>{props.player.player.LastName}</div>
//     <div>{props.player.player.Position}</div>
//     <div>#{props.player.player.JerseyNumber}</div>
//     {/* <div>{props.player.player.Height}</div>
//     <div>{props.player.player.Weight} lb</div> */}
//   </div>
// );

export default TeamRosterItem;