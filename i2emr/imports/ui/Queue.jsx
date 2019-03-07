import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Queue extends Component {
  renderPatient() {

  }

  render() {
    return (
      <div>
        <p>Number of patients: {this.props.patients.length}</p>
      </div>
    );
  }
}

const QueueContainer = withTracker(({ station }) => {
  return {
    patients: Patientinfo.find({nextStation:station}).fetch()
  };
})(Queue);

export default QueueContainer;