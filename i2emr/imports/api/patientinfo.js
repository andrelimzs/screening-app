import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import SimpleSchema from 'simpl-schema';
import { formSchemas } from '/imports/api/formSchemas';

export default Patientinfo = new Mongo.Collection('patientinfo');



// if (Meteor.isServer) {
//   Meteor.publish('patientinfo', function () {
//     return Patientinfo.find();
//   })
// }

Meteor.methods({
  'patientinfo.insert'(data) {
    data.nextStation = "Height & weight";
    // data.id = data.id.toUpperCase();
    data.busy = false;
    Patientinfo.insert(data);
  },
  'patientinfo.update'(data) {
    const nextStation = data.nextStation;
    const id = data.id;

    // TODO - patient routing
    delete data.nextStation;
    
    delete data.id;
    Patientinfo.update({id:id},{$set:{nextStation:nextStation,busy:false}, $push:data});

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