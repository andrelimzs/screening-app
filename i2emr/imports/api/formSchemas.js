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
        type: Number, optional: false
      }, basicPatientInformationQ9: {
        type: String, optional: false
      }, basicPatientInformationQ10: {
        type: String, allowedValues: ["Yes, pls specify", "No"], optional: false
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
        type: String, allowedValues: ["Yes, pls specify", "No"], optional: false
      }, basicPatientInformationQ14: {
        type: String, optional: true, custom: function () {
          if (this.field('basicPatientInformationQ11').isSet
            && this.field('basicPatientInformationQ11').value === "Yes, pls specify") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }
    }
    )
  },

  // "Doctor's Consult": (info) => {
  //   return new SimpleSchema({
  //     doctorSConsultQ1: {
  //       type: String, optional: false
  //     }, doctorSConsultQ2: {
  //       type: String, optional: false
  //     }, doctorSConsultQ3: {
  //       type: String, optional: false
  //     }, doctorSConsultQ4: {
  //       type: Boolean, label: "Yes", optional: true
  //     }, doctorSConsultQ5: {
  //       type: String, optional: true
  //     }, doctorSConsultQ6: {
  //       type: Boolean, label: "Yes", optional: true
  //     }, doctorSConsultQ7: {
  //       type: String, optional: true
  //     }, doctorSConsultQ8: {
  //       type: Boolean, label: "Yes", optional: true
  //     }, doctorSConsultQ9: {
  //       type: String, optional: true
  //     }, doctorSConsultQ10: {
  //       type: Boolean, label: "Yes", optional: true
  //     }, doctorSConsultQ11: {
  //       type: Boolean, label: "Yes", optional: true, custom: function () {
  //         if (!this.isSet || !this.value) {
  //           return SimpleSchema.ErrorTypes.REQUIRED
  //         }
  //       }
  //     }
  //   }
  //   )
  // },

  "Screening Review": (info) => { return new SimpleSchema({}) },

  // "Oral Screening": (info) => { return new SimpleSchema({}) },

  "Patient Profiling": (info) => {
    return new SimpleSchema({
      patientProfilingQ1: {
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
      }, patientProfilingQ2: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, patientProfilingQ22: {
        type: String, optional: true, custom: function () {
          if (this.field('patientProfilingQ2').isSet
            && this.field('patientProfilingQ2').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, patientProfilingQ3: {
        type: String, allowedValues: ["Yes", "No"]
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
        type: String, allowedValues: ["Yes", "No", "Others"]
      }, patientProfilingQ4: {
        type: Array, optional: false
      }, "patientProfilingQ4.$": {
        type: String, allowedValues: ["Yes", "No", "Others"]
      }, patientProfilingQ5: {
        type: String, optional: false
      }, patientProfilingQ6: {
        type: String, optional: false
      }, patientProfilingQ7: {
        type: String, optional: false
      }, patientProfilingQ8: {
        type: String, optional: false
      }, patientProfilingQ9: {
        type: String, optional: false
      }, patientProfilingQ10: {
        type: String, allowedValues: ["Hospital", "Seldom/Never visits the doctor"], optional: false
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
        type: String, optional: true, custom: function () {
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
        type: String, allowedValues: ["Cigarette", "Tobacoo", "Others"]
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
        type: Number, optional: false
      }, patientProfilingQ18: {
        type: Number, optional: false
      }, patientProfilingQ19: {
        type: Number, optional: false
      }, patientProfilingQ20: {
        type: String, allowedValues: ["No Formal Qualifications", "Primary (Completed Sixth Standard)", "Secondary (Studied from Sixth Standard to Tenth Standard)", "Higher Secondary and Above", "Refuse to Answer"], optional: false
      }
    }
    )
  },

  "Height and Weight": (info) => {
    return new SimpleSchema({
      heightAndWeightQ1: {
        type: Number, optional: false
      }, heightAndWeightQ2: {
        type: String, allowedValues: ["Below 3rd Percentile", "Normal", "Above 97th Percentile"], optional: false
      }, heightAndWeightQ3: {
        type: Number, optional: false
      }, heightAndWeightQ4: {
        type: String, allowedValues: ["Below 3rd Percentile", "Normal", "Above 97th Percentile"], optional: false
      }, heightAndWeightQ5: {
        type: Number, optional: false
      }, heightAndWeightQ6: {
        type: Number, optional: false
      }, calculateBMI: {
        type: Number, optional: false
      }, calculateRatio: {
        type: Number, optional: false
      }, overview: {
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
        type: String, allowedValues: ["< 35 years old", ">= 35 years < 45 years old", ">= 45 years old"], optional: true, custom: function () {
          if (this.field('bloodGlucoseAndHbQ1').isSet
            && this.field('bloodGlucoseAndHbQ1').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, bloodGlucoseAndHbQ3: {
        type: String, allowedValues: ["Male: < 90cm ; Female < 80cm"], optional: true, custom: function () {
          if (this.field('bloodGlucoseAndHbQ1').isSet
            && this.field('bloodGlucoseAndHbQ1').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, bloodGlucoseAndHbQ4: {
        type: String, allowedValues: ["Hardly exercise", "Moderately Exercise", "Vigorous Exercise or Strenuous Work"], optional: true, custom: function () {
          if (this.field('bloodGlucoseAndHbQ1').isSet
            && this.field('bloodGlucoseAndHbQ1').value === "No") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, bloodGlucoseAndHbQ5: {
        type: String, allowedValues: ["1", "1 to 4", "5 to 10"], optional: true, custom: function () {
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
        type: Number, optional: false
      }, bloodGlucoseAndHbQ8: {
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
        type: Number, optional: true
      }, bpQ2: {
        type: Number, optional: true
      }, bpQ3: {
        type: Number, optional: true
      }, bpQ4: {
        type: Number, optional: true
      }, bpQ5: {
        type: Number, optional: true
      }, bpQ6: {
        type: Number, optional: true
      }, bpQ7: {
        type: Number, optional: false
      }, bpQ8: {
        type: Number, optional: false
      }, bpQ9: {
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

  "Pap Smear": (info) => {
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
  },

  "Breast Screening": (info) => {
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
  },

  "Post-screening feedback": (info) => {
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
  },
  "Doctors' Consult": (info) => {
    return new SimpleSchema({
      doctorsConsultQ1: {
        type: Array, optional: false
      }, "doctorsConsultQ1.$": {
        type: String, allowedValues: ["Overweight/obesity", "Heart burn", "Diabetes", "High blood pressure", "Heart disease", "Unexplained weight loss", "Respiratory problems", "Joint pain/back pain", "Stroke", "Visual impairment", "Mental health issues", "Alcohol overuse"]
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
      }, eyeScreeningQ3: {
        type: String, optional: false
      }, eyeScreeningQ4: {
        type: String, optional: false
      }, eyeScreeningQ5: {
        type: String, optional: false
      }, eyeScreeningQ6: {
        type: String, optional: false
      }, eyeScreeningQ7: {
        type: String, optional: false
      }, eyeScreeningQ8: {
        type: String, optional: false
      }, eyeScreeningQ9: {
        type: String, optional: false
      }, eyeScreeningQ10: {
        type: String, optional: false
      }, eyeScreeningQ11: {
        type: String, optional: false
      }, eyeScreeningQ12: {
        type: String, optional: false
      }, eyeScreeningQ13: {
        type: String, optional: false
      }, eyeScreeningQ14: {
        type: String, optional: false
      }, eyeScreeningQ15: {
        type: String, optional: false
      }, eyeScreeningQ16: {
        type: String, optional: false
      }, eyeScreeningQ17: {
        type: String, optional: false
      }, eyeScreeningQ18: {
        type: String, optional: false
      }, eyeScreeningQ19: {
        type: String, optional: false
      }, eyeScreeningQ20: {
        type: String, optional: false
      }, eyeScreeningQ21: {
        type: String, optional: false
      }, eyeScreeningQ22: {
        type: String, optional: false
      }, eyeScreeningQ23: {
        type: String, optional: false
      }, eyeScreeningQ24: {
        type: String, optional: false
      }, eyeScreeningQ25: {
        type: String, optional: false
      }, eyeScreeningQ26: {
        type: String, optional: false
      }, eyeScreeningQ27: {
        type: String, optional: false
      }, eyeScreeningQ28: {
        type: String, optional: false
      }, eyeScreeningQ29: {
        type: String, optional: false
      }, eyeScreeningQ30: {
        type: String, optional: false
      }, eyeScreeningQ31: {
        type: String, optional: false
      }, eyeScreeningQ32: {
        type: String, optional: false
      }, eyeScreeningQ33: {
        type: String, optional: false
      }, eyeScreeningQ34: {
        type: String, optional: false
      }, eyeScreeningQ35: {
        type: String, optional: false
      }, eyeScreeningQ36: {
        type: String, optional: false
      }
    }
    )
  },
}
