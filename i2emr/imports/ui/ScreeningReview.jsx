import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Search from './Search.jsx';
import Queue from './Queue.jsx';

const messageFilter = (text) => {
  return text;
}

const populateField = (info, station, field, reasonField) => {
  if (info && typeof (info[station]) !== "undefined" && typeof (info[station][field]) !== "undefined") {
    if (typeof (info[station][field]) == "array") {
      return info[station][field].join()
    }
    if (typeof (info[station][field]) == "boolean") {
      return info[station][field] ? "Yes" : "No"
    }
    // if (typeof(info[station][field]) == "String" && info[station][field].includes('\n')) {
    //     return info[station][field].split('\n').map((text) => {
    //         return <p>{text}<br/></p>
    //     })
    // }
    if (reasonField && typeof(info[station][reasonField]) !== "undefined") {
      return messageFilter(info[station][field]) + "\n" + info[station][reasonField]
    }
    else {
      return messageFilter(info[station][field]);
    }
  }
  return "-";
}

const getPastMedicalHistory = (info, printFlag) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ1']) !== "undefined") {
    // if (typeof (info[station][field]) == "Array") {
    //   return info[station][field].map((text) => {
    //     return text + ", ";
    //   })
    // }
    // if (typeof(info[station][field]) == "String" && info[station][field].includes('\n')) {
    //     return info[station][field].split('\n').map((text) => {
    //         return <p>{text}<br/></p>
    //     })
    // }
    if (info['Hx NSS']['hxNssQ1'].includes("No, I don't have any of the above \n(Please proceed to Q2d)")) {
      return "No"
    }
    else {
      return info['Hx NSS']['hxNssQ1'].map((text) => {
        return text + '\n'
      });
    }
  }
  return "-";
}

const getNoOfLines = (text) => {
  if (typeof(text) === "string") {
    return text.split('\n').length;
  }
  return 1;
}

const getBpMessage = (info, printFlag) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ17']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ18']) !== "undefined") {
    if (info['Hx Cancer'].hxCancerQ17 >= 130 || info['Hx Cancer'].hxCancerQ18 >= 85) {
      if (printFlag) {
        return "A healthy blood pressure reading is below 130/85 mmHg. Please see a GP if you have not been diagnosed with hypertension";
      }
      return "Blood pressure is high, please see a GP if you have not been diagnosed with hypertension";
    }
  }

  return "";
}

const getBmiMessage = (info, printFlag) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ21']) !== "undefined") {
    const bmi = info['Hx Cancer'].hxCancerQ21
    if (printFlag) {
      if (bmi >= 18.5 && bmi < 23) {
        return "According to Asian BMI ranges, you have a low risk of cardiovascular disease.";
      }
      if (bmi >= 23 && bmi < 27.5) {
        return "According to Asian BMI ranges, you have a moderate risk of cardiovascular disease.";
      }
      if (bmi >= 27.5 && bmi < 32.5) {
        return "According to Asian BMI ranges, you have a high risk of cardiovascular disease";
      }
      if (bmi >= 32.5 ) {
        return "According to Asian BMI ranges, you have a very high risk of cardiovascular disease.";
      }

      return ""
    }
    if (bmi >= 23) {
      return "BMI is overweight";
    }
    if (bmi <= 18.5) {
      return "BMI is underweight";
    }
  }
  return "";
}

const getIncontinenceMessage = (info, printFlag) => {
  if (info && typeof (info['Hx HSCR']) !== "undefined" && typeof (info['Hx HSCR']['hxHcsrQ5']) !== "undefined") {
      return "Check if participant is referred to Soceity for Continence Singapore (SFCS) booth at exhibition. If no, tick on PHS Passport and indicate";
  }
  return "";
}

const getHearingMessage = (info, printFlag) => {
  if (info && typeof (info['Hx HSCR']) !== "undefined" && typeof (info['Hx HSCR']['hxHcsrQ9']) !== "undefined") {
      return "If it is a Geri participant, inform them HPB will follow-up with them. If it is a non-Geri participant, advice them to visit a polyclinic to follow-up with their hearing issue";
  }
  return "";
}

