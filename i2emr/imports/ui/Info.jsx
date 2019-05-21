import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

class Info extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  makeInfoEntry(field) {
    // onClick={this.selectStation.bind(this, station)}
    // console.log(field);
    return (
      <Fragment>
        <Button variant="text" fullWidth={true} >
          {field[0] + ": " + field[1]}
        </Button>
      </Fragment>
    );
  }

  generalInfo() {
    return (
      <Fragment>
        <Typography>
          Name: {this.props.patientInfo.name}
        </Typography>
        <Divider />
        <Typography>
          Age: {this.props.patientInfo.age}
        </Typography>
        <Divider />
        <Typography>
          Spoken Languages: {typeof this.props.patientInfo.spokenLanguages !== 'undefined' && 
            this.props.patientInfo.spokenLanguages.join(", ")}
        </Typography>
        <Divider />
        <Typography>
          Drug Allergies: {this.props.patientInfo.drugAllergies}
        </Typography>
      </Fragment>
    );
  }

  allInfo() {
    // Convert object to nested array
    // [ [field_name, value], ... ]
    var previousInfo = Object.entries(this.props.patientInfo);
    // Filter out unwanted fields
    const fieldsToRemove = ["_id", "stationQueue", "nextStation", "createdAt", "busy"];
    previousInfo = previousInfo.filter(field => !fieldsToRemove.includes(field[0]));

    const listInfo = previousInfo.map(
      field => this.makeInfoEntry(field)
    );

    return (
      <div>
        {listInfo}
      </div>
    )
  }

  render() {

    return (
      <Paper elevation={1}>
        <AppBar position="static" color="default">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="Summary" />
            <Tab label="All Info" />
          </Tabs>
        </AppBar>
        {this.state.value === 0 && this.generalInfo()}
        {this.state.value === 1 && this.allInfo()}
      </Paper>
    );
  }
}

export default Info;