import React, { Component, Fragment } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

import Search from './Search.jsx';
import Queue from './Queue.jsx';

const messageFilter = (text) => {
  if (typeof (text) === "object") {
    newTextArray = text.map(data => {
      return messageFilter(data);
    })
    return newTextArray;
  }
  if (typeof (text) === "string") {
    if (text.includes("Yes, (Please specify):")) {
      return "Yes"
    }
    if (text.includes("Others (Please Specify):")) {
      return "Others: "
    }
    if (text.includes("Yes (please answer question below)")) {
      return "Yes"
    }
    if (text.includes("Yes, (Please specify date of appointment if given):")) {
      return "Yes. Date of appointment: "
    }
    if (text.includes("\n(Please proceed to Q2)")) {
      return text.replace("\n(Please proceed to Q2)", "")
    }
    if (text.includes("\n(Please proceed to Q2d)")) {
      return text.replace("\n(Please proceed to Q2d)", "")
    }
  }
  return text;
}

const populateField = (info, station, field, reasonField) => {
  if (info && typeof (info[station]) !== "undefined" && typeof (info[station][field]) !== "undefined") {
    if (typeof (info[station][field]) == "array") {
      return messageFilter(info[station][field]).join()
    }
    if (typeof (info[station][field]) == "boolean") {
      return info[station][field] ? "Yes" : "No"
    }
    if (reasonField && typeof (info[station][reasonField]) !== "undefined") {
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
    if (info['Hx NSS']['hxNssQ1'].includes("No, I don't have any of the above \n(Please proceed to Q2d)")) {
      return "No"
    }
    else {
      return messageFilter(info['Hx NSS']['hxNssQ1']).join();
    }
  }
  return "-";
}

const getNoOfLines = (text) => {
  if (typeof (text) === "string") {
    return text.split('\n').length;
  }
  return 1;
}

const getBpMessage = (info, printFlag) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ17']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ18']) !== "undefined") {
    if (info['Hx Cancer'].hxCancerQ17 >= 130 || info['Hx Cancer'].hxCancerQ18 >= 85) {
      if (printFlag) {
        return "A healthy blood pressure reading is below 130/85 mmHg.";
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
      if (bmi >= 32.5) {
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
  if (info && typeof (info['Geri - Vision']) !== "undefined" && typeof (info['Geri - Vision']['geriVisionQ3']) !== "undefined" && typeof (info['Geri - Vision']['geriVisionQ4']) !== "undefined") {
    if (info['Geri - Vision']['geriVisionQ3'] >= 12 || info['Geri - Vision']['geriVisionQ4'] >= 12) {
      return "See VA with pinhole";
    }
  }
  return "";
}

const getRefractiveMessage = (info, printFlag) => {
  if (info && typeof (info['Geri - Vision']) !== "undefined" && typeof (info['Geri - Vision']['geriVisionQ6']) !== "undefined" && typeof (info['Geri - Vision']['geriVisionQ7']) !== "undefined") {
    if (printFlag) {
      if (info['Geri - Vision']['geriVisionQ3'] >= 12 || info['Geri - Vision']['geriVisionQ4'] >= 12) {
        return "Non-refractive error";
      } else {
        return "Refractive error"
      }
    }
    if (info['Geri - Vision']['geriVisionQ3'] >= 12 || info['Geri - Vision']['geriVisionQ4'] >= 12) {
      return "Non-refractive error, participant recommended to go for L2 Eye Screening at SNEC Eye Bus";
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
    if (info['Hx NSS']['hxNssQ2'] === "No") {
      return "Check if participant is referred to Health Promotion Board (HPB) booth at Exhibition. If no, tick on PHS Passport and indicate.";
    }
  }
  return "";
}

const getSmokingMessage = (info, printFlag) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ14']) !== "undefined") {
    if (info['Hx NSS']['hxNssQ14'].includes("Yes")) {
      return "Check if participant is referred to Health Promotion Board (HPB) iQuit booth at Exhibition. If no, tick on PHS Passport and indicate.";
    }
  }
  return "";
}

const getAlcoholMessage = (info, printFlag) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ15']) !== "undefined") {
    if (info['Hx NSS']['hxNssQ15'] === "Less than 2 standard drinks per day on average." || info['Hx NSS']['hxNssQ15'] === "More than 2 standard drinks per day on average.") {
      return "Check if participant is referred to Health Promotion Board (HPB) Metabolic booth at Exhibition. If no, tick on PHS Passport and indicate";
    }
  }
  return "";
}

