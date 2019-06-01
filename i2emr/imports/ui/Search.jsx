import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      TextID: 0
    };
  };
  
  handleChangeID = (event) => {
    const searchQuery = event.target.value;

    if (searchQuery.match("^[0-9]+$")) {
      console.log(event.target.value);
    }
  }
  
  render() {
    
    return (
      <div>
        <TextField
          name="search"
          type="text"
          variant="outlined"
          margin="dense"
          onChange={this.handleChangeID}
        />

      </div>
    );
  }
}

export default Search;
