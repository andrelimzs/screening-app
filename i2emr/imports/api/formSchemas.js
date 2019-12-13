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
  "Basic Patient Information": (info) => {
    return new SimpleSchema({
      basicPatientInformationQ1: {
        type: String, optional: false
      }, basicPatientInformationQ2: {
        type: String, allowedValues: ["Male", "Female"], optional: false
      }, basicPatientInformationQ12: {
        type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
          if (this.field('basicPatientInformationQ2').isSet
            && this.field('basicPatientInformationQ2').value === "Female") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, basicPatientInformationQ3: {
        type: String, optional: false
      }, basicPatientInformationQ4: {
        type: Number, optional: false
      }, basicPatientInformationQ5: {
        type: String, optional: false
      }, basicPatientInformationQ6: {
        type: String, optional: false
      }, basicPatientInformationQ7: {
        type: String, optional: false
      }, basicPatientInformationQ8: {
        type: Number, optional: true
      }, basicPatientInformationQ9: {
        type: String, optional: false
      }, basicPatientInformationQ10: {
        type: String, allowedValues: ["Yes, pls specify", "No", "Don't Know"], optional: false
      }, basicPatientInformationQ13: {
        type: String, optional: true, custom: function () {
          if (this.field('basicPatientInformationQ10').isSet
            && this.field('basicPatientInformationQ10').value === "Yes, pls specify") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, basicPatientInformationQ11: {
        type: String, allowedValues: ["Yes, pls specify", "No", "Don't Know"], optional: false
      }, basicPatientInformationQ14: {
        type: String, optional: true, custom: function () {
          if (this.field('basicPatientInformationQ11').isSet
            && this.field('basicPatientInformationQ11').value === "Yes, pls specify") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, basicPatientInformationQ15: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, basicPatientInformationQ16: {
        type: String, optional: true, custom: function () {
          if (this.field('patientProfilingQ16').isSet
            && this.field('patientProfilingQ16').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, doctorConsult : {
        type : String, optional: true
      }, basicPatientInformationQ17: {
        type: String, allowedValues: ["Yes, the person was diagnosed with TB within the past 4 months"
          , "Yes, the person was diagnosed with TB more than 4 months ago", "No"], optional: false
      }, basicPatientInformationQ18: {
        type: String, optional: true, custom: function () {
          if (this.field('basicPatientInformationQ18').isSet
            && (this.field('basicPatientInformationQ18').value === "Yes, the person was diagnosed with TB within the past 4 months"
                || this.field('basicPatientInformationQ18').value === "Yes, the person was diagnosed with TB more than 4 months ago")) {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, basicPatientInformationQ19: {
        type: String, allowedValues: ["Yes", "None of the above"]
      }, basicPatientInformationQ20: {
        type: Array, optional: true, custom: function () {
          if (this.field('patientProfilingQ3').isSet
            && this.field('patientProfilingQ3').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, "basicPatientInformationQ20.$": {
        type: String, allowedValues: ["Cough that has lasted more than 2 weeks", "Coughing up blood", "Breathlessness"
        , "Weight loss", "Night sweats", "Fever", "Loss of appetite"]
      }
    }
    )
  },

  "Screening Review": (info) => { return new SimpleSchema({}) },

  "Patient Profiling": (info) => {
    return new SimpleSchema({
       /* patientProfilingQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, patientProfilingQ21: {
        type: String, optional: true, custom: function () {
          if (this.field('patientProfilingQ1').isSet
            && this.field('patientProfilingQ1').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, doctorConsult : {
        type : String, optional: true 
      },  patientProfilingQ2: {
        type: String, allowedValues: ["Yes, the person was diagnosed with TB within the past 4 months"
          , "Yes, the person was diagnosed with TB more than 4 months ago", "No"], optional: false
      }, patientProfilingQ22: {
        type: String, optional: true, custom: function () {
          if (this.field('patientProfilingQ2').isSet
            && (this.field('patientProfilingQ2').value === "Yes, the person was diagnosed with TB within the past 4 months"
                || this.field('patientProfilingQ2').value === "Yes, the person was diagnosed with TB more than 4 months ago")) {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, patientProfilingQ3: {
        type: String, allowedValues: ["Yes", "None of the above"]
      }, patientProfilingQ23: {
        type: Array, optional: true, custom: function () {
          if (this.field('patientProfilingQ3').isSet
            && this.field('patientProfilingQ3').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, "patientProfilingQ23.$": {
        type: String, allowedValues: ["Cough that has lasted more than 2 weeks", "Coughing up blood", "Breathlessness"
        , "Weight loss", "Night sweats", "Fever", "Loss of appetite"]
      }, */patientProfilingQ4: {
        type: Array, optional: true
      },"patientProfilingQ4.$": {
        type: String, allowedValues: ["Diabetes", "High Blood Pressure", "High Cholesterol", "Others"]
      }, patientProfilingQ5: {
        type: String, optional: false
      }, 
      /*patientProfilingQ6: {
        type: String, optional: false
      }, patientProfilingQ7: {
        type: String, optional: false
      }, patientProfilingQ8: {
        type: String, optional: false
      }, patientProfilingQ9: {
        type: String, optional: false
      }, */
      patientProfilingQ10: {
        type: String, allowedValues: ["Hospital", "Clinics", "Traditional Medicine", "Seldom/Never visits the doctor"], optional: false
      }, patientProfilingQ24: {
        type: String, optional: true, custom: function () {
          if (this.field('patientProfilingQ10').isSet
            && this.field('patientProfilingQ10').value === "Seldom/Never visits the doctor") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, patientProfilingQ11: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, patientProfilingQ25: {
        type: String, allowedValues: ["Less than 1 cigarette (or equivalent) per day on average"
          , "Between 1 to 10 cigarettes (or equivalent) per day on average"
          , "More than 10 cigarettes (or equivalent) per day on average"], optional: true, custom: function () {
          if (this.field('patientProfilingQ11').isSet
            && this.field('patientProfilingQ11').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, patientProfilingQ26: {
        type: Array, optional: true, custom: function () {
          if (this.field('patientProfilingQ11').isSet
            && this.field('patientProfilingQ11').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, "patientProfilingQ26.$": {
        type: String, allowedValues: ["Cigarette", "Tobacoo", "Beedi", "Others"]
      }, patientProfilingQ27: {
        type: Number, optional: true, custom: function () {
          if (this.field('patientProfilingQ11').isSet
            && this.field('patientProfilingQ11').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, patientProfilingQ28: {
        type: String, allowedValues: ["I have never smoked before", "I have stopped smoking totally"], optional: true, custom: function () {
          if (this.field('patientProfilingQ11').isSet
            && this.field('patientProfilingQ11').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, patientProfilingQ12: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, patientProfilingQ13: {
        type: String, optional: false
      }, patientProfilingQ14: {
        type: String, allowedValues: ["Yes", "No, Not in Farming/Ariculture"], optional: true
      }, patientProfilingQ15: {
        type: Number, optional: true
      }, patientProfilingQ16: {
        type: String, allowedValues: ["Married", "Single", "Widowed", "Divorced"], optional: false
      }, patientProfilingQ17: {
        type: Number, optional: true
      }, patientProfilingQ18: {
        type: Number, optional: true
      }, patientProfilingQ19: {
        type: Number, optional: true
      }, patientProfilingQ20: {
        type: String, allowedValues: ["No Formal Qualifications", "Primary (Completed Sixth Standard)", "Secondary (Studied from Sixth Standard to Tenth Standard)", "Higher Secondary and Above", "Refuse to Answer"], optional: false
      }
    }
    )
  },

  "Station Select" : (info) => {
    return new SimpleSchema({
      stationSelectQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, stationSelectQ2: {
        type: String, allowedValues: ["Yes", "No", "Not Applicable (Child)"], optional: false
      }, stationSelectQ3: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, stationSelectQ4: {
        type: String, allowedValues: ["Yes", "No", "Not Applicable (Child)"], optional: false
      }, stationSelectQ5: {
        type: String, allowedValues: ["Yes", "None of the above/not applicable (Age < 40)"], optional: false, optional: false, custom: function () {
          if (this.field('stationSelectQ4').isSet
            && this.field('stationSelectQ4').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, stationSelectQ6: {
        type: String, allowedValues: ["Yes", "No", "Not applicable (child)"], optional: true
      }, /*stationSelectQ7: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, stationSelectQ8: {
        type: String, allowedValues: ["Yes", "No"], optional: true
      }, stationSelectQ9: {
        type: String, allowedValues: ["Yes", "No"], optional: true
      }, stationSelectQ10: {
       type: String, allowedValues: ["Yes", "No", "Not applicable (child)"], optional: false
      }, stationSelectQ11: {
       type: String, allowedValues: ["Yes", "No", "Not applicable (child)"], optional: true
      }, */ doctorConsult: {
       type: String, allowedValues: ["Yes", "No"], optional: false
      }, /* stationSelectQ13: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, stationSelectQ14: {
        type: String, allowedValues: ["Yes", "No", "Not applicable (child)"], optional: true
      } */
    }
   )
  },

  "Height and Weight": (info) => {
    return new SimpleSchema({
      heightAndWeightQ1: {
        type: Number, optional: false
      }, heightAndWeightQ2: {
        type: String, allowedValues: ["Below 3rd Percentile", "Normal", "Above 97th Percentile"], optional: true
      }, heightAndWeightQ3: {
        type: Number, optional: false
      }, heightAndWeightQ4: {
        type: String, allowedValues: ["Below 3rd Percentile", "Normal", "Above 97th Percentile"], optional: true
      }, heightAndWeightQ5: {
        type: Number, optional: false
      }, heightAndWeightQ6: {
        type: Number, optional: false
      }, calculateBMI: {
        type: Number, optional: false
      }, calculateRatio: {
        type: Number, optional: false
      }, isChild: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, childAssess: {
        type: String, allowedValues:["Below 3rd Percentile", "Between 3rd Percentile and Overweight", "Between Overweight and Obese", "Above Obese"], optional: true
      }, adultAssess: {
        type: String, optional: true
      }, doctorConsult: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Blood Glucose and Hb": (info) => {
    return new SimpleSchema({
      bloodGlucoseAndHbQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, bloodGlucoseAndHbQ2: {
        type: String, allowedValues: ["< 35 years old", "35 - 49 years old", "> 49 years old"], optional: true, custom: function () {
          if (this.field('bloodGlucoseAndHbQ1').isSet
            && this.field('bloodGlucoseAndHbQ1').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, bloodGlucoseAndHbQ3: {
        type: String, allowedValues: ["Female < 80cm, Male < 90cm", "Female 80-89cm, Male 90-99cm", "Female ≥ 90cm, Male ≥ 100cm"], optional: true, custom: function () {
          if (this.field('bloodGlucoseAndHbQ1').isSet
            && this.field('bloodGlucoseAndHbQ1').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, bloodGlucoseAndHbQ4: {
        type: String, allowedValues: ["Vigorous exercise or strenuous work"
          , "Moderate exercise at work/home", "Mild exercise at work/home"
          , "No exercise and sedentary at work/home"], optional: true, custom: function () {
          if (this.field('bloodGlucoseAndHbQ1').isSet
            && this.field('bloodGlucoseAndHbQ1').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, bloodGlucoseAndHbQ5: {
        type: String, allowedValues: ["0", "1", "2 and above"], optional: true, custom: function () {
          if (this.field('bloodGlucoseAndHbQ1').isSet
            && this.field('bloodGlucoseAndHbQ1').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, bloodGlucoseAndHbQ6: {
        type: String, optional: false
      }, bloodGlucoseAndHbQ7: {
        type: Number, optional: true
      }, doctorConsult: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, totalScore: {
        type: Number, optional: false
      }, riskLevel: {
        type: String, optional: true
      }
    }
    )
  },

  "Blood Pressure": (info) => {
    return new SimpleSchema({
      bpQ1: {
        type: Number, optional: false
      }, bpQ2: {
        type: Number, optional: false
      }, bpQ3: {
        type: Number, optional: true
      }, bpQ4: {
        type: Number, optional: true
      }, bpQ5: {
        type: Number, optional: true
      }, bpQ6: {
        type: Number, optional: true
      }, averageSys: {
        type: Number, optional: false
      }, averageDys: {
        type: Number, optional: false
      }, doctorConsult: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Phlebo": (info) => {
    return new SimpleSchema({
      phleboQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  /* "Pap Smear": (info) => {
    return new SimpleSchema({
      papSmearQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, papSmearQ2: {
        type: String, optional: true
      }, papSmearQ3: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  }, */

  /* "Breast Screening": (info) => {
    return new SimpleSchema({
      breastScreeningQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, breastScreeningQ2: {
        type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
          if (this.field('breastScreeningQ1').isSet
            && this.field('breastScreeningQ1').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, breastScreeningQ3: {
        type: String, optional: true, custom: function () {
          if (this.field('breastScreeningQ2').isSet
            && this.field('breastScreeningQ2').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, breastScreeningQ4: {
        type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
          if (this.field('breastScreeningQ2').isSet
            && this.field('breastScreeningQ2').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, breastScreeningQ5: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  }, */

  /* "Post-screening feedback": (info) => {
    return new SimpleSchema({
      postScreeningFeedbackQ1: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ2: {
        type: Array, optional: false
      }, "postScreeningFeedbackQ2.$": {
        type: String, allowedValues: ["I am concerned about my health", "I have never been screened before", "Friends/ family told me to come", "There is a free health screening", "There is a free goodie bag", "I was drawn to the crowd", "It was conveniently located", "It is at a convenient time"]
      }, postScreeningFeedbackQ3: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ4: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ5: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ6: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ7: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ8: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ9: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ10: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ11: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ12: {
        type: String, allowedValues: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"], optional: false
      }, postScreeningFeedbackQ13: {
        type: Array, optional: false
      }, "postScreeningFeedbackQ13.$": {
        type: String, allowedValues: ["Happened to pass by", "Posters", "Newspaper", "Door-to-door publicity", "Heard from neighbours/relatives/friends"]
      }, postScreeningFeedbackQ14: {
        type: String, allowedValues: ["Never", "More than 3 years ago", "Once in 3 years", "Once in 2 years", "Once a year", "More than once a year"], optional: false
      }
    }
    )
  }, */
  "Doctors' Consult": (info) => {
    return new SimpleSchema({
      doctorsConsultQ1: {
        type: Array, optional: true
      }, "doctorsConsultQ1.$": {
        type: String, allowedValues: ["Overweight/obesity", "Heart burn", "Diabetes", "High blood pressure", "Heart disease", "Unexplained weight loss", "Respiratory problems", "Joint pain/back pain", "Stroke", "Visual impairment", "Mental health issues"]
      }, doctorsConsultQ2: {
        type: String, optional: false
      }, doctorsConsultQ3: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, doctorsConsultQ4: {
        type: String, optional: true, custom: function () {
          if (this.field('doctorsConsultQ3').isSet
            && this.field('doctorsConsultQ3').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, doctorsConsultQ5: {
        type: String, optional: false
      }
    }
    )
  },

  "Eye Screening": (info) => {
     return new SimpleSchema({
      eyeScreeningQ1: {
         type: String, allowedValues: ["Yes", "No"], optional: false
       }, eyeScreeningQ2: {
         type: String, optional: false
       }, 
      })
    }
       //eyeScreeningQ3: {
  //       type: String, optional: false
  //     }, eyeScreeningQ4: {
  //       type: String, optional: false
  //     }, eyeScreeningQ5: {
  //       type: String, optional: false
  //     }, eyeScreeningQ6: {
  //       type: String, optional: false
  //     }, eyeScreeningQ7: {
  //       type: String, optional: false
  //     }, eyeScreeningQ8: {
  //       type: String, optional: false
  //     }, eyeScreeningQ9: {
  //       type: String, optional: false
  //     }, eyeScreeningQ10: {
  //       type: String, optional: false
  //     }, eyeScreeningQ11: {
  //       type: String, optional: false
  //     }, eyeScreeningQ12: {
  //       type: String, optional: false
  //     }, eyeScreeningQ13: {
  //       type: String, optional: false
  //     }, eyeScreeningQ14: {
  //       type: String, optional: false
  //     }, eyeScreeningQ15: {
  //       type: String, optional: false
  //     }, eyeScreeningQ16: {
  //       type: String, optional: false
  //     }, eyeScreeningQ17: {
  //       type: String, optional: false
  //     }, eyeScreeningQ18: {
  //       type: String, optional: false
  //     }, eyeScreeningQ19: {
  //       type: String, optional: false
  //     }, eyeScreeningQ20: {
  //       type: String, optional: false
  //     }, eyeScreeningQ21: {
  //       type: String, optional: false
  //     }, eyeScreeningQ22: {
  //       type: String, optional: false
  //     }, eyeScreeningQ23: {
  //       type: String, optional: false
  //     }, eyeScreeningQ24: {
  //       type: String, optional: false
  //     }, eyeScreeningQ25: {
  //       type: String, optional: false
  //     }, eyeScreeningQ26: {
  //       type: String, optional: false
  //     }, eyeScreeningQ27: {
  //       type: String, optional: false
  //     }, eyeScreeningQ28: {
  //       type: String, optional: false
  //     }, eyeScreeningQ29: {
  //       type: String, optional: false
  //     }, eyeScreeningQ30: {
  //       type: String, optional: false
  //     }, eyeScreeningQ31: {
  //       type: String, optional: false
  //     }, eyeScreeningQ32: {
  //       type: String, optional: false
  //     }, eyeScreeningQ33: {
  //       type: String, optional: false
  //     }, eyeScreeningQ34: {
  //       type: String, optional: false
  //     }, eyeScreeningQ35: {
  //       type: String, optional: false
  //     }, eyeScreeningQ36: {
  //       type: String, optional: false
  //     }
  //   }
  //   )
  // },
 /*  "Eye Screening": (info) => {
    return new SimpleSchema({
      eyeScreeningQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, eyeScreeningQ2: {
        type: String, optional: false
      }
    }
    )
  }, */

  /* "Pre-women's edu quiz" : (info) => {
    return new SimpleSchema({
      preWomenSEduQuizQ1: {
        type: String, allowedValues: ["1", "2", "3", "4", "5"], optional: false
      }, preWomenSEduQuizQ2: {
        type: String, allowedValues: ["Abdominal Cramps", "Acne", "Headache", "All of the above"], optional: false
      }, preWomenSEduQuizQ3: {
        type: String, allowedValues: ["Stress", "Pregnancy", "Weight Loss", "Abrasion"], optional: false
      }, preWomenSEduQuizQ4: {
        type: String, allowedValues: ["Menstruation is dirty", "Menstruation happens every 28 days, on average", "We should change our sanitary pads once every few days", "We should clean the area from back to front"], optional: false
      }, preWomenSEduQuizQ5: {
        type: String, allowedValues: ["1st day of menses", "7-10 days after start of menses", "21 days after start of menses", "2 days before start of menses"], optional: false
      }, preWomenSEduQuizQ6: {
        type: String, allowedValues: ["Once a week", "Once a month", "Once a year", "Once in 2 years"], optional: false
      }, preWomenSEduQuizQ7: {
        type: String, allowedValues: ["A lump that can be seen/felt in the breast or underarm", "Nipple that is pushed inwards", "Dimpling of skin over the breast", "Ulceration of skin over the breast", "All of the above"], optional: false
      }, preQuizScore: {
        type: String, optional : false
      },
    }
   )
  },
  "Post-women's edu quiz" : (info) => {
    return new SimpleSchema({
      postWomenSEduQuizQ1: {
        type: String, allowedValues: ["1", "2", "3", "4", "5"], optional: false
      }, postWomenSEduQuizQ2: {
        type: String, allowedValues: ["Abdominal Cramps", "Acne", "Headache", "All of the above"], optional: false
      }, postWomenSEduQuizQ3: {
        type: String, allowedValues: ["Stress", "Pregnancy", "Weight Loss", "Abrasion"], optional: false
      }, postWomenSEduQuizQ4: {
        type: String, allowedValues: ["Menstruation is dirty", "Menstruation happens every 28 days, on average", "We should change our sanitary pads once every few days", "We should clean the area from back to front"], optional: false
      }, postWomenSEduQuizQ5: {
        type: String, allowedValues: ["1st day of menses", "7-10 days after start of menses", "21 days after start of menses", "2 days before start of menses"], optional: false
      }, postWomenSEduQuizQ6: {
        type: String, allowedValues: ["Once a week", "Once a month", "Once a year", "Once in 2 years"], optional: false
      }, postWomenSEduQuizQ7: {
        type: String, allowedValues: ["A lump that can be seen/felt in the breast or underarm", "Nipple that is pushed inwards", "Dimpling of skin over the breast", "Ulceration of skin over the breast", "All of the above"], optional: false
      }, postQuizScore: {
        type: String, optional : false
      },
    }
   )
  }, */
}
