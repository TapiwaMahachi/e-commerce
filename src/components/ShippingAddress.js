import React from 'react'
import { TextField, Grid 
        ,FormControlLabel,Checkbox,
   } from '@material-ui/core';

 const fields =[
     { name :"name", label : 'firstName', autoComplete: 'given-name', autoFocus: true, },
     { name: "lastName", label: 'LastName', autoComplete: 'family-name', autoFocus: false, },
     { name: "addressLine1", label: 'address line 1', autoComplete: 'shipping address line 1', autoFocus: false, },
     { name: "addressLine2", label: 'address line 2', autoComplete: 'shipping address line 2', autoFocus: false, },
     { name: "city", label: 'city', autoComplete: 'shipping addressLevel2', autoFocus: false, },
     { name: "state", label: 'state / province', autoComplete: 'shipping state', autoFocus: false, },
     { name: "zip", label: 'zip code ', autoComplete: 'shipping code', autoFocus: false, },
     { name: "country", label: 'country', autoComplete: 'shipping country', autoFocus: false, },
 ]
 

function ShippingAddress() {
   
    return (
        <div className="shipping">
            <h2 className="shipping__title">Shipping Address</h2>
            <form className="shipping__form">
                <Grid container spacing={3} >
                    {fields.map( field =>
                     <Grid item small={12} xs={6} key={field.name}>
                        <TextField
                            key ={field.name}
                            name={field.name}
                            variant="outlined"
                            label={field.label}
                            autoComplete={field.autoComplete}
                            required
                            autoFocus={field.autoFocus}
                            fullWidth
                            inputProps={{style:{fontSize:'15px'}}}
                        />
                     </Grid>
                    )}  
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                            label="Use this address for payment details"
                        />
                    </Grid> 
                </Grid>
               
            </form>
        </div>
    )
}

export default ShippingAddress
