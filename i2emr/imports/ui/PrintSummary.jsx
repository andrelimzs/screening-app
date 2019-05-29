import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class PrintSummary extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    const newForm = (info) => (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Typography variant="h4">PERSONAL INFORMATION</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={12}>Name: <TextField variant="outlined" fullWidth={true} value={info["Patient Info"].name} /></Grid>
        </Grid><br />
        <Divider />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Gender: <TextField variant="outlined" fullWidth={true} name="gender" value={info["Patient Info"].gender} /></Grid>
          <Grid item xs={6}>Birthdate: <TextField variant="outlined" fullWidth={true} name="birthday" value={info["Patient Info"].birthday} /></Grid>
        </Grid><br />
        <Divider />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Date of Screening: <TextField variant="outlined" fullWidth={true} name="dateOfScreening" value={
            info.lastSubmit.getDate() + "/" + info.lastSubmit.getMonth() + "/" + info.lastSubmit.getFullYear()}/></Grid>
          <Grid item xs={6}>Age: <TextField variant="outlined" fullWidth={true} name="age" value={info["Patient Info"].age} /></Grid>
        </Grid><br />
        <Divider />
        
        <Typography variant="h4">HEIGHT & WEIGHT</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4}>Height:
            <TextField variant="outlined" fullWidth={true} name="height" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].height : "-"} />
          </Grid>
          <Grid item xs={4}>Weight:
            <TextField variant="outlined" fullWidth={true} name="weight" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].weight : "-"} />
          </Grid>
          <Grid item xs={4}>BMI:
            <TextField variant="outlined" fullWidth={true} name="bmi" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].bmi : "-"} />
          </Grid>
        </Grid><br />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Child height assessment:
            <TextField variant="outlined" fullWidth={true} name="childHeightAssessment" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childHeightAssessment : "-"}/>
          </Grid>
          <Grid item xs={6}>Child weight assessment:
            <TextField variant="outlined" fullWidth={true} name="childWeightAssessment" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childWeightAssessment : "-"}/>
          </Grid>
        </Grid><br />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Child BMI assessment:
            <TextField variant="outlined" fullWidth={true} name="childBmiAssessment" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childBmiAssessment : "-"}/>
          </Grid>
          <Grid item xs={6}>Adult BMI assessment:
            <TextField variant="outlined" fullWidth={true} name="adultBmiAssessment" value={
              (typeof(info["Height & weight"]) === "undefined") ? "-" : 
                (info["Height & weight"][0].bmi < 18.5) ? "Underweight (BMI < 18.5)" :
                (info["Height & weight"][0].bmi < 23.0) ? "Normal (18.5 <= BMI < 23.0)" :
                (info["Height & weight"][0].bmi < 25.0) ? "Overweight (23.0 <= BMI < 25.0)" :
                "Obease (BMI >= 25.0"
            } />
          </Grid>
        </Grid><br />
        <Divider />

        <Typography variant="h4">WAIST : HIP RATIO</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4}>Waist:
            <TextField variant="outlined" fullWidth={true} name="waist" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].waist : "-"}/>
          </Grid>
          <Grid item xs={4}>Hip:
            <TextField variant="outlined" fullWidth={true} name="hip" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].hip : "-"}/>
          </Grid>
          <Grid item xs={4}>Waist:Hip
            <TextField variant="outlined" fullWidth={true} name="waistHipRatio" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].waistHipRatio : "-"}/>
          </Grid>
        </Grid><br />
        <Divider />

        <Typography variant="h4">DIABETES RISK ASSESSMENT & CAPILLARY BLOOD GLUCOSE</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={3}>Diabetes Risk:
            <TextField variant="outlined" fullWidth={true} name="diabetesRisk" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].riskAssessRiskLevel : "-"}/>
          </Grid>
          <Grid item xs={3}>CBG
            <TextField variant="outlined" fullWidth={true} name="cbg" value={
              (typeof(info["Blood Glucose & Hb"]) !== "undefined") ? info["Blood Glucose & Hb"][0].cbg : "-"}/>
          </Grid>
          <Grid item xs={3}>HB
            <TextField variant="outlined" fullWidth={true} name="hb" value={
              (typeof(info["Blood Glucose & Hb"]) !== "undefined") ? info["Blood Glucose & Hb"][0].hb : "-"}/>
          </Grid>
          <Grid item xs={3}>
            Average BP:
            <TextField variant="outlined" fullWidth={true} name="bpAvgSys" value={
              (typeof(info["Blood Pressure"]) !== "undefined") ? 
                (Number(info["Blood Pressure"][0].bp1Sys)+
                  Number(info["Blood Pressure"][0].bp2Sys))/2  : "-"}/>
            <TextField variant="outlined" fullWidth={true} name="bpAvgDia" value={
              (typeof(info["Blood Pressure"]) !== "undefined") ?
                (Number(info["Blood Pressure"][0].bp1Dia)+
                  Number(info["Blood Pressure"][0].bp2Dia))/2 : "-"}/>
          </Grid>
        </Grid><br />
        
        <Typography variant="h4">DOCTOR'S NOTES</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={12}>Doctor's Consult:
            <TextField variant="outlined" fullWidth={true} multiline={true} name="docConsult2" value={
              (typeof(info["Doctors' Consult"]) !== "undefined") ? info["Doctors' Consult"][0].docConsult2 : "-"}/>
          </Grid>
        </Grid><br />


        <Typography variant="h4">VISUAL ACUITY</Typography>

      </Grid>
    );
    console.log(this.props.id);
    return (
      <Paper elevation={0} p={0} m={0}>
        {typeof(this.props.id) === "number" && newForm(this.props.patientInfo)}
      </Paper>
    );
  }
}

export default PrintSummary;