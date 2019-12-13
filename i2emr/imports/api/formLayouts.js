import React, { Component, Fragment } from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { formSchemas } from '/imports/api/formSchemas';

import AutoForm from 'uniforms-material/AutoForm';
import AutoField from 'uniforms-material/AutoField';
import TextField from 'uniforms-material/TextField';
import SubmitField from 'uniforms-material/SubmitField';
import SelectField from 'uniforms-material/SelectField';
import HiddenField from 'uniforms-material/HiddenField';
import NumField from 'uniforms-material/NumField';
import ListField from 'uniforms-material/ListField';
import DateField from 'uniforms-material/DateField';
import RadioField from 'uniforms-material/RadioField';
import BoolField from 'uniforms-material/BoolField';
import LongTextField from 'uniforms-material/LongTextField';

import BaseField from 'uniforms/BaseField';
import nothing from 'uniforms/nothing';
import { Children } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';

// Define DisplayIf
// Used to display fields depending on another field's response
const DisplayIf = ({ children, condition }, { uniforms }) => (condition(uniforms) ? Children.only(children) : nothing);
DisplayIf.contextTypes = BaseField.contextTypes;

// Use to calculate values from uniform.model.<>
const SomeComp =
  ({ calculation }, { uniforms: { model, onChange, error } }) => (calculation(model));

SomeComp.contextTypes = BaseField.contextTypes;

function getScore(model, questionList, expectedAnswer) {
  let score = 0;
  questionList.forEach(function (question) {
    if (question in model && model[question] === expectedAnswer) {
      score++;
    }
  })
  return score;
}

function getFrailScore(model) {
  let score = 0;
  score += model['geriFrailScaleQ1'] === '1' ? 1 : 0
  score += model['geriFrailScaleQ2'] === '1' ? 1 : 0
  score += model['geriFrailScaleQ3'] === '1' ? 1 : 0
  if (typeof (model['geriFrailScaleQ4']) !== "undefined" && model['geriFrailScaleQ4'].length > 4) {
    score += 1
  }
  if (typeof (model['geriFrailScaleQ5']) !== "undefined" && model['geriFrailScaleQ5'] > 5) {
    score += 1
  }

  return score;
}

function getSppbScore(model) {
  let score = 0;
  if (typeof (model['geriSppbQ2']) !== "undefined") {
    score += parseInt(model['geriSppbQ2'].slice(0))
  }
  if (typeof (model['geriSppbQ6']) !== "undefined") {
    const num = parseInt(model['geriSppbQ6'].slice(0))
    if (!Number.isNaN(num)) {
      score += num
    }
  }
  if (typeof (model['geriSppbQ8']) !== "undefined") {
    score += parseInt(model['geriSppbQ8'].slice(0))
  }
  return score;
}

function getBmi(model) {
  if (typeof (model['heightAndWeightQ3']) !== "undefined" && typeof (model['heightAndWeightQ1']) !== "undefined") {
    const bmi = model['heightAndWeightQ3'] / (model['heightAndWeightQ1']) / (model['heightAndWeightQ1'])
    return Number(Math.round(bmi + 'e2') + 'e-2') // rounds to 2dp
  }
}

function getAdultAssess(model) {
  const bmi = getBmi(model)
  if (bmi < 18.5){
    return String("Underweight")
  } else if ((bmi >= 18.5) && (bmi < 23.0)) {
    return String("Normal")
  } else if ((bmi>= 23.0) && (bmi < 25.0)) {
    return String("Overweight")
  } else {
    return String("Obese")
  }
}

function getRatio(model) {
  if (typeof (model['heightAndWeightQ5']) !== "undefined" && typeof (model['heightAndWeightQ6']) !== "undefined") {
    const ratio = model['heightAndWeightQ5'] / (model['heightAndWeightQ6'])
    return Number(Math.round(ratio + 'e2') + 'e-2') // rounds to 2dp
  }
}

function getGlucoseRisk(model) {
  if (typeof (model['totalScore']) !== "undefined") {
    const score = model['totalScore']
    let risk = "";
    if (score <= 20) {
      risk = "Low"
    } else if (score < 50) {
      risk = "Medium"
    } else {
      risk = "High"
    }
    return String(risk)
  }
}

function calculatePreScore(model) {
  let count = 0
  if (typeof (model['preWomenSEduQuizQ2']) !== "undefined" 
    && typeof (model['preWomenSEduQuizQ3']) !== "undefined"
    && typeof (model['preWomenSEduQuizQ4']) !== "undefined"
    && typeof (model['preWomenSEduQuizQ5']) !== "undefined"
    && typeof (model['preWomenSEduQuizQ6']) !== "undefined"
    && typeof (model['preWomenSEduQuizQ7']) !== "undefined") {
    if (model['preWomenSEduQuizQ5'] === "7-10 days after start of menses") {
      count = count + 1
    } 
    if (model['preWomenSEduQuizQ2'] === "All of the above") {
      count = count + 1
    }
    if (model['preWomenSEduQuizQ3'] === "Abrasion") {
      count = count + 1
    }
    if (model['preWomenSEduQuizQ4'] === "Menstruation happens every 28 days, on average") {
      count = count + 1
    }
    if (model['preWomenSEduQuizQ6'] === "Once a month") {
      count = count + 1
    }
    if (model['preWomenSEduQuizQ7'] === "All of the above") {
      count = count + 1
    }
  }
  return count;
}

