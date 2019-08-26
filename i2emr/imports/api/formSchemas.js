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
  "Pre-Registration" : new SimpleSchema({
    preRegistrationQ1: {
    type: String, allowedValues: ["Male", "Female"], optional: false
    }, preRegistrationQ2: {
    type: String, optional: false
    }, preRegistrationQ3: {
    type: String, optional: false
    }, preRegistrationQ4: {
    type: String, allowedValues: ["Y", "N"], optional: false
    }
    }
   ),

   "Registration" : new SimpleSchema({
    registrationQ1: {
    type: String, allowedValues: ["Mr", "Ms", "Mrs", "Dr"], optional: false
    }, registrationQ2: {
    type: String, allowedValues: ["Chinese 华裔", "Malay 巫裔", "Indian 印裔", "Eurasian 欧亚裔", "Others 其他 (please specify): (insert textbox here)"], optional: false
    }, registrationQ3: {
    type: String, allowedValues: ["Singapore Citizen 新加坡公民", "Singapore Permanent Resident (PR) \n新加坡永久居民"], optional: false
    }, registrationQ4: {
    type: String, allowedValues: ["Single 单身", "Married 已婚", "Widowed 已寡", "Separated 已分居", "Divorced 已离婚"], optional: false
    }, registrationQ5: {
    type: String, optional: false
    }, registrationQ6: {
    type: String, allowedValues: ["Buki Batok East", "Clementi", "Yuhua", "Central Jurong", "Taman Jurong", "Jurong Spring", "Others"], optional: false
    }, registrationQ7: {
    type: String, allowedValues: ["Below 1,100 per month (少于 1,100)", "1,100 - 1,799 per month (每月1,100 - 1,799)", "1,800 - 2,799 per month (每月1,800 - 2,799)", "2,800 & above (2,800 或以上)"], optional: false
    }, registrationQ8: {
    type: String, allowedValues: ["CHAS Orange", "CHAS Blue", "Merdeka Generation", "No CHAS"], optional: false
    }, registrationQ9: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, registrationQ10: {
    type: String, allowedValues: ["Bukit Batok Medical Clinic \nBlk 207 Bukit Batok Street 21, #01-114", "Kang An Clinic\nBlk 644 Bukit Batok Central,\xa0#01-70", "Lai Medical Clinic\nBlk 213 Bukit Batok Street 21, #01-209", "Lakeside Family Clinic\n518A Jurong West St 52 # 01-02", "Boon Lay Corporation Clinic\nBlk 350 Jurong East Ave 1, #01-1225", "EJ. Tan Clinic & Surgery\nBlk 104 Jurong East Street 13, #01-100", "Frontier Family Medicine Clinic\n#04-01 Grantral Mall @ Clementi\n3151 Commonwealth Ave West"], optional: false
    }, registrationQ11: {
    type: String, allowedValues: ["English", "Mandarin", "Malay", "Tamil"], optional: false
    }, registrationQ12: {
    type: Boolean, label: "I have read and acknowledged the eligibility criteria for Phlebotomy. 我知道抽血的合格标准。", optional: false
    }, registrationQ13: {
    type: Boolean, label: "I agree and consent to the above.", optional: false
    }
    }
   ),

   "Phlebotomy" : new SimpleSchema({
    phlebotomyQ1: {
    type: Boolean, label: "Yes", optional: true
    }, phlebotomyQ2: {
    type: Boolean, label: "Yes", optional: true
    }
    }
   ),



  "Height & weight":
  new SimpleSchema({
    height: {
      type: Number,
      min: 0.7,
      max: 2.8,
      label: "Height (m)",
    },
    childHeightAssessment: {
      type: String,
      optional: true,
      allowedValues: ['Below 3rd percentile curve', 
                      'Between 3rd and 97th percentile curves',
                      'Above 97th percentile curve'],
        },
    weight: {
      type: Number,
      min: 5,
      max: 500,
      label: "Weight (kg)",
    },    
    childWeightAssessment: {
      type: String,
      optional: true,
      allowedValues: ['Below 3rd percentile curve', 
                      'Between 3rd and 97th percentile curves',
                      'Above 97th percentile curve'],
        },
    weight: {
      type: Number,
      min: 5,
      max: 500,
      label: "Weight (kg)",
    },
    bmi: {
      type: String,
      label: "Body Mass Index",
    },
    childBmiAssessment:{
      type: String,
      optional: true,
      allowedValues: ['Below 3rd percentile curve',
                      'Between 3rd percentile and overweight curves',
                      'Between overweight and obese curves',
                      'Above obese curve'],
    },
    waist: {
      type: Number,
      label: "Waist circumference (cm)",
    },
    hip: {
      type: Number,
      label: "Hip circumference (cm)",
    },
    waistHipRatio: {
      type: String,
      label: "Waist:hip ratio",
    },
    previousDiabetesDiagnosis: {
      type: String,
      allowedValues: ['Yes','No'],
    },
    riskAssessAge: {
      type: String,
      allowedValues: ['Less than 35 years (0 points)',
                      '35-49 years (20 points)',
                      '50 years and above (30 points)'],
      optional: true,
    },
    riskAssessWaist: {
      type: String,
      optional: true,
    },
    riskAssessPhysicalActivity:{
      type: String,
      optional: true,
      allowedValues: ['Vigorous exercise or strenuous work (0 points)',
                      'Moderate exercise at work/home (10 points)',
                      'Mild exercise at work/home (20 points)',
                      'No exercise and sedentary at work/home (30 points)'],
    },
    riskAssessFamilyHis: {
      type: String,
      optional: true,
      allowedValues: ['0 diabetic parents (0 points)',
                      '1 diabetic parent (10 points)',
                      '2 diabetic parents (20 points)'],
    },
    riskAssessTotalScore: {
      type: Number,
      optional: true,
    },
    riskAssessRiskLevel: {
      type: String,
      optional: true,
      allowedValues: ['0-20: Low risk',
                      '30-50: Medium risk',
                      '60-100: High risk'],
    },
    docConsultForHW : {
      type: Boolean,
      optional: true,
      label: "Doctor's consult for child height, weight or BMI"
    }
  }),

  "Blood Glucose & Hb":
  new SimpleSchema({
      cbg: {
      type: SimpleSchema.Integer,
      optional: true,
      label: "Capillary Blood Glucose (mg/dL)",
    },
    hb: {
      type: Number,
      optional: true,
      label: "Hemoglobin (g/dL)",
    },
    docConsultForBloodGlucAndHb:{
      type: Boolean,
      label: "Doctors consult required?",
    },
  }),

  "Pap Smear":
  new SimpleSchema({
    papCompleted: {
      type: Boolean,
      label: "Pap smear completed?"
    },
    papNotes:{
      type: String,
      optional: true,
      label: "Notes (if any)",
    },
    docConsultForPap: {
      type: Boolean,
      label: "Doctors consult required?",
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
      optional: true,
      label: "If yes to the previous question, please describe the abnormalities"
    },
    fnacCompleted: {
      type: Boolean, 
      label: "FNAC Completed?"
    },
    breastCompleted: {
      type: Boolean,
      label: "Breast screening completed",
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
      optional: true,
      min: 50,
      max: 300,
      label: "3rd Systolic blood pressure"
    },
    bp3Dia: {
      type: SimpleSchema.Integer,
      optional: true,
      min: 20,
      max: 200,
      label: "3rd Diastolic blood pressure"
    },
    bpAvgSys: {
      type: String,
      label: "Average Systolic blood pressure"
    },
    bpAvgDia: {
      type: String,
      label: "Average Diastolic blood pressure"
    },
    docConsultForBP: {
      type: Boolean,
      label: "Doctors consult required?",
    },
  }),

  "Doctors' Consult":
  new SimpleSchema({
    docConsult1: {
      type: Array,
    },
    'docConsult1.$': {
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
                      'Others'],
    },
    otherComplaints: {
      type: String,
      optional: true,
    },
    docConsult2: {
      type: String,
    },
    docConsult3: {
      type: Boolean,
      label: "Provided with referral letter?"
    },
    docConsult4: {
      type: String,
      optional: true,
    },
    docConsult5: {
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
      label: "Right eye with glasses",
      optional: true,
    },
    leftWiGlass: {
      type: String,
      label: "Left eye with glasses",
      optional: true,
    },
    rightNearVis: {
      type: String,
      label: "Right eye near vision"
    },
    leftNearVis: {
      type: String,
      label: "Left eye near vision"
    },
    
    lidsLeft: {
      type: String,
      label: "Left Lid"
    },
    lidsRight: {
      type: String,
      label: "Right Lid"
    },
    conjunctivaLeft: {
      type: String,
      label: "Left Conjunctiva"
    },
    conjunctivaRight: {
      type: String,
      label: "Right Conjunctiva"
    },
    corneaLeft: {
      type: String,
      label: "Left Cornea"
    },
    corneaRight: {
      type: String,
      label: "Right Cornea"
    },
    antSegLeft: {
      type: String,
      label: "Left Anterior Segment"
    },
    antSegRight: {
      type: String,
      label: "Right Anterior Segment"
    },
    irisLeft: {
      type: String,
      label: "Left Iris"
    },
    irisRight: {
      type: String,
      label: "Right Iris"
    },
    pupilLeft: {
      type: String,
      label: "Left Pupil"
    },
    pupilRight: {
      type: String,
      label: "Right Pupil"
    },
    lensLeft: {
      type: String,
      label: "Left Lens"
    },
    lensRight: {
      type: String,
      label: "Right Lens"
    },
    ocuMvmtLeft: {
      type: String,
      label: "Left Ocular Movements"
    },
    ocuMvmtRight: {
      type: String,
      label: "Right Ocular Movements"
    },
    iopLeft: {
      type: String,
      label: "Left IOP"
    },
    iopRight: {
      type: String,
      label: "Right IOP"
    },
    ductLeft: {
      type: String,
      label: "Left Duct"
    },
    ductRight: {
      type: String,
      label: "Right Duct"
    },

    cdrLeft: {
      type: String,
      label: "Left CDR"
    },
    cdrRight: {
      type: String,
      label: "Right CDR"
    },
    maculaLeft: {
      type: String,
      label: "Left Macula"
    },
    maculaRight: {
      type: String,
      label: "Right Macula"
    },
    retinaLeft: {
      type: String,
      label: "Left Retina"
    },
    retinaRight: {
      type: String,
      label: "Right Retina"
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

  // "Women's Edu":{
  //   "Pre-Women's Education Quiz":
  //   new SimpleSchema ({
  //     eduCompleted: {
  //       type: String,
  //       allowedValues: ['Yes','No'],
  //     },
  //     preWomenEduSurvey1: {
  //     type: String,
  //     allowedValues: ['1', '2', '3', '4', '5'],   
  //     },
  //       preWomenEduQ1: {
  //         type: String,
  //         allowedValues: ['Abdominal cramps','Acne','Headache','All of the above'], 
  //         },
  //       preWomenEduQ2: {
  //         type: String,
  //         allowedValues: ['Stress', 'Pregnancy', 'Weight loss', 'Abrasions'],   
  //         },
  //         preWomenEduQ3: {
  //         type: String,
  //         allowedValues: ['Menstruation is dirty', 'Menstruation happens every 28 days, on average', 'We should change our sanitary pads once every few days', 'We should clean the area from back to front'],   
  //         },
  //       preWomenEduQ4: {
  //         type: String,
  //         allowedValues: ['1st day of menses', '7-10 days after start of menses', '21 days after start of menses', '2 days before start of menses'],   
  //         },
  //       preWomenEduQ5: {
  //         type: String,
  //         allowedValues: ['Once a week', 'Once a month', 'Once a year', 'Once in 2 years'],   
  //         },
  //       preWomenEduQ6: {
  //         type: String,
  //         allowedValues: ['A lump that can be seen/felt in the breast or underarm', 'Nipple that is pushed inwards', 'Dimpling of skin over the breast', 'Ulceration of skin over the breast','All of the above'],   
  //         },
  //     }),

  //   "Post-Women's Education Quiz":
  //   new SimpleSchema ({
  //     postWomenEduSurvey1: {
  //     type: String,
  //     allowedValues: ['1', '2', '3', '4', '5'],   
  //     },
  //     postWomenEduQ1: {
  //       type: String,
  //       allowedValues: ['Abdominal cramps','Acne','Headache','All of the above'], 
  //       },
  //     postWomenEduQ2: {
  //       type: String,
  //       allowedValues: ['Stress', 'Pregnancy', 'Weight loss', 'Abrasions'],   
  //       },
  //     postWomenEduQ3: {
  //       type: String,
  //       allowedValues: ['Menstruation is dirty', 'Menstruation happens every 28 days, on average', 'We should change our sanitary pads once every few days', 'We should clean the area from back to front'],   
  //       },
  //     postWomenEduQ4: {
  //       type: String,
  //       allowedValues: ['1st day of menses', '7-10 days after start of menses', '21 days after start of menses', '2 days before start of menses'],   
  //       },
  //     postWomenEduQ5: {
  //       type: String,
  //       allowedValues: ['Once a week', 'Once a month', 'Once a year', 'Once in 2 years'],   
  //       },
  //     postWomenEduQ6: {
  //       type: String,
  //       allowedValues: ['A lump that can be seen/felt in the breast or underarm', 'Nipple that is pushed inwards', 'Dimpling of skin over the breast', 'Ulceration of skin over the breast','All of the above'],   
  //       },
  //   }),
  // },
  
  "Women's Edu":
  new SimpleSchema ({
    womensEduCompleted: {
      type: Boolean,
      label: "Women's education completed?"
    },
  }),

  "Education":{
    "Pre-Education Survey":
    new SimpleSchema ({
      preEduSurvey1: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],   
      },
      preEduSurvey2: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5'],   
        },
      preEduSurvey3: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5'],    
        },
      preEduSurvey4: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5'],   
        },
    }),

    "Pre-Education Quiz":
    new SimpleSchema ({
      preEduQuiz1: {
        type: String,
        allowedValues: ['Do not exercise', 'Have diabetes', 'Smoke', 'All of the above'],   
      },
      preEduQuiz2: {
        type: String,
        allowedValues: ['Blindness',
                        'Amputation',
                        'Craving sweet food',
                        'Kidney failure'],   
      },
        preEduQuiz3: {
        type: String,
        allowedValues: ['60 mins', '90 mins', '120 mins', '150 mins'],    
      },
      preEduQuiz4: {
        type: String,
        allowedValues: ['1/2 rice, 1/4 fruits and vegetables, 1/4 protein', '2/5 rice, 1/5 vegetables, 1/5 fruits, 1/5 protein', '1/3 rice, 1/3 vegetables, 1/3 protein', '1/2 fruits and vegetables, 1/4 rice, 1/4 protein'],   
      },
      preEduQuiz5: {
        type: String,
        allowedValues: ['Daal', 'Mattar Paneer', 'Chole Bhattura', 'Butter Paneer'],   
      },
      preEduQuiz6: {
        type: String,
        allowedValues: ['Tobacco', 'Alcohol', 'Pesticides', 'All of the above'],   
      },
      preEduQuiz7: {
        type: String,
        allowedValues: ['Get comprehensive eye exams regularly', 'Use a computer for 2h to finish my work', 'Read under sufficiently bright light', 'Wear sunglasses and caps when outdoors to protect eyes from UV rays'],   
      },
    }),

    "Post-Education Survey":
    new SimpleSchema ({
      postEduSurvey1: {
      type: String,
      allowedValues: ['1', '2', '3', '4', '5'],   
      },
      postEduSurvey2: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5'],   
        },
      postEduSurvey3: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5'],    
        },
      postEduSurvey4: {
        type: String,
        allowedValues: ['1', '2', '3', '4', '5'],   
        },
    }),

    "Post-Education Quiz":
    new SimpleSchema ({
      postEduQuiz1: {
      type: String,
      allowedValues: ['Do not exercise', 'Have diabetes', 'Smoke', 'All of the above'],   
      },
      postEduQuiz2: {
        type: String,
        allowedValues: ['Blindness',
                        'Amputation',
                        'Craving sweet food',
                        'Kidney failure'],   
      },
      postEduQuiz3: {
        type: String,
        allowedValues: ['60 mins', '90 mins', '120 mins', '150 mins'],    
      },
      postEduQuiz4: {
        type: String,
        allowedValues: ['1/2 rice, 1/4 fruits and vegetables, 1/4 protein', '2/5 rice, 1/5 vegetables, 1/5 fruits, 1/5 protein', '1/3 rice, 1/3 vegetables, 1/3 protein', '1/2 fruits and vegetables, 1/4 rice, 1/4 protein'],   
      },
      postEduQuiz5: {
        type: String,
        allowedValues: ['Daal', 'Mattar Paneer', 'Chole Bhattura', 'Butter Paneer'],   
      },
      postEduQuiz6: {
        type: String,
        allowedValues: ['Tobacco', 'Alcohol', 'Pesticides', 'All of the above'],   
      },
      postEduQuiz7: {
        type: String,
        allowedValues: ['Get comprehensive eye exams regularly', 'Use a computer for 2h to finish my work', 'Read under sufficiently bright light', 'Wear sunglasses and caps when outdoors to protect eyes from UV rays'],   
      },
    }),
  },

  "Post-Screening Feedback":
  new SimpleSchema ({
    postScreeningFeedback1: {
    type: String,
    allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    },
    postScreeningFeedback2: {
      type: Array,
    },
    'postScreeningFeedback2.$': {
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
    postScreeningFeedback3: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    postScreeningFeedback4: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    },
    postScreeningFeedback5: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    postScreeningFeedback6: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    }, 
    postScreeningFeedback7: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    postScreeningFeedback8: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    }, 
    postScreeningFeedback9: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    postScreeningFeedback10: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    }, 
    postScreeningFeedback11: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
      },
    postScreeningFeedback12: {
      type: String,
      allowedValues: ['Strongly agree', 'Agree', 'Disagree', 'Strongly disagree'],   
    },   
    postScreeningFeedback13: {
      type: Array,
    },
    'postScreeningFeedback13.$': {
      type: String,
      allowedValues: ['Happened to pass by', 
                      'Posters', 
                      'Newspaper', 
                      'Door-to-door publicity',
                      'Heard from neighbours/relatives/friends'],
    },
    postScreeningFeedback14: {
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
