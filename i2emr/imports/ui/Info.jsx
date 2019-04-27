import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

class Info extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Typography>
          {this.props.patientInfo.name}
        </Typography>
        <Typography>
          {this.props.patientInfo.id}
        </Typography>
      </div>
    );
  }
}

export default Info;