import React, { Component } from 'react';
import Station from './Station.jsx';
import Queue from './Queue.jsx';
import Form from './Form.jsx';

import Patientinfo from '/imports/api/patientinfo';
import Stationforms from '/imports/api/stationforms';

export default class App extends Component {
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
          <Queue station={this.state.station} numOfPatients={Patientinfo.find().count()} />
          <Form station={this.state.station} formData={Stationforms.find({name: this.state.station}).fetch()} />
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
