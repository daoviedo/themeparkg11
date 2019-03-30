import React, {Component} from 'react';
import {Button, TextField, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TopBar from './components/TopBar';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class CreateRide extends Component {
    state = {
      name: '',
      runsBeforeMaintenance: '',
      numSeats: '',
    };
  
  createRide() {
    fetch(`http://157.230.172.23:4000/new-ride`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            rideName: this.state.name,
            runsBeforeMaintenance: this.state.runsBeforeMaintenance,
            numSeats: this.state.numSeats
        }),
    })
    .then(result => result.json())
    .then(res => console.log(res.status))
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
      <TopBar/>
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
      <Typography variant="h6" gutterBottom>
        Enter new ride information
      </Typography>
      <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
        id="maintenance"
        label="Runs before maintenance"
        type="number"
        className={classes.textField}
        value={this.state.runsBeforeMaintenance}
        onChange={this.handleChange('runsBeforeMaintenance')}
        margin="normal"
        />
      <TextField
          id="seats"
          label="Number of seats"
          type="number"
          className={classes.textField}
          value={this.state.numSeats}
          onChange={this.handleChange('numSeats')}
          margin="normal"
      />
      </div>
      <Button
        disabled={!(this.state.name.length > 1)}
        onClick={() => this.createRide()}
      >
        Submit
      </Button>
      </React.Fragment>
    )
  }
}

CreateRide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateRide);