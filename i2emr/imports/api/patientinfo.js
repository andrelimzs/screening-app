import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export default Patientinfo = new Mongo.Collection('patientinfo');


// Define the schema
Patients.schema = new SimpleSchema({
  Name: {
    type: String,
    label: "Name",
    max: 200
  },
  id: {
    type: String,
    label: "id"
  },
  Height: {
    type: Number,
    label: "Height",
    min: 0
  },
  Weight: {
    type: Number,
    label: "Weight",
    min: 0
  }
});

//Validate document with schema
const patient = {
  Name: 'My list',
  incompleteCount: 3
};

Lists.schema.validate(list);




// Validate an object against the schema
obj = {Name: "Tom", ID: "123"};

isValid = PatientSchema.namedContext("myContext").validate(obj);
// OR
// isValid = PatientSchema.namedContext("myContext").validateOne(obj, "keyToValidate");
// OR
// isValid = Check.test(obj, PatientSchema);
// OR
check(obj, PatientSchema);

// Validation errors are available through reactive methods
if (Meteor.isClient) {
  Meteor.startup(function() {
    Tracker.autorun(function() {
      var context = PatientSchema.namedContext("myContext");
      if (!context.isValid()) {
        console.log(context.invalidKeys());
      }
    });
  });
}


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

process.stdout.on('error', function( err ) {
  if (err.code == "EPIPE") {
      process.exit(0);
  }
});