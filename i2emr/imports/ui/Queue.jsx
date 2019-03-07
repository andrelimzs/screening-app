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

export default withTracker(() => {
  return {
    patients: Patientinfo.find({}).fetch()
  };
})(Queue);