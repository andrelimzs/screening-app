import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Info extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Paper elevation={1}>
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
      </Paper>
    );
  }
}

export default Info;