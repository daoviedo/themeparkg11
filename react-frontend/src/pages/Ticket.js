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
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorIcon from '@material-ui/icons/Error';

import './css/PageStyles.css';

const styles = theme => ({
    layout: {
        paddingTop: '50px',
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
        ticket_ids : [],
        rainout: 0,
        cancelled: false,
    };
    componentDidMount(){
        this.fetchRainout();
    }
    getStepContent(step) {
        switch (step) {
            case 0:
                return <TicketInfo handleChange={this.handleChange} handleChangedate={this.handleChangedate} val={this.state} handleRainOut={this.handleRainOut()}/>;
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
    handleChangedate = (name, value) => {
        let LoadingDate1 = new Date(value);
        LoadingDate1 = LoadingDate1.getFullYear() + '-' + (this.fixMonth(LoadingDate1)) + '-' + LoadingDate1.getDate();
        let nd = new Date();
        nd = nd.getFullYear() + '-' + (this.fixMonth(nd)) + '-' + nd.getDate();

        if(this.state.rainout === 0){
            this.setState({[name]: value});
        }
        else{
            this.setState({[name]: value, cancelled: nd===LoadingDate1});
        }
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
    validateInput(step){
        if(step === 0){
            return(this.state.email.length > 1 && this.state.numTickets > 0 && this.state.entryDate !== null && this.state.cancelled !== true);
        }
        else if(step === 1){
            return(this.state.nameOnCard.length > 1 && this.state.cardCVV.length > 1 && this.state.cardExpiration.length > 1 && this.state.cardNumber.length > 1);
        }
        else{
            return false;
        }
    }
    fetchRainout(){
        fetch(`http://157.230.172.23:4000/rainout`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(result => this.setState({ rainout: result.rainedOut }))
            .catch(err => console.log(err))
    }
    addTickets = () => {
        let LoadingDate = new Date(this.state.entryDate);
        LoadingDate = LoadingDate.getFullYear() + '-' + (this.fixMonth(LoadingDate)) + '-' + LoadingDate.getDate();
        fetch(`http://157.230.172.23:4000/purchase`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            numberOfTickets: this.state.numTickets,
            entryDate: LoadingDate,
            email: this.state.email
        }),
    })
    .then(res => res.json())
    .then(result => this.setState({ ticket_ids: result.results }))
    .then(this.handleNext)
    .catch(err => console.log(err))
    }
    fixMonth(date){
        if(date.getMonth()+1 < 10){
            return "0" + (date.getMonth() +1);
        }
        else{
            return date.getMonth() + 1;
        }
    }

    handleRainOut(){
        if(this.state.rainout === 1){
            if(this.state.cancelled){
                return <Typography color="error"><ErrorIcon/>Park Is Closed for Today Due to Rainout</Typography>
            }
            else{
                return <div/>
            }
        }
        else{
            return <div/>
        }
    }

    render() {
        const { classes } = this.props;
        const { activeStep } = this.state;

        let countval = 1;
        return (
            <header className="header1">
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
                                    <div style={{maxHeight: 330, overflowY: 'auto'}}>
                                        {this.state.ticket_ids.map(({Ticket_ID}) => 
                                        <ListItem className={classes.listItem} key={Ticket_ID}>
                                            <ListItemText primary={"Ticket "+countval++}/>
                                            <Typography variant="body2">Ticket ID: {Ticket_ID}</Typography>
                                        </ListItem>)}
                                    </div>
                                    <Typography variant="subtitle1" align="center">
                                        A copy/receipt has been sent to your email: {this.state.email}
                                    </Typography>
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
                                        onClick={this.addTickets}
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
            </header>
        );
    }
}

Ticket.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Ticket);