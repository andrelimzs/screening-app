import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Stationforms from '/imports/api/stationforms';

export default class Form extends Component {
  renderForm() {
    return this.props.formData.map((form) => (
      <input
        type={form[1]}
        ref={form[0]}
      />
    ));
  }

  handleSubmit(event) {
    // event.preventDefault();

    // // Find the text field via the React ref
    // const newTask = ReactDOM.findDOMNode(this.refs.taskInput).value.trim();

    // Tasks.insert({
    //   text: newTask,
    //   createdAt: new Date(), // current time
    // });

    // // Clear form
    // ReactDOM.findDOMNode(this.refs.taskInput).value = '';
  }

  render() {
    return (
      <div>
        <form className="patient-form" onSubmit={this.handleSubmit.bind(this)} >
          {/* { this.renderForm() } */}
          Name:<br />
          <input
            type="text"
            ref="name"
          /><br />
          ID:<br />
          <input
            type="text"
            ref="id"
          />
        </form>
      </div>
    );
  }
}
