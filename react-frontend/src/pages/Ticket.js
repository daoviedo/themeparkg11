import React, { Component } from 'react';
import TopBar from './components/TopBar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TicketInfo from './components/TicketInfo';
import PaymentInfo from './components/PaymentInfo';
import Review from './components/Review';
import { Redirect } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3,
      },
    },
    grow: {
      flexGrow: 1,
    },
    stepper: {
      padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
    },
  
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
    },
});
  
const steps = ['Ticket info', 'Payment details', 'Review your order'];

class Ticket extends Component {
    state = {
        activeStep: 0,
        numTickets: "",
        entryDate: null,
        email: "",
        nameOnCard: "",
        cardNumber: "",
        cardExpiration: "",
        cardCVV: "",
        isComplete: false
    };
    getStepContent(step) {
        switch (step) {
            case 0:
                return <TicketInfo handleChange={this.handleChange} val={this.state}/>;
            case 1:
                return <PaymentInfo handleChange={this.handleChange} val={this.state}/>;
            case 2:
                return <Review handleChange={this.handleChange} val={this.state}/>;
            default:
                throw new Error('Unknown step');
        }
    }
    handleChange = (name, value) => {
        this.setState({[name]: value});
    }
    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };
    redirectUser(){
        setTimeout(() =>{
            this.setState({isComplete: true});
        },4000);
        if(this.state.isComplete){
            return <Redirect to={{pathname: '/'}}/>;
        }
    }
    validateInput(step){
        if(step === 0){
            return(this.state.email.length > 1 && this.state.numTickets.length > 1 && this.state.entryDate !== null);
        }
        else if(step === 1){
            return(this.state.nameOnCard.length > 1 && this.state.cardCVV.length > 1 && this.state.cardExpiration.length > 1 && this.state.cardNumber.length > 1);
        }
        else{
            return false;
        }
    }

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;
        console.log(this.validateInput());
        return (
            <React.Fragment>
                <TopBar/>
                <CssBaseline />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">
                        Purchase Tickets
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                            <StepLabel >{label}</StepLabel>
                            </Step>
                        ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom align="center">
                                        Thank you for Purchasing Tickets!
                                    </Typography>
                                    <Typography variant="subtitle1" align="center">
                                        You will be redirected back to the home page.
                                    </Typography>
                                    <div style={{textAlign: 'center'}}>
                                        <CircularProgress/>
                                    </div>
                                    
                                    {this.redirectUser()}
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {this.getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                        <Button onClick={this.handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                        )}
                                        {activeStep === steps.length - 1 ? (<Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                        >Place Order</Button>) : (<Button
                                        variant="contained"
                                        color="primary"
                                        disabled={!this.validateInput(activeStep)}
                                        onClick={this.handleNext}
                                        className={classes.button}
                                        >Next</Button>)}
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

Ticket.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Ticket);