function calculateGlucose(model) {
  let count = 0
  if (typeof (model['bloodGlucoseAndHbQ2']) !== "undefined" 
    && typeof (model['bloodGlucoseAndHbQ3']) !== "undefined"
    && typeof (model['bloodGlucoseAndHbQ4']) !== "undefined"
    && typeof (model['bloodGlucoseAndHbQ5']) !== "undefined") {
    if (model['bloodGlucoseAndHbQ2'] === "< 35 years old") {
      count
    } else if (model['bloodGlucoseAndHbQ2'] === "35 - 49 years old"){
      count = count + 20
    } else {
      count = count + 30
    }
    if (model['bloodGlucoseAndHbQ3'] === "Female < 80cm, Male < 90cm") {
      count
    } else if (model['bloodGlucoseAndHbQ3'] === "Female 80-89cm, Male 90-99cm"){
      count = count + 10
    } else {
      count = count + 20
    }
    if (model['bloodGlucoseAndHbQ4'] === "Vigorous exercise or strenuous work") {
      count
    } else if (model['bloodGlucoseAndHbQ4'] === "Moderate exercise at work/home"){
      count = count + 10
    } else if (model['bloodGlucoseAndHbQ4'] === "Mild exercise at work/home"){
      count = count + 20
    } else {
      count = count + 30
    }
    if (model['bloodGlucoseAndHbQ5'] === "0") {
      count
    } else if (model['bloodGlucoseAndHbQ5'] === "1"){
      count = count + 10
    } else {
      count = count + 20
    }
  }
  return count;
}

function consult(model, question, expected) {
  if (typeof (model[question]) !== "undefined") {
    if (model[question] === expected || typeof(model['doctorConsult']) !== "undefined") {
      return String("Yes")
    }
  }
}

function calculatePostScore(model) {
  let count = 0
  if (typeof (model['postWomenSEduQuizQ2']) !== "undefined" 
    && typeof (model['postWomenSEduQuizQ3']) !== "undefined"
    && typeof (model['postWomenSEduQuizQ4']) !== "undefined"
    && typeof (model['postWomenSEduQuizQ5']) !== "undefined"
    && typeof (model['postWomenSEduQuizQ6']) !== "undefined"
    && typeof (model['postWomenSEduQuizQ7']) !== "undefined") {
    if (model['postWomenSEduQuizQ5'] === "7-10 days after start of menses") {
      count = count + 1
    } 
    if (model['postWomenSEduQuizQ2'] === "All of the above") {
      count = count + 1
    }
    if (model['postWomenSEduQuizQ3'] === "Abrasion") {
      count = count + 1
    }
    if (model['postWomenSEduQuizQ4'] === "Menstruation happens every 28 days, on average") {
      count = count + 1
    }
    if (model['postWomenSEduQuizQ6'] === "Once a month") {
      count = count + 1
    }
    if (model['postWomenSEduQuizQ7'] === "All of the above") {
      count = count + 1
    }
  }
  return count;
}

function calculateSysBP(model) {
  let sysBP = 0
  if (typeof (model['bpQ1']) === "undefined") {
    sysBP = 0
  } else if (typeof (model['bpQ3']) !== "undefined") {
    if (typeof (model['bpQ5']) !== "undefined") {
      const a = model["bpQ1"]
      const b = model["bpQ3"]
      const c = model["bpQ5"]
      if ((a > b) && (a > c)){
        sysBP = (b + c) / 2
      } else if (a > b) {
        sysBP = (a + b) / 2
      } else if (a > c) {
        sysBP = (a + c) /2
      } else {
        if (b > c) {
          sysBP = (a+c) / 2
        } else {
          sysBP = (a + b) / 2
        }
      }
    } else {
      sysBP = (model["bpQ1"] + model["bpQ3"]) / 2 
    }
  } else {
    sysBP = model["bpQ1"]
  }
  return sysBP
}

function calculateDysBP(model) {
  let sysBP = 0
  if (typeof (model['bpQ2']) === "undefined") {
    sysBP = 0
  } else if (typeof (model['bpQ4']) !== "undefined") {
    if (typeof (model['bpQ6']) !== "undefined") {
      const a = model["bpQ2"]
      const b = model["bpQ4"]
      const c = model["bpQ6"]
      if ((a > b) && (a > c)){
        sysBP = (b + c) / 2
      } else if (a > b) {
        sysBP = (a + b) / 2
      } else if (a > c) {
        sysBP = (a + c) /2
      } else {
        if (b > c) {
          sysBP = (a+c) / 2
        } else {
          sysBP = (a + b) / 2
        }
      }
    } else {
      sysBP = (model["bpQ2"] + model["bpQ4"]) / 2 
    }
  } else {
    sysBP = model["bpQ2"]
  }
  return sysBP
}

