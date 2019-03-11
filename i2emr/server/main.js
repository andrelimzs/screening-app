import { Meteor } from 'meteor/meteor';
import Links from '/imports/api/links';
import Patientinfo from '/imports/api/patientinfo';
import Stationforms from '/imports/api/stationforms';


function addPatient(name, id, nextStation) {
  Patientinfo.insert({name:name, id:id, nextStation:nextStation, busy:false, createdAt: new Date() });
}

function addForm(station, formData) {
  Stationforms.insert({name:station, data:formData});
}

Meteor.startup(() => {
  Patientinfo.remove({});
  Stationforms.remove({});

  if (Patientinfo.find().count() === 0) {
    addPatient(
      'Tom',
      'S1234567A',
      "Height & weight"
    );
    addPatient(
      'Gary',
      'S7654321Z',
      "Height & weight"
    );
  }

  if (Stationforms.find().count() === 0) {
    addForm(
      'Registration',
      [
        ["name","text"],
        ["id","alphanumeric"],
        ["age", "number"]
      ]
    )
  }
});
