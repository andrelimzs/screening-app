import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Station from './Station.jsx';
import Queue from './Queue.jsx';
import Form from './Form.jsx';
import Info from './Info.jsx';

import Patientinfo from '/imports/api/patientinfo';
import { formLayouts } from '/imports/api/formLayouts';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  spacing : 8,
  paper: {
    // padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  // textField: {
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  //   width: 10,
  // },
});

class App extends Component {
  state = {
    currentPatient: "",
    links: Object.keys(formLayouts).concat(["Finished Patients"]),
  }

  selectStation(newStation, e) {
    e.preventDefault();

    Session.set("station",newStation);

    const currentPatient = Session.get('currentPatient');
    if (currentPatient !==  null) {
      Meteor.call('patientinfo.setBusy', currentPatient, false);
      Session.set('currentPatient',null); 
    }

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
          
          <Button variant="outlined" onClick={this.selectStation.bind(this, "")}>Back</Button>
          <br />
          <Station station={station} />
          
          <Grid container
            justify="flex-start"
            spacing={16}>
            {station != "Registration" &&
              <Grid item xs={12}>
                <Queue patientList={this.props.patientList} />
              </Grid>
            }
            <Grid container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              spacing={16}
            >
              <Grid item xs={4}>
                {station !== "Finished Patients" && 
                  <Form station={station} id={Session.get('currentPatient')}
                        stationQueue={this.props.patientInfo.stationQueue} patientInfo={this.props.patientInfo}/>
                }
                {station === "Finished Patients" && typeof(this.props.patientList) !== "undefined" &&
                  console.log(Patientinfo.find({}).fetch())
                }
              </Grid>
              
              <Grid item xs={4}>
                {station !== "Registration" && 
                  <Info station={station} id={Session.get('currentPatient')} patientInfo={this.props.patientInfo} />
                }
              </Grid>

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
  const currentPatientID = Session.get('currentPatient');
  const patientList = Patientinfo.find(
    { $and:[{ nextStation: station }, { $or:[{ busy: false },{ id: currentPatientID }] }
    ]}).fetch();
  //, { sort: { lastSubmit: 1 } }
  // TODO - Find better way to sent patient info in
  // Retrieve current patient info for Info component
  // If no current patient, set to null
  const patientInfo = (currentPatientID !== undefined && currentPatientID !== null) ? 
                      Patientinfo.findOne({id:currentPatientID}) : {name: ""};
  // if (currentPatientID !== undefined && currentPatientID !== null) {
  //   console.log(currentPatientID);
  // }

  return {
    patientList: patientList,
    patientInfo: patientInfo,
  };
})(App);

export default withStyles(styles)(AppContainer);