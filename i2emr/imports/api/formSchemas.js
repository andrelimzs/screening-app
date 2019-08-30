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
    type: Boolean, label: "Yes", optional: false
    }, phlebotomyQ2: {
    type: Boolean, label: "Yes", optional: false
    }
    }
   ),

   "Geri - AMT" : new SimpleSchema({
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
    type: String, allowedValues: ["0 to 6 years of education", "More than 6 years of education"], optional: false
    }, geriAmtQ12: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriAmtQ13: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }
    }
   ),

   "Geri - EBAS-DEP" : new SimpleSchema({
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
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriEbasDepQ10: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriEbasDepQ11: {
    type: String, optional: true
    }
    }
   ),

   "Geri - Vision" : new SimpleSchema({
    geriVisionQ1: {
    type: String, allowedValues: ["Yes (Specify in textbox )", "No"], optional: false
    }, geriVisionQ2: {
    type: String, optional: true
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
    type: Array, optional: true
    }, "geriVisionQ9.$": {
    type: String, allowedValues: ["Referred to Doctor\s Consult"]
    }
    }
   ),
  
  "Geri - PAR-Q" : new SimpleSchema({
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
   ),

  "Geri - Physical Activity Level" : new SimpleSchema({
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
   ),

  "Geri - Frail Scale" : new SimpleSchema({
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
    }
    }
   ),

   "Geri - OT Questionnaire" : new SimpleSchema({
    geriOtQuestionnaireQ1: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriOtQuestionnaireQ2: {
    type: String, allowedValues: ["Yes (Specify in textbox )", "No"], optional: false
    }, geriOtQuestionnaireQ3: {
    type: String, optional: true
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
   ),

   "Geri - SPPB" : new SimpleSchema({
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
    type: String, optional: false
    }, geriSppbQ10: {
    type: String, allowedValues: ["High Falls Risk (score ≤ 6)", "Low Falls Risk (score > 6)"], optional: false
    }, geriSppbQ11: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }
    }
   ),

   "Geri - TUG" : new SimpleSchema({
    geriTugQ1: {
    type: Array, optional: true
    }, "geriTugQ1.$": {
    type: String, allowedValues: ["Walking frame", "Walking frame with wheels", "Crutches/ Elbow crutches", "Quadstick (Narrow/ Broad)", "Walking stick", "Umbrella", "Others (Please specify in textbox )"]
    }, geriTugQ2: {
    type: String, optional: true
    }, geriTugQ3: {
    type: Number, optional: false
    }, geriTugQ4: {
    type: String, allowedValues: ["High Falls Risk (> 15sec)", "Low Falls Risk (≤ 15 sec)"], optional: false
    }, geriTugQ5: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }
    }
   ),

   "Geri - PT Consult" : new SimpleSchema({
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
   ),

  "Geri - OT Consult" : new SimpleSchema({
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
    type: String, allowedValues: ["HDB EASE", "SWCDC Safe and Bright Homes", "Own Vendors"], optional: true
    }
    }
   ),

   "Geri - Geri Appt" : new SimpleSchema({
    geriGeriApptQ1: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriGeriApptQ2: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriGeriApptQ3: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriGeriApptQ4: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, geriGeriApptQ5: {
    type: Array, optional: true
    }, "geriGeriApptQ5.$": {
    type: String, allowedValues: ["Done"]
    }, geriGeriApptQ6: {
    type: String, allowedValues: ["Yes, requirement met.", "No, requirement not met."], optional: false
    }, geriGeriApptQ7: {
    type: String, allowedValues: ["Yes", "No"], optional: true
    }, geriGeriApptQ8: {
    type: String, allowedValues: ["Yes", "No"], optional: true
    }
    }
   ),
   
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

  "Doctor's Consult" : new SimpleSchema({
    doctorSConsultQ1: {
    type: String, optional: true
    }, doctorSConsultQ2: {
    type: String, optional: true
    }, doctorSConsultQ3: {
    type: String, optional: true
    }, doctorSConsultQ4: {
    type: Array, optional: true
    }, "doctorSConsultQ4.$": {
    type: String, allowedValues: []
    }, doctorSConsultQ5: {
    type: String, optional: true
    }, doctorSConsultQ6: {
    type: Array, optional: true
    }, "doctorSConsultQ6.$": {
    type: String, allowedValues: ["Yes"]
    }, doctorSConsultQ7: {
    type: Array, optional: false
    }, "doctorSConsultQ7.$": {
    type: String, allowedValues: ["Yes"]
    }
    }
   ),

   "Social Service" : new SimpleSchema({
    socialServiceQ1: {
    type: String, allowedValues: ["Yes", "No"], optional: false
    }, socialServiceQ2: {
    type: String, optional: false
    }, socialServiceQ3: {
    type: String, optional: false
    }
    }
   ),
  
   "Feedback Form" : new SimpleSchema({
    feedbackFormQ1: {
    type: String, allowedValues: ["Strongly Agree 非常同意", "Agree 同意", "Disagree 不同意", "Strongly Disagree 非常不同意"], optional: false
    }, feedbackFormQ2: {
    type: Array, optional: false
    }, "feedbackFormQ2.$": {
    type: String, allowedValues: ["I am concerned about my health 我关心自己的健康", "I have never been screened before 我从未经过身体检查", "Friends/family told me to come 朋友/家人劝我应该参与", "There is a free health screening 这项身体检验是免费的", "There is a free goodie bag 活动有赠送礼包", "I was drawn by the exhibition booths 我被健康展览所吸引", "I was drawn by the carnival 我被嘉年华会所吸引", "I was drawn to the crowd 我被人群所吸引", "It is conveniently located 活动地点对我很方便", "It is at a convenient timing 活动时间对我很方便", "Others (please specify) 其他原因：(请注明)"]
    }, feedbackFormQ3: {
    type: String, optional: true
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
    type: String, optional: true
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
    type: String, optional: true
    }, feedbackFormQ29: {
    type: String, allowedValues: ["Yes", "No", "Did not receive brochure"], optional: true
    }, feedbackFormQ30: {
    type: String, optional: true
    }, feedbackFormQ31: {
    type: String, optional: true
    }
    }
   ),
}
