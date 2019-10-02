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

}

const populateField = (info, station, field, reasonField) => {
  if (info && typeof (info[station]) !== "undefined" && typeof (info[station][field]) !== "undefined") {
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
    if (reasonField && typeof(info[station][reasonField]) !== "undefined") {
      return info[station][field] + "\n" + info[station][reasonField]
    }
    else {
      return info[station][field];
    }
  }
  return "-";
}

const getPastMedicalHistory = (info) => {
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
  return text.split('\n').length
}



const getBpMessage = (info) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ17']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ18']) !== "undefined") {
    if (info['Hx Cancer'].hxCancerQ17 >= 130 || info['Hx Cancer'].hxCancerQ18 >= 85) {
      return "Blood pressure is high, please see a GP if you have not been diagnosed with hypertension";
    }
  }

  return "";
}

const getBmiMessage = (info) => {
  if (info && typeof (info['Hx Cancer']) !== "undefined" && typeof (info['Hx Cancer']['hxCancerQ21']) !== "undefined") {
    if (info['Hx Cancer'].hxCancerQ21 >= 23) {
      return "BMI is overweight";
    }
    if (info['Hx Cancer'].hxCancerQ21 <= 18.5) {
      return "BMI is underweight";
    }
  }
  return "";
}

const getIncontinenceMessage = (info) => {
  if (info && typeof (info['Hx HSCR']) !== "undefined" && typeof (info['Hx HSCR']['hxHcsrQ5']) !== "undefined") {
      return "Check if participant is referred to Soceity for Continence Singapore (SFCS) booth at exhibition. If no, tick on PHS Passport and indicate";
  }
  return "";
}

const getHearingMessage = (info) => {
  if (info && typeof (info['Hx HSCR']) !== "undefined" && typeof (info['Hx HSCR']['hxHcsrQ9']) !== "undefined") {
      return "If it is a Geri participant, inform them HPB will follow-up with them. If it is a non-Geri participant, advice them to visit a polyclinic to follow-up with their hearing issue";
  }
  return "";
}

const getPinholeMessage = (info) => {
  if (info && typeof (info['Geri - Vision']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ3']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ4']) !== "undefined") {
    if(info['Geri - Vision']['geriVisionQ3'] >= 12  || info['Geri - Vision']['geriVisionQ4'] >= 12){
      return "See VA with pinhole";
    }
  }
  return "";
}

const getRefractiveMessage = (info) => {
  if (info && typeof (info['Geri - Vision']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ6']) !== "undefined" && typeof(info['Geri - Vision']['geriVisionQ7']) !== "undefined") {
    if(info['Geri - Vision']['geriVisionQ3'] >= 12  || info['Geri - Vision']['geriVisionQ4'] >= 12){
      return "Non-refractive error, participant should have consulted on-site doctor";
    } else {
      return "Refractive error, participant should have received spectacles vouchers"
    }
  }
  return "";
}

const getMedicalHistoryMessage = (info) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ1']) !== "undefined") {
      return "Check if participant is referred to Health Promotion Board (HPB) booth at Exhibition. If no, tick on PHS Passport and indicate";
  }
  return "";
}

const getFollowUpMessage = (info) => {
  if (info && typeof (info['Hx NSS']) !== "undefined" && typeof (info['Hx NSS']['hxNssQ2']) !== "undefined") {
    if(info['Hx NSS']['hxNssQ2'] === "No"){
      return "Check if participant is referred to Health Promotion Board (HPB) booth at Exhibition. If no, tick on PHS Passport and indicate.";
    }
  }
  return "";
}

