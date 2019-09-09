import React, { Component, Fragment } from 'react';
import { Meteor } from 'meteor/meteor';

import { infoLayouts } from '/imports/api/infoLayouts';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

class Info extends Component {
  constructor() {
    super();
  }

  render() {
    const station = Session.get('station');
    const currentInfoLayout = infoLayouts[station];
    console.log(this.props.patientInfo)
    console.log(currentInfoLayout(this.props.patientInfo))

    return (
      <Paper elevation={1}>
        {/* <AppBar position="static" color="default">
        </AppBar>         */}
        {/* <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        > */}
          {/* <Grid container
            direction="column"
            justify="center"
            alignItems="flex-end"
          > */}
            {currentInfoLayout(this.props.patientInfo)}
          {/* </Grid> */}
        {/* </Popover> */}
      </Paper>
    );
  }
}

export default Info;