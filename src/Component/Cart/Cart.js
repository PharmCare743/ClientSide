import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useStyles from "./cart-jss";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/cartReducer";

function Cart(props) {
  const { classes } = useStyles();
  const { anchorEl, close, dataCart, checkout } = props;
  const dispatch = useDispatch();
  let total = 0

  const getCartItem = (dataArray) =>
    dataArray.map((item, index) => 
      {
        total = total + ( ( item.discount_price > 0 ? item.discount_price : item.price) * item.quantity)
        return(
      <Fragment key={index.toString()}>
        <ListItem>
          <figure>
            <img src={item.image} alt="thumb" />
          </figure>
          <ListItemText
            primary={item.item_name}
            secondary={`Quantity: ${item.quantity} Item - RS ${
              ( item.discount_price > 0 ? item.discount_price : item.price) * item.quantity
            }`}
            className={classes.itemText}
          />
          <ListItemSecondaryAction>
            <IconButton
              onClick={() => {
                let temp = [...dataCart];
                temp.splice(index, 1);
                dispatch(update(temp));
                sessionStorage.setItem("orderItem", JSON.stringify(temp));
              }}
              size="large"
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <li>
          <Divider />
        </li>
      </Fragment>)}
    );
  return (
    <Menu
      id="cart-menu"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={close}
      className={classes.cartPanel}
    >
      <List
        component="ul"
        subheader={
          <ListSubheader component="div">
            <ShoppingCartIcon />
            Total:&nbsp;
            {dataCart.size}
            &nbsp;Unique items in Cart
          </ListSubheader>
        }
        className={classes.cartWrap}
      >
        {dataCart.length < 1 ? (
          <div className={classes.empty}>
            <Typography variant="subtitle1">Empty Cart</Typography>
            <Typography variant="caption">
              Your shopping items will be listed here
            </Typography>
          </div>
        ) : (
          <Fragment>
            {getCartItem(dataCart)}
            <ListItem className={classes.totalPrice}>
              <Typography variant="subtitle1">
                Total :<span className="fw-bold">Rs{total}</span>
              </Typography>
            </ListItem>
            <li>
              <Divider />
            </li>
            <ListItem>
              <Button
                fullWidth
                className={classes.button}
                variant="contained"
                onClick={() => checkout()}
                color="primary"
              >
                Checkout
              </Button>
            </ListItem>
          </Fragment>
        )}
      </List>
    </Menu>
  );
}

Cart.propTypes = {
  dataCart: PropTypes.array.isRequired,
  anchorEl: PropTypes.object,
  close: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

Cart.defaultProps = {
  anchorEl: null,
};

export default Cart;
