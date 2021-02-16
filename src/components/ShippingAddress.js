import React from 'react'
import { TextField, Grid 
        ,FormControlLabel,Checkbox, Button,
   } from '@material-ui/core';
import { useState } from 'react';
import "../css/_shipping.scss";
import {db} from '../firebase';
import {useStateValue} from '../StateProvider';
import ViewShippingAddress from './ViewShippingAddress';
import {fields} from '../homedata';
import { useEffect } from 'react';



function ShippingAddress() {

    //getting the loged in user
    const [{user}] = useStateValue();
    console.log('user',user?.uid)
    //state for user addresss
    const [val, setVal] = useState({
        firstname: '',
        lastname: '',
        addressline1: '',
        addressline2: '',
        city:'',
        state: '',
        zip_code: '',
        country: '',
        id: user?.uid //must be associated with the id for signed in user
    })
    //getting all the values from the input
    const handleChange = e=>{
        e.preventDefault();

        //getting the actual changed input field
        const {name , value} = e.target;
        /*
        *setting the value
        */
        setVal({ ...val, [name]:value})
    }
     //adding all the information to database
     const handleSubmit = e =>{
         e.preventDefault();
         //get information from db;
          db.collection('users').add(val);
         //clear the form
         setVal({
            firstname: '',
            lastname: '',
            addressline1: '',
            addressline2: '',
            city:'',
            state: '',
            zip_code: '',
            country: '', 
         })
     }
     //if loged in add the next button
        
     //get user information from the database using the user uid
     useEffect(()=>{
        const unsubscribe = db.collection('users').where('id','==', '')
        .get().then(data =>{
            data.docs.forEach(doc => {
                setVal({...val, ...doc.data()})
            })
        })
         if(user){
            const nextbtn = document.querySelector('.next');
            nextbtn.classList.add('visible'); 
        }
        return ()=> unsubscribe;
     },[user])
     //add the next button
     
     //template for adding shipping for a new user
     const addShipping =(
         <div className="shipping">
            <h2 className="shipping__title">Shipping Address</h2>
            <form className="shipping__form" onSubmit={handleSubmit}>
                <Grid container spacing={3} >
                    {fields.map( field =>
                     <Grid item small={12} xs={6} key={field.name}>
                        <TextField
                            key ={field.name}
                            name={field.name}
                            type="text"
                            value={val[field.name]}
                            onChange={handleChange}
                            variant="outlined"
                            label={field.label}
                            autoComplete={field.autoComplete}
                            required
                            autoFocus={field.autoFocus}
                            fullWidth
                            
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
                <Button  className="save" type="submit"  variant="contained" color="primary">Save</Button>
            </form>
        </div>
     )
    return ( user ? <ViewShippingAddress info={val}/>: addShipping )
       
    

}

export default ShippingAddress
