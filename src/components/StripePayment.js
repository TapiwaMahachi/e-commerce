import React, {useState} from 'react'
import {CardElement , useStripe, useElements} from '@stripe/react-stripe-js';
import { Button } from '@material-ui/core';
import {makeStyles} from '@material-ui/core'

//styling for the card
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "black",
      fontWeight: 500,
      height: '25px',
      border: '1px solid blue',
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "red",
      color: "red",
    },
  },
};

const useStyles = makeStyles((theme) =>({
    form:{
        margin: '10px',
    },
    btn: {
        marginTop: theme.spacing(3),
        fontSize: '16px',
    }
}))

function StripePayment() {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billing , setBilling] = useState({
        email: '',
        phone: '',
        name: '',
    });


    const handleSubmit = async e =>{
        //prevent default form behaviour
        e.preventDefault();

        if(!stripe || !elements){
            //Stripe.js has not loaded yet. make sure to disable
            //form submissin until stripe.js is loaded
            return;
        }
        if(error){
            elements.getElement('card').focus();
            return;
        }
        if(cardComplete){
            setProcessing(true);
        }
      
        //use cardelemt wiht the stripe.js
        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: billing,
        });
        setProcessing(false);

        if(payload.error){
            setError(payload.error);
        }else {
            setPaymentMethod(payload.paymentMethod);
        }
    };
    //only called when payment is successfull
    const reset = () =>{
        setError(null);
        setProcessing(false);
        setPaymentMethod(null);
        setBilling({
            email: '',
            phone: '',
            name: '',
        });
    };
    const Button = ({ processing, error, children, disabled }) => (
      <button
        className={`Button ${error ? "Button--error" : ""}`}
        type="submit"
        disabled={processing || disabled}
      >
        {processing ? "Processing..." : children}
      </button>
    );
 console.log(stripe)
    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <CardElement
                options={CARD_OPTIONS}
                onChange={(e) =>{
                    setError(e.error);
                    setCardComplete(e.complete);
                }}
            />
            <Button
                processing={processing}
                error={error}  
                disabled={!stripe}
            >
                Pay
            </Button>
        </form>
    )
}

export default StripePayment
