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
        type: String, allowedValues: ["English", "Mandarin", "Malay", "Tamil"], optional: true
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

  "Screening Review": (info) => { return new SimpleSchema({}) },

  "Oral Screening": (info) => { return new SimpleSchema({}) },

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
        type: String, allowedValues: ["Happened to pass by 刚好经过", "Door-to-Door Publicity 义工上门宣传", "Posters, neighbourhood & lamp post banners 海报/旗帜/ 路灯上的海报", "Community Centre (CC) 社区中心(CC)", "SMS Reminder (简讯)", "Social Media 社交媒体"]
      }, feedbackFormQ28: {
        type: String, allowedValues: ["Yes 是", "No 否", "NA 不适用"], optional: true
      }, feedbackFormQ29: {
        type: String, allowedValues: ["Yes 是", "No 否", "NA 不适用"], optional: true
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
        type: Array, optional: true
        // , custom: function () {
        //   if (this.field('patientProfilingQ3').isSet 
        //     && this.field('patientProfilingQ3').value === "Yes") {
        //     if (!this.isSet || this.value.length === 0) {
        //       return SimpleSchema.ErrorTypes.REQUIRED
        //     }
        //   }
        // }
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
      }, patientProfilingQ11: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, patientProfilingQ12: {
        type: String, allowedValues: ["Yes", "No"], optional: false
      }, patientProfilingQ13: {
        type: String, optional: false
      }, patientProfilingQ14: {
        type: String, allowedValues: ["Yes", "Yes"], optional: true
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
