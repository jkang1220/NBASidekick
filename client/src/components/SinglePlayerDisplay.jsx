import React from 'react';
import axios from 'axios';
import c3 from 'c3';
import d3 from 'd3';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import PlayerBioTable from '../components/PlayerBioTable.jsx';
import PlayerBioBox from './PlayerBioBox.jsx';

const spdPaperStyle = {
	height: 950,
	width: '1200px',
	padding: 10,
	marginLeft : 'auto',
	marginRight :'auto',
	background: 'white',
	textAlign: 'center',
	display: 'block',
};

class SinglePlayerDisplay extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			playerGameLogs: [],
			playerSeasonStats: [],
			player: {},
			selectedStat: 'PtsPerGame'
		};
	}

	getSelectedStat(stat) {
		this.setState({ selectedStat: stat });
	}

	getPlayerGameLogs() {
		let playerid = this.props.playerID || this.props.match.params.playerID;
		axios
			.get('/playergames', {
				params: { playerID: playerid},
			})
			.then(response => {
				if (response.data.length > 0) {
					this.setState({ playerGameLogs: response.data }, () => {
						this.generateGraph(this.state.selectedStat);
					});
				} else {
					this.setState({ playerGameLogs: ['No Games Played'] });
				}
			});
	}

	getPlayerSeasonStats() {
		axios
			.get('/playerseason', {
				params: { playerID: this.props.playerID || this.props.match.params.playerID},
			})
			.then(response => {
				this.setState({ playerSeasonStats: response.data });
			});
	}

	getPlayer() {
		axios
			.get('/player', {
				params: { playerID: this.props.playerID || this.props.match.params.playerID},
			})
			.then(response => {
				this.setState({ player: response.data[0].player });
			});
	}

	statClickHandler(e) {
		let statName = e.currentTarget.textContent.split(':')[0];
		this.setState({ selectedStat: statName }, () => {
			this.generateGraph(this.state.selectedStat);
		});
	}

	componentWillMount() {
		this.getPlayerGameLogs();
		this.getPlayerSeasonStats();
		this.getPlayer();
	}

	generateGraph(statName = 'PtsPerGame') {
		var last15games = this.state.playerGameLogs.slice(-15);
		var yLabel;

		if (statName === 'MinsPerGame' || statName === 'MinSecondsPerGame') {
			var statName = 'MinsPerGame';
			var statY_values = last15games.map((game, i) => {
				return Math.round(game.stats[statName]['#text'] * 10 / 60 / 10);
			});
		} else {
			var statY_values = last15games.map((game, i) => {
				return game.stats[statName]['#text'];
			});
		}

		if (statName === 'MinsPerGame' || statName === 'MinSecondsPerGame') {
			yLabel = 'Minutes';
		} else if (statName === 'PtsPerGame') {
			yLabel = 'Points';
		} else if (statName === 'AstPerGame') {
			yLabel = 'Assists';
		} else if (statName === 'RebPerGame') {
			yLabel = 'Rebounds';
		} else if (statName === 'FgPct') {
			yLabel = 'Field Goal %';
		} else if (statName === 'Fg2PtPct') {
			yLabel = '2-Pt Field Goal %';
		} else if (statName === 'Fg3PtPct') {
			yLabel = '3-Pt Field Goal %';
		} else if (statName === 'FtPct') {
			yLabel = 'Free Throw %';
		} else if (statName === 'PlusMinusPerGame') {
			yLabel = 'PlusMinus';
		} else if (statName === 'StlPerGame') {
			yLabel = 'Steals';
		} else if (statName === 'BlkPerGame') {
			yLabel = 'Blocks';
		}
		statY_values.unshift(yLabel + '');

		var gameDetails = last15games.map((game, i) => {
			if (
				game.game.homeTeam.Abbreviation !== (this.props.teamName || this.props.match.params.teamName)
			) {
				var X_value = `@ ${game.game.homeTeam.Abbreviation} ${game.game.date}`;
			} else {
				var X_value = `vs ${game.game.awayTeam.Abbreviation} ${game.game.date}`;
			}
			return X_value;
		});

		var chart = c3.generate({
			bindto: '#chart',
			data: {
				columns: [statY_values],
			},
			size: {
				height: 500,
				width: 900,
			},
			axis: {
				x: {
					text: 'Games',
					type: 'category',
					categories: gameDetails,
					tick: {
						rotate: 45,
					},
				},
				y: {
					label: {
						text: yLabel,
						position: 'outer-middle',
					},
				},
			},
		});
	}

	render() {
		console.log('this.props from SPD', this.props);
		return (
			// <div className="center">
				<Paper style={spdPaperStyle}>
					<PlayerBioBox
						teamName={this.props.teamName || this.props.match.params.teamName}
						playerID={this.props.playerID || this.props.match.params.playerID}
						playerSeasonStats={this.state.playerSeasonStats}
						player={this.state.player}
						showReturnTeamButton ={this.props.showReturnTeamButton === undefined ? true : false}
					/>
					<div className="statGraphContainer">
						<div className="box1">
							<PlayerBioTable
								generateGraph={this.generateGraph.bind(this)}
								getSelectedStat={this.getSelectedStat.bind(this)}
								playerSeasonStats={this.state.playerSeasonStats}
							/>
						</div>
						{this.state.playerGameLogs.length > 0 &&
							this.state.playerGameLogs[0] !== 'No Games Played'
							? <div className="box2" id="chart" />
							: this.state.playerGameLogs[0] === 'No Games Played'
								? <h2>This Player has no recent games</h2>
								: <div>
										<h2>Fetching Last 15 Games</h2>
										<CircularProgress
											size={60}
											style={{ marginTop: '200px' }}
											size={80}
											thickness={5}
										/>
									</div>}
					</div>
				</Paper>
			// </div>
		);
	}
}

export default SinglePlayerDisplay;
