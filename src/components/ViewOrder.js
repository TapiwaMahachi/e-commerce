import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {useStateValue} from '../StateProvider';

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

const Product = ({product}) =>{
    return(
    
        <div className= "checkout__productContainer">
            <img className="checkout__productImg" src={product.image} alt=''/> 
            <div className='checkout__productCost'> 
                <span className="checkout__productTitle">{product.title}</span>
                <span className="cost">{product.price}</span>
            </div>
        </div>
    )
}
function ViewOrder() {

    const [{basket}] = useStateValue();

    const classes = useStyles();
    return (
        <React.Fragment>
            <h2 className="viewOrder__title"> Order summary</h2>  
            <Grid container spacing={2}>
                {basket.map(product =>
                <Grid item xs={12}>
                   <Product product={product} key={product.id} />
                </Grid>
                )}
            </Grid>
           
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom className={classes.title}>
                        Shipping
                    </Typography>
                    <Typography gutterBottom>John Smith</Typography>
                    <Typography gutterBottom>{addresses.join(', ')}</Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ViewOrder
