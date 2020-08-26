import React from 'react'
import { 
  Stepper, Step, 
  StepLabel, Button,
  makeStyles, } from '@material-ui/core';
import {  useHistory } from 'react-router-dom';
import { useState } from 'react';
import './Checkout.css'
import ShippingAddress from './ShippingAddress';
import ViewOrder from './ViewOrder';
import Payment from './Payment';
import Copyright from './Copyright';
import  StripePayment  from "./StripePayment";


const steps = ['Shipping Address', 'Your Order','Payment Details',];


function CheckOut() {

  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();
  const classes = useStyles();

  const update =(step)=>{
    switch(step){
      case 0:
        return <ShippingAddress/>
      case 1:
        return <ViewOrder />
      case 2:
        return <StripePayment />
      default:
        return "Error"
    }
  };

  return (
    <div className="checkout">
        <main className="checkout__main">
          <div className="checkout__stepper">
            <Stepper activeStep={activeStep} >
              {steps.map(label => (
                <Step key={label} >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}

            </Stepper>
          </div>
          <>
            {activeStep === steps.length ? (
              <>
                <p>Order ref#</p>
                <Button
                  className="checkout__homeBtn"
                  onClick={() => history.push('/')}
                >
                  Continue Shopping
                </Button>
              </>
            ) : (
                <>
                  {update(activeStep)}
                  <div className="checkout__buttons">
                    {
                      activeStep !== 0 && (<Button
                        className={classes.btn}
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Back
                      </Button>)
                    }
                    <Button
                      className={classes.btn}
                      color='primary'
                      variant='contained'
                      onClick={() => setActiveStep(activeStep + 1)}
                    >
                      {activeStep === steps.length - 1 ? 'Process payment' : 'Next'}
                    </Button>
                  </div>
                </>
              )
            }
          </>
        
        </main> 
      <Copyright  />
    </div>
  )
}

export default CheckOut

const useStyles = makeStyles((theme)=>({
      btn: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
        fontSize: '15px',
      },

}));

