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
      type: Date,
    },
    age: {
      type: SimpleSchema.Integer,
      min: 0,
    },
    district: {
      type: String,
    },
    address: {
      type: String,
    },
    zipcode: {
      type: String,
      regEx: /^[0-9]+$/,
    },
    contactNumber: {
      type: String,
      regEx: /^[0-9]+$/,
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
    anyDrugAllergies: {
      type: String,
      allowedValues: ['Yes', 'No'],
    },
    drugAllergies: {
      type: String,
      optional: true,
    },
    pregnant: {
      type: String,
      allowedValues: ['Yes', 'No'],
    }
  }),

  "Patient Profiling":
  new SimpleSchema({
    Q1: {
      type: String,
      allowedValues: ['Yes', 'No'],   
      },
    Q2: {
      type: String,
      allowedValues: ['Within past 3 years', 'More than 3 years ago'],   
      },
    Q3: {
      type: Array,
    },
    'Q3.$': {
      type: String,
      allowedValues: ['Increased urination', 
                      'Increased thirst', 
                      'Weight loss', 
                      'Increased hunger',
                      'Increased tiredness',
                      'Blurred vision',
                      'Slow-healing wounds',
                      'Numbness/tingling in hands and/or feet',
                      'None of the above'
                    ],
    },
    Q4: {
      type: String,
      allowedValues: ['Regular (Interval of 6 months or less)', 'Occasionally (Interval of more than 6 months)','Seldom (last appointment was >1 year ago)','Not at all'],   
    },
    anyWesternMedicine: {
      type: Boolean,
      label: "Yes, Western medicine",
    },
    westernMedicine: {
      type: String,
    },
    anyTraditionalMedicine: {
      type: Boolean,
      label: "Yes, Traditional medicine",
    },
    traditionalMedicine: {
      type: String,
    },
    Q6: {
      type: String,
      allowedValues: ['0', '1-3','4-6','> or equal to 7'],   
    },
    hyperlipidemiaQ1: {
      type: String,
      allowedValues: ['Yes', 'No'],   
      },
    hyperlipidemiaQ2: {
      type: String,
      allowedValues: ['Within past 3 years', 'More than 3 years ago'],   
      },
    hyperlipidemiaQ3: {
      type: String,
      allowedValues: ['Regular (Interval of 6 months or less)', 'Occasionally (Interval of more than 6 months)','Seldom (last appointment was >1 year ago)','Not at all'],   
    },
    hyperlipidemiaAnyWesternMedicine: {
      type: Boolean,
      label: "Yes, Western medicine",
    },
    hyperlipidemiaWesternMedicine: {
      type: String,
    },
    hyperlipidemiaAnyTraditionalMedicine: {
      type: Boolean,
      label: "Yes, Traditional medicine",
    },
    hyperlipidemiaTraditionalMedicine: {
      type: String,
    },
    hyperlipidemiaQ5: {
      type: String,
      allowedValues: ['0', '1-3','4-6','> or equal to 7'],   
    },
    hypertensionQ1: {
      type: String,
      allowedValues: ['Yes', 'No'],   
      },
    hypertensionQ2: {
      type: String,
      allowedValues: ['Within past 3 years', 'More than 3 years ago'],   
      },
    hypertensionQ3: {
      type: String,
      allowedValues: ['Regular (Interval of 6 months or less)', 'Occasionally (Interval of more than 6 months)','Seldom (last appointment was >1 year ago)','Not at all'],   
    },
    hypertensionAnyWesternMedicine: {
      type: Boolean,
      label: "Yes, Western medicine",
    },
    hypertensionWesternMedicine: {
      type: String,
    },
    hypertensionAnyTraditionalMedicine: {
      type: Boolean,
      label: "Yes, Traditional medicine",
    },
    hypertensionTraditionalMedicine: {
      type: String,
    },
    hypertensionQ5: {
      type: String,
      allowedValues: ['0', '1-3','4-6','> or equal to 7'],   
    },
    TBQ1: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    TBQ2: {
      type: String,
      allowedValues: ['Yes, the person was diagnosed with TB within the past 4 months', 
                      'Yes, the person was diagnosed with TB more than 4 months ago',
                      'No'],
    },
    TBQ3: {
      type: Array,
    },
    'TBQ3.$': {
      type: String,
      allowedValues: ['Cough that has lasted more than 2 weeks', 
                      'Coughing up blood', 
                      'Breathlessness', 
                      'Weight loss',
                      'Night sweats',
                      'Fever',
                      'Loss of appetite',
                      'None of the above'],
    },
    medicalHistory1: {
      type: String,
    },
    medicalHistory2: {
      type: String,
    },
    medicalHistory3: {
      type: String,
    },
    medicalHistory4: {
      type: String,
    },
    medicalHistory5: {
      type: String,
    },
    surgAndHospQ1: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    surgAndHospQ2: {
      type: String,
    },
    surgAndHospQ3: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    surgAndHospQ4: {
      type: String,
    },
    ocularHisQ1a: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    ocularHisQ1b: {
      type: String,
    },
    ocularHisQ2a: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    ocularHisQ2b: {
      type: String,
    },
    ocularHisQ3a: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    ocularHisQ3b: {
      type: String,
    },
    ocularHisQ3c: {
      type: String,
    },
    cataract: {
      type: Boolean,
      label: "Cataract",
    },
    glaucoma: {
      type: Boolean,
      label: "Glaucoma",
    },
    diabeticRetinopathy: {
      type: Boolean,
      label: "Diabetic Retinopathy",
    },
    amd: {
      type: Boolean,
      label: "Age-related macular degeneration",
    },
    anyOtherOcularCond: {
      type: Boolean,
      label: "Others (please specify)",
    },
    otherOcularCond:{
      type: String,
    },
    ocularHisQ4: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    ocularHisQ5a: {
      type: String,
      allowedValues: ['Normal','Good enough for my daily activities','Poor'],
    },
    ocularHisQ5b: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    concerns: {
      type: Boolean,
      label: "Concerns about finances",
    },
    tooFar: {
      type: Boolean,
      label: "Too far away/difficult to get to the clinic/hospital",
    },
    previousAdvice: {
      type: Boolean,
      label: "Previously told by eye specialist that nothing can be done"
    },
    nothing: {
      type: Boolean,
      label: "Nothing can be done as it is part of ageing",
    },
    anyOtherReasons: {
      type: Boolean,
      label: "Others (please specify)",
    },
    otherReasons: {
      type: String,
    },
    barrierQ1:{
      type: String,
      allowedValues: ['Hospital',
                      'Clinics',
                      'Traditional Medicine',
                      'Seldom/Never visits the doctor'],
    },
    noNeed: {
      type: Boolean,
      label: "Do not see the need for the tests",
    },
    time: {
      type: Boolean,
      label: "Challenging to make time to go for appointments",
    },
    mobility: {
      type: Boolean,
      label: "Difficulty getting to clinic (mobility)",
    },
    financial: {
      type: Boolean,
      label: "Financial issues",
    },
    scared: {
      type: Boolean,
      label: "Scared of doctor",
    },
    preferTradMed: {
      type: Boolean,
      label: "Prefer traditional medicine",
    },
    anyOtherBarriers: {
      type: Boolean,
      label: "Others: (free text)",
    },
    otherBarriers: {
      type: String,
    },
    familyHistory: {
      type: Array,
    },
    'familyHistory.$': {
      type: String,
      allowedValues: ['High blood pressure', 
                      'High blood cholesterol', 
                      'Heart attack or coronary arterial disease (narrowed blood vessel supplying the heart)*', 
                      'Stroke',
                      'Diabetes',
                      'Cancer',
                      'No, they do not have any of the above'],
    },
    FLRSQ1: {
      type: String,
    },
    FLRSQ2: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    FLRSQ3: {
      type: String,
    },
    FLRSQ4: {
      type: String,
      allowedValues: ['Yes','No','Unsure'],
    },
    FLRSQ5: {
      type: String,
      allowedValues: ['Yes','No'],      
    },
    FLRSQ6: {
      type: Array,
    },
    'FLRSQ6.$': {
      type: String,
      allowedValues: ['Cigarette', 
                      'Beedi', 
                      'Tobacco', 
                      'Opium'],
    },
    FLRSQ7: {
      type: String,
      allowedValues: ['Less than 1 cigarette (or equivalent) per day on average',
                      'Between 1 to 10 cigarettes (or equivalent) per day on average',
                      'More than 10 cigarettes (or equivalent) per day on average'],      
    },    
    FLRSQ8: {
      type: String,
    },
    FLRSQ9: {
      type: String,
      allowedValues: ['I have stopped smoking completely','I have never smoked before'],      
    },
    FLRSQ10: {
      type: String,
      allowedValues: ['Yes','No'],      
    },
    socialHisQ1: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    socialHisQ2: {
      type: Number,
    },
    student: {
      type: Boolean,
      label: "Student",
    },
    housewife: {
      type: Boolean,
      label: "Homemaker/Housewife",
    },
    relig:{
      type: Boolean,
      label: "Religious Work",
    },
    prof: {
      type: Boolean,
      label: "Professional (teacher, engineer, architect, doctor, nurse, lawyer, management, finance, etc)",
    },
    service: {
      type: Boolean,
      label: "Service industry (e.g. restaurant server, call centre, receptionist, hotel staff)",
    },
    manual: {
      type: Boolean,
      label: "Manual labourer (e.g. construction, cleaning, clothes washing)",
    },
    skilledLab:{
      type: Boolean,
      label: "Skilled labourer (e.g. plumbing, electrician, cook, tailor)",
    },
    farming: {
      type: Boolean,
      label: "Farming/Agriculture",
    },
    mining: {
      type: Boolean,
      label: "Mining",
    },
    manu: {
      type: Boolean,
      label: "Manufacturing",
    },
    unemployed: {
      type: Boolean,
      label: "Unemployed",
    },
    anyOtherOcc: {
      type: Boolean,
      label: "Others (please specify) - free text",
    },
    otherOcc: {
      type: String,
    },
    socialHisQ4: {
      type: String,
      allowedValues: ['Labour', 'Sedentary'],
    },
    socialHisQ5:{
      type: String,
      allowedValues: ['Yes', 'No'],
    },
    socialHisQ6: {
      type: String,
      optional: true,
    },
    socialHisQ7: {
      type: String,
      allowedValues: ['Unmarried', 'Married','Widowed','Divorced'],
    },
    socialHisQ8: {
      type: Number,
    },
    socialHisQ9: {
      type: Number,
    },
    socialHisQ10: {
      type: Number,
    },
    socialHisQ11: {
      type: Number,
    },
    socialHisQ13: {
      type: String,
      allowedValues: ['No Formal Qualifications', 
                      '6th standard or less',
                      '7th-9th standard',
                      '10th standard',
                      '11th standard',
                      '12th standard',
                      'Vocational training (e.g. plumbing, construction, cooking)',
                      'Bachelors or equivalent',
                      'Post-graduate (Masters/Doctorate or equivalent)',
                      'Refuse to answer'],
    },
  }),

  "Station Selection":
  new SimpleSchema({
    Q1: {
      type: String,
      allowedValues: ['Yes', 
                      'No'],
    },
    Q2:{
      type: String,
      allowedValues: ['Yes', 
                      'No',
                      'Not applicable (child)'],
    },
    Q3: {
      type: String,
      allowedValues: ['Yes', 
                      'No'],
    },
    Q4: {
      type: String,
      allowedValues: ['Yes', 
                      'No',
                      'Not applicable (child)'],
    },
    Q5: {
      type: Array,
    },
    'Q5.$': {
      type: String,
      allowedValues: ['High blood pressure', 
                      'Diabetes', 
                      'Cigarette smoking', 
                      'Family member with coronary artery disease',
                      'Family member with high cholesterol',
                      'Chronic kidney disease',
                      'None of the above/not applicable (Age < 40)'],
    },
    Q6: {
      type: String,
      allowedValues: ['Yes', 
                      'No',
                      'Not applicable (child)'],
    },
    Q7: {
      type: String,
      allowedValues: ['Yes', 
                      'No'],
    },
    Q8: {
      type: String,
      allowedValues: ['Yes', 
                      'No'],
    },
    Q9: {
      type: String,
      allowedValues: ['Yes', 
                      'No'],
    },
    Q10: {
      type: String,
      allowedValues: ['Yes', 
                      'No',
                      'Not applicable (child)'],
    },
    Q11: {
      type: String,
      allowedValues: ['Yes', 
                      'No',
                      'Not applicable (child < 10 years old)'],
    },
    Q12: {
      type: String,
      allowedValues: ['Yes', 
                      'No'],
    },
    Q13: {
      type: String,
      allowedValues: ['Yes', 
                      'No'],
    },
    Q14: {
      type: String,
      allowedValues: ['Yes', 
                      'No',
                      'Not applicable (child)'],
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
    // childHeight: {
    //   type: String,
    //   allowedValues: ['Below 3rd percentile curve', 
    //                   'Between 3rd and 97th percentile curves',
    //                   'Above 97th percentile curve'],
    // },
    weight: {
      type: Number,
      min: 5,
      max: 500,
      label: "Weight (kg)",
    },
    // childWeight:{
    //   type: String,
    //   allowedValues: ['Below 3rd percentile curve', 
    //                   'Between 3rd and 97th percentile curves',
    //                   'Above 97th percentile curve'],
    // },
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
    },
  }),

  "Breast Exam":
  new SimpleSchema({
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
    Q1: {
      type: Array,
    },
    'Q1.$': {
      type: String,
      allowedValues: ['Overweight/obesity', 
                      'Heart burn', 
                      'Diabetes', 
                      'High blood pressure',
                      'Heart disease',
                      'Unexplained weight loss',
                      'Respiratory problems',
                      'Joint pain/back pain',
                      'Stroke',
                      'Visual impairment',
                      'Mental health issues',
                      'Alcohol overuse',
                      'Drug addiction',
                      'Infectious diseases e.g. malaria, tuberculosis',
                      'Others (free text)'],
    },
    otherComplaints: {
      type: String,
    },
    Q2: {
      type: String,
    },
    Q3: {
      type: Boolean,
      label: "Provided with referral letter?"
    },
    Q4: {
      type: String,
    },
    Q5: {
      type: String,
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

  "Pre-Women's Education Quiz":
  new SimpleSchema ({
    breastCompleted: {
      type: Boolean, 
      label: "Breast Screening Completed?"
    },
    S1: {
    type: String,
    allowedValues: ['1', '2', '3', '4', '5'],   
    },
    Q1: {
      type: String,
      allowedValues: ['Abdominal cramps', 'Acne', 'Headache', 'All of the above'],   
      },
    Q2: {
      type: String,
      allowedValues: ['Stress', 'Pregnancy', 'Weight loss', 'Abrasions'],   
      },
    Q3: {
      type: String,
      allowedValues: ['Menstruation is dirty', 'Menstruation happens every 28 days, on average', 'We should change our sanitary pads once every few days', 'We should clean the area from back to front'],   
      },
    Q4: {
      type: String,
      allowedValues: ['1st day of menses', '7-10 days after start of menses', '21 days after start of menses', '2 days before start of menses'],   
      },
    Q5: {
      type: String,
      allowedValues: ['Once a week', 'Once a month', 'Once a year', 'Once in 2 years'],   
      },
    Q6: {
      type: String,
      allowedValues: ['A lump that can be seen/felt in the breast or underarm', 'Nipple that is pushed inwards', 'Dimpling of skin over the breast', 'Ulceration of skin over the breast','All of the above'],   
      },
  }),

  "Post-Women's Education Quiz":
  new SimpleSchema ({
    S1: {
    type: String,
    allowedValues: ['1', '2', '3', '4', '5'],   
    },
    Q1: {
      type: String,
      allowedValues: ['Abdominal cramps', 'Acne', 'Headache', 'All of the above'],   
      },
    Q2: {
      type: String,
      allowedValues: ['Stress', 'Pregnancy', 'Weight loss', 'Abrasions'],   
      },
    Q3: {
      type: String,
      allowedValues: ['Menstruation is dirty', 'Menstruation happens every 28 days, on average', 'We should change our sanitary pads once every few days', 'We should clean the area from back to front'],   
      },
    Q4: {
      type: String,
      allowedValues: ['1st day of menses', '7-10 days after start of menses', '21 days after start of menses', '2 days before start of menses'],   
      },
    Q5: {
      type: String,
      allowedValues: ['Once a week', 'Once a month', 'Once a year', 'Once in 2 years'],   
      },
    Q6: {
      type: String,
      allowedValues: ['A lump that can be seen/felt in the breast or underarm', 'Nipple that is pushed inwards', 'Dimpling of skin over the breast', 'Ulceration of skin over the breast','All of the above'],   
      },
  }),
  
  "Pre-Education Survey":
  new SimpleSchema ({
    S1: {
    type: String,
    allowedValues: ['1', '2', '3', '4', '5'],   
    },
    S2: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],   
      },
    S3: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],    
      },
    S4: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],   
      },
  }),

  "Pre-Education Quiz":
  new SimpleSchema ({
    Q1: {
    type: String,
    allowedValues: ['Do not exercise', 'Have diabetes', 'Smoke', 'All of the above'],   
    },
    Q2: {
      type: String,
      allowedValues: ['Blindness', 'Amputation', 'Craving sweet food', 'Kidney failure'],   
      },
    Q3: {
      type: String,
      allowedValues: ['60 mins', '90 mins', '120 mins', '150 mins'],    
      },
    Q4: {
      type: String,
      allowedValues: ['1/2 rice, 1/4 fruits and vegetables, 1/4 protein', '2/5 rice, 1/5 vegetables, 1/5 fruits, 1/5 protein', '1/3 rice, 1/3 vegetables, 1/3 protein', '1/2 fruits and vegetables, 1/4 rice, 1/4 protein'],   
      },
    Q5: {
      type: String,
      allowedValues: ['Daal', 'Mattar Paneer', 'Chole Bhattura', 'Butter Paneer'],   
      },
    Q6: {
      type: String,
      allowedValues: ['Tobacco', 'Alcohol', 'Pesticides', 'All of the above'],   
      },
    Q7: {
      type: String,
      allowedValues: ['Get comprehensive eye exams regularly', 'Use a computer for 2h to finish my work', 'Read under sufficiently bright light', 'Wear sunglasses and caps when outdoors to protect eyes from UV rays'],   
      },
  }),

  "Post-Education Survey":
  new SimpleSchema ({
    S1: {
    type: String,
    allowedValues: ['1', '2', '3', '4', '5'],   
    },
    S2: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],   
      },
    S3: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],    
      },
    S4: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],   
      },
  }),

  "Post-Education Quiz":
  new SimpleSchema ({
    Q1: {
    type: String,
    allowedValues: ['Do not exercise', 'Have diabetes', 'Smoke', 'All of the above'],   
    },
    Q2: {
      type: String,
      allowedValues: ['Blindness', 'Amputation', 'Craving sweet food', 'Kidney failure'],   
      },
    Q3: {
      type: String,
      allowedValues: ['60 mins', '90 mins', '120 mins', '150 mins'],    
      },
    Q4: {
      type: String,
      allowedValues: ['1/2 rice, 1/4 fruits and vegetables, 1/4 protein', '2/5 rice, 1/5 vegetables, 1/5 fruits, 1/5 protein', '1/3 rice, 1/3 vegetables, 1/3 protein', '1/2 fruits and vegetables, 1/4 rice, 1/4 protein'],   
      },
    Q5: {
      type: String,
      allowedValues: ['Daal', 'Mattar Paneer', 'Chole Bhattura', 'Butter Paneer'],   
      },
    Q6: {
      type: String,
      allowedValues: ['Tobacco', 'Alcohol', 'Pesticides', 'All of the above'],   
      },
    Q7: {
      type: String,
      allowedValues: ['Get comprehensive eye exams regularly', 'Use a computer for 2h to finish my work', 'Read under sufficiently bright light', 'Wear sunglasses and caps when outdoors to protect eyes from UV rays'],   
      },
  }),

  "Post-Screening Feedback":
  new SimpleSchema ({
    Q1: {
    type: String,
    allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    },
    Q2: {
      type: Array,
    },
    'Q2.$': {
      type: String,
      allowedValues: ['I am concerned about my health', 
                      'I have never been screened before', 
                      'Friends/family told me to come', 
                      'There is a free health screening',
                      'There is a free goodie bag',
                      'I was drawn to the crowd',
                      'It was conveniently located',
                      'It is at a convenient time'],
    },
    Q3: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    Q4: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    },
    Q5: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    Q6: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    }, 
    Q7: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    Q8: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    }, 
    Q9: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    Q10: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    }, 
    Q11: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    Q12: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    },   
    Q13: {
      type: Array,
    },
    'Q13.$': {
      type: String,
      allowedValues: ['Happened to pass by', 
                      'Posters', 
                      'Newspaper', 
                      'Door-to-door publicity',
                      'Heard from neighbours/relatives/friends'],
    },
    Q14: {
      type: String,
      allowedValues: ['Never', 
                      'More than 3 years ago', 
                      'Once in 3 years', 
                      'Once in 2 years',
                      'Once a year',
                      'More than once a year'],   
    },   

  }),
}