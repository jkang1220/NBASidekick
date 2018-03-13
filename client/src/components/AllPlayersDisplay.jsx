import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Table, {
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from 'material-ui/Table';
import PlayersTable from './PlayersTable.jsx';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText,
} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import orderBy from 'lodash/orderBy';

const filterFields = {
	margin: '0px 10px',
	width: '220px',
};

const selectFieldStyle = {
	margin: '10px',
};
const spdPaperStyle = {
	height: '90%',
	width: '95%',
	padding: 10,
	background: 'white',
	textAlign: 'center',
	marginLeft: 'auto',
	marginRight: 'auto',
	display: 'block',
};

const tableCell = {
	width: '35px',
	padding: '0 5px',
	border: '1px solid rgb(158, 158, 158)',
	textAlign: 'center',
};
const tableNameCell = {
	width: '65px',
	padding: '0 5px',
	border: '1px solid rgb(158, 158, 158)',
	textAlign: 'center',
};
const tableSalaryCell = {
	width: '60px',
	padding: '0 5px',
	border: '1px solid rgb(158, 158, 158)',
	textAlign: 'center',
};
const invertDirection = {
	asc: 'desc',
	desc: 'asc',
};
const sortArrowStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignitems: 'center',
};

const directButton = {
	margin: '20px',
};

const numberWithCommas = num => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const convertQueryIntoFilters = (filteredDataArr, query, stat) => {
	if (query === '') {
		return filteredDataArr;
	}
	if (query.indexOf('between') >= 0) {
		var elements = query.split(' ');
		var num1 = elements[1];
		var num2 = elements[3];
		var min = Math.min(num1, num2);
		var max = Math.max(num1, num2);
		return filteredDataArr.filter(
			player => player[stat] >= min && player[stat] <= max
		);
	} else {
		var noSpaces = query.replace(/\s/g, '');

		for (var i = 0; i < noSpaces.length; i++) {
			if (noSpaces[i] === '<' || noSpaces[i] === '>') {
				var operator = noSpaces[i];
			}
		}

		var number = noSpaces.split(operator)[1];
		return operator === '<'
			? filteredDataArr.filter(player => player[stat] < number)
			: filteredDataArr.filter(player => player[stat] > number);
	}
};

class AllPlayersDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allTeams: [],
			allPlayers: [],
			filteredPlayers: [],
			expandFilters: false,
			TEAM: [0, 'All Teams'],
			FIRST: '',
			LAST: '',
			GP: '',
			NUM: '',
			POS: [0, 'All Positions'],
			'MIN/G': '',
			'PTS/G': '',
			'2PA/G': '',
			'2PM/G': '',
			'2PT%': '',
			'3PA/G': '',
			'3PM/G': '',
			'3PT%': '',
			'FTA/G': '',
			'FTM/G': '',
			'FT%': '',
			'REB/G': '',
			'AST/G': '',
			'STL/G': '',
			'BLK/G': '',
			'TO/G': '',
			SLRY: '',
		};
		this.onFilterParameterChange = this.onFilterParameterChange.bind(this);
		this.handleRemoveFilters = this.handleRemoveFilters.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.onTeamSelectFieldChange = this.onTeamSelectFieldChange.bind(this);
		this.onPositionSelectFieldChange = this.onPositionSelectFieldChange.bind(
			this
		);
		this.handleApplyFilters = this.handleApplyFilters.bind(this);
	}

	componentDidMount() {
		axios
			.get('/allplayers')
			.then(response => {
				this.setState({ allPlayers: response.data }, () => {
					this.setState({
						filteredPlayers: this.state.allPlayers.slice(0, 50),
					});
				});
			})
			.catch(function(error) {
				console.log('error fetching all player data', error);
			});

		axios.get('/teams').then(response => {
			this.setState({ allTeams: response.data });
		});
	}

	onFilterParameterChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onTeamSelectFieldChange(event, index, value) {
		this.setState({ TEAM: [value, event.target.innerText] });
	}

	onPositionSelectFieldChange(event, index, value) {
		this.setState({ POS: [value, event.target.innerText] });
	}

	handleToggle(event, toggle) {
		this.setState({ expandFilters: toggle });
	}

	handleApplyFilters() {
		var filteredPlayers = this.state.allPlayers;
		if (this.state.TEAM[0] > 0) {
			let teamAbbrev = this.state.TEAM[1];
			filteredPlayers = this.state.allPlayers.filter(
				player => player.TEAM === teamAbbrev
			);
		}
		if (this.state.POS[0] > 0) {
			let position = this.state.POS[1];
			filteredPlayers = filteredPlayers.filter(
				player => player.POS === position
			);
		}
		if (this.state.FIRST.length > 0) {
			let firstname = this.state.FIRST;
			filteredPlayers = filteredPlayers.filter(player =>
				player.FN.toLowerCase().includes(firstname.toLowerCase())
			);
		}
		if (this.state.LAST.length > 0) {
			let lastname = this.state.LAST;
			filteredPlayers = filteredPlayers.filter(player =>
				player.LN.toLowerCase().includes(lastname.toLowerCase())
			);
		}

		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state.GP,
			'GP'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state.NUM,
			'NUM'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['MIN/G'],
			'MIN/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['PTS/G'],
			'PTS/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['2PA/G'],
			'2PA/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['2PM/G'],
			'2PM/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['2PT%'],
			'2PT%'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['3PA/G'],
			'3PA/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['3PM/G'],
			'3PM/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['3PT%'],
			'3PT%'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['FTA/G'],
			'FTA/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['FTM/G'],
			'FTM/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['FT%'],
			'FT%'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['REB/G'],
			'REB/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['AST/G'],
			'AST/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['STL/G'],
			'STL/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['BLK/G'],
			'BLK/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['TO/G'],
			'TO/G'
		);
		filteredPlayers = convertQueryIntoFilters(
			filteredPlayers,
			this.state['SLRY'],
			'SLRY'
		);
		if (filteredPlayers.length > 0) {
			this.setState({ filteredPlayers: filteredPlayers });
		} else {
			this.setState({ filteredPlayers: 'No Results' });
		}
	}

	handleRemoveFilters() {
		this.setState({
			filteredPlayers: this.state.allPlayers.slice(0, 50),
			TEAM: [0, 'Any Team'],
			FIRST: '',
			LAST: '',
			NUM: '',
			POS: [0, 'All'],
			GP: '',
			'MIN/G': '',
			'PTS/G': '',
			'2PA/G': '',
			'2PM/G': '',
			'2PT%': '',
			'3PA/G': '',
			'3PM/G': '',
			'3PT%': '',
			'FTA/G': '',
			'FTM/G': '',
			'FT%': '',
			'REB/G': '',
			'AST/G': '',
			'STL/G': '',
			'BLK/G': '',
			'TO/G': '',
			SLRY: '',
		});
	}

	render() {
		return (
			<Paper style={spdPaperStyle}>
				<div className="container">
					<h1 id="appName">All Players</h1>
					<RaisedButton
						style={directButton}
						label="Return to Team Selection"
						containerElement={<Link to="/" />}
					/>
				</div>
				<div style={{ height: 'auto', width: '100%' }}>
					<Card expanded={this.state.expandFilters}>
						<CardText>
							<Toggle
								toggled={this.state.expandFilters}
								onToggle={this.handleToggle}
								labelPosition="left"
								label="Player Filter Options"
							/>
						</CardText>
						<CardText expandable={true}>
							<div>
								<div>
									<h1>Quick Filter Guide</h1>
									<p style={{ fontSize: '18px' }}>
										<b>
											All fields except Team, Position, First Name, and Last Name can accept 3
											types of input. Here are examples:
										</b>
										<br />
										<span style={{ fontSize: '15px' }}>
											<b><i>"&gt; 30"</i></b> - Returns all players that have the
											stat value
											greater than 30
										</span>
										<br />
										<span style={{ fontSize: '15px' }}>
											<b><i>"&lt; 6.5"</i></b> - Returns all players that have the
											stat value less
											than 6.5
										</span>
										<br />
										<span style={{ fontSize: '15px' }}>
											<b><i>"between 7 and 9"</i></b> - Return all players that
											have the stat value between 7 and 9 inclusively
										</span>
										<br />
										<span style={{ fontSize: '13px' }}>
											<i>
												*Note: Search results will only show up to 50 players.
												By default it will show the top 50 players in desc Points Per Game
											</i>
										</span>
									</p>
									<h3>Team</h3>
									<SelectField
										name="TEAM"
										floatingLabelText="Team"
										value={this.state['TEAM'][0]}
										style={selectFieldStyle}
										onChange={this.onTeamSelectFieldChange}
									>
										<MenuItem value={0} primaryText="Any Team" />
										{this.state.allTeams.map((team, i) =>
											<MenuItem
												key={i}
												value={i + 1}
												primaryText={team.abbreviation}
											/>
										)}
									</SelectField>
									<SelectField
										name="POS"
										floatingLabelText="Position"
										value={this.state['POS'][0]}
										style={selectFieldStyle}
										onChange={this.onPositionSelectFieldChange}
									>
										<MenuItem value={0} primaryText="All" />
										{['PG', 'SG', 'SF', 'PF', 'C'].map((position, i) =>
											<MenuItem key={i} value={i + 1} primaryText={position} />
										)}
									</SelectField>
								</div>
								<div>
									<h3>Player Info</h3>
									<TextField
										name="FIRST"
										value={this.state['FIRST']}
										onChange={this.onFilterParameterChange}
										hintText="Example: Kyrie"
										floatingLabelText="First Name"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="LAST"
										value={this.state['LAST']}
										onChange={this.onFilterParameterChange}
										hintText="Example: Irving"
										floatingLabelText="Last Name"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="NUM"
										value={this.state['NUM']}
										onChange={this.onFilterParameterChange}
										hintText="Example: < 8"
										floatingLabelText="Number"
										floatingLabelFixed={true}
										style={filterFields}
									/>
								</div>
							</div>
							<div>
								<div>
									<h3>Basic Stats</h3>
									<TextField
										name="PTS/G"
										value={this.state['PTS/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 25"
										floatingLabelText="Pts Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="REB/G"
										value={this.state['REB/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 8.8"
										floatingLabelText="Rebounds per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="AST/G"
										value={this.state['AST/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: between 3.3 and 4.4"
										floatingLabelText="Assists Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="STL/G"
										value={this.state['STL/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 1.1"
										floatingLabelText="Steals Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="BLK/G"
										value={this.state['BLK/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 2"
										floatingLabelText="Blocks Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
								</div>
							</div>
							<div>
								<div>
									<h3>Field Goals</h3>
									<TextField
										name="2PA/G"
										value={this.state['2PA/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: < 10"
										floatingLabelText="2 Pt FG Att Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="2PM/G"
										value={this.state['2PM/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 4"
										floatingLabelText="2 Pt FG Made Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="3PA/G"
										value={this.state['3PA/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: between 3 and 6"
										floatingLabelText="3 Pt Att Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="3PM/G"
										value={this.state['3PM/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 4.2"
										floatingLabelText="3 Pt Made Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="FTA/G"
										value={this.state['FTA/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 6"
										floatingLabelText="FT Att Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="FTM/G"
										value={this.state['FTM/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 5"
										floatingLabelText="FT Made Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
								</div>
							</div>
							<div>
								<h3>Percentages</h3>
								<TextField
									name="2PT%"
									value={this.state['2PT%']}
									onChange={this.onFilterParameterChange}
									hintText="Example: > 30"
									floatingLabelText="2 Pt Field Goal %"
									floatingLabelFixed={true}
									style={filterFields}
								/>
								<TextField
									name="3PT%"
									value={this.state['3PT%']}
									onChange={this.onFilterParameterChange}
									hintText="Example: < 10"
									floatingLabelText="3 Pt Field Goal %"
									floatingLabelFixed={true}
									style={filterFields}
								/>
								<TextField
									name="FT%"
									value={this.state['FT%']}
									onChange={this.onFilterParameterChange}
									hintText="Example: between 80 and 90"
									floatingLabelText="FT %"
									floatingLabelFixed={true}
									style={filterFields}
								/>
							</div>
							<div>
								<div>
									<h3>Miscellaneous</h3>
									<TextField
										name="GP"
										value={this.state['GP']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 60"
										floatingLabelText="Games Played"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="MIN/G"
										value={this.state['MIN/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 30"
										floatingLabelText="Minutes Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="TO/G"
										value={this.state['TO/G']}
										onChange={this.onFilterParameterChange}
										hintText="Example: between 0 and 2"
										floatingLabelText="Turnovers Per Game"
										floatingLabelFixed={true}
										style={filterFields}
									/>
									<TextField
										name="SLRY"
										value={this.state['SLRY']}
										onChange={this.onFilterParameterChange}
										hintText="Example: < 6000000"
										floatingLabelText="Salary Per Year"
										floatingLabelFixed={true}
										style={filterFields}
									/>
								</div>
							</div>
							<div>
								<RaisedButton
									style={{ width: '200px', margin: '15px 0' }}
									label="Apply Filters"
									primary={true}
									onClick={this.handleApplyFilters}
								/>
								<RaisedButton
									style={{ width: '200px', margin: '15px 15px' }}
									label="Remove Filters"
									primary={true}
									onClick={this.handleRemoveFilters}
								/>
							</div>
						</CardText>
					</Card>
				</div>

				<PlayersTable
					allPlayers={this.state.allPlayers}
					filteredPlayers={this.state.filteredPlayers}
				/>
			</Paper>
		);
	}
}

export default AllPlayersDisplay;
