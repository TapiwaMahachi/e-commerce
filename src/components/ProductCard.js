import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: 272,
        height: 420,
        margin: '.5em',
        padding: '.6em',
        border:'1px solid #F6F3EB',
        borderRadius: '5px',
        boxShadow: 'unset !important',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    media: {
        height: 170,
        width: '100%',
        objectFit: 'contain',
    },
    txt:{
        textOverflow:'ellipsis',
        WebkitLineClamp: '3',
        overflow: 'hidden',
        maxHeight: 81,
        color:'#0F1111',
    },
    btn:{
        background: 'white',
    },
});

export default function ProductCard({product,id}) {
    const classes = useStyles();
    const history =useHistory();


    return (
        <Card className={classes.root} >
            <CardActionArea className={classes.btn} onClick={() => history.push(`/product_description/${id}`)}>
                <CardMedia
                    component="img"
                    className={classes.media}
                    image={product.image}
                    title="product image"
                />
                <CardContent>
                    <Typography className={classes.txt} gutterBottom variant="subtitle1" component="h2" color="primary">
                       {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`sold by ${product.seller}`}
                    </Typography>
                     <Rating name="read-only" value={product.rating} readOnly />
                    <Typography variant="body2" color="textSecondary" component="p">
                        <b>{`R ${product.price}`}</b> 
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button className={classes.btn} size="small" color="primary" onClick={() => history.push(`/product_description/${id}`)}>
                   detail description
                </Button>
            </CardActions>
        </Card>
    );
}