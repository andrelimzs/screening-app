import SimpleSchema from 'simpl-schema';

import Patientinfo from '/imports/api/patientinfo';

// Customise validation error messages
SimpleSchema.setDefaultMessages({
  messages: {
    en: {
      "IDnotUnique": "ID is already registered",
    },
  },
});

// Define the schema
export const formSchemas = {
  "Registration":
  new SimpleSchema({
    name: {
      type: String,
      regEx: /^\D+$/,
      label: "Name",
    },
    id: {
      type: SimpleSchema.Integer,
      index: 1,
    },
    gender: {
      type: String,
      allowedValues: ['male', 'female'],
    },
    birthday: {
      type: String,
    },
    age: {
      type: SimpleSchema.Integer,
      min: 0,
    },
    contactNumber: {
      type: SimpleSchema.Integer,
    },
    spokenLanguages: {
      type: Array,
    },
    'spokenLanguages.$': {
      type: String,
      allowedValues: ['Sambalpuri', 'Odia', 'English', 'Others'],
    },
    writtenLanguages: {
      type: Array,
    },
    'writtenLanguages.$': {
      type: String,
      allowedValues: ['Sambalpuri', 'Odia', 'English', 'Others'],
    },
    address: {
      type: String,
    },
    anyDrugAllergies: {
      type: String,
      allowedValues: ['Yes', 'No'],
    },
    drugAllergies: {
      type: String,
      optional: true,
    },
  }),

  "Height & weight":
  new SimpleSchema({
    height: {
      type: Number,
      min: 0.7,
      max: 2.8,
      label: "Height (m)",
    },
    weight: {
      type: Number,
      min: 5,
      max: 500,
      label: "Weight (kg)",
    },
    waist: {
      type: Number,
      label: "Waist circumference (cm)",
    },
    hip: {
      type: Number,
      label: "Hip circumference (cm)",
    },
  }),

  "CBG & Hb":
  new SimpleSchema({
    cbg: {
      type: SimpleSchema.Integer,
      min: 20,
      max: 400,
      label: "Capillary Blood Glucose (mg/dL)",
    },
    hb: {
      type: Number,
      min: 4,
      max: 40,
      label: "Hemoglobin (g/dL)"
    },
  }),

  "Phlebotomy": 
  new SimpleSchema({
    phleboCompleted: {
      type: Boolean,
      label: "Completed?"
    },
  }),

  "Pap Smear":
  new SimpleSchema({
    papCompleted: {
      type: Boolean,
      label: "Completed?"
    }.label,
  }),

  "Breast Exam":
  new SimpleSchema({
    breastCompleted: {
      type: Boolean, 
      label: "Breast Screening Completed?"
    },
    abnormalities: {
      type: Boolean,
      label: "Any abnormalities noted (e.g. lumps, skin changes)?"
    },
    abDescribe: {
      type: String,
      label: "If yes to the previous question, please describe the abnormalities"
    },
    fnacCompleted: {
      type: Boolean, 
      label: "FNAC Completed?"
    },
    eduCompleted: {
      type: Boolean,
      label: "Breast Screening Education Completed?"
    }
  }),

  "Blood Pressure":
  new SimpleSchema({
    bp1Sys: {
      type: SimpleSchema.Integer,
      min: 50,
      max: 300,
      label: "1st Systolic blood pressure"
    },
    bp1Dia: {
      type: SimpleSchema.Integer,
      min: 20,
      max: 200,
      label: "1st Diastolic blood pressure"
    },
    bp2Sys: {
      type: SimpleSchema.Integer,
      min: 50,
      max: 300,
      label: "2nd Systolic blood pressure"
    },
    bp2Dia: {
      type: SimpleSchema.Integer,
      min: 20,
      max: 200,
      label: "2nd Diastolic blood pressure"
    },
    bp3Sys: {
      type: SimpleSchema.Integer,
      min: 50,
      max: 300,
      label: "3rd Systolic blood pressure"
    },
    bp3Dia: {
      type: SimpleSchema.Integer,
      min: 20,
      max: 200,
      label: "3rd Diastolic blood pressure"
    },
  }),

  "Doctors' Consult":
  new SimpleSchema({
    consCompleted: {
      type: Boolean,
      label: "Completed?"
    },
    refLetter: {
      type: Boolean,
      label: "Provided with referral letter?"
    },
  }),

  "Eye Screening":
  new SimpleSchema ({
    specs: {
      type: Boolean,
      label: "Does the participant use spectacles?"
    },
    rightWoGlass: {
      type: String,
      label: "Right eye without glasses"
    },
    leftWoGlass: {
      type: String,
      label: "Left eye without glasses"
    },
    rightWiGlass: {
      type: String,
      label: "Right eye with glasses"
    },
    leftWiGlass: {
      type: String,
      label: "Left eye with glasses"
    },
    rightNearVis: {
      type: String,
      label: "Right eye near vision"
    },
    leftNearVis: {
      type: String,
      label: "Left eye near vision"
    },
    lids: {
      type: String,
      label: "Lids"
    },
    conjunctiva: {
      type: String,
      label: "Conjunctiva"
    },
    cornea: {
      type: String,
      label: "Cornea"
    },
    antSeg: {
      type: String,
      label: "Anterior Segment"
    },
    iris: {
      type: String,
      label: "Iris"
    },
    pupil: {
      type: String,
      label: "Pupil"
    },
    lens: {
      type: String,
      label: "Lens"
    },
    ocuMvmt: {
      type: String,
      label: "Ocular Movements"
    },
    iop: {
      type: String,
      label: "IOP"
    },
    duct: {
      type: String,
      label: "Duct"
    },
    cdr: {
      type: String,
      label: "CDR"
    },
    macula: {
      type: String,
      label: "Macula"
    },
    retina: {
      type: String,
      label: "Retina"
    },
    diagnosis: {
      type: String,
      label: "Diagnosis"
    },
    advice: {
      type: String,
      label: "Advice"
    },
    nameDoc: {
      type: String,
      label: "Name of Doctor"
    },
  }),
}