<h2>Social History</h2>
                Do you smoke? <br />
                <b>{typeof (info['Hx NSS']) !== "undefined" &&
                  typeof (info['Hx NSS'].hxNssQ14) !== "undefined" &&
                  <div>
                    {info['Hx NSS'].hxNssQ14}
                    {info['Hx NSS'].hxNssQ14.includes("Yes") &&
                      <p><br />Check if participant is referred to Health Promotion Board (HPB) iQuit booth at Exhibition. If no, tick on PHS Passport and indicate.</p>}</div>
                }<br /><br /></b>
                Do you consume alcoholic drinks? (Note: Standard drink means a shot of hard liquor, a can or bottle of beer, or a glass of wine.) <br />
                <b>{typeof (info['Hx NSS']) !== "undefined" &&
                  typeof (info['Hx NSS'].hxNssQ15) !== "undefined" &&
                  (info['Hx NSS'].hxNssQ15 === "Less than 2 standard drinks per day on average." || info['Hx NSS'].hxNssQ15 === "More than 2 standard drinks per day on average.") &&
                  <div>
                    {info['Hx NSS'].hxNssQ15}
                    <p><br />Check if participant is referred to Health Promotion Board (HPB) Metabolic booth at Exhibition. If no, tick on PHS Passport and indicate<br /></p>
                  </div>
                }
                  {typeof (info['Hx NSS']) !== "undefined" &&
                    typeof (info['Hx NSS'].hxNssQ15) !== "undefined" &&
                    info['Hx NSS'].hxNssQ15 !== "Less than 2 standard drinks per day on average." &&
                    info['Hx NSS'].hxNssQ15 !== "More than 2 standard drinks per day on average." &&
                    info['Hx NSS'].hxNssQ15
                  }<br /><br /></b>

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