// Define the layouts
export const formLayouts = {
  "Basic Patient Information": (info) => (
    <Fragment>
      <h2>1. BASIC PATIENT INFORMATION</h2>
      1. Name
      <TextField name="basicPatientInformationQ1" label="Basic Patient Information Q1" />
      2. Gender
      <RadioField name="basicPatientInformationQ2" label="Basic Patient Information Q2" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ2) !== "undefined" && context.model.basicPatientInformationQ2 === "Female")}>
        <Fragment>
          Pregnant
          <RadioField name="basicPatientInformationQ12" label="basicPatientInformationQ12" />
        </Fragment>
      </DisplayIf>
      3. Birthdate
      <TextField name="basicPatientInformationQ3" label="Basic Patient Information Q3" />
      4. Age <br />
      <NumField name="basicPatientInformationQ4" label="Basic Patient Information Q4" /><br />
      5. District Name
      <TextField name="basicPatientInformationQ5" label="Basic Patient Information Q5" />
      6. Address
      <TextField name="basicPatientInformationQ6" label="Basic Patient Information Q6" />
      7. Zip Code
      <TextField name="basicPatientInformationQ7" label="Basic Patient Information Q7" />
      8. Contact Number <br />
      <NumField name="basicPatientInformationQ8" label="Patient Information Q8" /><br /><br></br>
      9. Spoken Language
      <TextField name="basicPatientInformationQ9" label="Basic Patient Information Q9" />
      10. Any drug allergic?
      <RadioField name="basicPatientInformationQ10" label="Basic Patient Information Q10" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ10) !== "undefined" && context.model.basicPatientInformationQ10 === "Yes, pls specify")}>
        <Fragment>
          Pls Specify.
          <TextField name="basicPatientInformationQ13" label="Basic Patient Information Q13" />
        </Fragment>
      </DisplayIf>
      11. Do you have any blood borne diseases?
      <RadioField name="basicPatientInformationQ11" label="Basic Patient Information Q11" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ11) !== "undefined" && context.model.basicPatientInformationQ11 === "Yes, pls specify")}>
        <Fragment>
          Pls Specify. **Patient not allowed to do Phlebotomy.
          <TextField name="basicPatientInformationQ14" label="Basic Patient Information Q14" />
        </Fragment>
      </DisplayIf>

      <h2>2. TB SCREENING</h2>
      2.1.1. Have you ever been diagnosed with tuberculosis?
		<RadioField name="basicPatientInformationQ15" label="Basic Patient Information Q15" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ15) !== "undefined" && context.model.basicPatientInformationQ15 === "Yes")}>
        <Fragment>
          <font color="red"> **Immediate Doctor's Consult</font><br></br>
          <SomeComp calculation={(model) => (
            <text>
              Doctor Consult? :
              {model['doctorConsult'] = consult(model, "basicPatientInformationQ15", "Yes")}
            </text>
            )} /> <br></br>
          Comments
          <TextField name="basicPatientInformationQ16" label="Basic Patient Information Q16" />
        </Fragment>
      </DisplayIf>
      2.1.2. Have you ever lived with someone with tuberculosis?
		<RadioField name="basicPatientInformationQ17" label="Basic Patient Information Q17" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ17) !== "undefined" 
        && (context.model.basicPatientInformationQ17 === "Yes, the person was diagnosed with TB within the past 4 months" 
          || context.model.basicPatientInformationQ17 === "Yes, the person was diagnosed with TB more than 4 months ago"))}>
        <Fragment>
        <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ17) !== "undefined" 
        && (context.model.basicPatientInformationQ17 === "Yes, the person was diagnosed with TB within the past 4 months" ))}>
        <Fragment>
        <font color="red"> **Immediate Doctor's Consult</font><br></br>
        <SomeComp calculation={(model) => (
            <text>
              Doctor Consult? :
              {model['doctorConsult'] = consult(model, "basicPatientInformationQ17", "Yes, the person was diagnosed with TB within the past 4 months")}
            </text>
            )} /> <br></br>
            </Fragment>
            </DisplayIf>
            <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ17) !== "undefined" 
             && (context.model.basicPatientInformationQ17 === "Yes, the person was diagnosed with TB more than 4 months ago" ))}>
              <Fragment>
                <SomeComp calculation={(model) => (
                <text>
                Doctor Consult? :
                {model['doctorConsult'] = consult(model, "basicPatientInformationQ17", "Yes, the person was diagnosed with TB more than 4 months ago")}
                </text>
                )} /> <br></br>
              </Fragment>
            </DisplayIf>
          Comments
          <TextField name="basicPatientInformationQ18" label="Basic Patient Information Q18" />
        </Fragment>
      </DisplayIf>
      2.1.3. Do you have any of the following symptoms? Select all that apply
      <br></br>    - Cough that has lasted more than 2 weeks
      <br></br>    - Coughing up blood
      <br></br>    - Breathlessness
      <br></br>    - Weight loss
      <br></br>    - Night sweats
      <br></br>    - Fever
      <br></br>    - Loss of appetite

		<RadioField name="basicPatientInformationQ19" label="Basic Patient Information Q19" />
      <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ19) !== "undefined" && context.model.basicPatientInformationQ19 === "Yes")}>
        <Fragment>
        <DisplayIf condition={(context) => (typeof (context.model.basicPatientInformationQ19) !== "undefined" 
             && (context.model.basicPatientInformationQ19 === "Yes" ))}>
              <Fragment>
                <SomeComp calculation={(model) => (
                <text>
                Doctor Consult? :
                {model['doctorConsult'] = consult(model, "basicPatientInformationQ19", "Yes")}
                </text>
                )} /> <br></br>
              </Fragment>
            </DisplayIf>
          Select symptoms
          <SelectField name="basicPatientInformationQ20" checkboxes="true" label="Basic Patient Information Q20" />
        </Fragment>
      </DisplayIf>

    </Fragment>
  ),

  "Patient Profiling": (info) => (
    <Fragment>
      {/* <h2>2. PATIENT PROFILING</h2>
      <h2>2.1 TB SCREENING</h2>
      2.1.1. Have you ever been diagnosed with tuberculosis?
		<RadioField name="patientProfilingQ1" label="Patient Profiling Q1" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ1) !== "undefined" && context.model.patientProfilingQ1 === "Yes")}>
        <Fragment>
          <font color="red"> **Immediate Doctor's Consult</font><br></br>
          <SomeComp calculation={(model) => (
            <text>
              Doctor Consult? :
              {model['doctorConsult'] = consult(model, "patientProfilingQ1", "Yes")}
            </text>
            )} /> <br></br>
          Comments
          <TextField name="patientProfilingQ21" label="patientProfilingQ21" />
        </Fragment>
      </DisplayIf>
      2.1.2. Have you ever lived with someone with tuberculosis?
		<RadioField name="patientProfilingQ2" label="Patient Profiling Q2" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ2) !== "undefined" 
        && (context.model.patientProfilingQ2 === "Yes, the person was diagnosed with TB within the past 4 months" 
          || context.model.patientProfilingQ2 === "Yes, the person was diagnosed with TB more than 4 months ago"))}>
        <Fragment>
        <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ2) !== "undefined" 
        && (context.model.patientProfilingQ2 === "Yes, the person was diagnosed with TB within the past 4 months" ))}>
        <Fragment>
        <font color="red"> **Immediate Doctor's Consult</font><br></br>
        <SomeComp calculation={(model) => (
            <text>
              Doctor Consult? :
              {model['doctorConsult'] = consult(model, "patientProfilingQ2", "Yes, the person was diagnosed with TB within the past 4 months")}
            </text>
            )} /> <br></br>
            </Fragment>
            </DisplayIf>
            <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ2) !== "undefined" 
             && (context.model.patientProfilingQ2 === "Yes, the person was diagnosed with TB more than 4 months ago" ))}>
              <Fragment>
                <SomeComp calculation={(model) => (
                <text>
                Doctor Consult? :
                {model['doctorConsult'] = consult(model, "patientProfilingQ2", "Yes, the person was diagnosed with TB more than 4 months ago")}
                </text>
                )} /> <br></br>
              </Fragment>
            </DisplayIf>
          Comments
          <TextField name="patientProfilingQ22" label="patientProfilingQ22" />
        </Fragment>
      </DisplayIf>
      2.1.3. Do you have any of the following symptoms? Select all that apply
      <br></br>    - Cough that has lasted more than 2 weeks
      <br></br>    - Coughing up blood
      <br></br>    - Breathlessness
      <br></br>    - Weight loss
      <br></br>    - Night sweats
      <br></br>    - Fever
      <br></br>    - Loss of appetite

		<RadioField name="patientProfilingQ3" label="Patient Profiling Q3" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ3) !== "undefined" && context.model.patientProfilingQ3 === "Yes")}>
        <Fragment>
        <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ3) !== "undefined" 
             && (context.model.patientProfilingQ3 === "Yes" ))}>
              <Fragment>
                <SomeComp calculation={(model) => (
                <text>
                Doctor Consult? :
                {model['doctorConsult'] = consult(model, "patientProfilingQ3", "Yes")}
                </text>
                )} /> <br></br>
              </Fragment>
            </DisplayIf>
          Select symptoms
          <SelectField name="patientProfilingQ23" checkboxes="true" label="patientProfilingQ23" />
        </Fragment>
      </DisplayIf> */}
      <h2> MEDICAL HISTORY</h2>
       Do you have any of the following medical conditions?
		<SelectField name="patientProfilingQ4" checkboxes="true" label="Patient Profiling Q4" />
      <h2> MEDICAL HISTORY: OTHERS</h2>
     Do you have other medical conditions we should take note of? (if none, indicate NIL)
		<TextField name="patientProfilingQ5" label="Patient Profiling Q5" />
     How are you managing these conditions? (check-ups, medicines, diet/exercise, others)
		<TextField name="patientProfilingQ6" label="Patient Profiling Q6" />
     Where do you go to for routine healthcare?
		<TextField name="patientProfilingQ7" label="Patient Profiling Q7" />
     Where do you go to for emergency medical services (eg. fall, injury, fainting)?
		<TextField name="patientProfilingQ8" label="Patient Profiling Q8" />
     Are you taking any other medications? (If yes, indicate what medication and why. If none, indicate NIL)
		<TextField name="patientProfilingQ9" label="Patient Profiling Q9" />
      <h2> BARRIERS TO HEALTHCARE</h2>
       What type of doctor do you see for your existing conditions?
		<RadioField name="patientProfilingQ10" label="Patient Profiling Q10" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ10) !== "undefined" && context.model.patientProfilingQ10 === "Seldom/Never visits the doctor")}>
        <Fragment>
          Pls Specify Why.
          <TextField name="patientProfilingQ24" label="patientProfilingQ24" />
        </Fragment>
      </DisplayIf>
      <h2> SMOKING</h2>
       Do you currently smoke?
		<RadioField name="patientProfilingQ11" label="Patient Profiling Q11" />
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ11) !== "undefined" && context.model.patientProfilingQ11 === "Yes")}>
        <Fragment>
           How much do you smoke?
          <RadioField name="patientProfilingQ25" label="patientProfilingQ25" /> <br></br>
           What do you smoke?
          <SelectField name="patientProfilingQ26" checkboxes="true" label="patientProfilingQ26" /> <br></br>
           How many years have you been smoking for? (Rounded up)
          <NumField name="patientProfilingQ27" label="Patient Profiling Q27" /><br></br>
        </Fragment>
      </DisplayIf>
      <DisplayIf condition={(context) => (typeof (context.model.patientProfilingQ11) !== "undefined" && context.model.patientProfilingQ11 === "No")}>
        <Fragment>
           Have you smoke before?
          <RadioField name="patientProfilingQ28" label="patientProfilingQ28" /> <br></br>
        </Fragment>
      </DisplayIf>
       Do you chew pann or tobacoo?
		<RadioField name="patientProfilingQ12" label="Patient Profiling Q12" />
      <h2> SOCIAL HISTORY</h2>
     What is your occupation?
		<TextField name="patientProfilingQ13" label="Patient Profiling Q13" />
     If occupation is "Farming/Ariculture', do you use pesticides in your farming?
		<RadioField name="patientProfilingQ14" label="Patient Profiling Q14" />
     Monthly Income? (optional) <br />
      <NumField name="patientProfilingQ15" label="Patient Profiling Q15" /><br />
     Marital Status
		<RadioField name="patientProfilingQ16" label="Patient Profiling Q16" />
       Number of Children <br />
      <NumField name="patientProfilingQ17" label="Patient Profiling Q17" /><br />
       How many people live in your household (including you)? <br />
      <NumField name="patientProfilingQ18" label="Patient Profiling Q18" /><br />
       How many people in your household contribute to household income? <br />
      <NumField name="patientProfilingQ19" label="Patient Profiling Q19" /><br />
       What is your highest education level?
		<RadioField name="patientProfilingQ20" label="Patient Profiling Q20" />
    </Fragment>
  ),

  "Station Select" : (info) => (
    <Fragment>
      <h2>STATION SELECT</h2>
      1. Height and Weight + Wasit and Hip Measurement
      <RadioField name="stationSelectQ1" label="Station Select Q1"/>
      <h2>2. Blood Glucose</h2>
      2.1. Can we check your blood sugar?<br />This will be done by pricking your finger to get a small drop of blood
      <RadioField name="stationSelectQ2" label="Station Select Q2"/>
      2.2. Can we check if you have anemia?<br />This will be done by pricking your finger to get a small drop of blood
      <RadioField name="stationSelectQ3" label="Station Select Q3"/>
      3. Can we check your blood pressure?
      <RadioField name="stationSelectQ4" label="Station Select Q4"/>
      <h2>4. Phlebotomy (for patient aged 40 years old and above)</h2>
      4.1 Do you have the following conditions?
      <br></br>- High blood pressure
      <br></br>- Diabetes
      <br></br>- Cigarette smoking
      <br></br>- Family member with coronary artery disease
      <br></br>- Family member with high cholesterol
      <br></br>- Chronic kidney disease
      <RadioField name="stationSelectQ5" label="Station Select Q5"/>
      <DisplayIf condition={(context) => (typeof (context.model.stationSelectQ5) !== "undefined" && context.model.stationSelectQ5 === "Yes")}>
        <Fragment>
          4.1.1. Can we do a blood test to see if you have high cholesterol?<br />A blood sample will be taken by a trained staff. This will then be sent to the lab, and a report will be mailed to you after some time
          <RadioField name="stationSelectQ6" label="Station Select Q6"/>
          </Fragment>
        </DisplayIf>
      <h2>5. Pap Smear</h2>
      5.1. Are you married (or have you ever been married)?
      <RadioField name="stationSelectQ7" label="Station Select Q7"/>
      <DisplayIf condition={(context) => (typeof (context.model.stationSelectQ7) !== "undefined" && context.model.stationSelectQ7 === "Yes")}>
        <Fragment>
          5.1.1. If yes to Q7, have you done a Pap smear in the past 3 years?
          <RadioField name="stationSelectQ8" label="Station Select Q8"/>
          {/* <DisplayIf condition={(context) => (typeof (context.model.stationSelectQ8) !== "undefined" && context.model.stationSelectQ8 === "No")}>
            <Fragment>
            5.1.1.1.  If no to Q8, would you want to undergo a free Pap smear today to check for cervical cancer?
            <RadioField name="stationSelectQ9" label="Station Select Q9"/>
            </Fragment>
          </DisplayIf> */}
        </Fragment>
      </DisplayIf>
      {/* <h2>6. Clinical Breast Examination</h2>
      6.1. Would you want to undergo a breast examination for breast cancer today? 
      <RadioField name="stationSelectQ10" label="Station Select Q10"/> */}
      {/* <h2>7. Women's Education</h2>
      7.1 Can we teach you about women's health?<br />For adults, we will be sharing about menstrual health and breast self examinations. For girls aged 10-18 years old, we will be sharing about menstrual health only.
      <RadioField name="stationSelectQ11" label="Station Select Q11"/> */}
      <h2>8. Doctors' Consult</h2>
      8.1. Would you like to see a doctor today? (You will be asked to see the doctor if your test results are abnormal, but would you otherwise want to see the doctor?)
      <RadioField name="doctorConsult" label="doctorConsult"/>
      {/* <h2>9. Eye Screening</h2>
      9.1 Can we check your eyes/vision?
      <RadioField name="stationSelectQ13" label="Station Select Q13"/> */}
      {/* <h2>10. Education</h2>
      10.1. Can we teach you about healthy lifestyles and how to prevent common diseases like diabetes and high blood pressure?
      <RadioField name="stationSelectQ14" label="Station Select Q14"/> */}
      
    </Fragment>
  ),

  "Height and Weight": (info) => (
    <Fragment>
      <h2>HEIGHT & WEIGHT</h2>
      Is the participant a child?
      <RadioField name="isChild" label="isChild" /><br />
      1.1 Height (m) <br />
      <NumField name="heightAndWeightQ1" label="Height and Weight Q1" /><br />
      <DisplayIf condition={(context) => (typeof (context.model.isChild) !== "undefined" && context.model.isChild === "Yes")}>
        <Fragment>
          Pls select percentile
		      <RadioField name="heightAndWeightQ2" label="Height and Weight Q2" />
        </Fragment>
      </DisplayIf>
      1.2 Weight (kg) <br />
      <NumField name="heightAndWeightQ3" label="Height and Weight Q3" /><br />
      <DisplayIf condition={(context) => (typeof (context.model.isChild) !== "undefined" && context.model.isChild === "Yes")}>
        <Fragment>
          Pls select percentile
		      <RadioField name="heightAndWeightQ4" label="Height and Weight Q4" />
        </Fragment>
      </DisplayIf>
      <h2>1.3 BMI</h2>
      <SomeComp calculation={(model) => (
        <h3>
          BMI:
              {model['calculateBMI'] = getBmi(model)}
        </h3>
      )} />
      <DisplayIf condition={(context) => (typeof (context.model.isChild) !== "undefined" && context.model.isChild === "Yes")}>
        <Fragment>
          BMI Assessment (Child)
		      <RadioField name="childAssess" label="Child Assessment" />
        </Fragment>
      </DisplayIf>
      <DisplayIf condition={(context) => (typeof (context.model.isChild) !== "undefined" && context.model.isChild === "No")}>
      <Fragment>
        <SomeComp calculation={(model) => (
        <h3>
          BMI Assessment (Adult): 
              {model['adultAssess'] = getAdultAssess(model)}
        </h3>
      )} />
      </Fragment>
      </DisplayIf>
      <h2>2. WAIST : HIP </h2>
      2.1 Waist Circumference (cm) <br />
      <NumField name="heightAndWeightQ5" label="Height and Weight Q5" /><br />
      2.2 Hip Circumfernce (cm) <br />
      <NumField name="heightAndWeightQ6" label="Height and Weight Q6" /><br />
      <h2>2.3 Waist : Hip Ratio</h2>
      <SomeComp calculation={(model) => (
        <h3>
          Ratio:
              {model['calculateRatio'] = getRatio(model)}
        </h3>
      )} />
      <h2>Overview </h2>
      Doctor Consult?
    <RadioField name="doctorConsult" label="doctorConsult" /><br />
    </Fragment>
  ),

  "Eye Screening": (info) => (
    <Fragment>
      <h2>Eye Screening</h2>
      Completed?
		<RadioField name="eyeScreeningQ1" label="Eye Screening Q1" />
    SNC Patient ID
    <TextField name ="eyeScreeningQ2" label= "Eye Screening Q2" />

    </Fragment>
  ),

  "Blood Glucose and Hb": (info) => (
    <Fragment>
      <h2>BLOOD GLUCOSE AND HEMOGLOBIN</h2>
      3.1. Have you previously been diagnosed with diabetes?
		<RadioField name="bloodGlucoseAndHbQ1" label="Blood Glucose and Hb Q1" />
      <DisplayIf condition={(context) => (typeof (context.model.bloodGlucoseAndHbQ1) !== "undefined" && context.model.bloodGlucoseAndHbQ1 === "No")}>
        <Fragment>
          3.1.1. Age
          <RadioField name="bloodGlucoseAndHbQ2" label="Blood Glucose and Hb Q2" />
          3.1.2. Waist circumference (refer to Waist:Hip Ratio section)
          <RadioField name="bloodGlucoseAndHbQ3" label="Blood Glucose and Hb Q3" />
          3.1.3. Physical activity
          <RadioField name="bloodGlucoseAndHbQ4" label="Blood Glucose and Hb Q4" />
          3.1.4. Family history
          <RadioField name="bloodGlucoseAndHbQ5" label="Blood Glucose and Hb Q5" />
          <SomeComp calculation={(model) => (
            <h3>
              Total Score:
                {model['totalScore'] = calculateGlucose(model)}
            </h3>
          )} />
          <SomeComp calculation={(model) => (
            <h3>
              Risk level:
                {model['riskLevel'] = getGlucoseRisk(model)}
            </h3>
          )} />
        </Fragment>
      </DisplayIf>
      3.2. Blood Glucose
		<TextField name="bloodGlucoseAndHbQ6" label="Blood Glucose and Hb Q6" />
      3.3. Hemoglobin (g/dL) <br />
      <NumField name="bloodGlucoseAndHbQ7" label="Blood Glucose and Hb Q7" /><br />
      Overview : Doctor Consult?
		<RadioField name="doctorConsult" label="doctorConsult" />
    </Fragment>
  ),

  "Blood Pressure": (info) => (
    <Fragment>
      <h2>BLOOD PRESSURE</h2>
      <h2>4.1. BP 1st Taking</h2>
      4.1.1. Systolic Blood Pressure <br />
      <NumField name="bpQ1" label="BP Q1" /><br />
      4.1.2. Diastolic Blood Pressure  <br />
      <NumField name="bpQ2" label="BP Q2" /><br />
      <h2>4.2. BP 2nd Taking</h2>
      4.2.1. Systolic Blood Pressure <br />
      <NumField name="bpQ3" label="BP Q3" /><br />
      4.2.2. Diastolic Blood Pressure  <br />
      <NumField name="bpQ4" label="BP Q4" /><br />
      <DisplayIf condition={(context) => ((Math.abs(context.model.bpQ1 - context.model.bpQ3) > 5) 
                                            || (Math.abs(context.model.bpQ2 - context.model.bpQ4) > 5))}>
        <Fragment>
          <h2>4.3. BP 3rd Taking</h2>
          4.3.1. Systolic Blood Pressure <br />
          <NumField name="bpQ5" label="BP Q5" /><br />
          4.3.2. Diastolic Blood Pressure  <br />
          <NumField name="bpQ6" label="BP Q6" /><br />
        </Fragment>
        </DisplayIf>
      <h2>4.4. BP average</h2>
      4.4.1. Systolic Blood Pressure <br />
      <SomeComp calculation={(model) => (
            <h3>
                {model['averageSys'] = calculateSysBP(model)}
            </h3>
          )} />
      4.4.2. Diastolic Blood Pressure  <br />
      <SomeComp calculation={(model) => (
            <h3>
                {model['averageDys'] = calculateDysBP(model)}
            </h3>
          )} />
      Doctor Consult?
		  <RadioField name="doctorConsult" label="doctorConsult" />

    </Fragment>
  ),

  "Phlebo": (info) => (
    <Fragment>
      <h2>PHLEBO</h2>
      Completed?
		<RadioField name="phleboQ1" label="Phlebo Q1" />

    </Fragment>
  ),

  // "Pap Smear": (info) => (
  //   <Fragment>
  //     <h2>6. PAP SMEAR</h2>
  //     Completed?
	// 	<RadioField name="papSmearQ1" label="Pap Smear Q1" />
  //     Notes (if any)
	// 	<LongTextField name="papSmearQ2" label="Pap Smear Q2" />
  //     Doctors' consult required?
	// 	<RadioField name="papSmearQ3" label="Pap Smear Q3" />

  //   </Fragment>
  // ),

  // "Breast Screening": (info) => (
  //   <Fragment>
  //     <h2>7. BREAST SCREENING</h2>
  //     7.1. Completed breast examination?
	// 	<RadioField name="breastScreeningQ1" label="Breast Screening Q1" />
  //     <DisplayIf condition={(context) => (typeof (context.model.breastScreeningQ1) !== "undefined" && context.model.breastScreeningQ1 === "Yes")}>
  //       <Fragment>
  //         7.1.1. Any abnormalities noted (e.g. lumps, skin changes)?
	// 	    <RadioField name="breastScreeningQ2" label="Breast Screening Q2" /> <br></br>
  //         <DisplayIf condition={(context) => (typeof (context.model.breastScreeningQ2) !== "undefined" && context.model.breastScreeningQ2 === "Yes")}>
  //           <Fragment>
  //             7.1.1.1.  If yes to Q2, please describe the abnormalities
	// 	            <TextField name="breastScreeningQ3" label="Breast Screening Q3" />
  //             7.1.1.2.  If yes to Q2, FNAC done?
	// 	            <RadioField name="breastScreeningQ4" label="Breast Screening Q4" />
  //           </Fragment>
  //         </DisplayIf>
  //       </Fragment>
  //     </DisplayIf>
  //     Doctor Consult?
	// 	<RadioField name="breastScreeningQ5" label="Breast Screening Q5" />

  //   </Fragment>
  // ),

  // "Post-screening feedback": (info) => (
  //   <Fragment>
  //     1. I have had a good experience at the screening
  //   <SelectField name="postScreeningFeedbackQ1" label="Post-screening feedback Q1" />
  //     2. I came for the screening because: (Select all that apply)
  //   <SelectField name="postScreeningFeedbackQ2" checkboxes="true" label="Post-screening feedback Q2" />
  //     3. I know that regular health screening is important
  //   <SelectField name="postScreeningFeedbackQ3" label="Post-screening feedback Q3" />
  //     4. I know that it is important to detect chronic diseases and cancers early
  //   <SelectField name="postScreeningFeedbackQ4" label="Post-screening feedback Q4" />
  //     5. I am willing to take the trouble to attend health screenings
  //   <SelectField name="postScreeningFeedbackQ5" label="Post-screening feedback Q5" />
  //     6. I am willing to attend my follow-up sessions
  //   <SelectField name="postScreeningFeedbackQ6" label="Post-screening feedback Q6" />
  //     7. The student volunteers attended to my needs
  //   <SelectField name="postScreeningFeedbackQ7" label="Post-screening feedback Q7" />
  //     8. The student volunteers were well-trained
  //   <SelectField name="postScreeningFeedbackQ8" label="Post-screening feedback Q8" />
  //     9. The waiting time to enter the screening was reasonable
  //   <SelectField name="postScreeningFeedbackQ9" label="Post-screening feedback Q9" />
  //     10. The waiting time for each station was reasonable
  //   <SelectField name="postScreeningFeedbackQ10" label="Post-screening feedback Q10" />
  //     11. The flow of the screening was easy to follow
  //   <SelectField name="postScreeningFeedbackQ11" label="Post-screening feedback Q11" />
  //     12. I would recommend my family/friends to attend this screening
  //   <SelectField name="postScreeningFeedbackQ12" label="Post-screening feedback Q12" />
  //     13. What encouraged you to come for our event? Select all that apply
  //   <SelectField name="postScreeningFeedbackQ13" checkboxes="true" label="Post-screening feedback Q13" />
  //     14. How often do you attend a health screening?
  //   <SelectField name="postScreeningFeedbackQ14" label="Post-screening feedback Q14" />

  //   </Fragment>
  // ),

  "Doctors' Consult": (info) => (
    <Fragment>
    <h2>Doctors' Consult</h2>
      1. Chief complaint
    <SelectField name="doctorsConsultQ1" checkboxes="true" label="Doctors' Consult Q1" />
      2. Doctors' notes/advice
    <LongTextField name="doctorsConsultQ2" label="Doctors' Consult Q2" />
      3. Provided with referral letter?
    <SelectField name="doctorsConsultQ3" label="Doctors' Consult Q3" />
      <DisplayIf condition={context => context.model.doctorsConsultQ3 === "Yes"}>
        <Fragment>
          4. Referral details
      <LongTextField name="doctorsConsultQ4" label="Doctors' Consult Q4" />
        </Fragment>
      </DisplayIf>
      5. Name of doctor
    <TextField name="doctorsConsultQ5" label="Doctors' Consult Q5" />

    </Fragment>
  ),

  // "Eye Screening": (info) => (
  //   <Fragment>
  //     1. Does the participant use spectacles?
  //   <RadioField name="eyeScreeningQ1" label="Eye Screening Q1" />

  //     <h4>Visual Acuity</h4>
  //     <Table aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell></TableCell>
  //           <TableCell align="left">Right Eye</TableCell>
  //           <TableCell align="left">Left Eye</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         <TableRow>
  //           <TableCell align="left">Without glasses</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ2" label="Eye Screening Q2" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ3" label="Eye Screening Q3" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">With glasses</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ4" label="Eye Screening Q4" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ5" label="Eye Screening Q5" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Near vision</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ6" label="Eye Screening Q6" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ7" label="Eye Screening Q7" />
  //           </TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>

  //     <h4>Findings in the Eye</h4>
  //     <Table aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell></TableCell>
  //           <TableCell align="left">Right Eye</TableCell>
  //           <TableCell align="left">Left Eye</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         <TableRow>
  //           <TableCell align="left">Lids</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ8" label="Eye Screening Q8" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ9" label="Eye Screening Q9" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Conjunctiva</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ10" label="Eye Screening Q10" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ11" label="Eye Screening Q11" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Cornea</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ12" label="Eye Screening Q12" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ13" label="Eye Screening Q13" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Anterior segment</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ14" label="Eye Screening Q14" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ15" label="Eye Screening Q15" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Iris</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ16" label="Eye Screening Q16" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ17" label="Eye Screening Q17" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Pupil</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ18" label="Eye Screening Q18" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ19" label="Eye Screening Q19" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Lens</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ20" label="Eye Screening Q20" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ21" label="Eye Screening Q21" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Ocular movements</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ22" label="Eye Screening Q22" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ23" label="Eye Screening Q23" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">IOP</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ24" label="Eye Screening Q24" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ25" label="Eye Screening Q25" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Duct</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ26" label="Eye Screening Q26" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ27" label="Eye Screening Q27" />
  //           </TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>

  //     <h4>Posterior segment examination</h4>
  //     <Table aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell></TableCell>
  //           <TableCell align="left">Right Eye</TableCell>
  //           <TableCell align="left">Left Eye</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         <TableRow>
  //           <TableCell align="left">CDR</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ28" label="Eye Screening Q28" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ29" label="Eye Screening Q29" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Macula</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ30" label="Eye Screening Q30" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ31" label="Eye Screening Q31" />
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell align="left">Retina</TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ32" label="Eye Screening Q32" />
  //           </TableCell>
  //           <TableCell align="left">
  //             <TextField name="eyeScreeningQ33" label="Eye Screening Q33" />
  //           </TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>
  //     34. Diagnosis
  // <TextField name="eyeScreeningQ34" label="Eye Screening Q34" />
  //     35. Advice
  // <TextField name="eyeScreeningQ35" label="Eye Screening Q35" />
  //     36. Name of doctor
  // <TextField name="eyeScreeningQ36" label="Eye Screening Q36" />
  //   </Fragment>
  // ),

  // "Pre-women's edu quiz" : (info) => (
  //   <Fragment>
  //     <h2>PRE-WOMEN'S EDUCATION QUIZ</h2>
  //     <h2>1. Survey</h2>
  //     From a scale of 1-5, how much do you know about menstrual cycles?<br />1 being not at all, and 5 being a lot
  //     <RadioField name="preWomenSEduQuizQ1" label="Pre-women's edu quiz Q1"/>
  //     <h2>2. Quiz</h2>
  //     2.1. Which of the following is/are normal symptom(s) of menstrual periods?
  //     <RadioField name="preWomenSEduQuizQ2" label="Pre-women's edu quiz Q2"/>
  //     2.2. All of the following are reasons for missed periods except
  //     <RadioField name="preWomenSEduQuizQ3" label="Pre-women's edu quiz Q3"/>
  //     2.3. Which of the following is true about menstruation
  //     <RadioField name="preWomenSEduQuizQ4" label="Pre-women's edu quiz Q4"/>
  //     2.4. When is the best time to do a breast self examination?
  //     <RadioField name="preWomenSEduQuizQ5" label="Pre-women's edu quiz Q5"/>
  //     2.5. How often should you do a breast self examination?
  //     <RadioField name="preWomenSEduQuizQ6" label="Pre-women's edu quiz Q6"/>
  //     2.6. You should go to the doctor if you notice:
  //     <RadioField name="preWomenSEduQuizQ7" label="Pre-women's edu quiz Q7"/>
  //     <h2>Score</h2>
  //     <SomeComp calculation={(model) => (
  //       <h3>
  //         Score:
  //             {model['preQuizScore'] = calculatePreScore(model)}
  //       </h3>
  //     )} />
      
  //   </Fragment>
  // ),

  // "Post-women's edu quiz" : (info) => (
  //   <Fragment>
  //     <h2>PRE-WOMEN'S EDUCATION QUIZ</h2>
  //     <h2>1. Survey</h2>
  //     From a scale of 1-5, how much do you know about menstrual cycles?<br />1 being not at all, and 5 being a lot
  //     <RadioField name="postWomenSEduQuizQ1" label="Pre-women's edu quiz Q1"/>
  //     <h2>2. Quiz</h2>
  //     2.1. Which of the following is/are normal symptom(s) of menstrual periods?
  //     <RadioField name="postWomenSEduQuizQ2" label="Pre-women's edu quiz Q2"/>
  //     2.2. All of the following are reasons for missed periods except
  //     <RadioField name="postWomenSEduQuizQ3" label="Pre-women's edu quiz Q3"/>
  //     2.3. Which of the following is true about menstruation
  //     <RadioField name="postWomenSEduQuizQ4" label="Pre-women's edu quiz Q4"/>
  //     2.4. When is the best time to do a breast self examination?
  //     <RadioField name="postWomenSEduQuizQ5" label="Pre-women's edu quiz Q5"/>
  //     2.5. How often should you do a breast self examination?
  //     <RadioField name="postWomenSEduQuizQ6" label="Pre-women's edu quiz Q6"/>
  //     2.6. You should go to the doctor if you notice:
  //     <RadioField name="postWomenSEduQuizQ7" label="Pre-women's edu quiz Q7"/>
  //     <h2>Score</h2>
  //     <SomeComp calculation={(model) => (
  //       <h3>
  //         Score:
  //             {model['postQuizScore'] = calculatePostScore(model)}
  //       </h3>
  //     )} />
      
  //   </Fragment>
  // ),

  "Screening Review": (info) => (
    <Fragment />
  ),

};