import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class Queue extends Component {
  renderPatient() {

  }

  render() {
    console.log("Queue|patientList ", this.props.patientList);
    return (
      <div>
        <p>Number of patients: {this.props.patientList.length}</p>
      </div>
    );
  }
}

// const QueueContainer = withTracker(({ station }) => {
//   return {
//     patients: Patientinfo.find({nextStation:station}).fetch()
//   };
// })(Queue);

export default Queue;
