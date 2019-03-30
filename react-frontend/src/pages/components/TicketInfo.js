import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const TealTheme = createMuiTheme({
    palette: {
      primary: {main: teal[600]},
    },
    overrides: {
        MuiPickersDay: {
          day: {
            color: teal[600],
          },
          isSelected: {
            backgroundColor: teal["600"],
          },
          current: {
            color: teal["600"],
          },
        },
        MuiPickersModal: {
          dialogAction: {
            color: teal["600"],
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
                            onChange={e => props.handleChange("entryDate", e)}
                            style={{marginTop: '16px'}}
                        />
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
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