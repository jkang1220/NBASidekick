import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import TextField from 'material-ui/TextField';
import DownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import UpArrow from 'material-ui/svg-icons/navigation/arrow-drop-up';
import SinglePlayerDisplay from './SinglePlayerDisplay.jsx';
import SelectField from 'material-ui/SelectField';
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
} from 'material-ui/Table';
import orderBy from 'lodash/orderBy';

const filterFields = {
	margin: '0px 10px',
	width: '210px',
};

const customContentStyle = {
	width: '90%',
	height: '100%',
	maxWidth: 'none'
	// marginLeft: 'auto',
	// marginRight: 'auto'
};

const spdPaperStyle = {
	height: '90%',
	width: '100%',
	padding: 10,
	marginLeft: 'auto',
	marginRight: 'auto',
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

const numberWithCommas = num => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

class PlayersTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filteredPlayers: props.filteredPlayers,
			columnToSort: '',
			sortDirection: 'asc',
			initialRender: true,
			open: false,
			selectedPlayer: '',
		};
		this.filterTable = this.filterTable.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleRowSelection = this.handleRowSelection.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({filteredPlayers: nextProps.filteredPlayers})
	}

	filterTable(category) {
		if (
			category === 'TEAM' ||
			category === 'FIRST' ||
			category === 'LAST' ||
			category === 'POS'
		) {
			this.setState(
				{
					columnToSort: category,
					sortDirection: this.state.columnToSort === category
						? invertDirection[this.state.sortDirection]
						: 'desc',
				},
				() => {
					this.setState({
						filteredPlayers: this.state.sortDirection === 'asc'
							? this.props.filteredPlayers.sort((a, b) => {
									var nameA = a[category].toUpperCase();
									var nameB = b[category].toUpperCase();
									if (nameA < nameB) {
										return -1;
									}
									if (nameA > nameB) {
										return 1;
									}
									return 0;
								})
							: this.props.filteredPlayers.sort((a, b) => {
									var nameA = a[category].toUpperCase();
									var nameB = b[category].toUpperCase();
									if (nameA > nameB) {
										return -1;
									}
									if (nameA < nameB) {
										return 1;
									}
									return 0;
								}),
					});
				}
			);
		} else {
			this.setState(
				{
					columnToSort: category,
					sortDirection: this.state.columnToSort === category
						? invertDirection[this.state.sortDirection]
						: 'desc',
				},
				() => {
					this.setState({
						filteredPlayers: this.state.sortDirection === 'asc'
							? this.props.filteredPlayers.sort((a, b) => {
									var nameA = a[category];
									var nameB = b[category];
									if (nameA < nameB) {
										return -1;
									}
									if (nameA > nameB) {
										return 1;
									}
									return 0;
								})
							: this.props.filteredPlayers.sort((a, b) => {
									var nameA = a[category];
									var nameB = b[category];
									if (nameA > nameB) {
										return -1;
									}
									if (nameA < nameB) {
										return 1;
									}
									return 0;
								}),
					});
				}
			);
		}
	}

	handleRowSelection(index) {
		this.setState({
			open: true,
			filteredPlayers: this.props.filteredPlayers,
			selectedPlayer: this.props.filteredPlayers[index]
		});
	}

	handleClose() {
		this.setState({ open: false });
	}

	render() {
		const actions = [
			<FlatButton label="Close" primary={true} onClick={this.handleClose} />,
		];

		if (
			this.props.filteredPlayers &&
			this.props.filteredPlayers.length > 0 &&
			this.props.filteredPlayers !== 'No Results'
		) {
			return (
				<div>
					<Dialog
						actions={actions}
						modal={true}
						contentStyle={customContentStyle}
						autoScrollBodyContent={true}
						open={this.state.open}
					>
						<SinglePlayerDisplay
							playerID={this.state.selectedPlayer['ID']}
							teamName={this.state.selectedPlayer['TEAM']}
							showReturnTeamButton={false}
						/>
					</Dialog>
					<Table
						height={'700px'}
						width={'100%'}
						fixedHeader={true}
						selectable={true}
						onRowSelection={this.handleRowSelection}
					>
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow
								onCellClick={event => {
									this.filterTable(event.target.attributes.value.value);
								}}
							>
								<TableHeaderColumn
									value="TEAM"
									style={tableCell}
									tooltip="Team"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'TEAM'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="TEAM" />
												: <DownArrow value="TEAM" />
											: null}
									</div>
									TEAM
								</TableHeaderColumn>
								<TableHeaderColumn
									value="FN"
									style={tableNameCell}
									tooltip="First Name"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'FN'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="FN" />
												: <DownArrow value="FN" />
											: null}
									</div>
									FIRST
								</TableHeaderColumn>
								<TableHeaderColumn
									value="LN"
									style={tableNameCell}
									tooltip="Last Name"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'LN'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="LN" />
												: <DownArrow value="LN" />
											: null}
									</div>
									LAST
								</TableHeaderColumn>
								<TableHeaderColumn
									value="NUM"
									style={tableCell}
									tooltip="Number"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'NUM'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="NUM" />
												: <DownArrow value="NUM" />
											: null}
									</div>
									NUM
								</TableHeaderColumn>
								<TableHeaderColumn
									value="POS"
									style={tableCell}
									tooltip="Position"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'POS'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="POS" />
												: <DownArrow value="POS" />
											: null}
									</div>
									POS
								</TableHeaderColumn>
								<TableHeaderColumn
									value="GP"
									style={tableCell}
									tooltip="Games Played"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'GP'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="GP" />
												: <DownArrow value="GP" />
											: null}
									</div>
									GP
								</TableHeaderColumn>
								<TableHeaderColumn
									value="MIN/G"
									style={tableCell}
									tooltip="Minutes Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'MIN/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="MIN/G" />
												: <DownArrow value="MIN/G" />
											: null}
									</div>
									MIN/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="PTS/G"
									style={tableCell}
									tooltip="Points Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'PTS/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="PTS/G" />
												: <DownArrow value="PTS/G" />
											: null}
									</div>
									PTS/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="2PA/G"
									style={tableCell}
									tooltip="2 Pt Att Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === '2PA/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="2PA/G" />
												: <DownArrow value="2PA/G" />
											: null}
									</div>
									2PA/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="2PM/G"
									style={tableCell}
									tooltip="2 Pt Made Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === '2PM/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="2PM/G" />
												: <DownArrow value="2PM/G" />
											: null}
									</div>
									2PM/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="2PT%"
									style={tableCell}
									tooltip="2 Pt Field Goal %"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === '2PT%'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="2PT%" />
												: <DownArrow value="2PT%" />
											: null}
									</div>
									2PT%
								</TableHeaderColumn>
								<TableHeaderColumn
									value="3PA/G"
									style={tableCell}
									tooltip="3 Pt Att Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === '3PA/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="3PA/G" />
												: <DownArrow value="3PA/G" />
											: null}
									</div>
									3PA/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="3PM/G"
									style={tableCell}
									tooltip="3 Pt Made Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === '3PM/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="3PM/G" />
												: <DownArrow value="3PM/G" />
											: null}
									</div>
									3PM/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="3PT%"
									style={tableCell}
									tooltip="3 Pt Field Goal %"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === '3PT%'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="3PT%" />
												: <DownArrow value="3PT%" />
											: null}
									</div>
									3PT%
								</TableHeaderColumn>
								<TableHeaderColumn
									value="FTA/G"
									style={tableCell}
									tooltip="FT Att Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'FTA/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="FTA/G" />
												: <DownArrow value="FTA/G" />
											: null}
									</div>
									FTA/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="FTM/G"
									style={tableCell}
									tooltip="Free Throw Made Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'FTM/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="FTM/G" />
												: <DownArrow value="FTM/G" />
											: null}
									</div>
									FTM/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="FT%"
									style={tableCell}
									tooltip="Free Throw %"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'FT%'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="FT%" />
												: <DownArrow value="FT%" />
											: null}
									</div>
									FT%
								</TableHeaderColumn>
								<TableHeaderColumn
									value="REB/G"
									style={tableCell}
									tooltip="Rebounds per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'REB/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="REB/G" />
												: <DownArrow value="REB/G" />
											: null}
									</div>
									REB/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="AST/G"
									style={tableCell}
									tooltip="Assists Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'AST/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="AST/G" />
												: <DownArrow value="AST/G" />
											: null}
									</div>
									AST/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="STL/G"
									style={tableCell}
									tooltip="Steals Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'STL/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="STL/G" />
												: <DownArrow value="STL/G" />
											: null}
									</div>
									STL/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="BLK/G"
									style={tableCell}
									tooltip="Blocks Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'BLK/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="BLK/G" />
												: <DownArrow value="BLK/G" />
											: null}
									</div>
									BLK/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="TO/G"
									style={tableCell}
									tooltip="Turnovers Per Game"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'TO/G'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="TO/G" />
												: <DownArrow value="TO/G" />
											: null}
									</div>
									TO/G
								</TableHeaderColumn>
								<TableHeaderColumn
									value="SLRY"
									style={tableSalaryCell}
									tooltip="Salary Per Year"
								>
									<div style={sortArrowStyle}>
										{this.state.columnToSort === 'SLRY'
											? this.state.sortDirection === 'asc'
												? <UpArrow value="SLRY" />
												: <DownArrow value="SLRY" />
											: null}
									</div>
									SLRY/Y
								</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody
							displayRowCheckbox={false}
							deselectOnClickaway={false}
							preScanRows={false}
							showRowHover={true}
							stripedRows={true}
						>
							{this.props.filteredPlayers.map((player, index) =>
								<TableRow key={index}>
									<TableRowColumn style={tableCell}>
										{player['TEAM']}
									</TableRowColumn>
									<TableRowColumn style={tableNameCell}>
										{player['FN'][0].toUpperCase() + player['FN'].slice(1)}
									</TableRowColumn>
									<TableRowColumn style={tableNameCell}>
										{player['LN'][0].toUpperCase() + player['LN'].slice(1)}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['NUM']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['POS']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['GP']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['MIN/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['PTS/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['2PA/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['2PM/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['2PT%']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['3PA/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['3PM/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['3PT%']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['FTA/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['FTM/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['FT%']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['REB/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['AST/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['STL/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['BLK/G']}
									</TableRowColumn>
									<TableRowColumn style={tableCell}>
										{player['TO/G']}
									</TableRowColumn>
									<TableRowColumn style={tableSalaryCell}>
										{numberWithCommas(player['SLRY'])}
									</TableRowColumn>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			);
		} else if (this.props.filteredPlayers === 'No Results') {
			return (
				<h3 className="seasonHeader">
					No Players Found, Please update your filter parameters and select
					Apply Filters again
				</h3>
			);
		} else {
			return (
				<Paper style={spdPaperStyle}>
					<h1>Loading Player Data</h1>
					<CircularProgress size={80} thickness={5} />
				</Paper>
			);
		}
	}
}

export default PlayersTable;
