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
  "Basic Patient Information" : (info) => {
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
      },basicPatientInformationQ14: {
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

  // "Screening Review": (info) => { return new SimpleSchema({}) },

  // "Oral Screening": (info) => { return new SimpleSchema({}) },
  
  "Patient Profiling" : (info) => {
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
        type: String, allowedValues:["I have never smoked before", "I have stopped smoking totally"], optional: true, custom: function () {
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
}
