import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default Patientinfo = new Mongo.Collection('patientinfo');


Meteor.methods({
  'patientinfo.insert'(data) {
    for (var elem in data) {
      check(elem, String);
    }
    data.nextStation = "Height & weight";
    data.id = data.id.toUpperCase();
    data.busy = false;
    Patientinfo.insert(data);
  },
  'patientinfo.update'(data) {
    for (var elem in data) {
      check(elem, String);
    }
    const nextStation = data.nextStation;
    const id = data.id.toUpperCase();
    delete data.nextStation;
    delete data.id;
    Patientinfo.update({id:id},{$set:{nextStation:nextStation,busy:false}, $push:data});
  },
  'patientinfo.setBusy'(id, value) {
    Patientinfo.update({id:id},{$set:{busy:value}});

    if (value === true) {
      this.connection.onClose( () => {
        Patientinfo.update({id:id},{$set:{busy:false}});
      })
    }
    
  },
});