import React, { Component } from 'react';

export default class Station extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.station}</h1>
      </div>
    );
  }
}
