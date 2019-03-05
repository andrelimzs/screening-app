import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Station from './Station.jsx';
import Queue from './Queue.jsx';
import Form from './Form.jsx';

import Patientinfo from '/imports/api/patientinfo';
import Stationforms from '/imports/api/stationforms';

class App extends Component {
  state = {
    station: "",
    currentPatient: "",
    links: ["Registration","Height & weight","CBG & Hb","Phlebotomy","Blood pressure"],
  }

  selectStation(newStation, e) {
    e.preventDefault();

    this.setState({
      station: newStation
    });

    this.forceUpdate()
  }

  makeStation(station) {
    return (
      <p>
        <button onClick={this.selectStation.bind(this, station)}>
          {station}
        </button>
      </p>
    )
  }

  render() {
    if ( this.state.station ) {
      return (
        <div>
          <a href="#" onClick={this.selectStation.bind(this, "")}>Back</a>
          <Station station={this.state.station} />
          <Queue station={this.state.station} numOfPatients={this.props.numOfPatients} />
          <Form station={this.state.station} />
        </div>
      );
    } else {
      const links = this.state.links.map(
        link => this.makeStation(link)
      );

      return (
        <div>
          <h1>Select Station {this.state.station} </h1>
          {links}
        </div>
      );
    }
    
  }
}

export default withTracker(() => {
  return {
    numOfPatients: Patientinfo.find().count()
  };
})(App);