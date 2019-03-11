import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Queue extends Component {
  takePatient(id, e) {
    e.preventDefault();
    
    Meteor.call('patientinfo.setBusy', id, true);

    Session.set('currentPatient',id);
  }

  renderPatient() {
    if (this.props.patientList.length == 0) {
      return (
        <React.Fragment>
          <Card>
            <CardContent>
              <Typography>
                Empty
              </Typography>
            </CardContent>
          </Card>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        {this.props.patientList.map(patient => (
          <React.Fragment>
            <Card>
              <CardContent>
                <Typography>
                  {patient.name}
                  <Button
                    variant="outlined"
                    onClick={this.takePatient.bind(this, patient.id)}>
                      Take
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  }

  render() {
    // console.log("Queue|patientList ", this.props.patientList);
    
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={8}
        >
          {this.renderPatient()}
        </Grid>
      </div>
    );
  }
}

export default Queue;