const getVisionProblemMessage = (info, printFlag) => {
  if (info && typeof (info['Hx HSCR']) !== "undefined" && typeof (info['Hx HSCR']['hxHcsrQ7']) !== "undefined") {
      return "If participant is non-Geri and received Doctor's Memo --> Advice them to visit polyclinic with Doctor's Memo.\nIf participant is Geri, Snellens for both eyes is normal (denominator of 6/_ is smaller than 6/12) --> Patient possibly has pathology of the eye not picked up by Snellens--> Advice them to visit polyclinic/GP. \nIf participant is Geri, Snellens for either/both eye fail (denominator is 12 and above) --> Participant may have refractive error (can be corrected through spectacles prescription) or non-refractive error (not correctable through spectacles) --> Inform them that HPB will follow-up with their vision issues (both refractive and non-refractive); also for refractive error, participant should have received spectacle vouchers from Geri Appointment; for nonrefractive error participant should have seen the doctor at Doctor\'s Consult";
  }
  return "";
}

const getPinholeMessage = (info, printFlag) => {
  if (info && typeof (info['Geri - Vision']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ3']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ4']) !== "undefined") {
    if(info['Geri - Vision']['geriVisionQ3'] >= 12  || info['Geri - Vision']['geriVisionQ4'] >= 12){
      return "See VA with pinhole";
    }
  }
  return "";
}

const getRefractiveMessage = (info, printFlag) => {
  if (info && typeof (info['Geri - Vision']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ6']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ7']) !== "undefined") {
    if (printFlag) {
      if(info['Geri - Vision']['geriVisionQ3'] >= 12  || info['Geri - Vision']['geriVisionQ4'] >= 12){
        return "Non-refractive error";
      } else {
        return "Refractive error"
      }
    }
    if(info['Geri - Vision']['geriVisionQ3'] >= 12  || info['Geri - Vision']['geriVisionQ4'] >= 12){
      return "Non-refractive error, participant should have consulted on-site doctor";
    } else {
      return "Refractive error, participant should have received spectacles vouchers"
    }
  }
  return "";
}

const getMedicalHistoryMessage = (info, printFlag) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ1']) !== "undefined") {
      return "Check if participant is referred to Health Promotion Board (HPB) booth at Exhibition. If no, tick on PHS Passport and indicate";
  }
  return "";
}

const getFollowUpMessage = (info, printFlag) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ2']) !== "undefined") {
    if(info['Hx NSS']['hxNssQ2'] === "No"){
      return "Check if participant is referred to Health Promotion Board (HPB) booth at Exhibition. If no, tick on PHS Passport and indicate.";
    }
  }
  return "";
}

const getSmokingMessage = (info, printFlag) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ14']) !== "undefined") {
    if(info['Hx NSS']['hxNssQ14'].includes("Yes")){
      return "Check if participant is referred to Health Promotion Board (HPB) iQuit booth at Exhibition. If no, tick on PHS Passport and indicate.";
    }
  }
  return "";
}

const getAlcoholMessage = (info, printFlag) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ15']) !== "undefined") {
    if(info['Hx NSS']['hxNssQ15'] === "Less than 2 standard drinks per day on average." || info['Hx NSS']['hxNssQ15'] === "More than 2 standard drinks per day on average."){
      return "Check if participant is referred to Health Promotion Board (HPB) Metabolic booth at Exhibition. If no, tick on PHS Passport and indicate";
    }
  }
  return "";
}

const getFITMessage = (info, printFlag) => {
  if (info && typeof (info['FIT']) !== "undefined" && typeof (info['FIT']['fitQ2']) !== "undefined") {
    if (printFlag) {
      if(info['FIT']['fitQ2'] === "Yes"){
        return "Please follow the instructions provided and remember to mail out both of your kits within the stipulated time.";
      }
    }
    if(info['FIT']['fitQ2'] === "Yes"){
      return "Kindly remind the participant to adhere to the instructions regarding FIT kit application and sending. Teach the participant how to use the kit if he/she is unsure or has forgotten";
    }
  }
  return "";
}

const getWCEMessage = (info, printFlag) => {
  let message = []
  if (info && typeof (info['WCE']) !== "undefined" && typeof (info['WCE']['wceQ4']) !== "undefined" && typeof (info['WCE']['wceQ5']) !== "undefined" && typeof (info['WCE']['wceQ6']) !== "undefined") {
    if (printFlag) {
      if(info['WCE']['wceQ4'] === "Yes"){
        message.push("SCS will be in contact with you for your HPV test.");
      }
      if(info['WCE']['wceQ5'] === "Yes"){
        message.push("SCS will be in contact with you for your mammogram test.");
      }
      if(info['WCE']['wceQ6'].includes("Yes")){
        message.push("Please remember to go for your mammogram appointment with NHGD.");
      }
    }
  }
  return <Typography variant="subtitle1" color="error">{message.map( text => {
    return <div>text</div>
  })}</Typography>;
}

const getAmtAssessmentMessage = (info, printFlag) => {
  if (info && typeof (info['Geri - Cognitive Follow Up']) !== "undefined" && typeof (info['Geri - Cognitive Follow Up']['geriCognitiveFollowUpQ1']) !== "undefined") {
    if (printFlag) {
      if(info['Geri - Cognitive Follow Up']['geriCognitiveFollowUpQ1'].length > 1){
        return "The respective organisation will be in contact with you for your post-screening cognitive assessment and follow-up.";
      }
    }
  }
  return ""
}

const getSocialServiceReferralMessage = (info, printFlag) => {
  if (isReferredToSocialService(info) && printFlag) {
    return "We strongly encourage you to follow through with the recommendations from AIC so that you receive the help that you need.";
  }
  return ""
}

const getUrgentFollowUpMessage = (info, printFlag) => {
  if (isUrgentFollowUp(info) && printFlag) {
    return "If the on-site doctor has advised that you need urgent follow-up or you need to visit a GP/polyclinic/hospital, please do as instructed.";
  }
  return ""
}

const isBpToBeFlag = (info) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ17']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ18']) !== "undefined") {
    if (info['Hx Cancer'].hxCancerQ17 >= 130 || info['Hx Cancer'].hxCancerQ18 >= 85) {
      return true;
    }
  }

  return false;
}

const isBmiToBeFlag = (info) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ21']) !== "undefined") {
    if (info['Hx Cancer'].hxCancerQ21 >= 23 || info['Hx Cancer'].hxCancerQ21 <= 18.5) {
      return true;
    }
  }
  return false;
}

const isWaistCircumToBeFlag = (info) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ24']) !== "undefined" && typeof(info['Pre-Registration']['preRegistrationQ1'] !== "undefined")) {
    if ((info['Hx Cancer'].hxCancerQ24 > 90 && info['Pre-Registration'].preRegistrationQ1 === "Male") || 
    (info['Hx Cancer'].hxCancerQ24 > 80 && info['Pre-Registration'].preRegistrationQ1 === "Female")) {
      return true;
    }
  }
  return false;
}

const isReferredFromPt = (info) => {
  if (info && typeof (info['Geri - PT Consult']) !== "undefined" && typeof (info['Geri - PT Consult']['geriPtConsultQ4']) !== "undefined") {
    if (info['Geri - PT Consult'].geriPtConsultQ4 === "Yes")  {
      return true;
    }
  }
  return false;
}

const isReferredFromOt = (info) => {
  if (info && typeof (info['Geri - OT Consult']) !== "undefined" && typeof (info['Geri - OT Consult']['geriOtConsultQ4']) !== "undefined") {
    if (info['Geri - OT Consult'].geriOtConsultQ4 === "Yes")  {
      return true;
    }
  }
  return false;
}

const isReferredToOtProgrammes = (info) => {
  if (info && typeof (info['Geri - OT Consult']) !== "undefined" && typeof (info['Geri - OT Consult']['geriOtConsultQ6']) !== "undefined") {
    if (info['Geri - OT Consult'].geriOtConsultQ6.length > 1)  {
      return true;
    }
  }
  return false;
}

const isReferredToSocialService = (info) => {
  if (info && typeof (info['Social Service']) !== "undefined" && typeof (info['Social Service']['socialServiceQ1']) !== "undefined") {
    if (info['Social Service'].socialServiceQ1 === "Yes")  {
      return true;
    }
  }
  return false;
}

const isConsultedDoctor = (info) => {
  if (info && typeof (info['Doctor\'s Consult']) !== "undefined" && typeof (info['Doctor\'s Consult']['doctorSConsultQ11']) !== "undefined") {
    return info['Doctor\'s Consult']['doctorSConsultQ11'];
  }
}

const isUrgentFollowUp = (info) => {
  if (info && typeof (info['Doctor\'s Consult']) !== "undefined" && typeof (info['Doctor\'s Consult']['doctorSConsultQ10']) !== "undefined") {
    return info['Doctor\'s Consult']['doctorSConsultQ10'];
  }
}

const isReferredToDietitian = (info) => {
  if (info && typeof (info['Doctor\'s Consult']) !== "undefined" && typeof (info['Doctor\'s Consult']['doctorSConsultQ4']) !== "undefined") {
    if (info['Doctor\'s Consult'].doctorSConsultQ4 === "Yes")  {
      return true;
    }
  }
  return false;
}


class ScreeningReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      printFlag: false
    }
  }

  selectStation(newStation, e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  
    Session.set("station",newStation);
  
    const currentPatient = Session.get('currentPatient');
    if (currentPatient !==  null) {
      Meteor.call('patientinfo.setBusy', currentPatient, false);
      Session.set('currentPatient',null); 
    }
  
    this.forceUpdate();
  }

  togglePrint(e) {
    e.preventDefault();
  
    this.setState({
      printFlag: !this.state.printFlag
    })
  }

  render() {
    const info = this.props.patientInfo;
    return (
      <Fragment>
        {
          !this.state.printFlag && 
          <Button variant="outlined" onClick={this.selectStation.bind(this,"")}>Back</Button>
        }
        <Button variant={(this.state.printFlag) ? "contained": "outlined"} color={(this.state.printFlag) ? "secondary": "default"} onClick={this.togglePrint.bind(this)}>Print</Button>
        <Grid container direction="row" justify="flex-start" alignItems="center" >
          <Grid item xs={5}>
            <h1>Screening Review</h1>
          </Grid>
          {
            !this.state.printFlag && 
            <Grid item xs={5}>
              <Search station="Screening Review" />
            </Grid>
          }
        </Grid>

        <Grid container
          justify="flex-start"
          spacing={16}>
            {
            !this.state.printFlag && 
            <Grid item xs={12}>
              <Queue patientList={this.props.patientList} />
            </Grid>
            }
          <Grid container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={16}
          >
            <Grid item xs={12}>
              <Fragment>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="flex-start"
                >
                  <Divider /><br />
                  <Typography variant="h5">Personal Particulars</Typography>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={2}>ID: <TextField variant="outlined" fullWidth={true} margin="dense" value={info.id} /></Grid>
                    <Grid item xs={6}>Name: <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Pre-Registration', 'preRegistrationQ2')} /></Grid>
                    <Grid item xs={2}>Gender: <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Pre-Registration', 'preRegistrationQ1')} /></Grid>
                    <Grid item xs={2}>NRIC: <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Pre-Registration', 'preRegistrationQ3')} /></Grid>
                  </Grid>
                  <Divider /><br />

                  {
                    !this.state.printFlag && 
                    <Fragment>
                      <Typography variant="h5">Health Concerns</Typography>
                      <Divider /><br />
                      <Grid container direction="row" justify="space-between" alignItems="center" >
                        <Grid item xs={12}>Participant's presenting complaints/concerns (if any) <TextField rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ2'))} variant="outlined" fullWidth={true} multiline={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ2')} /></Grid>
                      </Grid>
                      <Divider /><br />
                    </Fragment>
                  }

                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={4}><Typography variant="h5">Blood Pressure</Typography></Grid>
                    <Grid item xs={8}><Typography variant="h5">BMI</Typography></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={2}>Average Blood Pressure (Systolic): <TextField variant="outlined" error={isBpToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ17')} /></Grid>
                    <Grid item xs={2}>Average Blood Pressure (Diastolic): <TextField variant="outlined" error={isBpToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ18')} /></Grid>
                    <Grid item xs={2}>BMI: <TextField variant="outlined" fullWidth={true} margin="dense" error={isBmiToBeFlag(info)} value={populateField(info, 'Hx Cancer', 'hxCancerQ21')} /></Grid>
                    <Grid item xs={2}>Height (in cm): <TextField variant="outlined" error={isBmiToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ19')} /></Grid>
                    <Grid item xs={2}>Weight (in kg): <TextField variant="outlined" error={isBmiToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ20')} /></Grid>
                    <Grid item xs={2}>Waist Circumference (in cm): <TextField variant="outlined" error={isWaistCircumToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ24')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={3}><Typography variant="subtitle1" color="error">{getBpMessage(info, this.state.printFlag)}</Typography></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8}><Typography variant="subtitle1" color="error">{getBmiMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>

                  {
                      !this.state.printFlag &&
                      <Fragment>
                        <Grid container direction="row" justify="space-between" alignItems="center" >                      
                          <Grid item xs={6}><Typography variant="h5">Urinary Incontinence</Typography></Grid>
                          <Grid item xs={6}><Typography variant="h5">Hearing</Typography></Grid>
                        </Grid>
                        <Divider /><br />
                        <Grid container direction="row" justify="space-between" alignItems="stretch" >
                          <Grid item xs={6}>Urinary Problems: <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ4', 'hxHcsrQ5'))} fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ4', 'hxHcsrQ5')} /></Grid>
                          <Grid item xs={6}>Hearing Problems: <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ8', 'hxHcsrQ9'))} fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ8', 'hxHcsrQ9')} /></Grid>
                        </Grid>
                        <Divider /><br />
                        <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                          <Grid item xs={5}><Typography variant="subtitle1" color="error">{getIncontinenceMessage(info, this.state.printFlag)}</Typography></Grid>
                          <Grid item xs={1}></Grid>
                          <Grid item xs={6}><Typography variant="subtitle1" color="error">{getHearingMessage(info, this.state.printFlag)}</Typography></Grid>
                        </Grid>
                      </Fragment>
                    }
                  
                  <Typography variant="h5">Vision</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                  {
                      !this.state.printFlag &&
                      <Fragment>
                        <Grid item xs={4}>Vision Problems: <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ6', 'hxHcsrQ7'))} fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ6', 'hxHcsrQ7')} /></Grid>
                      </Fragment>
                    }
                    <Grid item xs={2}>Visual acuity (w/o pinhole occluder) - Right Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Geri - Vision', 'geriVisionQ3')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w/o pinhole occluder) - Left Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Geri - Vision', 'geriVisionQ4')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w pinhole occluder) - Right Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Geri - Vision', 'geriVisionQ5')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w pinhole occluder) - Left Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Geri - Vision', 'geriVisionQ6')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    {
                      !this.state.printFlag &&
                      <Fragment>
                        <Grid item xs={3}><Typography variant="subtitle1" color="error">{getVisionProblemMessage(info, this.state.printFlag)}</Typography></Grid>
                        <Grid item xs={1}></Grid>
                      </Fragment>
                    }
                    <Grid item xs={3}><Typography variant="subtitle1" color="error">{getPinholeMessage(info, this.state.printFlag)}</Typography></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}><Typography variant="subtitle1" color="error">{getRefractiveMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>

                  {
                    !this.state.printFlag &&
                    <Fragment>
                      <Typography variant="h5">Past Medical History</Typography>
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={6}>Has a doctor ever told you that you have the following condition? Please tick the appropriate box(es) if the answer is "Yes" to any of the conditions listed below, or tick the last box if you have none. <TextField variant="outlined" multiline={true} rows={getNoOfLines(getPastMedicalHistory(info, this.state.printFlag))} fullWidth={true} margin="dense" value={getPastMedicalHistory(info, this.state.printFlag)} /></Grid>
                        <Grid item xs={6}>For respondent with known hypertension, diabetes, high cholesterol and stroke only. Are you currently on follow up with a doctor for the existing conditions you have indicated? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx NSS', 'hxNssQ2')} /></Grid>
                      </Grid>
                      <Divider /><br />
                      <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                        <Grid item xs={5}><Typography variant="subtitle1" color="error">{getMedicalHistoryMessage(info, this.state.printFlag)}</Typography></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={6}><Typography variant="subtitle1" color="error">{getFollowUpMessage(info, this.state.printFlag)}</Typography></Grid>
                      </Grid>
                    </Fragment>
                  }

                  {
                    !this.state.printFlag &&
                    <Fragment>
                      <Typography variant="h5">Social History</Typography>
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={6}>Do you smoke? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx NSS', 'hxNssQ14')} /></Grid>
                        <Grid item xs={6}>Do you consume alcoholic drinks? (Note: Standard drink means a shot of hard liquor, a can or bottle of beer, or a glass of wine.) <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx NSS', 'hxNssQ15')} /></Grid>
                      </Grid>
                      <Divider /><br />
                      <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                        <Grid item xs={5}><Typography variant="subtitle1" color="error">{getSmokingMessage(info, this.state.printFlag)}</Typography></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={6}><Typography variant="subtitle1" color="error">{getAlcoholMessage(info, this.state.printFlag)}</Typography></Grid>
                      </Grid>
                    </Fragment>
                  }

                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={3}><Typography variant="h5">FIT Kits</Typography></Grid>
                    <Grid item xs={9}><Typography variant="h5">WCE Station</Typography></Grid>
                  </Grid>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={3}>Was participant issued an FIT kit (2 test sets in a pack)? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'FIT', 'fitQ2')} /></Grid>
                    <Grid item xs={3}>Indicated interest for HPV Test under SCS? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'WCE', 'wceQ4')} /></Grid>
                    <Grid item xs={3}>Indicated interest for Mammogram under SCS? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'WCE', 'wceQ5')} /></Grid>
                    <Grid item xs={3}>Registered for Mammogram under NHGD? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'WCE', 'wceQ6', 'wceQ7')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={2}><Typography variant="subtitle1" color="error">{getFITMessage(info, this.state.printFlag)}</Typography></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={9}>{getWCEMessage(info, this.state.printFlag)}</Grid>
                  </Grid>

                  <Typography variant="h5">Geriatrics</Typography>
                  {
                    !this.state.printFlag && 
                    <Fragment>
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={6}>Was the participant referred for Social Service? (PT): <TextField variant="outlined" error={isReferredFromOt(info)} fullWidth={true} margin="dense" value={populateField(info, 'Geri - PT Consult', 'geriPtConsultQ4')} /></Grid>
                        <Grid item xs={6}>Was the participant referred for Social Service? (OT): <TextField variant="outlined" error={isReferredFromPt(info)} fullWidth={true} margin="dense" value={populateField(info, 'Geri - OT Consult', 'geriOtConsultQ4')} /></Grid>
                      </Grid>
                      <Divider /><br />
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={6}>Reasons for referral to social support (PT): <TextField variant="outlined" error={isReferredFromOt(info)} multiline={true} rows={getNoOfLines(populateField(info, 'Geri - PT Consult', 'geriPtConsultQ5'))} fullWidth={true} margin="dense" value={populateField(info, 'Geri - PT Consult', 'geriPtConsultQ5')} /></Grid>
                        <Grid item xs={6}>Reasons for referral to social support (OT): <TextField variant="outlined" error={isReferredFromPt(info)} multiline={true} rows={getNoOfLines(populateField(info, 'Geri - OT Consult', 'geriOtConsultQ5'))} fullWidth={true} margin="dense" value={populateField(info, 'Geri - OT Consult', 'geriOtConsultQ5')} /></Grid>
                      </Grid>
                      <Divider /><br />
                    </Fragment>
                  }
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={6}>Which organisation was the participant referred to for post-screening assessment? (from AMT) <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Geri - Cognitive Follow Up', 'geriCognitiveFollowUpQ1'))} fullWidth={true} margin="dense" value={populateField(info, 'Geri - Cognitive Follow Up', 'geriCognitiveFollowUpQ1')} /></Grid>
                    <Grid item xs={6}>Which of the programmes did the OT recommend for the participant to go? (if applicable) <TextField variant="outlined" error={isReferredToOtProgrammes(info, this.state.printFlag)} multiline={true} rows={getNoOfLines(populateField(info, 'Geri - OT Consult', 'geriOtConsultQ6'))} fullWidth={true} margin="dense" value={populateField(info, 'Geri - OT Consult', 'geriOtConsultQ6')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getAmtAssessmentMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>

                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={3}><Typography variant="h5">Social Service</Typography></Grid>
                    <Grid item xs={9}><Typography variant="h5">Doctor's Consult</Typography></Grid>
                  </Grid>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={3}>Did the participant visit the social service station? <TextField variant="outlined" error={isReferredToSocialService(info)} fullWidth={true} margin="dense" value={populateField(info, 'Social Service', 'socialServiceQ1')} /></Grid>                    
                    <Grid item xs={3}>Did this patient consult an on-site doctor today? <TextField variant="outlined" error={isConsultedDoctor(info)} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ11')} /></Grid>                    
                    <Grid item xs={3}>Does this patient require urgent follow-up? <TextField variant="outlined" error={isUrgentFollowUp(info)} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ10')} /></Grid>                    
                    <Grid item xs={3}>Was the patient referred to the dietitian? <TextField variant="outlined" error={isReferredToDietitian(info)} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ4')} /></Grid>                    
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={5}><Typography variant="subtitle1" color="error">{getSocialServiceReferralMessage(info, this.state.printFlag)}</Typography></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getUrgentFollowUpMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>

                  {
                    !this.state.printFlag && 
                    <Fragment>
                      <Typography variant="h5">Doctor's Memo</Typography>
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={12}>Memo <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ3'))} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ3')} /></Grid>
                      </Grid>
                      <Divider /><br /><br />
                    </Fragment>
                  }

                  <Typography variant="h5" color="error">All participants will receive a more detailed health report from PHS within 4-6 weeks of the screening.
        *If you have gone for phlebotomy, you will receive the blood test results from NUHS within 4 - 6 weeks of the screening.</Typography>

                </Grid>

              </Fragment>
            </Grid>

          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default ScreeningReview;