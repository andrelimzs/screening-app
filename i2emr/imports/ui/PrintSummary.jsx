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
          <Grid item xs={12}>Name: <TextField variant="outlined" fullWidth={true} margin="dense" value={info["Patient Info"].name} /></Grid>
        </Grid><br />
        <Divider />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Gender: <TextField variant="outlined" fullWidth={true} margin="dense" name="gender" value={info["Patient Info"].gender} /></Grid>
          <Grid item xs={6}>Birthdate: <TextField variant="outlined" fullWidth={true} margin="dense" name="birthday" value={info["Patient Info"].birthday} /></Grid>
        </Grid><br />
        <Divider />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Date of Screening: <TextField variant="outlined" fullWidth={true} margin="dense" name="dateOfScreening" value={
            info.lastSubmit.getDate() + "/" + info.lastSubmit.getMonth() + "/" + info.lastSubmit.getFullYear()}/></Grid>
          <Grid item xs={6}>Age: <TextField variant="outlined" fullWidth={true} margin="dense" name="age" value={info["Patient Info"].age} /></Grid>
        </Grid><br />
        <Divider />
        
        {/* <Typography >HEIGHT & WEIGHT</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4}>Height (m):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="height" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].height : "-"} />
          </Grid>
          <Grid item xs={4}>Weight (kg):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="weight" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].weight : "-"} />
          </Grid>
          <Grid item xs={4}>BMI (kg/m2):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="bmi" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].bmi : "-"} />
          </Grid>
        </Grid><br />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Child height assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childHeightAssessment" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childHeightAssessment : "-"}/>
          </Grid>
          <Grid item xs={6}>Child weight assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childWeightAssessment" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childWeightAssessment : "-"}/>
          </Grid>
        </Grid><br />

        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={6}>Child BMI assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="childBmiAssessment" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].childBmiAssessment : "-"}/>
          </Grid>
          <Grid item xs={6}>Adult BMI assessment:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="adultBmiAssessment" value={
              (typeof(info["Height & weight"]) === "undefined") ? "-" : 
                (info["Height & weight"][0].bmi < 18.5) ? "Underweight (BMI < 18.5)" :
                (info["Height & weight"][0].bmi < 23.0) ? "Normal (18.5 <= BMI < 23.0)" :
                (info["Height & weight"][0].bmi < 25.0) ? "Overweight (23.0 <= BMI < 25.0)" :
                "Obease (BMI >= 25.0"
            } />
          </Grid>
        </Grid><br />
        <Divider />

        {/* <Typography >WAIST : HIP RATIO</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={4}>Waist (cm):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="waist" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].waist : "-"}/>
          </Grid>
          <Grid item xs={4}>Hip (cm):
            <TextField variant="outlined" fullWidth={true} margin="dense" name="hip" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].hip : "-"}/>
          </Grid>
          <Grid item xs={4}>Waist:Hip Ratio
            <TextField variant="outlined" fullWidth={true} margin="dense" name="waistHipRatio" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].waistHipRatio : "-"}/>
          </Grid>
        </Grid><br />
        <Divider />

        {/* <Typography >DIABETES RISK ASSESSMENT & CAPILLARY BLOOD GLUCOSE</Typography><br /> */}
        <Grid container direction="row" justify="space-between" alignItems="center" >
          <Grid item xs={3}>Diabetes Risk:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="diabetesRisk" value={
              (typeof(info["Height & weight"]) !== "undefined") ? info["Height & weight"][0].riskAssessRiskLevel : "-"}/>
          </Grid>
          <Grid item xs={3}>Blood Glucose
            <TextField variant="outlined" fullWidth={true} margin="dense" name="cbg" value={
              (typeof(info["Blood Glucose & Hb"]) !== "undefined") ? String(info["Blood Glucose & Hb"][0].cbg) + " mg/dL" : "-"}/>
          </Grid>
          <Grid item xs={3}>Haemoglobin
            <TextField variant="outlined" fullWidth={true} margin="dense" name="hb" value={
              (typeof(info["Blood Glucose & Hb"]) !== "undefined") ? String(info["Blood Glucose & Hb"][0].hb) + " g/dL" : "-"}/>
          </Grid>
          <Grid item xs={2}>
            Average Blood Pressure:
            <TextField variant="outlined" fullWidth={true} margin="dense" name="bpAvgSys" value={
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
            <TextField rows={13} variant="outlined" fullWidth={true} multiline={true} name="docConsult2" value={
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
        Please collect blood test report from Railway Community Hall after receiving a call from us. Thank you.
        </Typography>
        <br />
        <Typography variant="h5">
        ଯେତେବେଳେ ଆମେ ଆପଣଂକୁ ଫୋନ କରିବୁ,କୂପାକରି ରେଲବୌ ସାମୁଦାୟିକ ହଲ ରୁ ରକତ ପରୀକ୍ଷା ର ରିପୋଟ ନେଇଯାନତୁ ।          ଧନଐବାଦ
        </Typography>
        <br />
        <Typography variant="h5">
        जब हम आपको कॉल करते हैं, तो कृपया रेलवे सामुदायिक हॉल से रक्त परीक्षण रिपोर्ट एकत्र करें। धन्यवाद।
        </Typography>

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