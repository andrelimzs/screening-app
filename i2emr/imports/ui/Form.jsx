import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import Button from '@material-ui/core/Button';

class Form extends Component {
  constructor() {
    super();

    this.formData = {"Registration": ["Name", "id"],
                    "Height & weight": ["Height", "Weight", "Waist"],
                    "CBG & Hb": ["CBG", "Hb"],
                    "Phlebotomy": ["Blood"],
                    "Blood pressure": ["BP"]};

    this.stations = ["Registration","Height & weight","CBG & Hb","Phlebotomy","Blood pressure","Done"];
  }

  renderForm() {
    return (
      <React.Fragment>
        {this.formData[this.props.station].map(field => (
          <React.Fragment>
            <label for={field}>{field}:</label>
            <input type="text" ref={field} /><br />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    
    const newForm = {};

    // Loop through form fields
    for (var i=0, len = this.formData[this.props.station].length; i < len; i++ ){
      const field = this.formData[this.props.station][i];
      // Extract data
      newForm[field] = ReactDOM.findDOMNode(this.refs[field]).value.trim();
      // And clear form
      ReactDOM.findDOMNode(this.refs[field]).value = '';
    }

    // Insert/update patientinfo database
    if (this.props.station == "Registration") {
      console.log(this.stations[this.stations.indexOf(this.props.station)+1]);
      Meteor.call('patientinfo.insert', newForm);
    } else {
      newForm.id = this.props.id;
      console.log(this.stations[this.stations.indexOf(this.props.station)+1]);
      newForm.nextStation = this.stations[this.stations.indexOf(this.props.station)+1];
      Meteor.call('patientinfo.update', newForm);
    }
  }

  render() {
    return (
      <div>
        <form className="patient-form" onSubmit={this.handleSubmit.bind(this)} >
          { this.renderForm() }
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

const FormContainer = withTracker(({ station }) => {
  return {
    id: Patientinfo.find({nextStation:station}).fetch().id,
  };
})(Form);





// Define the schema
PatientSchema = new PatientSchema({
  Name: {
    type: String,
    label: "Name",
    max: 200
  },
  ID: {
    type: String,
    label: "ID"
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

// Validate an object against the schema
obj = {Name: "Tom", ID: "123"};

isValid = PatientSchema.namedContext("myContext").validate(obj);
// OR
isValid = PatientSchema.namedContext("myContext").validateOne(obj, "keyToValidate");
// OR
isValid = Match.test(obj, PatientSchema);
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

var ss = new SimpleSchema({
  requiredString: {
      type: String
  }
});
var ssContext1 = ss.namedContext("userForm");

var mySchema = new SimpleSchema({name: {type: String}});

Match.test({name: "Steve"}, mySchema); // Return true
Match.test({admin: true}, mySchema); // Return false
check({admin: true}, mySchema); // throw a Match.Error


export default Form;