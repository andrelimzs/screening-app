import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Station from './Station.jsx';
import Queue from './Queue.jsx';
import Form from './Form.jsx';

import Patientinfo from '/imports/api/patientinfo';
import Stationforms from '/imports/api/stationforms';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {
  state = {
    station: "",
    currentPatient: "",
    links: ["Registration","Height & weight","CBG & Hb","Phlebotomy","Blood pressure"],
  }

  selectStation(newStation, e) {
    e.preventDefault();

    this.setState({
      station: newStation
    });

    this.forceUpdate()
  }

  makeStation(station) {
    return (
      <p>
        <Button variant="outlined" onClick={this.selectStation.bind(this, station)}>
          {station}
        </Button>
      </p>
    )
  }

  render() {
    if ( this.state.station ) {
      return (
        <div>
          <Grid container justify="center">
            <Button variant="outlined" onClick={this.selectStation.bind(this, "")}>Back</Button>
            <br />
            <Station station={this.state.station} />
          </Grid>
          <Grid container justify="center" spacing={16}>
            <Grid item xs={12}>
              <Paper square={false}>
                <Queue station={this.state.station} numOfPatients={this.props.numOfPatients} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper square={false}>
                <Form station={this.state.station} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      const links = this.state.links.map(
        link => this.makeStation(link)
      );

      return (
        <div>
          <h1>Select Station {this.state.station} </h1>
          {links}
        </div>
      );
    }
    
  }
}

export default withTracker(() => {
  return {
    numOfPatients: Patientinfo.find().count()
  };
})(App);

// export default withStyles(styles)(App);