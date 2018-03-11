import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Switch, Route, HashRouter, BrowserRouter } from 'react-router-dom';
import TeamSelection from './components/TeamSelection.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TeamDisplay from './components/TeamDisplay.jsx';
import SinglePlayerDisplay from './components/SinglePlayerDisplay.jsx';
import AllPlayersDisplay from './components/AllPlayersDisplay.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Switch>
        <Route exact path="/" component={TeamSelection}/>
        <Route exact path ="/players" component={AllPlayersDisplay}/>
        <Route exact path="/:teamName" component={TeamDisplay}/>
        <Route exact path="/:teamName/:playerID" component={SinglePlayerDisplay}/>
      </Switch>
  )
  }
}

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <HashRouter>
      <App/>
    </HashRouter>
  </MuiThemeProvider>
, document.getElementById('app'));