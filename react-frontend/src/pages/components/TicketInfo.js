import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const TealTheme = createMuiTheme({
    palette: {
      primary: {main: purple[900]},
    },
    overrides: {
        MuiPickersDay: {
          day: {
            color: purple[900],
          },
          isSelected: {
            backgroundColor: purple["900"],
          },
          current: {
            color: purple["900"],
          },
        },
        MuiPickersModal: {
          dialogAction: {
            color: purple["900"],
          },
        },
      },
});

function TicketInfo(props) {
    var minimum=new Date();
    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
            Ticket Info
            </Typography>
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
            <form>
                <TextField
                        required
                        value={props.val.numTickets}
                        onChange={e => props.handleChange('numTickets', e.target.value)}
                        label="Number of Tickets"
                        type="number"
                        helperText="Tickets are $35.00 each"
                        margin="dense"
                        variant="outlined"
                        style={{marginTop: '16px'}}
                        inputProps={{ maxLength: 35}}
                />
                <br/>
                <MuiThemeProvider theme={TealTheme}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                        <DatePicker
                            required
                            minDate={minimum}
                            label="Park Entry Date"
                            value={props.val.entryDate}
                            onChange={e => props.handleChangedate("entryDate", e)}
                            style={{marginTop: '14px'}}
                        />
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
                {props.handleRainOut}
                <br/>
                <TextField
                        required
                        value={props.val.email}
                        onChange={e => props.handleChange('email', e.target.value)}
                        label="Email Address"
                        margin="dense"
                        variant="outlined"
                        style={{marginTop: '22px'}}
                />
            </form>
            </div>      
        </React.Fragment>
    );
    
}

export default TicketInfo;