const getFITMessage = (info, printFlag) => {
  if (info && typeof (info['FIT']) !== "undefined" && typeof (info['FIT']['fitQ2']) !== "undefined") {
    if (printFlag) {
      if (info['FIT']['fitQ2'] === "Yes") {
        return "Please follow the instructions provided and remember to mail out both of your kits within the stipulated time.";
      }
    }
    if (info['FIT']['fitQ2'] === "Yes") {
      return "Kindly remind the participant to adhere to the instructions regarding FIT kit application and sending. Teach the participant how to use the kit if he/she is unsure or has forgotten";
    }
  }
  return "";
}

const getWCEMessage = (info, printFlag) => {
  let message = []
  if (info && typeof (info['WCE']) !== "undefined" && typeof (info['WCE']['wceQ4']) !== "undefined" && typeof (info['WCE']['wceQ5']) !== "undefined" && typeof (info['WCE']['wceQ6']) !== "undefined") {
    if (printFlag) {
      if (info['WCE']['wceQ4'] === "Yes") {
        message.push("SCS will be in contact with you for your HPV test.");
      }
      if (info['WCE']['wceQ5'] === "Yes") {
        message.push("SCS will be in contact with you for your mammogram test.");
      }
      if (info['WCE']['wceQ6'].includes("Yes")) {
        message.push("Please remember to go for your mammogram appointment with NHGD.");
      }
    }
  }
  return <Typography variant="subtitle1" color="error">{message.map(text => {
    return <div>{text}</div>
  })}</Typography>;
}

