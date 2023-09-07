import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import useStyles from './cardStyle-jss';
import { useTheme } from '@mui/material/styles';

function ProductCard(props) {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));
  const {
    discount,
    soldout,
    thumbnail,
    name,
    desc,
    pack_size,
    price,
    prevPrice,
    list,
    detailOpen,
    addToCart,
    itemDetails,
    setSelectItem,
    setAddToCartModal
  } = props;

  return (
    <Card className={cx(classes.cardProduct, smUp && list ? classes.cardList : '')}>
      <div className={classes.status}>
        {discount !== '' && (
          <Chip label={'Discount ' + discount + '%'} className={classes.chipDiscount} />
        )}
        {soldout && (
          <Chip label="Sold Out" className={classes.chipSold} />
        )}
      </div>
      <CardMedia
        className={classes.mediaProduct}
        
        
        image={thumbnail}
        title={name}
      />
      <CardContent className={classes.floatingButtonWrap}>
       
          <Tooltip title="Add to cart" placement="top">
            <Fab onClick={()=>{
              setSelectItem(itemDetails)
              setAddToCartModal(true)

            }} size="small" color="primary" aria-label="add" className={classes.buttonAdd}>
              <AddShoppingCart />
            </Fab>
          </Tooltip>
       
        <Typography noWrap gutterBottom variant="h5" className={classes.title} component="h2">
          {name}
        </Typography>
        <Typography component="p" className={classes.desc}>
          {pack_size}
        </Typography>
        <Typography component="p" className={classes.desc}>
          {desc}
        </Typography>
        
      </CardContent>
      <CardActions className={classes.price}>
        <Typography variant="h5">
          <span>
            Rs
            {price}
          </span>
        </Typography>
        {prevPrice > 0 && (
          <Typography variant="caption" component="h5">
            <span style={{textDecoration:"line-through"}}>
              Rs
              {prevPrice}
            </span>
          </Typography>
        )}
        {/* <div className={classes.rightAction}>
          <Button size="small" variant="outlined" color="secondary" onClick={detailOpen}>
            See Detail
          </Button>
          {!soldout && (
            <Tooltip title="Add to cart" placement="top">
              <IconButton
                color="secondary"
                onClick={addToCart}
                className={classes.buttonAddList}
                size="large">
                <AddShoppingCart />
              </IconButton>
            </Tooltip>
          )}
        </div> */}
      </CardActions>
    </Card>
  );
}

ProductCard.propTypes = {
  discount: PropTypes.string,
  soldout: PropTypes.bool,
  thumbnail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  ratting: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  prevPrice: PropTypes.number,
  list: PropTypes.bool,
  detailOpen: PropTypes.func,
  addToCart: PropTypes.func,
};

ProductCard.defaultProps = {
  discount: '',
  soldout: false,
  prevPrice: 0,
  list: false,
  detailOpen: () => (false),
  addToCart: () => (false),
};

export default ProductCard;
