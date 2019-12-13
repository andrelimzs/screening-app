import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';

import { infoLayouts } from '/imports/api/infoLayouts';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Info extends Component {
  constructor() {
    super();
  }

  render() {
    const station = Session.get('station');
    console.log(station)
    //const currentInfoLayout = infoLayouts[station];
    const basicPatientDetails = this.props.patientInfo['Basic Patient Information']
    const patientProfiling = this.props.patientInfo['Patient Profiling']
    const stationSelect = this.props.patientInfo['Station Select']
    const heightAndWeight = this.props.patientInfo['Height and Weight']
    const bloodGlucose = this.props.patientInfo['Blood Glucose and Hb']
    const bloodPressure = this.props.patientInfo['Blood Pressure']
    // const papSmear = this.props.patientInfo['Pap Smear']
    // console.log(currentInfoLayout(this.props.patientInfo))

    return (
      <Paper elevation={1}>
          <h2>BASIC PATIENT INFORMATION</h2>
          1. Name <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ1}</b>
          }
          <br />
          2. Gender
          <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ2}</b>}
          <br />
          3. Birthdate <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ3}</b>
          }
          <br />
          4. Age <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ4}</b>
          }
          <br />
          5. District Name
          <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ5}</b>
          }
          <br />
          6. Address
          <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ6}</b>
          }
          <br />
          7. Zip Code
          <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ7}</b>
          }
          <br />
          8. Contact Number
          <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ8}</b>
          }
          <br />
          9. Spoken Language<br />
          {basicPatientDetails &&

            <b>{basicPatientDetails.basicPatientInformationQ9}</b>
          }
          <br />
          10. Any drug allergic?

          <br />
          {basicPatientDetails &&
            <b>{basicPatientDetails.basicPatientInformationQ10}</b>
          }
          <br />

          11. Do you have any blood borne diseases?
          <br />
          {basicPatientDetails &&

            <b>{basicPatientDetails.basicPatientInformationQ11}</b>
          }
          <br />

          12. Doctor's Consult
          <br />
          Basic Patient Information: 
          {
            basicPatientDetails &&
            <b>{basicPatientDetails.doctorConsult}</b>
          }
          <br />
          Station Select:
          {
            stationSelect &&
            <b>{stationSelect.doctorConsult}</b>
          }
          <br />
          Height and Weight:
          {
            heightAndWeight &&
            <b>{heightAndWeight.doctorConsult}</b>
          }
          <br />
          Blood Glucose:
          {
            bloodGlucose &&
            <b>{bloodGlucose.doctorConsult}</b>
          }
          <br />
          Blood Pressure:
          {
            bloodPressure &&
            <b>{bloodPressure.doctorConsult}</b>
          }
          <br />

          <bt />
      </Paper>
    );
  }
}

export default Info;