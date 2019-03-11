import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Station from './Station.jsx';
import Queue from './Queue.jsx';
import Form from './Form.jsx';

import Patientinfo from '/imports/api/patientinfo';

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
    currentPatient: "",
    links: ["Registration","Height & weight","CBG & Hb","Phlebotomy","Blood pressure"],
  }

  selectStation(newStation, e) {
    e.preventDefault();

    Session.set("station",newStation);

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
    const station = Session.get('station');

    if ( station ) {
      return (
        <div>
          <Grid container justify="center">
            <Button variant="outlined" onClick={this.selectStation.bind(this, "")}>Back</Button>
            <br />
            <Station station={station} />
          </Grid>
          <Grid container justify="center" spacing={16}>
            {station != "Registration" &&
              <Grid item xs={12}>
                <Queue patientList={this.props.patientList} />
              </Grid>
            }
            <Grid item xs={12}>
              <Paper square={false} m={120}>
                <Form station={station} id={this.props.id} />
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
          <h1>Select Station </h1>
          {links}
        </div>
      );
    }
    
  }
}
const AppContainer = withTracker(() => {
  const station = Session.get('station');
  const patientList = Patientinfo.find({nextStation:station}).fetch();

  newID = (patientList.length > 0) ? patientList[0].id : null;

  return {
    patientList: patientList,
    id: newID,
  };
})(App);

// Define the schema
PatientSchema = new PatientSchema({
  Name: {
    type: String,
    label: "Name",
    max: 200
  },
  ID: {
    type: String,
    label: "ID"
  },
  Height: {
    type: Number,
    label: "Height",
    min: 0
  },
  Weight: {
    type: Number,
    label: "Weight",
    min: 0
  }
});

// Validate an object against the schema
obj = {Name: "Tom", ID: "123"};

isValid = PatientSchema.namedContext("myContext").validate(obj);
// OR
isValid = PatientSchema.namedContext("myContext").validateOne(obj, "keyToValidate");
// OR
isValid = Match.test(obj, PatientSchema);
// OR
check(obj, PatientSchema);

// Validation errors are available through reactive methods
if (Meteor.isClient) {
  Meteor.startup(function() {
    Tracker.autorun(function() {
      var context = PatientSchema.namedContext("myContext");
      if (!context.isValid()) {
        console.log(context.invalidKeys());
      }
    });
  });
}





// export default withStyles(styles)(App);