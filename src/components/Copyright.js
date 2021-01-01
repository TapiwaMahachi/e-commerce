import React from 'react'
import {Typography, makeStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    copyright: {
        marginTop: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center',
    },
    link:{
        textDecoration: 'none',
        color: 'inherit',
        margin: '0 .5em',
        '&:hover':{
            color: 'blue',
        }
    }
}));

function Copyright() {
   
        const classes = useStyles();
        return (
        <Typography className={classes.copyright} variant="body2" align="center" color="textSecondary">
                <Link className={classes.link} to="/">
                    <span className="footer__subtitle">Privacy policy</span>
                </Link>
                <Link className={classes.link} to="/">
                    <span className="footer__subtitle">Terms & Conditions</span>
                </Link>
                {'Copyright © '}
                <Link to="/" className={classes.link}>
                    Afrex.com
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
        </Typography>
    );

}

export default Copyright
