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
  "Pre-Registration": (info) => {
    return new SimpleSchema({
      preRegistrationQ1: {
        type: String, allowedValues: ["Male", "Female"], optional: false
      }, preRegistrationQ2: {
        type: String, optional: false
      }, preRegistrationQ3: {
        type: String, optional: false, regEx: /^[0-9]{3}[a-zA-Z]$/
      }, preRegistrationQ4: {
        type: String, allowedValues: ["Y", "N"], optional: false
      }
    }
    )
  },

  "Registration": (info) => {
    return new SimpleSchema({
      registrationQ1: {
        type: String, allowedValues: ["Mr", "Ms", "Mrs", "Dr"], optional: false
      }, registrationQ2: {
        type: String, allowedValues: ["Chinese 华裔", "Malay 巫裔", "Indian 印裔", "Eurasian 欧亚裔", "Others 其他 (please specify):"], optional: false
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
        type: String, allowedValues: ["CHAS Orange", "CHAS Blue", "No CHAS"], optional: false
      }, registrationQ9: {
        type: String, allowedValues: ["Pioneer", "Merdeka", "None"], optional: false
      }, registrationQ10: {
        type: String, allowedValues: ["Bukit Batok Medical Clinic \n Blk 207 Bukit Batok Street 21 #01-114", "Kang An Clinic \n Blk 644 Bukit Batok Central, #01-70", "Lai Medical Clinic \n Blk 213 Bukit Batok Street 21, #01-209", "St Luke's Hospital \n 2 Bukit Batok St 11", "Frontier Family Medicine Clinic (Clementi) \n 3151 Commonwealth Ave West, #04-01 Grantral Mall @ Clementi", "Healthway Medical (Clementi) \n 443 Clementi Ave 3, #01-63", "Healthway Medical (West Coast) \n 727 Clementi West St 2, #01-258", "West Coast Clinic & Surgery (Clementi West) \n 722 Clementi West St 2, #01-162", "Drs Koo, Fok & Associates (Pioneer) \n 31 Jurong West St 63, #02-04", "Lakeside Family Medicine Clinic \n 518A Jurong West St 52, #01-02", "Lee Family Clinic \n Gek Poh Shopping Centre \n 762 Jurong West St 75, #02-262", "Drs Koo, Loh & Associates \n 152 Yung Ho Rd, #B1-03", "Drs. Tang & Partners \n 64 Yung Kuang Rd, #01-115", "Boon Lay Corporation Clinic \n 350 Jurong East Ave 1, #01-1225", "E.J. Tan Clinic & Surgery \n 104 Jurong East St 13, #01-100", "Trinity Medical Clinic & Dental Surgery (Jurong East) \n 130 Jurong Gateway Rd, #02-205/207"], optional: true, custom: function () {
          if (typeof (info["Pre-Registration"]) !== "undefined" && info["Pre-Registration"].preRegistrationQ4 === 'Y') {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, registrationQ11: {
        type: String, allowedValues: ["English", "Mandarin", "Malay", "Tamil"], optional: true, custom: function () {
          if (typeof (info["Pre-Registration"]) !== "undefined" && info["Pre-Registration"].preRegistrationQ4 === 'Y') {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, registrationQ12: {
        type: Boolean, label: "I have read and acknowledged the eligibility criteria for Phlebotomy. 我知道抽血的合格标准。", optional: true, custom: function () {
          if (typeof (info["Pre-Registration"]) !== "undefined" && info["Pre-Registration"].preRegistrationQ4 === 'Y') {
            if (!this.isSet || !this.value) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, registrationQ13: {
        type: Boolean, label: "I agree and consent to the above.", optional: true, custom: function () {
          if (!this.isSet || !this.value) {
            return SimpleSchema.ErrorTypes.REQUIRED
          }
        }
      }, registrationQ14: {
        type: String, optional: true, custom: function () {
          if (this.field('registrationQ2').isSet && this.field('registrationQ2').value === 'Others 其他 (please specify):') {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
        // }, preRegistrationQ4Helper: {
        // type: String, optional: true
        // }
      }
    })
  },

  "Phlebotomy": (info) => {
    return new SimpleSchema({
      phlebotomyQ1: {
        type: Boolean, label: "Yes", optional: true, custom: function () {
          if (!this.isSet || !this.value) {
            return SimpleSchema.ErrorTypes.REQUIRED
          }
        }
      }, phlebotomyQ2: {
        type: Boolean, label: "Yes", optional: true, custom: function () {
          if (!this.isSet || !this.value) {
            return SimpleSchema.ErrorTypes.REQUIRED
          }
        }
      }
    }
    )
  },

  "History Taking": {
    "Hx HCSR": (info) => { return new SimpleSchema({
      hxHcsrQ1: {
      type: String, optional: false
      }, hxHcsrQ2: {
      type: String, optional: false
      }, hxHcsrQ3: {
      type: String, optional: false
      }, hxHcsrQ4: {
      type: String, allowedValues: ["Yes, (Please specify):", "No"], optional: false
      }, hxHcsrQ5: {
      type: String, optional: true, custom: function () {
        if (this.field('hxHcsrQ4').isSet && this.field('hxHcsrQ4').value === 'Yes, (Please specify):') {
          if(!this.isSet || this.value.length === 0) {
            return SimpleSchema.ErrorTypes.REQUIRED
          }
        }
      }
      }, hxHcsrQ6: {
      type: String, allowedValues: ["Yes, (Please specify):", "No"], optional: false
      }, hxHcsrQ7: {
      type: String, optional: true, custom: function () {
        if (this.field('hxHcsrQ6').isSet && this.field('hxHcsrQ6').value === 'Yes, (Please specify):') {
          if(!this.isSet || this.value.length === 0) {
            return SimpleSchema.ErrorTypes.REQUIRED
          }
        }
      }
      }, hxHcsrQ8: {
      type: String, allowedValues: ["Yes, (Please specify):", "No"], optional: false
      }, hxHcsrQ9: {
      type: String, optional: true, custom: function () {
        if (this.field('hxHcsrQ8').isSet && this.field('hxHcsrQ8').value === 'Yes, (Please specify):') {
          if(!this.isSet || this.value.length === 0) {
            return SimpleSchema.ErrorTypes.REQUIRED
          }
        }
      }
      }, hxHcsrQ11: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, hxHcsrQ12: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
      }
     )},

    "Hx NSS": (info) => {
      return new SimpleSchema({
        hxNssQ1: {
          type: Array, optional: false
        }, "hxNssQ1.$": {
          type: String, allowedValues: ["Hypertension\n(Please proceed to Q2)", "Diabetes\n(Please proceed to Q2)", "High Cholesterol\n(Please proceed to Q2)", "Stroke (including transient ischaemic attack) \n(Please proceed to Q2)", "Chronic Kidney Disease\n(Please proceed to Q2d)", "No, I don't have any of the above \n(Please proceed to Q2d)"]
        }, hxNssQ2: {
          type: String, allowedValues: ["Yes (please answer question below)", "No", "Not Applicable"], optional: false
        }, hxNssQ3: {
          type: String, allowedValues: ["Yes, on current follow up with General Practioner (GP) \n(Please proceed to Q2c)", "Yes, on current follow up with Family Medicine Centre\n(Please proceed to Q2c)", "Yes, on current follow up with Polyclinic \n(Please proceed to Q2c)", "Yes, on current follow up with Specialist Outpatient Clinic (SOC)\n(Please proceed to Q2c)", "No, the last appointment was > 1 year ago (Please proceed to Q2b and 2c)"], optional: true, custom: function () {
            if (this.field('hxNssQ2').isSet && this.field('hxNssQ2').value === 'Yes (please answer question below)') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxNssQ4: {
          type: Array, optional: true, custom: function () {
            if (this.field('hxNssQ3').isSet && this.field('hxNssQ3').value === 'No, the last appointment was > 1 year ago (Please proceed to Q2b and 2c)') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, "hxNssQ4.$": {
          type: String, allowedValues: ["Do not see the need for tests", "Challenging to make time to go for appointments", "Difficulties gtting to the clinics", "Financial issues", "Scared of doctor", "Others: (please specify reason)"]
        }, hxNssQ5: {
          type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
        }, hxNssQ6: {
          type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
        }, hxNssQ7: {
          type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
        }, hxNssQ8: {
          type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
        }, hxNssQ9: {
          type: String, allowedValues: ["Yes, (Please specify):", "None"], optional: false
        }, hxNssQ10: {
          type: String, optional: true, custom: function () {
            if (this.field('hxNssQ9').isSet && this.field('hxNssQ9').value === 'Yes, (Please specify):') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxNssQ11: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }, hxNssQ12: {
          type: String, optional: true, custom: function () {
            if (this.field('hxNssQ11').isSet && this.field('hxNssQ11').value === 'Yes') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxNssQ13: {
          type: Array, optional: false
        }, "hxNssQ13.$": {
          type: String, allowedValues: ["Cancer", "Coronary Heart disease (caused by narrowed blood vessels supplying the heart muscle) or Heart attack, (Please specify):", "Diabetes", "Hypertension", "High Cholesterol", "Stroke (including transient ischaemic attack)", "No, they do not have any of the above."]
        }, hxNssQ14: {
          type: String, allowedValues: ["Yes, at least 1 cigarette (or equivalent) per day on average.", "Yes, occasionally, less than 1 cigarette (or equivalent) per day on average.", "No, I have never smoked.", "No, I have completely quit smoking."], optional: false
        }, hxNssQ15: {
          type: String, allowedValues: ["Less than 2 standard drinks per day on average.", "More than 2 standard drinks per day on average.", "No", "Quit Alcoholic Drinks"], optional: false
        }, hxNssQ16: {
          type: Array, optional: false
        }, "hxNssQ16.$": {
          type: String, allowedValues: ["No (Skip to Q7)", "Yes (Proceed to answer below)", "Vegetables (1 serving/day)", "Vegetables (2 or more servings/day)", "Fruits (1 serving/day)", "Fruits (2 or more servings/day)", "Whole grain and cereals"]
        }, hxNssQ17: {
          type: String, allowedValues: ["Yes (At least 20 mins each time, for 3 or more days per week.)", "Yes (At least 20 mins each time, for less than 3 days per week.)", "No participation of at least 20 min each time."], optional: false
        }, hxNssQ18: {
          type: String, allowedValues: ["1 year ago or less", "More than 1 year to 2 years", "More than 2 years to 3 years", "More than 3 years to 4 years", "More than 4 years to 5 years", "More than 5 years", "Never been checked"], optional: false
        }, hxNssQ19: {
          type: String, allowedValues: ["1 year ago or less", "More than 1 year to 2 years", "More than 2 years to 3 years", "More than 3 years to 4 years", "More than 4 years to 5 years", "More than 5 years", "Never been checked"], optional: false
        }, hxNssQ20: {
          type: String, allowedValues: ["1 year ago or less", "More than 1 year to 2 years", "More than 2 years to 3 years", "More than 3 years to 4 years", "More than 4 years to 5 years", "More than 5 years", "Never been checked"], optional: false
        }, hxNssQ21: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }, hxNssQ22: {
          type: String, optional: true, custom: function () {
            if (this.field('hxNssQ4').isSet && this.field('hxNssQ4').value.includes("Others: (please specify reason)")) {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxNssQ23: {
          type: String, optional: true, custom: function () {
            if (this.field('hxNssQ13').isSet && this.field('hxNssQ13').value.includes("Coronary Heart disease (caused by narrowed blood vessels supplying the heart muscle) or Heart attack, (Please specify):")) {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }
      }
      )
    },

    "Hx Social": (info) => {
      return new SimpleSchema({
        hxSocialQ1: {
          type: String, allowedValues: ["Yes, (Please specify):", "No"], optional: false
        }, hxSocialQ2: {
          type: String, optional: true, custom: function () {
            if (this.field('hxSocialQ1').isSet && this.field('hxSocialQ1').value === 'Yes, (Please specify):') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxSocialQ3: {
          type: String, allowedValues: ["1200 and below per month", "1,201 - 2,000 per month", "2,001 - 3,999 per month", "4,000 - 5,999 per month", "6,000 - 9,999 per month", "10,000 & above", "NIL"], optional: false
        }, hxSocialQ4: {
          type: String, optional: false
        }, hxSocialQ5: {
          type: String, allowedValues: ["Yes, (Please specify):", "No, I do not qualify", "No, I qualify but...(Please specify the reasons for not applying if you qualify):"], optional: false
        }, hxSocialQ6: {
          type: String, optional: true, custom: function () {
            if (this.field('hxSocialQ5').isSet && (this.field('hxSocialQ5').value === 'Yes, (Please specify):' || this.field('hxSocialQ5').value === 'No, I qualify but...(Please specify the reasons for not applying if you qualify):')) {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxSocialQ7: {
          type: String, allowedValues: ["Yes, (Please specify):", "No"], optional: false
        }, hxSocialQ8: {
          type: String, optional: true, custom: function () {
            if (this.field('hxSocialQ7').isSet && this.field('hxSocialQ7').value === 'Yes, (Please specify):') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxSocialQ9: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }, hxSocialQ10: {
          type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
            if (this.field('hxSocialQ9').isSet && this.field('hxSocialQ9').value === 'Yes') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxSocialQ11: {
          type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
            if (this.field('hxSocialQ9').isSet && this.field('hxSocialQ9').value === 'Yes') {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxSocialQ12: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }, hxSocialQ13: {
          type: String, allowedValues: ["Healthy", "Moderate", "Poor"], optional: false
        }, hxSocialQ14: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }
      }
      )
    },

    "Hx Cancer": (info) => {
      return new SimpleSchema({
        hxCancerQ1: {
          type: Array, optional: false
        }, "hxCancerQ1.$": {
          type: String, allowedValues: ["Ischaemic Heart Disease (Including Coronary Artery Diseases) 缺血性心脏病（包括心脏血管阻塞)", "Cervical Cancer 子宫颈癌, (Please specify age of diagnosis): (Free text)", "Breast Cancer 乳癌, (Please specify age of diagnosis): (Free text)", "Colorectal Cancer 大肠癌, (Please specify age of diagnosis): (Free text)", "Others, (Please Specify condition and age of diagnosis): (Free text)", "No, I don't have any of the above"]
        }, hxCancerQ2: {
          type: Array, optional: false
        }, "hxCancerQ2.$": {
          type: String, allowedValues: ["Cervical Cancer 子宫颈癌, (Please specify age of diagnosis):", "Breast Cancer 乳癌, (Please specify age of diagnosis):", "Colorectal Cancer 大肠癌, (Please specify age of diagnosis):", "Others, (Please Specify condition and age of diagnosis):", "No"]
        }, hxCancerQ3: {
          type: String, optional: true, custom: function () {
            if (this.field('hxCancerQ2').isSet && this.field('hxCancerQ2').value.length !== 0 && !this.field('hxCancerQ2').value.includes("No")) {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxCancerQ4: {
          type: String, optional: false
        }, hxCancerQ5: {
          type: String, allowedValues: ["1 year ago or less", "More than 1 year to 2 years", "More than 2 years to 3 years", "More than 3 years to 4 years", "More than 4 years to 5 years", "More than 5 years", "Never been checked"], optional: true
        }, hxCancerQ6: {
          type: String, allowedValues: ["1 year ago or less", "More than 1 year to 2 years", "More than 2 years to 3 years", "More than 3 years to 4 years", "More than 4 years to 5 years", "More than 5 years", "Never been checked"], optional: true
        }, hxCancerQ7: {
          type: String, allowedValues: ["1 year ago or less", "More than 1 year to 2 years", "More than 2 years to 3 years", "More than 3 years to 4 years", "More than 4 years to 5 years", "More than 5 years", "Never been checked"], optional: true
        }, hxCancerQ8: {
          type: String, allowedValues: ["1 year ago or less", "More than 1 year to 2 years", "More than 2 years to 3 years", "More than 3 years to 4 years", "More than 4 years to 5 years", "More than 5 years", "Never been checked"], optional: true
        }, hxCancerQ9: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }, hxCancerQ10: {
          type: String, optional: true, custom: function () {
            if (this.field('hxCancerQ9').isSet && this.field('hxCancerQ9').value === "Yes") {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxCancerQ11: {
          type: Number, optional: false
        }, hxCancerQ12: {
          type: Number, optional: false
        }, hxCancerQ13: {
          type: Number, optional: false
        }, hxCancerQ14: {
          type: Number, optional: false
        }, hxCancerQ15: {
          type: Number, optional: true
        }, hxCancerQ16: {
          type: Number, optional: true
        }, hxCancerQ17: {
          type: Number, optional: false
        }, hxCancerQ18: {
          type: Number, optional: false
        }, hxCancerQ19: {
          type: Number, optional: true
        }, hxCancerQ20: {
          type: Number, optional: true
        }, hxCancerQ21: {
          type: Number, optional: false
        }, hxCancerQ22: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }, hxCancerQ23: {
          type: Boolean, label: "Yes", optional: true
        }, hxCancerQ24: {
          type: Number, optional: true
        }, hxCancerQ25: {
          type: Array, optional: false
        }, "hxCancerQ25.$": {
          type: String, allowedValues: ["FIT (50 and above, FIT not done in past 1 year, Colonoscopy not done in past 10 years, Not diagnosed with colorectal cancer)", "WCE (40 and above, females only)", "Geriatrics (60 and above)", "Doctor\s Consultation (& Dietitian) - As recommended by hx-taker, undiagnosed or non-compliant cases (HTN, DM, Vision Impairment, Hearing Impairment, Urinary Incontinence, Any other pertinent medical issues)", "Social Service - As recommended by hx-taker (CHAS Application, Financial Support required, Social Support required)", "Oral Health Screening - participants aged 40-59 with poor dental hygiene", "Exhibition - recommended as per necessary"]
        }, hxCancerQ26: {
          type: String, optional: true, custom: function () {
            if (this.field('hxCancerQ1').isSet && this.field('hxCancerQ1').value.length !== 0 && !this.field('hxCancerQ1').value.includes("No, I don't have any of the above")) {
              if (!this.isSet || this.value.length === 0) {
                return SimpleSchema.ErrorTypes.REQUIRED
              }
            }
          }
        }, hxCancerQ26: {
          type: String, allowedValues: ["Yes", "No"], optional: false
        }
      }
      )
    },
  },

  "FIT": (info) => {
    return new SimpleSchema({
      fitQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, fitQ2: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "WCE": (info) => {
    return new SimpleSchema({
      wceQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, wceQ2: {
        type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
      }, wceQ3: {
        type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
      }, wceQ4: {
        type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
      }, wceQ5: {
        type: String, allowedValues: ["Yes", "No", "Not Applicable"], optional: false
      }, wceQ6: {
        type: String, allowedValues: ["Yes, (Please specify date of appointment if given):", "No", "Not Applicable"], optional: false
      }, wceQ7: {
        type: String, optional: true, custom: function () {
          if (this.field('wceQ6').isSet && this.field('wceQ6').value === "Yes, (Please specify date of appointment if given):") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }
    }
    )
  },

  "Geri - AMT": (info) => {
    return new SimpleSchema({
      geriAmtQ1: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ2: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ3: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ4: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ5: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ6: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ7: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ8: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ9: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ10: {
        type: String, allowedValues: ["Yes (Answered correctly)", "No (Answered incorrectly)"], optional: false
      }, geriAmtQ11: {
        type: Number, optional: false
      }, geriAmtQ12: {
        type: String, allowedValues: ["0 to 6 years of education", "More than 6 years of education"], optional: false
      }, geriAmtQ13: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriAmtQ14: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Geri - EBAS-DEP": (info) => {
    return new SimpleSchema({
      geriEbasDepQ1: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ2: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ3: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ4: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ5: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ6: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ7: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ8: {
        type: String, allowedValues: ["1 (Abnormal)", "0 (Normal)"], optional: false
      }, geriEbasDepQ9: {
        type: Number, optional: false
      }, geriEbasDepQ10: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriEbasDepQ11: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriEbasDepQ12: {
        type: String, optional: true, custom: function () {
          if (this.field('geriEbasDepQ11').isSet && this.field('geriEbasDepQ11').value === "Yes") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }
    }
    )
  },

  "Geri - Cognitive Follow Up": (info) => {
    return new SimpleSchema({
      geriCognitiveFollowUpQ1: {
        type: String, allowedValues: ["NTUC Health (Jurong West)", "SACS (Jurong East/Bukit Batok)", "Others (Please Specify):"], optional: false
      }, geriCognitiveFollowUpQ2: {
        type: String, optional: true, custom: function () {
          if (this.field('geriCognitiveFollowUpQ1').isSet && this.field('geriCognitiveFollowUpQ1').value === "Others (Please Specify):") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }
    }
    )
  },

  "Geri - Vision": (info) => {
    return new SimpleSchema({
      geriVisionQ1: {
        type: String, allowedValues: ["Yes (Specify in textbox )", "No"], optional: false
      }, geriVisionQ2: {
        type: String, optional: true, custom: function () {
          if (this.field('geriVisionQ1').isSet && this.field('geriVisionQ1').value === "Yes (Specify in textbox )") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, geriVisionQ3: {
        type: Number, optional: false
      }, geriVisionQ4: {
        type: Number, optional: false
      }, geriVisionQ5: {
        type: Number, optional: true
      }, geriVisionQ6: {
        type: Number, optional: true
      }, geriVisionQ7: {
        type: String, allowedValues: ["CF2M", "CF1M", "HM", "LP", "NLP", "NIL"], optional: true
      }, geriVisionQ8: {
        type: Array, optional: true
      }, "geriVisionQ8.$": {
        type: String, allowedValues: ["Referred to OT Consult"]
      }, geriVisionQ9: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Geri - PAR-Q": (info) => {
    return new SimpleSchema({
      geriParQQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriParQQ2: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriParQQ3: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriParQQ4: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriParQQ5: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriParQQ6: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriParQQ7: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriParQQ8: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Geri - Physical Activity Level": (info) => {
    return new SimpleSchema({
      geriPhysicalActivityLevelQ1: {
        type: String, optional: false
      }, geriPhysicalActivityLevelQ2: {
        type: String, optional: false
      }, geriPhysicalActivityLevelQ3: {
        type: String, optional: false
      }, geriPhysicalActivityLevelQ4: {
        type: String, allowedValues: ["0 (Nothing at all)", "1 (Very light)", "2 (Fairly light)", "3 (Moderate)", "4 (Somewhat hard)", "5 (Hard)", "6", "7 (Very Hard)", "8", "9", "10 (Very, Very Hard)"], optional: false
      }, geriPhysicalActivityLevelQ5: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriPhysicalActivityLevelQ6: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Geri - Frail Scale": (info) => {
    return new SimpleSchema({
      geriFrailScaleQ1: {
        type: String, allowedValues: ["1", "0"], optional: false
      }, geriFrailScaleQ2: {
        type: String, allowedValues: ["1", "0"], optional: false
      }, geriFrailScaleQ3: {
        type: String, allowedValues: ["1", "0"], optional: false
      }, geriFrailScaleQ4: {
        type: Array, optional: false
      }, "geriFrailScaleQ4.$": {
        type: String, allowedValues: ["Hypertension", "Diabetes", "Cancer (other than a minor skin cancer)", "Chronic lung disease", "Heart attack", "Congestive heart failure", "Angina", "Asthma", "Arthritis", "Stroke", "Kidney disease", "NIL"]
      }, geriFrailScaleQ5: {
        type: Number, optional: false
      }, geriFrailScaleQ6: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriFrailScaleQ7: {
        type: Number, optional: true
      },
    }
    )
  },

  "Geri - OT Questionnaire": (info) => {
    return new SimpleSchema({
      geriOtQuestionnaireQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriOtQuestionnaireQ2: {
        type: String, allowedValues: ["Yes (Specify in textbox )", "No"], optional: false
      }, geriOtQuestionnaireQ3: {
        type: String, optional: true, custom: function () {
          if (this.field('geriOtQuestionnaireQ2').isSet && this.field('geriOtQuestionnaireQ2').value === "Yes (Specify in textbox )") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, geriOtQuestionnaireQ4: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriOtQuestionnaireQ5: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriOtQuestionnaireQ6: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriOtQuestionnaireQ7: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriOtQuestionnaireQ8: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Geri - SPPB": (info) => {
    return new SimpleSchema({
      geriSppbQ1: {
        type: String, optional: true
      }, geriSppbQ2: {
        type: String, allowedValues: ["0       (If not able to complete 5 chair stands)", "1       (> 16.7s )", "2       (16.6 – 13.7s )", "3       (13.6 – 11.2s )", "4       (< 11.1s )"], optional: false
      }, geriSppbQ3: {
        type: String, optional: true
      }, geriSppbQ4: {
        type: String, optional: true
      }, geriSppbQ5: {
        type: String, optional: true
      }, geriSppbQ6: {
        type: String, allowedValues: ["0        (Side by side < 10s or unable)", "1       (Side by side 10s AND < 10s semi tandem)", "2       (Semi tandem 10s AND tandem < 3s)", "3       (Semi tandem 10s AND tandem < 10s but > 3s)", "4       (Tandem >= 10s)", "Refused to do"], optional: false
      }, geriSppbQ7: {
        type: String, optional: true
      }, geriSppbQ8: {
        type: String, allowedValues: ["0       (Could not do)", "1       (> 5.7s )", "2       (4.1 – 5.7s )", "3       (3.2 – 4.0s )", "4       (< 3.1s )"], optional: false
      }, geriSppbQ9: {
        type: Number, optional: false
      }, geriSppbQ10: {
        type: String, allowedValues: ["High Falls Risk (score ≤ 6)", "Low Falls Risk (score > 6)"], optional: false
      }, geriSppbQ11: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Geri - TUG": (info) => {
    return new SimpleSchema({
      geriTugQ1: {
        type: Array, optional: true
      }, "geriTugQ1.$": {
        type: String, allowedValues: ["Walking frame", "Walking frame with wheels", "Crutches/ Elbow crutches", "Quadstick (Narrow/ Broad)", "Walking stick", "Umbrella", "Others (Please specify in textbox )"]
      }, geriTugQ2: {
        type: String, optional: true, custom: function () {
          if (this.field('geriTugQ1').isSet && this.field('geriTugQ1').length !== 0 && this.field('geriTugQ1').value.includes("Others (Please specify in textbox )")) {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, geriTugQ3: {
        type: Number, optional: false
      }, geriTugQ4: {
        type: String, allowedValues: ["High Falls Risk (> 15sec)", "Low Falls Risk (≤ 15 sec)"], optional: false
      }, geriTugQ5: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },

  "Geri - PT Consult": (info) => {
    return new SimpleSchema({
      geriPtConsultQ1: {
        type: String, optional: false
      }, geriPtConsultQ2: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriPtConsultQ3: {
        type: String, optional: true
      }, geriPtConsultQ4: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriPtConsultQ5: {
        type: String, optional: true
      }
    }
    )
  },

  "Geri - OT Consult": (info) => {
    return new SimpleSchema({
      geriOtConsultQ1: {
        type: String, optional: false
      }, geriOtConsultQ2: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriOtConsultQ3: {
        type: String, optional: true
      }, geriOtConsultQ4: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, geriOtConsultQ5: {
        type: String, optional: true
      }, geriOtConsultQ6: {
        type: Array, optional: true
      }, "geriOtConsultQ6.$": {
        type: String, allowedValues: ["HDB EASE", "SWCDC Safe and Bright Homes", "Own Vendors"],
      }
    }
    )
  },

  "Geri - Geri Appt": (info) => {
    return new SimpleSchema({
      geriGeriApptQ4: {
        type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
          if ((typeof (info["Geri - Vision"]) !== "undefined" && info["Geri - Vision"].geriVisionQ3 >= 12) ||
            (typeof (info["Geri - Vision"]) !== "undefined" && info["Geri - Vision"].geriVisionQ4 >= 12)) {
            if (!this.isSet) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, geriGeriApptQ5: {
        type: Boolean, label: "Done", optional: true, custom: function () {
          if ((typeof (info["Geri - EBAS-DEP"]) !== "undefined" && info["Geri - EBAS-DEP"].geriEbasDepQ10 === "Yes") ||
            (typeof (info["Geri - EBAS-DEP"]) !== "undefined" && info["Geri - EBAS-DEP"].geriEbasDepQ11 === "Yes") ||
            (typeof (info["Geri - PT Consult"]) !== "undefined" && info["Geri - PT Consult"].geriPtConsultQ4 === "Yes") ||
            (typeof (info["Geri - OT Consult"]) !== "undefined" && info["Geri - OT Consult"].geriOtConsultQ4 === "Yes")) {
            if (!this.isSet || !this.value) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, geriGeriApptQ6: {
        type: String, allowedValues: ["Yes, requirement met.", "No, requirement not met."], optional: false
      }, geriGeriApptQ7: {
        type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
          if (this.field('geriGeriApptQ6').isSet && this.field('geriGeriApptQ6').value === "Yes, requirement met.") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, geriGeriApptQ8: {
        type: String, allowedValues: ["Yes", "No"], optional: true, custom: function () {
          if (this.field('geriGeriApptQ6').isSet && this.field('geriGeriApptQ6').value === "Yes, requirement met.") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }
    }
    )
  },

  "Doctor's Consult": (info) => {
    return new SimpleSchema({
      doctorSConsultQ1: {
        type: String, optional: false
      }, doctorSConsultQ2: {
        type: String, optional: false
      }, doctorSConsultQ3: {
        type: String, optional: false
      }, doctorSConsultQ4: {
        type: Boolean, label: "Yes", optional: true
      }, doctorSConsultQ5: {
        type: String, optional: true
      }, doctorSConsultQ6: {
        type: Boolean, label: "Yes", optional: true
      }, doctorSConsultQ7: {
        type: String, optional: true
      }, doctorSConsultQ8: {
        type: Boolean, label: "Yes", optional: true
      }, doctorSConsultQ9: {
        type: String, optional: true
      }, doctorSConsultQ10: {
        type: Boolean, label: "Yes", optional: true
      }, doctorSConsultQ11: {
        type: Boolean, label: "Yes", optional: true, custom: function () {
          if (!this.isSet || !this.value) {
            return SimpleSchema.ErrorTypes.REQUIRED
          }
        }
      }
    }
    )
  },

  "Dietitian": (info) => {
    return new SimpleSchema({
      dietitianQ1: {
        type: String, optional: true
      }, dietitianQ2: {
        type: String, optional: true
      }, dietitianQ3: {
        type: String, optional: true
      }, dietitianQ4: {
        type: Boolean, label: "Yes", optional: true
      }
    }
    )
  },

  "Social Service": (info) => {
    return new SimpleSchema({
      socialServiceQ1: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, socialServiceQ2: {
        type: String, optional: false
      }, socialServiceQ3: {
        type: String, optional: false
      }
    }
    )
  },

  "Screening Review": (info) => { return new SimpleSchema({}) },

  "Feedback Form": (info) => {
    return new SimpleSchema({
      feedbackFormQ1: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ2: {
        type: Array, optional: false
      }, "feedbackFormQ2.$": {
        type: String, allowedValues: ["I am concerned about my health 我关心自己的健康", "I have never been screened before 我从未经过身体检查", "Friends/family told me to come 朋友/家人劝我应该参与", "There is a free health screening 这项身体检验是免费的", "There is a free goodie bag 活动有赠送礼包", "I was drawn by the exhibition booths 我被健康展览所吸引", "I was drawn by the carnival 我被嘉年华会所吸引", "I was drawn to the crowd 我被人群所吸引", "It is conveniently located 活动地点对我很方便", "It is at a convenient timing 活动时间对我很方便", "Others (please specify) 其他原因：(请注明)"]
      }, feedbackFormQ3: {
        type: String, optional: true, custom: function () {
          if (this.field('feedbackFormQ2').isSet && this.field('feedbackFormQ2').length !== 0 && this.field('feedbackFormQ2').value.includes("Others (please specify) 其他原因：(请注明)")) {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, feedbackFormQ4: {
        type: String, allowedValues: ["Yes 是", "No 否"], optional: false
      }, feedbackFormQ5: {
        type: String, allowedValues: ["NIL", "Only once (Today) 一次而已 （今天）", "Two Times 两次", "Thrice 三次", "Four Times 四次", "Five Times (五次）", "Six Times (六次）", "Seven or more times (七次以上）"], optional: false
      }, feedbackFormQ6: {
        type: String, allowedValues: ["Yes 是", "No 否"], optional: false
      }, feedbackFormQ7: {
        type: String, allowedValues: ["Not Applicable", "In the past month 这个月", "In the past year 今年内", "2-3 years ago 两到三年前", ">4 years ago 多过四年前"], optional: false
      }, feedbackFormQ8: {
        type: String, allowedValues: ["Never 没做过", "Infrequent 不经常", "1 in 3 years 三年一次", "1 in 2 years 两年一次", "Once a year 每年一次", "More than once a year 每年多于一次"], optional: false
      }, feedbackFormQ9: {
        type: String, allowedValues: ["No I am unaware of other screenings 没有", "Community Centre (CC) 民众俱乐部（CC）", "Polyclinic 综合诊疗所", "GP clinic 私人诊所", "Others (please specify) 其他 (请注明)"], optional: false
      }, feedbackFormQ10: {
        type: String, optional: true, custom: function () {
          if (this.field('feedbackFormQ9').isSet && this.field('feedbackFormQ9').value === "Others (please specify) 其他 (请注明)") {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, feedbackFormQ11: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ12: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ13: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ14: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ15: {
        type: Array, optional: false
      }, "feedbackFormQ15.$": {
        type: String, allowedValues: ["Expensive  太贵", "Too Far 太远", "Too time consuming 太费时间"]
      }, feedbackFormQ16: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ17: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ18: {
        type: String, optional: true
      }, feedbackFormQ19: {
        type: String, optional: true
      }, feedbackFormQ20: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意", "Not applicable 不适用"], optional: false
      }, feedbackFormQ21: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ22: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ23: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ24: {
        type: String, optional: true
      }, feedbackFormQ25: {
        type: String, optional: true
      }, feedbackFormQ26: {
        type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
      }, feedbackFormQ27: {
        type: Array, optional: false
      }, "feedbackFormQ27.$": {
        type: String, allowedValues: ["Happened to pass by 刚好经过", "Posters, banners 海报/旗帜", "PHS Facebook Page 公共健康服务官方脸书", "Community Centre (CC) 社区中心（CC）", "SMS Reminder (简讯）", "PHS Instagram 公共健康服务 Instagram", "Door-to-Door Publicity 义工上门宣传", "Lamp post banners 路灯上的海报", "PHS Website (www.publichealthservice.org) 公共健康服务官方网站", "Newspaper 报纸", "Others (Please specify) 其他（请注明)"]
      }, feedbackFormQ28: {
        type: String, optional: true, custom: function () {
          if (this.field('feedbackFormQ27').isSet && this.field('feedbackFormQ27').length !== 0 && this.field('feedbackFormQ27').value.includes("Others (Please specify) 其他（请注明)")) {
            if (!this.isSet || this.value.length === 0) {
              return SimpleSchema.ErrorTypes.REQUIRED
            }
          }
        }
      }, feedbackFormQ29: {
        type: String, allowedValues: ["Yes", "No", "Did not receive brochure"], optional: true
      }, feedbackFormQ30: {
        type: String, optional: true
      }, feedbackFormQ31: {
        type: String, optional: true
      }, feedbackFormQ32: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }
    }
    )
  },
}
