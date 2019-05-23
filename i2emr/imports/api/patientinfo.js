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
    const stationsToRemove = ["Registration", "Height & weight"];
    if (isMale) {
      stationsToRemove.push("Pap Smear", "Breast Exam", "Women's Edu");
    }
    if (isChild) {
      stationsToRemove.push("Blood Pressure", "Phlebotomy", "Pap Smear", "Breast Exam");
    }

    // Construct station queue by filtering out stations to exclude
    // https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
    data.stationQueue = Object.keys(formLayouts).filter(s => !stationsToRemove.includes(s));
    
    data.nextStation = data.stationQueue[0];
    
    data.busy = false;

    // Assign unique id
    data.id = Patientinfo.find({}).count() + 1;

    Patientinfo.insert(data);
  },
  'patientinfo.update'(data) {
    const id = data.id;
    delete data.id;
    delete data.nextStation;

    // Retrieve station queue
    var stationQueue = Patientinfo.find({id:id}).fetch()[0].stationQueue;
    
    // Proceed to next station
    const nextStation = (typeof(stationQueue[0]) !== "undefined") ? stationQueue[0] : "Done";
    stationQueue.shift();
    
    Patientinfo.update({id:id},{$set:{nextStation:nextStation,busy:false,stationQueue:stationQueue}, $push:data});

    // console.log(Patientinfo.findOne({id:id}));
  },
  'patientinfo.setBusy'(id, value) {
    const patientStatus = (Patientinfo.findOne({id:id}) !== "undefined") ? Patientinfo.findOne({id:id}).busy : false;
    
    if (patientStatus === value) {

      console.log("Patient conflict");
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
  'patientinfo.skipStation'(id, stationToSkip) {
    // Retrieve station queue
    const stationQueue = Patientinfo.find({id:id}).fetch()[0].stationQueue;
    
    // Filter out station
    const newQueue = stationQueue.filter(field => field !== stationToSkip);
    
    Patientinfo.update({id:id},{$set:{stationQueue:newQueue}});
  },
  'patientinfo.getSkipList'(id) {
    const stationQueue = Patientinfo.find({id:id}).fetch()[0].stationQueue;
    
    return stationQueue;
  },
});