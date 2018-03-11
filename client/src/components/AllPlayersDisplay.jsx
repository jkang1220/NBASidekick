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
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import orderBy from 'lodash/orderBy';


const filterFields = {
	margin: '0px 10px',
	width: '210px',
};

const spdPaperStyle = {
	height: '90%',
	width: '100%',
	padding: 10,
	background: 'white',
	textAlign: 'center',
	display: 'inline-block',
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

class AllPlayersDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			allPlayers: [],
			filteredPlayers: [],
			expandFilters: false,
			TEAM: '',
			FIRST: '',
			LAST: '',
			GP: '',
			NUM: '',
			POS: '',
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
	}

	componentWillMount() {
		axios
			.get('/allplayers')
			.then(response => {
				this.setState({allPlayers: response.data},
					() => {
						this.setState({
							filteredPlayers: this.state.allPlayers.slice(0, 100),
						});
					}
				);
			})
			.catch(function(error) {
				console.log('error fetching all player data', error);
			});
	}

	onFilterParameterChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleToggle(event, toggle) {
		this.setState({ expandFilters: toggle });
	}

	handleRemoveFilters() {
		this.setState({
			filteredPlayers: this.state.allPlayers.slice(0, 100),
			TEAM: '',
			FIRST: '',
			LAST: '',
			NUM: '',
			POS: '',
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
			<div className="center">
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
									label="Show Filter Options"
								/>
							</CardText>
							<CardText expandable={true}>
								<div>
									<h4>Team Stats</h4>
									<div>
										<TextField
											name="TEAM"
											value={this.state['TEAM']}
											onChange={this.onFilterParameterChange}
											hintText="Example: BOS"
											floatingLabelText="Team Name"
											floatingLabelFixed={true}
											style={filterFields}
										/>
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
										<TextField
											name="POS"
											value={this.state['POS']}
											onChange={this.onFilterParameterChange}
											hintText="Example: = PG"
											floatingLabelText="Position"
											floatingLabelFixed={true}
											style={filterFields}
										/>
									</div>
								</div>
								<div>
									<h4>General</h4>
									<div>
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
											hintText="Example: > 6.8"
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
									<h4>Field Goals</h4>
									<div>
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
											hintText="Example: > 4"
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
									<h4>Percentages</h4>
									<TextField
										name="2PT%"
										value={this.state['2PT%']}
										onChange={this.onFilterParameterChange}
										hintText="Example: > 30"
										floatingLabelText="2 Pt FG %"
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
										hintText="Example: > 80"
										floatingLabelText="FT %"
										floatingLabelFixed={true}
										style={filterFields}
									/>
								</div>
								<div>
									<h4>Miscellaneous</h4>
									<div>
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
											hintText="Example: < 4"
											floatingLabelText="Turnovers Per Game"
											floatingLabelFixed={true}
											style={filterFields}
										/>
										<TextField
											name="SLRY"
											value={this.state['SLRY']}
											onChange={this.onFilterParameterChange}
											hintText="Example: < 10000000"
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

					<PlayersTable allPlayers={this.state.allPlayers} filteredPlayers={this.state.filteredPlayers}/>
				</Paper>
			</div>
		);
	}
}

export default AllPlayersDisplay;
