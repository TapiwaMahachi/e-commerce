import React ,{useState, useEffect} from 'react'
import { TextField, Grid,FormControlLabel,Checkbox, Button,} from '@material-ui/core';
import ViewShippingAddress from './ViewShippingAddress';
import {db} from '../firebase';
import {useStateValue} from '../StateProvider';
import {fields} from '../homedata';
import "../css/_shipping.scss";




function AddShipping() {

    //getting the loged in user from the context api 
    const [{user}] = useStateValue();
    
    //state for user addresss
    const [val, setVal] = useState({
        isSet: false,
        addressline1: '',
        addressline2: '',
        city:'',
        state: '',
        zip_code: '',
        country: '',
        name: '',
       
    })

    //getting all the values from the input
    const handleChange = e=>{
        e.preventDefault();
        //getting the actual changed input field using object destructuring assignment
        const {name , value} = e.target;
        /*
        *setting the value using object initializer dynamicaly setting properties
        */
        setVal({ ...val, [name]: value })
    }

     const handleSubmit = e =>{
         e.preventDefault();

        //  if(val.name === null){
        //      setVal({...val, name: `${val.firstname} ${val.lastname}`})
        //  }
         //adding information to database from db base on user id;
          db.collection('users').doc(user.uid)
          .set({...val, isSet: true} , {merge:true});
         //clearing the form
         setVal({
            isSet: true,
            addressline1: '',
            addressline2: '',
            city:'',
            state: '',
            zip_code: '',
            country: '', 
            name:'',
         })
     }
  
     //get user information from the database using the user uid
     useEffect(()=>{
         if(user){
            db.collection('users').doc(user?.uid)
            .get().then(doc =>{
                if(doc.exists)
                    setVal({...val,...doc.data()})
                }
            ).catch(console.log)
        }
     },[user])

     //add the next button
     useEffect(()=>{
        const nextbtn = document.querySelector('.next');
         if(val.isSet)
            nextbtn.classList.add('visible'); 
        
     },[val])
     
     //template for adding shipping for a new user
     const ShippingInput = (
         <div className="shipping">
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
    );

     return <div>{ val.isSet ? <ViewShippingAddress shipping={val}/> : ShippingInput }</div> 
        
 
       
    

}

export default AddShipping

//function to add the shipping input
