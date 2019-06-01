import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.searchBar = React.createRef();
    this.state = {
      searchResult: null,
      anchorEl: null
    };
  };
  
  handleChangeID = (event) => {
    const searchQuery = event.target.value;
    const { currentTarget } = event;

    // RegEx match to ensure valid id numbers
    if (searchQuery.match("^[0-9]+$")) {
      // console.log(event.target.value);
      Meteor.call('patientinfo.findid', Number(searchQuery), (error, result) => {
        if (result) {
          this.setState({ searchResult: result,
                          anchorEl: currentTarget })
          
        } else {
          this.setState({ searchResult: null,
                          anchorEl: null })
        }
      });
    } else {
      this.setState({ searchResult: null,
                      anchorEl: null })
    }
  }

  movePatient(id, e) {
    e.preventDefault();
    
    Meteor.call('patientinfo.movePatient', id, this.props.station);

    this.setState({ searchResult: null,
                    anchorEl: null })
    
    console.log(this.searchBar);
    // this.searchBar.value = '';
  }
  
  render() {
    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);
    const id = open ? 'find-patient-popper' : null;
    const patientInfo = this.state.searchResult;

    return (
      <div>
        <TextField
          name="search"
          type="number"
          variant="outlined"
          margin="dense"
          autoComplete="off"
          placeholder="Search ID"
          ref= {this.searchBar} 
          onChange={this.handleChangeID}
        />

        <Popper id={id} open={open} anchorEl={anchorEl}>
          {open && <Card>
            <CardContent>
              <Typography variant="h6">
                ID {patientInfo.id}
              </Typography>
              <Typography variant="h6">
                At {patientInfo.nextStation}
              </Typography>
              <Typography variant="h6">
                {patientInfo["Patient Info"].name}
              </Typography>
              <Typography variant="body2">
                {patientInfo["Patient Info"].gender}, {patientInfo["Patient Info"].age}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant={(patientInfo.busy) ? "contained": "outlined"}
                color={(patientInfo.busy) ? "secondary": "default"}
                onClick={this.movePatient.bind(this, patientInfo.id)}>
                  Move
              </Button>
            </CardActions>
          </Card>}
        </Popper>

      </div>
    );
  }
}

export default Search;
