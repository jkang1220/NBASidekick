import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '15px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


class PlayerBioTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fixedHeader: false,
        fixedFooter: false,
        stripedRows: true,
        showRowHover: true,
        selectable: true,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: false,
        height: '750px',
        width: '20%', 
      }
    }
  
  handleTableRowClick(e) {
    let category = '';
    if (e === 1) {
      category = 'MinSecondsPerGame';
    } else if (e === 2) {
      category = 'PtsPerGame';    
    } else if (e === 3) {
      category = 'AstPerGame';  
    } else if (e === 4) { 
      category = 'RebPerGame';
    } else if (e === 5) {
      category = 'FgPct';
    } else if (e === 6) {
      category = 'Fg2PtPct';
    } else if (e === 7) {
      category = 'Fg3PtPct';
    } else if (e === 8) {
      category = 'FtPct';
    } else if (e === 9) {
      category = 'PlusMinusPerGame';
    } else if (e === 10) {
      category = 'StlPerGame';
    } else if (e === 11) {
      category = 'BlkPerGame';
    }
    this.props.getSelectedStat(category);
    this.props.generateGraph(category);
  }

  render() {
    return (
      <div className = "center">
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          style= {{width: this.state.width}}
          onCellClick = {this.handleTableRowClick.bind(this)}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold', backgroundColor: '#cecece'}}>GP</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center', backgroundColor: '#cecece'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.GamesPlayed['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold'}}>MIN/G</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.playerSeasonStats.length > 0 ? Math.round(this.props.playerSeasonStats[0].stats.MinSecondsPerGame['#text']*10/60)/10 : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold', backgroundColor: '#cecece'}}>PPG</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center', backgroundColor: '#cecece'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.PtsPerGame['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold'}}>APG</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.AstPerGame['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold', backgroundColor: '#cecece'}}>RPG</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center', backgroundColor: '#cecece'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.RebPerGame['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold'}}>FG%</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.FgPct['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold', backgroundColor: '#cecece'}}>FG 2PT%</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center', backgroundColor: '#cecece'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.Fg2PtPct['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold'}}>FG 3Pt%</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.Fg3PtPct['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold', backgroundColor: '#cecece'}}>FT%</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center', backgroundColor: '#cecece'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.FtPct['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold'}}>+/-PG</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.PlusMinusPerGame['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold', backgroundColor: '#cecece'}}>STLPG</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center', backgroundColor: '#cecece'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.StlPerGame['#text'] : ''}</TableRowColumn>
            </TableRow>
            <TableRow style={{border:'2px solid black'}}>
                <TableRowColumn style={{textAlign: 'center', fontWeight:'bold'}}>BLKPG</TableRowColumn>
                <TableRowColumn style={{textAlign: 'center'}}>{this.props.playerSeasonStats.length > 0 ? this.props.playerSeasonStats[0].stats.BlkPerGame['#text'] : ''}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>);
    }
}

export default PlayerBioTable;