const getAmtAssessmentMessage = (info, printFlag) => {
  if (info && typeof (info['Geri - Cognitive Follow Up']) !== "undefined" && typeof (info['Geri - Cognitive Follow Up']['geriCognitiveFollowUpQ1']) !== "undefined") {
    if (printFlag) {
      if (info['Geri - Cognitive Follow Up']['geriCognitiveFollowUpQ1'].length > 1) {
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
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ24']) !== "undefined" && typeof (info['Pre-Registration']['preRegistrationQ1'] !== "undefined")) {
    if ((info['Hx Cancer'].hxCancerQ24 > 90 && info['Pre-Registration'].preRegistrationQ1 === "Male") ||
      (info['Hx Cancer'].hxCancerQ24 > 80 && info['Pre-Registration'].preRegistrationQ1 === "Female")) {
      return true;
    }
  }
  return false;
}

const isReferredFromPt = (info) => {
  if (info && typeof (info['Geri - PT Consult']) !== "undefined" && typeof (info['Geri - PT Consult']['geriPtConsultQ4']) !== "undefined") {
    if (info['Geri - PT Consult'].geriPtConsultQ4 === "Yes") {
      return true;
    }
  }
  return false;
}

const isReferredFromOt = (info) => {
  if (info && typeof (info['Geri - OT Consult']) !== "undefined" && typeof (info['Geri - OT Consult']['geriOtConsultQ4']) !== "undefined") {
    if (info['Geri - OT Consult'].geriOtConsultQ4 === "Yes") {
      return true;
    }
  }
  return false;
}

const isReferredToOtProgrammes = (info) => {
  if (info && typeof (info['Geri - OT Consult']) !== "undefined" && typeof (info['Geri - OT Consult']['geriOtConsultQ6']) !== "undefined") {
    if (info['Geri - OT Consult'].geriOtConsultQ6.length > 1) {
      return true;
    }
  }
  return false;
}

const isReferredToSocialService = (info) => {
  if (info && typeof (info['Social Service']) !== "undefined" && typeof (info['Social Service']['socialServiceQ1']) !== "undefined") {
    if (info['Social Service'].socialServiceQ1 === "Yes") {
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
    if (info['Doctor\'s Consult'].doctorSConsultQ4 === "Yes") {
      return true;
    }
  }
  return false;
}


class ScreeningReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      printFlag: false,
      allInfo: [],
      current: ""
    }
  }

  selectStation(newStation, e) {
    e.preventDefault();
    window.scrollTo(0, 0);

    Session.set("station", newStation);

    const currentPatient = Session.get('currentPatient');
    if (currentPatient !== null) {
      Meteor.call('patientinfo.setBusy', currentPatient, false);
      Session.set('currentPatient', null);
    }

    this.forceUpdate();
  }

  togglePrint(e) {
    e.preventDefault();

    this.setState({
      printFlag: !this.state.printFlag
    })
  }

  handleChange = (event) => {
    this.setState({ current: event.target.value })
  }

  save = (event, parent, question) => {
    const currentPatient = Session.get('currentPatient');
    Meteor.call('patientinfo.editPatientInfo', currentPatient, parent, question, this.state.current);
  }

  componentDidUpdate() {
    if (Object.keys(this.props.patientInfo).length > 1 && this.state.allInfo.length === 0) {
      this.setState({ allInfo: this.props.patientInfo })
    } else if (Object.keys(this.props.patientInfo).length > 1 && this.state.allInfo.length !== 0 && this.state.allInfo !== this.props.patientInfo) {
      this.setState({ allInfo: this.props.patientInfo })
    }
  }


  render() {
    console.log(this.props.patientInfo)
    const basicPatientDetails = this.state.allInfo['Basic Patient Information']
    const patientProfiling = this.state.allInfo['Patient Profiling']
    const stationSelect = this.state.allInfo['Station Select']
    const heightWeight = this.state.allInfo['Height and Weight']
    const bloodGlucose = this.state.allInfo['Blood Glucose and Hb']
    const bloodPressure = this.state.allInfo['Blood Pressure']
    const phlebo = this.state.allInfo['Phlebo']
    const papSmear = this.state.allInfo['Pap Smear']
    const breastscreening = this.state.allInfo['Breast Screening']
    const postScreeningFeedback = this.state.allInfo['Post-screening feedback']
    const doctorsConsult = this.state.allInfo[`Doctors' Consult`]
    const eyeScreening = this.state.allInfo['Eye Screening']
    const postWomenEduQuiz = this.state.allInfo[`Post-women's edu quiz`]

    return (
      <Fragment>
        {
          !this.state.printFlag &&
          <Button variant="outlined" onClick={this.selectStation.bind(this, "")}>Back</Button>
        }
        <Button variant={(this.state.printFlag) ? "contained" : "outlined"} color={(this.state.printFlag) ? "secondary" : "default"} onClick={this.togglePrint.bind(this)}>Print</Button>
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
            style={{ paddingBottom: 200 }}
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
                  {/*PERSONAL PARTICULARS */}
                  <Typography variant="h5">Personal Particulars</Typography>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Name:<br /> <input size="200" type="text" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Gender: <br /><input size="200" type="text" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ2')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>For females: Are you currently pregnant?<br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ12} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ12')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Birthdate:<br /> <input size="200" type="text" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ3} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ3')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Age:<br /> <input size="200" type="text" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ4} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ4')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>District name:<br /> <input size="200" type="text" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ5} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ5')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Address:<br /> <input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ6} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ6')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Zip Code: <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ7} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ7')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Contact number:<br /> <input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ8} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ8')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Spoken languages: <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ9} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ9')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Any drug allergies?<br /> <input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ10} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ10')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, what drug allergies do you have?<br /> <input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ13} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ13')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Do you have any blood borne diseases? <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ11} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ11')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, please specify the blood borne diseases <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ14} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ14')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Have you ever been diagnosed with tuberculosis?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ15} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ15')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Comments
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ16} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ16')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Have you ever lived with someone with tuberculosis?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ17} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ17')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Comments
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ18} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ18')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Do you have any of the following symptoms?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ19} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ19')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, symptoms
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={basicPatientDetails && basicPatientDetails.basicPatientInformationQ20} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Basic Patient Information', 'basicPatientInformationQ20')}>Save</Button>}
                    </Grid>

                  </Grid>


                  {/*PATIENT PROFILING */}

                  <Typography variant="h5">Patient Profiling</Typography>
                  {/* <Typography variant="h7"><b>TB screening</b></Typography> */}
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    {/* <Grid style={{ paddingBottom: 15 }} item xs={12}>Have you ever been diagnosed with tuberculosis?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Comments
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ21} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ21')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Have you ever lived with someone with tuberculosis?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ2')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Comments
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ22} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ22')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Do you have any of the following symptoms?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ3} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ3')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, symptoms
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ23} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ23')}>Save</Button>}
                    </Grid> */}

                    <Typography variant="h7"><b>Medical history</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Do you have any of the following medical conditions?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ4} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ4')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>Medical history: Others</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Do you have other medical conditions we should take note of? (if none, indicate NIL)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ5} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ5')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>How are you managing these conditions? (check-ups, medicines, diet/exercise, others)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ6} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ6')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Where do you go to for routine healthcare?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ7} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ7')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Where do you go to for emergency medical services (eg. fall, injury, fainting)?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ8} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ8')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Are you taking any other medications? (If yes, indicate what medication and why. If none, indicate NIL)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ9} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ9')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>Barriers to Healthcare</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>What type of doctor do you see for your existing conditions?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ10} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ10')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If answer was 'Seldom/Never visits the doctor', why do you not follow-up with your doctor for your existing conditions?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ24} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ24')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>Smoking</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Do you currently smoke?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ11} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ11')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, what do you smoke? (select all that apply)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ26} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ26')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, how much do you smoke?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ25} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ25')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, how many years have you been smoking for?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ27} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ27')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If no to smoking, have you ever smoked before?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ28} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ28')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Do you chew paan or tobacco?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ12} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ12')}>Save</Button>}
                    </Grid>


                    <Typography variant="h7"><b>Social History</b> </Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>What is your occupation?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ13} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ13')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If answer is 'Farming/agriculture', do you use pesticides in your farming?:
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ14} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ14')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Monthly Income in INR (only if participant is willing to disclose):
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ15} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ15')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Marital status:
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ16} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ16')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Number of children:
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ17} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ17')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>How many people live in your household (including you)?:
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ18} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ18')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>How many people in your household contribute to household income?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ19} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ19')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>What is your highest education level?:
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={patientProfiling && patientProfiling.patientProfilingQ20} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Patient Profiling', 'patientProfilingQ20')}>Save</Button>}
                    </Grid>
                  </Grid>



                  {/*HEIGHT AND WEIGHT */}
                  <Typography variant="h5">Height and Weight</Typography>
                  <Typography variant="h7"><b>Height and Weight</b></Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Height (m)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.heightAndWeightQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'heightAndWeightQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>For children: Height assessment
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.heightAndWeightQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'heightAndWeightQ2')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Weight (kg)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.heightAndWeightQ3} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'heightAndWeightQ3')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>For children: Weight assessment
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.heightAndWeightQ4} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'heightAndWeightQ4')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}> BMI:
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.calculateBMI} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'calculateBMI')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>For children: BMI assessment
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.childAssess} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'childAssess')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>For adult: BMI assessment
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.adultAssess} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'adultAssess')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>Waist:Hip</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Waist circumference (cm)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.heightAndWeightQ5} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'heightAndWeightQ5')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Hip circumference (cm)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.heightAndWeightQ6} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'heightAndWeightQ6')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Waist:Hip Ratio
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={heightWeight && heightWeight.calculateRatio} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Height and Weight', 'calculateRatio')}>Save</Button>}
                    </Grid>

                  </Grid>

                  {/*Eye Screening */}
                  <Typography variant="h5">Eye Screening</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Completed Eye Screening?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={eyeScreening && eyeScreening.eyeScreeningQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Eye Screening', 'eyeScreeningQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>SNC Patient ID
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={eyeScreening && eyeScreening.eyeScreeningQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Eye Screening', 'eyeScreeningQ2')}>Save</Button>}
                    </Grid>
                  </Grid>


                  {/*BLOOD GLUCOSE */}
                  <Typography variant="h5">Blood Glucose and Hb</Typography>
                  <Typography variant="h7"><b>India Diabetes Risk Assessment</b></Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Have you previously been diagnosed with diabetes?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodGlucose && bloodGlucose.bloodGlucoseAndHbQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Glucose and Hb', 'bloodGlucoseAndHbQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}> 1. Age
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodGlucose && bloodGlucose.bloodGlucoseAndHbQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Glucose and Hb', 'bloodGlucoseAndHbQ2')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>2. Waist circumference
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodGlucose && bloodGlucose.bloodGlucoseAndHbQ3} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Glucose and Hb', 'bloodGlucoseAndHbQ3')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>3. Physical activity
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodGlucose && bloodGlucose.bloodGlucoseAndHbQ4} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Glucose and Hb', 'bloodGlucoseAndHbQ4')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>4. Family history
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodGlucose && bloodGlucose.bloodGlucoseAndHbQ5} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Glucose and Hb', 'bloodGlucoseAndHbQ5')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>Blood glucose</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Blood glucose
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodGlucose && bloodGlucose.bloodGlucoseAndHbQ6} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Glucose and Hb', 'bloodGlucoseAndHbQ6')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>Hb</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Hemoglobin (g/dL)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodGlucose && bloodGlucose.bloodGlucoseAndHbQ7} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Glucose and Hb', 'bloodGlucoseAndHbQ7')}>Save</Button>}
                    </Grid>
                  </Grid>

                  {/*total score and risk level*/}



                  {/*BLOOD PRESSURE */}
                  <Typography variant="h5">Blood Pressure</Typography>
                  <Typography variant="h7"><b>BP 1st taking</b></Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Systolic blood pressure
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodPressure && bloodPressure.bpQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Pressure', 'bpQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Diastolic blood pressure
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodPressure && bloodPressure.bpQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Pressure', 'bpQ2')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>BP 2nd taking</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Systolic blood pressure
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodPressure && bloodPressure.bpQ3} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Pressure', 'bpQ3')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Diastolic blood pressure
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodPressure && bloodPressure.bpQ4} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Pressure', 'bpQ4')}>Save</Button>}
                    </Grid>

                    <Typography variant="h7"><b>BP 3rd taking</b></Typography>
                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Systolic blood pressure
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodPressure && bloodPressure.bpQ5} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Pressure', 'bpQ5')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Diastolic blood pressure
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={bloodPressure && bloodPressure.bpQ6} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Blood Pressure', 'bpQ6')}>Save</Button>}
                    </Grid>

                    {/*AVERAGE */}
                  </Grid>


                  {/*PHLEBO */}
                  <Typography variant="h5">Phlebo</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Completed phlebotomy?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={phlebo && phlebo.bpQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Phlebo', 'phleboQ1')}>Save</Button>}
                    </Grid>
                  </Grid>


                  {/*PAP SMEAR */}
                  {/* <Typography variant="h5">Pap Smear</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Completed Pap smear?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={papSmear && papSmear.papSmearQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Pap Smear', 'papSmearQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Notes (if any)
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={papSmear && papSmear.papSmearQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Pap Smear', 'papSmearQ2')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Doctors' consult required?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={papSmear && papSmear.papSmearQ3} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Pap Smear', 'papSmearQ3')}>Save</Button>}
                    </Grid>
                  </Grid> */}



                  {/*BREAST SCREENING */}
                  {/* <Typography variant="h5">Breast Screening</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Completed breast examination?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={breastscreening && breastscreening.breastScreeningQ1} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Breast Screening', 'breastScreeningQ1')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Any abnormalities noted (e.g. lumps, skin changes)?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={breastscreening && breastscreening.breastscreeningQ2} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Breast Screening', 'breastScreeningQ2')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes to Q2, please describe the abnormalities
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={breastscreening && breastscreening.breastscreeningQ3} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Breast Screening', 'breastScreeningQ3')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes to Q2, FNAC done?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={breastscreening && breastscreening.breastScreeningQ4} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Breast Screening', 'breastScreeningQ4')}>Save</Button>}
                    </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Doctors' consult required?
                    <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={breastscreening && breastscreening.breastScreeningQ5} />
                      {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Breast Screening', 'breastScreeningQ5')}>Save</Button>}
                    </Grid>
                  </Grid> */}

                  {/*Doctors' Consult */}
                   <Typography variant="h5">Doctors' Consult</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="center" >

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Cheif Complaint
                      <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={doctorsConsult && doctorsConsult.doctorsConsultQ1} />
                        {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Doctors\' Consult', 'doctorsConsultQ1')}>Save</Button>}
                      </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Doctors' Notes/Advice
                      <br /><input size="250" onChange={() => this.handleChange(event)} defaultValue={doctorsConsult && doctorsConsult.doctorsConsultQ2} />
                        {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Doctors\' Consult', 'doctorsConsultQ2')}>Save</Button>}
                      </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Provided with referral letter?
                      <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={doctorsConsult && doctorsConsult.doctorsConsultQ3} />
                        {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Doctors\' Consult', 'doctorsConsultQ3')}>Save</Button>}
                        </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>If yes, referral details
                      <br /><input size="250" onChange={() => this.handleChange(event)} defaultValue={doctorsConsult && doctorsConsult.doctorsConsultQ4} />
                        {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Doctors\' Consult', 'doctorsConsultQ4')}>Save</Button>}
                        </Grid>

                    <Grid style={{ paddingBottom: 15 }} item xs={12}>Name of doctor
                      <br /><input size="200" onChange={() => this.handleChange(event)} defaultValue={doctorsConsult && doctorsConsult.doctorsConsultQ5} />
                        {!this.state.printFlag && <Button size="small" variant="contained" color="primary" onClick={() => this.save(event, 'Doctors\' Consult', 'doctorsConsultQ5')}>Save</Button>}
                        </Grid>
                  </Grid> 









                  {/*                   {
                    !this.state.printFlag && 
                    <Fragment>
                      <Typography variant="h5">Health Concerns</Typography>
                      <Divider /><br />
                      <Grid container direction="row" justify="space-between" alignItems="center" >
                        <Grid item xs={12}>Participant's presenting complaints/concerns (if any) <TextField rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ2'))} variant="outlined" fullWidth={true} multiline={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ2')} /></Grid>
                      </Grid>
                      <Divider /><br />
                    </Fragment>
                  } */}

                  {/*  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={4}><Typography variant="h5">Blood Pressure</Typography></Grid>
                    <Grid item xs={8}><Typography variant="h5">BMI</Typography></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={2}>Average Blood Pressure (Systolic): <TextField variant="outlined" error={isBpToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Blood Pressure', 'bpQ7')} /></Grid>
                    <Grid item xs={2}>Average Blood Pressure (Diastolic): <TextField variant="outlined" error={isBpToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Blood Pressure', 'bpQ8')} /></Grid>
                    <Grid item xs={2}>BMI: <TextField variant="outlined" fullWidth={true} margin="dense" error={isBmiToBeFlag(info)} value={populateField(info, 'Height and Weight', 'hxCancerQ21')} /></Grid>
                    <Grid item xs={2}>Height (in cm): <TextField variant="outlined" error={isBmiToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Height and Weight', 'heightAndWeightQ1')} /></Grid>
                    <Grid item xs={2}>Weight (in kg): <TextField variant="outlined" error={isBmiToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Height and Weight', 'heightAndWeightQ3')} /></Grid>
                    <Grid item xs={2}>Waist Circumference (in cm): <TextField variant="outlined" error={isWaistCircumToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Height and Weight', 'heightAndWeightQ5')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={3}><Typography variant="subtitle1" color="error">{getBpMessage(info, this.state.printFlag)}</Typography></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={8}><Typography variant="subtitle1" color="error">{getBmiMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>
                  <Divider /><br />
 */}
                  {/* {
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
                        <Divider /><br />
                      </Fragment>
                    } */}

                  {/* <Typography variant="h5">Vision</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" > */}

                    {/*  <Grid>
                    <h4>Visual Acuity</h4>

                    <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Right Eye</TableCell>
            <TableCell align="left">Left Eye</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">Without glasses</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ2')} />
            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ3')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">With glasses</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ4')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ5')} />

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Near vision</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ6')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ7')} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <h4>Findings in the Eye</h4>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Right Eye</TableCell>
            <TableCell align="left">Left Eye</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left">Lids</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ8')} />
            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ9')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Conjunctiva</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ10')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ11')} />

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Cornea</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ12')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ13')} />

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Anterior segment</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ14')} />
            </TableCell>
        
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ15')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Iris</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ16')} />
            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ17')} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Pupil</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ18')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ19')} />

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Lens</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ20')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ21')} />

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Ocular movements</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ22')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ23')} />

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">IOP</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ24')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ25')} />

            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Duct</TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ26')} />

            </TableCell>
            <TableCell align="left">
            <TextField variant="outlined" value={populateField(info, 'Eye Screening', 'eyeScreeningQ27')} />

            </TableCell>
          </TableRow>
        </TableBody>
      </Table>




                      </Grid> */}



                    {/* <Grid item xs={2}>Visual acuity (w/o pinhole occluder) - Right Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={"6/" + populateField(info, 'Geri - Vision', 'geriVisionQ3')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w/o pinhole occluder) - Left Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={"6/" + populateField(info, 'Geri - Vision', 'geriVisionQ4')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w pinhole occluder) - Right Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={"6/" + populateField(info, 'Geri - Vision', 'geriVisionQ5')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w pinhole occluder) - Left Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={"6/" + populateField(info, 'Geri - Vision', 'geriVisionQ6')} /></Grid> */}
                  {/* </Grid> */}
                  {/* <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    {
                      !this.state.printFlag &&
                      <Fragment>
                        <Grid item xs={3}><Typography variant="subtitle1" color="error">{getVisionProblemMessage(info, this.state.printFlag)}</Typography></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={3}><Typography variant="subtitle1" color="error">{getPinholeMessage(info, this.state.printFlag)}</Typography></Grid>
                        <Grid item xs={1}></Grid>
                      </Fragment>
                    }
                    <Grid item xs={4}><Typography variant="subtitle1" color="error">{getRefractiveMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>
                  <Divider /><br />

                  {
                    !this.state.printFlag &&
                    <Fragment>
                      <Typography variant="h5">Past Medical History</Typography>
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={6}>Has a doctor ever told you that you have the following condition? Please tick the appropriate box(es) if the answer is "Yes" to any of the conditions listed below, or tick the last box if you have none. <TextField variant="outlined" fullWidth={true} margin="dense" value={getPastMedicalHistory(info, this.state.printFlag)} /></Grid>
                        <Grid item xs={6}>For respondent with known hypertension, diabetes, high cholesterol and stroke only. Are you currently on follow up with a doctor for the existing conditions you have indicated? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx NSS', 'hxNssQ2')} /></Grid>
                      </Grid>
                      <Divider /><br />
                      <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                        <Grid item xs={5}><Typography variant="subtitle1" color="error">{getMedicalHistoryMessage(info, this.state.printFlag)}</Typography></Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={6}><Typography variant="subtitle1" color="error">{getFollowUpMessage(info, this.state.printFlag)}</Typography></Grid>
                      </Grid>
                      <Divider /><br />
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
                      <Divider /><br />
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
                    <Grid item xs={5}><Typography variant="subtitle1" color="error">{getFITMessage(info, this.state.printFlag)}</Typography></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}>{getWCEMessage(info, this.state.printFlag)}</Grid>
                  </Grid>
                  <Divider /><br />

                  <Typography variant="h5">Geriatrics</Typography>
                  {
                    !this.state.printFlag && 
                    <Fragment>
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={6}>Was the participant referred for Social Service? (PT): <TextField variant="outlined" error={isReferredFromPt(info)} fullWidth={true} margin="dense" value={populateField(info, 'Geri - PT Consult', 'geriPtConsultQ4')} /></Grid>
                        <Grid item xs={6}>Was the participant referred for Social Service? (OT): <TextField variant="outlined" error={isReferredFromOt(info)} fullWidth={true} margin="dense" value={populateField(info, 'Geri - OT Consult', 'geriOtConsultQ4')} /></Grid>
                      </Grid>
                      <Divider /><br />
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={6}>Reasons for referral to social support (PT): <TextField variant="outlined" error={isReferredFromPt(info)} multiline={true} rows={getNoOfLines(populateField(info, 'Geri - PT Consult', 'geriPtConsultQ5'))} fullWidth={true} margin="dense" value={populateField(info, 'Geri - PT Consult', 'geriPtConsultQ5')} /></Grid>
                        <Grid item xs={6}>Reasons for referral to social support (OT): <TextField variant="outlined" error={isReferredFromOt(info)} multiline={true} rows={getNoOfLines(populateField(info, 'Geri - OT Consult', 'geriOtConsultQ5'))} fullWidth={true} margin="dense" value={populateField(info, 'Geri - OT Consult', 'geriOtConsultQ5')} /></Grid>
                      </Grid>
                      <Divider /><br />
                    </Fragment>
                  }
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={6}>Which organisation was the participant referred to for post-screening assessment? (from AMT) <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Geri - Cognitive Follow Up', 'geriCognitiveFollowUpQ1', 'geriCognitiveFollowUpQ2')} /></Grid>
                    <Grid item xs={6}>Which of the programmes did the OT recommend for the participant to go? (if applicable) <TextField variant="outlined" error={isReferredToOtProgrammes(info, this.state.printFlag)} fullWidth={true} margin="dense" value={populateField(info, 'Geri - OT Consult', 'geriOtConsultQ6')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getAmtAssessmentMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>
                  <Divider /><br />

                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={3}><Typography variant="h5">Social Service</Typography></Grid>
                    <Grid item xs={9}><Typography variant="h5">Doctor's Consult</Typography></Grid>
                  </Grid>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={3}>Did the participant visit the social service station? <TextField variant="outlined" error={isReferredToSocialService(info)} fullWidth={true} margin="dense" value={populateField(info, 'Social Service', 'socialServiceQ1')} /></Grid>                    
                    <Grid item xs={3}>Did this participant consult an on-site doctor today? <TextField variant="outlined" error={isConsultedDoctor(info)} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ11')} /></Grid>                    
                    <Grid item xs={3}>Does this participant require urgent follow-up? <TextField variant="outlined" error={isUrgentFollowUp(info)} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ10')} /></Grid>                    
                    <Grid item xs={3}>Was the participant referred to the dietitian? <TextField variant="outlined" error={isReferredToDietitian(info)} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ4')} /></Grid>                    
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={5}><Typography variant="subtitle1" color="error">{getSocialServiceReferralMessage(info, this.state.printFlag)}</Typography></Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getUrgentFollowUpMessage(info, this.state.printFlag)}</Typography></Grid>
                  </Grid>
                  <Divider /><br />

                  {
                    !this.state.printFlag && 
                    <Fragment>
                      <Typography variant="h5">Doctor's Memo</Typography>
                      <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                        <Grid item xs={12}>Memo <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ3'))} fullWidth={true} margin="dense" value={populateField(info, 'Doctor\'s Consult', 'doctorSConsultQ3')} /></Grid>
                      </Grid>
                      <Divider /><br /><br />
                    </Fragment>
                  } */}

                  {/*                   <Typography variant="h5" color="error">All participants will receive a more detailed health report from PHS within 4-6 weeks of the screening.<br/> *If you have gone for phlebotomy, you will receive the blood test results from NUHS within 4 - 6 weeks of the screening.</Typography>
 */}
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