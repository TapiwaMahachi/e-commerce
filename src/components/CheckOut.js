import React from 'react'
import { 
  Stepper, Step, 
  StepLabel, Button,
  makeStyles, } from '@material-ui/core';
import {  useHistory } from 'react-router-dom';
import { useState } from 'react';
import '../css/_shipping.scss'
import AddShipping from './AddShipping';
import ViewOrder from './ViewOrder';
import Payment from './Payment';
import  StripePayment  from "./StripePayment";


const steps = ['Shipping Address', 'Your Order','Payment Details',];


function CheckOut() {

  const [activeStep, setActiveStep] = useState(0);
  const history = useHistory();
  

  const update =(step)=>{
    switch(step){
      case 0:
        return <AddShipping/>
      case 1:
        return <ViewOrder />
      case 2:
        return <StripePayment />
      default:
        return "Error"
    }
  };

  return (
    <section className="checkout">
        <div className="checkout__main">
          <div className="checkout__stepper">
            <Stepper activeStep={activeStep} >
              {steps.map(label => (
                <Step key={label} >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}

            </Stepper>
          </div>
          <div className="checkout__bottom">
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
                <div className="checkout__container">
                  {update(activeStep)}
                  <div className="checkout__buttons">
                    {
                      activeStep !== 0 && (
                      <Button onClick={() => setActiveStep(activeStep - 1)} >
                        Back
                      </Button>)
                    }
                    <Button
                      className="next"
                      color='primary'
                      variant='contained'
                      onClick={() => setActiveStep(activeStep + 1)}
                    >
                      {activeStep === steps.length - 1 ? 'Process payment' : 'Next'}
                    </Button>
                  </div>
                </div>
              )
            }
          </div>
        
        </div> 
    </section>
  )
}

export default CheckOut

