import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import SimpleSchema from 'simpl-schema';
import { formSchemas } from '/imports/api/formSchemas';
import { formLayouts } from '/imports/api/formLayouts';

export default Patientinfo = new Mongo.Collection('patientinfo');

// if (Meteor.isServer) {
//   Meteor.publish('patientinfo', function () {
//     return Patientinfo.find();
//   })
// }

Meteor.methods({
  'patientinfo.insert'(data) {
    // Determine stations to visit based on:
    // Based on gender & age
    const isMale = (data["Patient Info"].gender === "male");
    const isChild = (data["Patient Info"].age <= 18);

    // Stations to remove
    var stationsToRemove = ["Registration"];
    if (isMale) {
      stationsToRemove.push("Pap Smear", "Breast Exam", "Women's Edu");
    }
    if (isChild) {
      stationsToRemove.push("Blood Pressure", "Phlebotomy", "Pap Smear", "Breast Exam");
    }
    // Remove opt-out stations
    // console.log(data["Station Selection"]);

    const stationSelection = {
      stationSelect1: "Height & weight",
      stationSelect2: "",
      stationSelect3: "",
      stationSelect4: "Blood Pressure",
      stationSelect5: "",
      stationSelect6: "Phlebotomy",
      stationSelect7: "",
      stationSelect8: "",
      stationSelect9: "",
      stationSelect10: "Breast Exam",
      stationSelect11: "Women's Edu",
      stationSelect12: "",
      stationSelect13: "Eye Screening",
      stationSelect14: "Education"
    }

    var skipBloodGlucose = 0;

    for (var station in data["Station Selection"]) {
      if (station === "stationSelect2" || station === "stationSelect3") {
        
        skipBloodGlucose += (data["Station Selection"][station] === "No") ? 1 : 0;

      } else if (station === "stationSelect7" || station === "stationSelect9") {
        
        if (data["Station Selection"][station] === "No") stationsToRemove.push("Pap Smear");

      } else if (stationSelection[station] !== "") {
        
        if (data["Station Selection"][station] === "No") stationsToRemove.push(stationSelection[station]);

      }
    }

    if (skipBloodGlucose == 2) stationsToRemove.push("Blood Glucose & Hb");


    // Construct station queue by filtering out stations to exclude
    // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
    data.stationQueue = Object.keys(formLayouts).filter(s => !stationsToRemove.includes(s));
    
    data.nextStation = data.stationQueue[0];
    
    data.busy = false;

    // Assign unique id
    data.id = Patientinfo.find({}).count() + 1;
    data.lastSubmit = new Date();

    Patientinfo.insert(data);

    // Print a patient insertion summary
    console.log(String(data.id) + " | " + String(data.name));
    console.log(data.stationQueue);

    return data.id;
  },

  'patientinfo.update'(data) {
    const id = data.id;
    delete data.id;
    delete data.nextStation;

    // Insert new station data
    Patientinfo.update({id:id},{$push:data});

    // Retrieve station queue
    const info = Patientinfo.find({id:id}).fetch()[0];
    var stationQueue = info.stationQueue;

    // Proceed to next station
    stationQueue.shift();
    
    // Check for special case - "Doctors Consult"
    // The only station to be opt-in instead of opt-out
    if (stationQueue[0] === "Doctors' Consult") {
      // Check for any consult flags -> otherwise skip consult
      if ((typeof(info["Height & weight"]) !== "undefined" && info["Height & weight"][0].docConsultForHW) || 
          (typeof(info["Blood Glucose & Hb"]) !== "undefined" && info["Blood Glucose & Hb"][0].docConsultForBloodGlucAndHb) || 
          (typeof(info["Station Selection"]) !== "undefined" && info["Station Selection"].stationSelect12 === "Yes") ||
          (typeof(info["Pap Smear"]) !== "undefined" && info["Pap Smear"][0].docConsultForPap) ||
          (typeof(info["Blood Pressure"]) !== "undefined" && info["Blood Pressure"][0].docConsultForBP)) {
        console.log("Flagged for doctor's consult");
      } else {
        stationQueue.shift();
        console.log("Skipping doctor's consult");
      }
    }

    const nextStation = (typeof(stationQueue[0]) !== "undefined") ? stationQueue[0] : "Done";
    
    Patientinfo.update({id:id},{$set:{
      nextStation: nextStation,
      busy: false,
      stationQueue: stationQueue,
      lastSubmit: new Date()
    }});

    // // Print a next station msg
    // console.log(String(id) + " | " + String( );
    // console.log(data.stationQueue);
  },

  'patientinfo.setBusy'(id, value) {
    const patientStatus = (Patientinfo.findOne({id:id}) !== "undefined") ? Patientinfo.findOne({id:id}).busy : false;
    
    if (patientStatus === value) {

      // console.log("Patient conflict");
      return false;
      
    } else {

      Patientinfo.update({id:id},{$set:{busy:value}});

      if (Meteor.isServer && value === true) {
        this.connection.onClose( () => {
          Patientinfo.update({id:id},{$set:{busy:false}});
        })
      }
      
      return true;
    }

  },

  'patientinfo.skipStation'(id, currentStation, stationToSkip) {
    // Retrieve station queue
    const stationQueue = Patientinfo.find({id:id}).fetch()[0].stationQueue;
    
    // Filter out station
    const newQueue = stationQueue.filter(field => field !== stationToSkip);
    const nextStation = (typeof(newQueue[0]) !== "undefined") ? newQueue[0] : "Done";
    const isChangingCurrent = (currentStation !== stationToSkip);
    Patientinfo.update({id:id},{$set:{nextStation:nextStation,busy:isChangingCurrent,stationQueue:newQueue}});
  },

  'patientinfo.editPatientInfo'(id, parent, label, value) {
    console.log(value);
    const constructOperator = parent + "." + label;
    Patientinfo.update({
      id: id
    },
    {
      $set:{
        [constructOperator]: value
      }
    });
  },

  'patientinfo.findid'(id) {
    // Retrieve and return patient info
    return Patientinfo.find({id:id}).fetch()[0];
  },

  'patientinfo.movePatient'(id, station) {
    // Retrieve station queue
    const info = Patientinfo.find({id:id}).fetch()[0];
    var stationQueue = info.stationQueue;

    stationQueue = stationQueue.filter(field => field !== station);

    stationQueue.unshift(station);

    // TODO Refactor this to share code with 'update'
    // Check for special case - "Doctors Consult"
    // The only station to be opt-in instead of opt-out
    if (stationQueue[0] === "Doctors' Consult") {
      // Check for any consult flags -> otherwise skip consult
      if ((typeof(info["Height & weight"]) !== "undefined" && info["Height & weight"][0].docConsultForHW) || 
          (typeof(info["Blood Glucose & Hb"]) !== "undefined" && info["Blood Glucose & Hb"][0].docConsultForBloodGlucAndHb) || 
          (typeof(info["Station Selection"]) !== "undefined" && info["Station Selection"].stationSelect12 === "Yes") ||
          (typeof(info["Pap Smear"]) !== "undefined" && info["Pap Smear"][0].docConsultForPap) ||
          (typeof(info["Blood Pressure"]) !== "undefined" && info["Blood Pressure"][0].docConsultForBP)) {
        console.log("Flagged for doctor's consult");
      } else {
        stationQueue.shift();
        console.log("Skipping doctor's consult");
      }
    }

    const nextStation = (typeof(stationQueue[0]) !== "undefined") ? stationQueue[0] : "Done";
    
    Patientinfo.update({id:id},{$set:{
      nextStation: nextStation,
      busy: false,
      stationQueue: stationQueue,
      lastSubmit: new Date()
    }});
  },
});