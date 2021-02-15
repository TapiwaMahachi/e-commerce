import React, { useState} from 'react'
import "./Login.css";
import { auth, uiConfig } from "../firebase";
import { useHistory} from 'react-router-dom';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';



function Login() {

    const history = useHistory();

    const [state, setState] = useState({
      email: '',
      password: '',
      isLogedIn: true,
      isSuccess: false,
      errorMsg: '',
    })
    const {email,password,isLogedIn,isSuccess,errorMsg} = state;
  
    const classes = useStyles();
    
     //register by validating the user email and send a confirmaion email
     const register =  async e =>{
         e.preventDefault();
          await auth.createUserWithEmailAndPassword(email, password)
         .then( auth =>{
           history.push('/login')
           setState({
             ...state, isLogedIn: !isLogedIn ,isSuccess: false,
             email: '', password: '',
           })  
          })//redirect to login page
         .catch(e => setState({
           ...state, isSuccess: true, errorMsg: e.message,
         }));
     }

     const loginView = (
       <form className="login__container" onSubmit={e =>e.preventDefault()} >
         <label className="login__logo">Afrex</label>
         <StyledFirebaseAuth  uiConfig={uiConfig} firebaseAuth={auth} />
         <hr />
         <button 
          className="login__register" 
          onClick={()=>setState({
            ...state, isLogedIn: !isLogedIn,
          })}
         >
           Register
         </button>
       </form>
     );
    const registerView =(
      <form className={classes.root} onSubmit={register} >
        <label className="login__logo">Afrex</label>
        <label className="login__title">Create your Afrex Account</label>
       <label className="login__error">{isSuccess ? errorMsg : ''}</label>
        <TextField
          error ={isSuccess}
          id="filled-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          variant="outlined"
          required
          autoFocus
          value={email}
          onChange={e => setState({
            ...state, email: e.target.value
          })}
        />
        <TextField
          error ={isSuccess}
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          required
          value={password}
          onChange={e => setState({
            ...state, password: e.target.value
          })}
        />
        <label className="login__subtitle">
          Use 8 or more characters with a mix of letters, numbers & symbols
        </label>
        <div className="login__buttons">
          <span 
          type="button" 
          className="login__signin"
          onClick={() => setState({
            ...state, isLogedIn: !isLogedIn, isSuccess: false,
          })}
          >
            Sign in instead
          </span>
          <button className="login__createAccount" type="submit">Create Account</button>
        </div>
      </form>


    );
    return ( 
      <div className="login">
        { isLogedIn ? loginView : registerView } 
      </div>
        )
  
}

export default Login;

//styling for the textfields
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '44ch',
    margin: ' 5em auto',
    background: 'white',
    borderRadius: '4px',
    padding: '1em',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '38ch',
    },
  },
}));