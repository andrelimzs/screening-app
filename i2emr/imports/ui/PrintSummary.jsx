import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
        {/* <Typography >PERSONAL INFORMATION</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={12}>Name: <TextField variant="outlined" fullWidth={true} margin="dense" defaultValue={info["Patient Info"].name} /></Grid>
        </Grid><br />
        <Divider />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Gender: <TextField variant="outlined" fullWidth={true} margin="dense" name="gender" defaultValue={info["Patient Info"].gender} /></Grid>
          <Grid item xs={6}>Birthdate: <TextField variant="outlined" fullWidth={true} margin="dense" name="birthday" defaultValue={info["Patient Info"].birthday} /></Grid>
        </Grid><br />
        <Divider />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Date of Screening: <TextField variant="outlined" fullWidth={true} margin="dense" name="dateOfScreening" defaultValue={
            info.lastSubmit.getDate() + "/" + (info.lastSubmit.getMonth()+1) + "/" + info.lastSubmit.getFullYear()}/></Grid>
          <Grid item xs={6}>Age: <TextField variant="outlined" fullWidth={true} margin="dense" name="age" defaultValue={info["Patient Info"].age} /></Grid>
        </Grid><br />
        <Divider />
        
        {/* <Typography >HEIGHT & WEIGHT</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4}>Height (m):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="height" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].height : "-"} />
          </Grid>
          <Grid item xs={4}>Weight (kg):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="weight" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].weight : "-"} />
          </Grid>
          <Grid item xs={4}>BMI (kg/m2):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="bmi" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].bmi : "-"} />
          </Grid>
        </Grid><br />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Child height assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childHeightAssessment" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childHeightAssessment : "-"}/>
          </Grid>
          <Grid item xs={6}>Child weight assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childWeightAssessment" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childWeightAssessment : "-"}/>
          </Grid>
        </Grid><br />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Child BMI assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childBmiAssessment" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childBmiAssessment : "-"}/>
          </Grid>
          <Grid item xs={6}>Adult BMI assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="adultBmiAssessment" defaultValue={
              (typeof(info["Height & weight"]) === "undefined") ? "-" : 
                (info["Height & weight"][0].bmi < 18.5) ? "Underweight (BMI < 18.5)" :
                (info["Height & weight"][0].bmi < 23.0) ? "Normal (18.5 <= BMI < 23.0)" :
                (info["Height & weight"][0].bmi < 25.0) ? "Overweight (23.0 <= BMI < 25.0)" :
                "Obese (BMI >= 25.0)"
            } />
          </Grid>
        </Grid><br />
        <Divider />

        {/* <Typography >WAIST : HIP RATIO</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4}>Waist (cm):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="waist" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].waist : "-"}/>
          </Grid>
          <Grid item xs={4}>Hip (cm):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="hip" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].hip : "-"}/>
          </Grid>
          <Grid item xs={4}>Waist:Hip Ratio
            <TextField variant="outlined" fullWidth={true} margin="dense" name="waistHipRatio" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].waistHipRatio : "-"}/>
          </Grid>
        </Grid><br />
        <Divider />

        {/* <Typography >DIABETES RISK ASSESSMENT & CAPILLARY BLOOD GLUCOSE</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={3}>Diabetes Risk:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="diabetesRisk" defaultValue={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].riskAssessRiskLevel : "-"}/>
          </Grid>
          <Grid item xs={3}>Blood Glucose
            <TextField variant="outlined" fullWidth={true} margin="dense" name="cbg" defaultValue={
              (typeof(info["Blood Glucose & Hb"]) !== "undefined") ? String(info["Blood Glucose & Hb"][0].cbg) + " mg/dL" : "-"}/>
          </Grid>
          <Grid item xs={3}>Haemoglobin
            <TextField variant="outlined" fullWidth={true} margin="dense" name="hb" defaultValue={
              (typeof(info["Blood Glucose & Hb"]) !== "undefined") ? String(info["Blood Glucose & Hb"][0].hb) + " g/dL" : "-"}/>
          </Grid>
          <Grid item xs={2}>
            Average Blood Pressure:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="bpAvgSys" defaultValue={
              (typeof(info["Blood Pressure"]) !== "undefined") ? 
                String((Number(info["Blood Pressure"][0].bp1Sys)+
                  Number(info["Blood Pressure"][0].bp2Sys))/2) + "/" +
                  String((Number(info["Blood Pressure"][0].bp1Dia)+
                    Number(info["Blood Pressure"][0].bp2Dia))/2)
                  : "-"}/>
          </Grid>
        </Grid><br />
        
        {/* <Typography >DOCTOR'S NOTES</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={12}>Doctor's Notes:
            <TextField rows={13} variant="outlined" fullWidth={true} multiline={true} name="docConsult2" defaultValue={
              (typeof(info["Doctors' Consult"]) !== "undefined") ? info["Doctors' Consult"][0].docConsult2 : "-"}/>
          </Grid>
        </Grid><br />


        {/* <Typography >VISUAL ACUITY</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4}></Grid>
          <Grid item xs={4} justify="center">RIGHT</Grid>
          <Grid item xs={4} justify="center">LEFT</Grid>
        </Grid><br />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4} justify="center">WITHOUT GLASSES</Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childHeightAssessment" />
          </Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childWeightAssessment" />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4} justify="center">WITH GLASSES</Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childHeightAssessment" />
          </Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childWeightAssessment" />
          </Grid>
        </Grid>
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4} justify="center">NEAR VISION</Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childHeightAssessment" />
          </Grid>
          <Grid item xs={4}>
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childWeightAssessment" />
          </Grid>
        </Grid>

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={12}>Notes:
            <TextField rows={26} variant="outlined" fullWidth={true} margin="dense" multiline={true} name="docConsult2" />
          </Grid>
        </Grid><br />
        


        <Typography variant="h5">
        Please collect blood test report from Burla Kalayan Mandap on 7 June from 10am-12pm. Thank you.
        </Typography>
        <br />
        <Typography variant="h5">
        कृपया 7 जून को सुबह 10 से दोपहर 12 बजे तक बुर्ला कल्याण मंडप से अपनी रक्त परीक्षण रिपोर्ट एकत्र करें
        </Typography>
        <br />
        <Typography variant="h5">
        ଦୟ। କରି   ୭ଯୁନ୍ ରେ ସକ।ଳ ୧୦ ରୁ : ଦୂପହର ୧୨ଟ। ପର୍ଯନ୍ତ ବୁର୍ଲା କଲ୍ୟାଣ ମଣ୍ଡପ ରେ ଆପଣମାନଙ୍କର ରକ୍ତ ପରୀକ୍ଷା ର ରିପୋର୍ଟ ନେଇଯାନ୍ତୁ । ଧନ୍ୟବାଦ
        </Typography>

      </Grid>
    );
    
    return (
      <Paper elevation={0} p={0} m={0}>
        {typeof(this.props.id) === "number" && newForm(this.props.patientInfo)}
      </Paper>
    );
  }
}

export default PrintSummary;