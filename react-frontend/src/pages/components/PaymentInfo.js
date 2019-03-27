import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

function PaymentInfo(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" value={props.val.nameOnCard} onChange={e => props.handleChange('nameOnCard', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Card number" type="number" value={props.val.cardNumber} onChange={e => props.handleChange('cardNumber', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" value={props.val.cardExpiration} onChange={e => props.handleChange('cardExpiration', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            type="number"
            value={props.val.cardCVV}
            onChange={e => props.handleChange('cardCVV', e.target.value)}
            helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PaymentInfo;