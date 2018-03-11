import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1400,
    height: 700,
    padding: 10,
    overflowY: 'auto'
  },
};

const paperStyle = {
  width: 1200,
  pardding: 10,
  background: 'white',
  textAlign: 'center',
  display: 'inline-block',
};

const directButton = {
	margin: '20px'
}

class TeamSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTeams: []
    }
  }

  getAllTeams() {
    axios.get('/teams').then((response) => {
      this.setState({allTeams:response.data});
    })
  }
  
  componentDidMount() {
    this.getAllTeams();
  }

  render() {
    return(
    <div className ='center'>
      <Paper style={paperStyle} zDepth={2}>
      <div className = 'container'>
        <h1 id = "appName">NBA Sidekick</h1>
        <RaisedButton style={directButton} label="View All Players" containerElement={<Link to='/players'></Link>}/>
      </div>
      <div style={styles.root}>
        <GridList
          cellHeight={230}
          style={styles.gridList}
          cols={5}
        >
          {this.state.allTeams.map((team, i) => (
            <Link key={i} to= {`/${team.abbreviation}`}>
            <GridTile
              key={i}
              title={team.teamname}
              subtitle={<span><b>{team.city}</b></span>}
            >
              <img src={team.logo} />
            </GridTile>
            </Link>
          ))}
        </GridList>
      </div>
      </Paper>
    </div>)
};
}

export default TeamSelection;