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
    const isMale = (data.gender === "male");
    const isChild = (data.age <= 18);

    const stationsToRemove = [];
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
    Patientinfo.insert(data);
  },
  'patientinfo.update'(data) {
    data.stationQueue.shift();
    const nextStation = data.nextStation[0];

    Patientinfo.update({id:data.id},{$set:{nextStation:nextStation,busy:false}, $push:data});

    // console.log(Patientinfo.findOne({id:id}));
  },
  'patientinfo.setBusy'(id, value) {
    const patientStatus = Patientinfo.findOne({id:id}).busy;
    
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
});