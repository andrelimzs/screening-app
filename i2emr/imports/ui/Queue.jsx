import React, { Component } from 'react';

export default class Queue extends Component {
  render() {
    return (
      <div>
        <p>Number of patients: {this.props.numOfPatients}</p>
      </div>
    );
  }
}
