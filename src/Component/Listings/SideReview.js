import React, { Fragment } from "react";
import { lighten, darken } from "@mui/material/styles";
import { makeStyles } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles()((theme) => ({
  listItem: {
    padding: `${theme.spacing(1)} 0`,
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: theme.spacing(2),
  },
  orderSummary: {
    [theme.breakpoints.up("md")]: {
      width: 600,
      margin: "0 auto",
    },
  },
  paper: {
    background:"rgb(239, 248, 248)",
    padding: theme.spacing(2),
    height: 550,
    overflow: "auto",
    "& h6": {
      textAlign: "center",
    },
  },
  thumb: {
    width: 120,
    height: 70,
    marginRight: theme.spacing(2),
    overflow: "hidden",
    borderRadius: '5px',
    "& img": {
      maxWidth: "100%",
    },
  },
  totalPrice: {
    "& h6": {
      textAlign: "right",
      width: "100%",
      "& span": {
        color: theme.palette.primary.main,
        fontSize: 28,
      },
    },
  },
}));

function SideReview() {
  const { classes } = useStyles();
  const prevCart = useSelector((state) => state.cart.value);
  let total = 0
  const getCartItem = (dataArray) =>
    dataArray.map((item, index) => 
    {
      total = total + ( (item.discount_price > 0
        ? item.discount_price
        : item.price) * (item.quantity))
      return(<Fragment key={index.toString()}>
      <ListItem>
        <figure className={classes.thumb}>
          <img src={item.image} alt="thumb" />
        </figure>
        <ListItemText
          primary={item.item_name}
          secondary={`Quantity: ${item.quantity} Item - Rs ${
            item.quantity *
            (item.discount_price > 0 ? item.discount_price : item.price)
          }`}
          className={classes.itemText}
        />
      </ListItem>
      <li>
        <Divider />
      </li>
    </Fragment>)
    }
      
    );
  return (
    <Paper className={classes.paper} elevation={0}>
      <Typography variant="h6" gutterBottom>
        <ShoppingCart />
        &nbsp; Order Summary
      </Typography>
      <List component="ul">
        {getCartItem(prevCart)}
        <ListItem className={classes.totalPrice}>
          <Typography variant="h6">
            Total :&nbsp;
            <span>
              <small>Rs</small>
              <strong className="fw-bold">{total}</strong>
            </span>
          </Typography>
        </ListItem>
      </List>
    </Paper>
  );
}

export default SideReview;
