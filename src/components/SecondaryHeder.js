import React from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core';

const SecondaryHeder =() =>{
    const classes = useStyles()
    return (
        <div className={classes.tool}>
            <AppBar className={classes.header} position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to='/'> Afrex</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default SecondaryHeder

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#635463',
        marginBottom: '1em',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        fontSize: '1em',
    },
    tool: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));