class ScreeningReview extends Component {
  constructor(props) {
    super(props);
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

  render() {
    const info = this.props.patientInfo;
    return (
      <Fragment>
        <Button variant="outlined" onClick={this.selectStation.bind(this,"")}>Back</Button>
        <Grid container direction="row" justify="flex-start" alignItems="center" >
          <Grid item xs={5}>
            <h1>Screening Review</h1>
          </Grid>
          <Grid item xs={5}>
            <Search station="Screening Review" />
          </Grid>
        </Grid>

        <Grid container
          justify="flex-start"
          spacing={16}>
          <Grid item xs={12}>
            <Queue patientList={this.props.patientList} />
          </Grid>
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
                  <Typography variant="h4">Personal Particulars</Typography>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={2}>ID: <TextField variant="outlined" fullWidth={true} margin="dense" value={info.id} /></Grid>
                    <Grid item xs={6}>Name: <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Pre-Registration', 'preRegistrationQ2')} /></Grid>
                    <Grid item xs={2}>Gender: <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Pre-Registration', 'preRegistrationQ1')} /></Grid>
                    <Grid item xs={2}>NRIC: <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Pre-Registration', 'preRegistrationQ3')} /></Grid>
                  </Grid>
                  <Divider /><br />

                  <Typography variant="h4">Health Concerns</Typography>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={12}>Participant's presenting complaints/concerns (if any) <TextField rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ2'))} variant="outlined" fullWidth={true} multiline={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ2')} /></Grid>
                  </Grid>
                  <Divider /><br />

                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={4}><Typography variant="h4">Blood Pressure</Typography></Grid>
                    <Grid item xs={8}><Typography variant="h4">BMI</Typography></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={2}>Average Blood Pressure (Systolic): <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ17')} /></Grid>
                    <Grid item xs={2}>Average Blood Pressure (Diastolic): <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ18')} /></Grid>
                    <Grid item xs={2}>BMI: <TextField variant="outlined" fullWidth={true} margin="dense" error={isBmiToBeFlag(info)} value={populateField(info, 'Hx Cancer', 'hxCancerQ21')} /></Grid>
                    <Grid item xs={2}>Height (in cm): <TextField variant="outlined" error={isBmiToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ19')} /></Grid>
                    <Grid item xs={2}>Weight (in kg): <TextField variant="outlined" error={isBmiToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ20')} /></Grid>
                    <Grid item xs={2}>Waist Circumference (in cm): <TextField variant="outlined" error={isWaistCircumToBeFlag(info)} fullWidth={true} margin="dense" value={populateField(info, 'Hx Cancer', 'hxCancerQ24')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={4}><Typography variant="subtitle1" color="error">{getBpMessage(info)}</Typography></Grid>
                    <Grid item xs={8}><Typography variant="subtitle1" color="error">{getBmiMessage(info)}</Typography></Grid>
                  </Grid>

                  <Grid container direction="row" justify="space-between" alignItems="center" >
                    <Grid item xs={6}><Typography variant="h4">Urinary Incontinence</Typography></Grid>
                    <Grid item xs={6}><Typography variant="h4">Hearing</Typography></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={6}>Urinary Problems: <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ4', 'hxHcsrQ5'))} fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ4', 'hxHcsrQ5')} /></Grid>
                    <Grid item xs={6}>Hearing Problems: <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ8', 'hxHcsrQ9'))} fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ8', 'hxHcsrQ9')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getIncontinenceMessage(info)}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getHearingMessage(info)}</Typography></Grid>
                  </Grid>
                  
                  <Typography variant="h4">Vision</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={4}>Vision Problems: <TextField variant="outlined" multiline={true} rows={getNoOfLines(populateField(info, 'Hx HCSR', 'hxHcsrQ6', 'hxHcsrQ7'))} fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ6', 'hxHcsrQ7')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w/o pinhole occluder) - Right Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ3')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w/o pinhole occluder) - Left Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ4')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w pinhole occluder) - Right Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ5')} /></Grid>
                    <Grid item xs={2}>Visual acuity (w pinhole occluder) - Left Eye <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx HCSR', 'hxHcsrQ6')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}><Typography variant="subtitle1" color="error">{getPinholeMessage(info)}</Typography></Grid>
                    <Grid item xs={4}><Typography variant="subtitle1" color="error">{getRefractiveMessage(info)}</Typography></Grid>
                  </Grid>

                  <Typography variant="h4">Past Medical History</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={6}>Has a doctor ever told you that you have the following condition? Please tick the appropriate box(es) if the answer is "Yes" to any of the conditions listed below, or tick the last box if you have none. <TextField variant="outlined" multiline={true} rows={getNoOfLines(getPastMedicalHistory(info))} fullWidth={true} margin="dense" value={getPastMedicalHistory(info)} /></Grid>
                    <Grid item xs={6}>For respondent with known hypertension, diabetes, high cholesterol and stroke only. Are you currently on follow up with a doctor for the existing conditions you have indicated? <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx NSS', 'hxNssQ2')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getMedicalHistoryMessage(info)}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getFollowUpMessage(info)}</Typography></Grid>
                  </Grid>

                  <Typography variant="h4">Social History</Typography>
                  <Grid container direction="row" justify="space-between" alignItems="flex-end" >
                    <Grid item xs={6}>Do you smoke? <TextField variant="outlined" multiline={true} rows={getNoOfLines(getPastMedicalHistory(info))} fullWidth={true} margin="dense" value={populateField(info, 'Hx NSS', 'hxNssQ14')} /></Grid>
                    <Grid item xs={6}>Do you consume alcoholic drinks? (Note: Standard drink means a shot of hard liquor, a can or bottle of beer, or a glass of wine.) <TextField variant="outlined" fullWidth={true} margin="dense" value={populateField(info, 'Hx NSS', 'hxNssQ15')} /></Grid>
                  </Grid>
                  <Divider /><br />
                  <Grid container direction="row" justify="space-between" alignItems="flex-start" >
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getSmokingMessage(info)}</Typography></Grid>
                    <Grid item xs={6}><Typography variant="subtitle1" color="error">{getAlcoholMessage(info)}</Typography></Grid>
                  </Grid>


                </Grid>

                <h2>FIT Kits</h2>
                Was participant issued an FIT kit (2 test sets in a pack)? <br />
                <b>{typeof (info['FIT']) !== "undefined" &&
                  typeof (info['FIT'].fitQ2) !== "undefined" &&
                  <div>
                    {info['FIT'].fitQ2}
                    {info['FIT'].fitQ2 === "Yes" &&
                      <p><br />Kindly remind the participant to adhere to the instructions regarding FIT kit application and sending. Teach the participant how to use the kit if he/she is unsure or has forgotten<br /></p>}</div>
                }<br /><br /></b>

                <h2>WCE Station</h2>
                Indicated interest for HPV Test under SCS?<br />
                <b>{typeof (info['WCE']) !== "undefined" &&
                  typeof (info['WCE'].wceQ4) !== "undefined" &&
                  info['WCE'].wceQ4
                }<br /><br /></b>
                Indicated interest for Mammogram under SCS?<br />
                <b>{typeof (info['WCE']) !== "undefined" &&
                  typeof (info['WCE'].wceQ5) !== "undefined" &&
                  info['WCE'].wceQ5
                }<br /><br /></b>
                Registered for Mammogram under NHGD?<br />
                <b>{typeof (info['WCE']) !== "undefined" &&
                  typeof (info['WCE'].wceQ6) !== "undefined" &&
                  info['WCE'].wceQ6 === "Yes, (Please specify date of appointment if given):" &&
                  "Yes"
                }<br /><br /></b>

                <h2>Geriatrics</h2>
                Which organisation was the participant referred to for post-screening assessment? (from AMT) <br />
                <b>{typeof (info['Geri - Cognitive Follow Up']) !== "undefined" &&
                  typeof (info['Geri - Cognitive Follow Up'].geriCognitiveFollowUpQ1) !== "undefined" &&
                  info['Geri - Cognitive Follow Up'].geriCognitiveFollowUpQ1
                }<br /><br /></b>
                To be referred for social support (For HDB Ease Sign-up) (PT): <br />
                <b>{typeof (info['Geri - PT Consult']) !== "undefined" &&
                  typeof (info['Geri - PT Consult'].geriPtConsultQ4) !== "undefined" &&
                  info['Geri - PT Consult'].geriPtConsultQ4 === "No" &&
                  info['Geri - PT Consult'].geriPtConsultQ4
                }
                  <font color="red">{typeof (info['Geri - PT Consult']) !== "undefined" &&
                    typeof (info['Geri - PT Consult'].geriPtConsultQ4) !== "undefined" &&
                    info['Geri - PT Consult'].geriPtConsultQ4 === "Yes" &&
                    <div>
                      {info['Geri - PT Consult'].geriPtConsultQ4}
                      <p><br />Reasons for referral to social support (PT):<br /></p>
                      {typeof (info['Geri - PT Consult'].geriPtConsultQ5) !== "undefined" &&
                        typeof (info['Geri - PT Consult'].geriPtConsultQ5) !== "undefined" &&
                        info['Geri - PT Consult'].geriPtConsultQ5.split("\n").map(text => {
                          return <p>{text}<br /></p>
                        })
                      }
                    </div>
                  }</font>
                  <br /><br /></b>

                To be referred for social support (For HDB Ease Sign-up) (OT): <br />
                <b>{typeof (info['Geri - OT Consult']) !== "undefined" &&
                  typeof (info['Geri - OT Consult'].geriOtConsultQ4) !== "undefined" &&
                  info['Geri - OT Consult'].geriOtConsultQ4 === "No" &&
                  info['Geri - OT Consult'].geriOtConsultQ4
                }
                  <font color="red">{typeof (info['Geri - OT Consult']) !== "undefined" &&
                    typeof (info['Geri - OT Consult'].geriOtConsultQ4) !== "undefined" &&
                    info['Geri - OT Consult'].geriOtConsultQ4 === "Yes" &&
                    <div>
                      {info['Geri - OT Consult'].geriOtConsultQ4}
                      <p><br />Reasons for referral to social support (OT):<br /></p>
                      {typeof (info['Geri - OT Consult'].geriOtConsultQ5) !== "undefined" &&
                        typeof (info['Geri - OT Consult'].geriOtConsultQ5) !== "undefined" &&
                        info['Geri - OT Consult'].geriOtConsultQ5.split("\n").map(text => {
                          return <p>{text}<br /></p>
                        })
                      }
                    </div>
                  }</font>
                  <br /><br /></b>
                Which of the programmes did the OT recommend for the participant to go? (if applicable) <br />
                <b>{typeof (info['Geri - OT Consult']) !== "undefined" &&
                  typeof (info['Geri - OT Consult'].geriOtConsultQ6) === "undefined" &&
                  <p>None<br /></p>
                }
                  <font color="red">{typeof (info['Geri - OT Consult']) !== "undefined" &&
                    typeof (info['Geri - OT Consult'].geriOtConsultQ6) !== "undefined" &&
                    info['Geri - OT Consult'].geriOtConsultQ6.map(text => {
                      return <p>{text}<br /></p>
                    })
                  }</font>
                  <br /><br /></b>
                Referred to go for L2 Eye Screening?
        <b>{typeof (info['Geri - Vision']) !== "undefined" &&
                  typeof (info['Geri - Vision'].geriVisionQ9) !== "undefined" &&
                  info['Geri - Vision'].geriVisionQ9
                }
                  <br /><br /></b>


                <h2>Social Service</h2>
                Did the participant visit the social service station? <br />
                <b>{typeof (info['Social Service']) !== "undefined" &&
                  typeof (info['Social Service'].socialServiceQ1) !== "undefined" &&
                  info['Social Service'].socialServiceQ1 === "No" &&
                  info['Social Service'].socialServiceQ1
                }
                  <mark>{typeof (info['Social Service']) !== "undefined" &&
                    typeof (info['Social Service'].socialServiceQ1) !== "undefined" &&
                    info['Social Service'].socialServiceQ1 === "Yes" &&
                    info['Social Service'].socialServiceQ1
                  }<br /><br /></mark></b>

                <h2>Doctor's Consult</h2>
                Did this patient consult an on-site doctor today?<br />
                <b>{typeof (info['Social Service']) !== "undefined" &&
                  typeof (info['Doctor\'s Consult'].doctorSConsultQ11) !== "undefined" &&
                  info['Doctor\'s Consult'].doctorSConsultQ11 ? <p><mark>Yes</mark></p> : "No"
                }<br /><br /></b>
                Does this patient require urgent follow-up?<br />
                <b>{typeof (info['Social Service']) !== "undefined" &&
                  typeof (info['Doctor\'s Consult'].doctorSConsultQ11) !== "undefined" &&
                  info['Doctor\'s Consult'].doctorSConsultQ11 ? <p><mark>Yes</mark></p> : "No"
                }<br /><br /></b>
                Doctor's memo (if applicable):<br />
                <b>{typeof (info['Doctor\'s Consult']) !== "undefined" &&
                  typeof (info['Doctor\'s Consult'].doctorSConsultQ3) !== "undefined" &&
                  info['Doctor\'s Consult'].doctorSConsultQ3.split("\n").map((text) => {
                    return <p>{text}<br /></p>
                  })
                }
                  <br /><br /></b>
                Was the patient referred to the dietitian?<br />
                <b>{typeof (info['Social Service']) !== "undefined" &&
                  typeof (info['Doctor\'s Consult'].doctorSConsultQ4) !== "undefined" &&
                  info['Doctor\'s Consult'].doctorSConsultQ4 ? "Yes" : "No"
                }<br /><br /></b>

                <h3><font color="red">All participants will receive a more detailed health report from PHS within 4-6 weeks of the screening.
        *If you have gone for phlebotomy, you will receive the blood test results from NUHS within 4 - 6 weeks of the screening.</font></h3>

              </Fragment>
            </Grid>

          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

export default ScreeningReview;