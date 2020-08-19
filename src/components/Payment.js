import React from 'react'
import {
    TextField, Grid
   ,FormControlLabel, Checkbox
} from '@material-ui/core'

function Payment() {
    return (
        <div>
            <div className="payment">
                <h1 className="payment__title">Payment Details</h1>
                <form className="payment__form">
                    <Grid container spacing={3}>
                        <Grid item sml={12} xs={6}>
                            <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" variant='outlined' autoFocus />
                        </Grid>
                        <Grid item sml={12} xs={6}>
                            <TextField
                                required
                                id="cardNumber"
                                label="Card number"
                                fullWidth
                                autoComplete="cc-number"
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item sml={12} xs={6}>
                            <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" variant='outlined' />
                        </Grid>
                        <Grid item sml={12} xs={6}>
                            <TextField
                                required
                                id="cvv"
                                label="CVV"
                                helperText="Last three digits on signature strip"
                                fullWidth
                                autoComplete="cc-csc"
                                variant='outlined'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                                label="Remember credit card details for next time"
                            />
                        </Grid>
                    </Grid>
                    
                </form>
            </div>
        </div>
    )
}

export default Payment
