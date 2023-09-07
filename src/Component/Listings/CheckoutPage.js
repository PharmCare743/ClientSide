import React, { useState, Fragment } from "react";
import { makeStyles } from "tss-react/mui";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../redux/cartReducer";
import SideReview from "./SideReview";
import AddressForm from "./AddressForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addOrder } from "../../services/order.service";

const useStyles = makeStyles()((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    
    marginTop:'70px',
    
    
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
  },
  stepper: {
    padding: `${theme.spacing(3)} 0 ${theme.spacing(5)}`,
  },
  finishMessage: {
    textAlign: "center",
    maxWidth: 600,
    margin: "0 auto",
    "& h4": {
      color: theme.palette.primary.main,
      "& span": {
        textAlign: "center",
        display: "block",
        "& i": {
          fontSize: 120,
        },
      },
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "start",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

function Checkout() {
  

  const { classes } = useStyles();
  const [loading,setLoading] = useState(false)
  const [placeOrderFlag,setPlaceOrderFlag] = useState(false)
  const prevCart = useSelector((state) => state.cart.value);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const placeOrder = async (email,name,phone,address) => {
    try {
      
      if (prevCart?.length <= 0)  throw "Your Cart is empty";
      
      if (!name || name?.trim() == "") throw "Please Enter Name";
      if (!email || email?.trim() == "")
        throw "Please Enter Email"
      if (!phone || phone?.trim() == "")
        throw "Please Enter Phone";
      if (!address || address?.trim() == "")
        throw "Please Enter Address";
      setLoading(true);
      let total = prevCart.reduce(function(a, b){
        return a + ( (b.discount_price > 0
          ? b.discount_price
          : b.price) * (b.quantity));
      },0);
      const response = await addOrder(email, phone, address, name, prevCart, total);
      if (response.data.status == 200) {
        toast.success(response.data.message);
        // setEmail("");
        // setName("");
        // setAddress("");
        // setPhone("");
        dispatch(update([]));
        navigate("/app/medicine");
        setLoading(false);
        setPlaceOrderFlag(false)
      } else {
        toast.error(response.data.message);
        setLoading(false);
        setPlaceOrderFlag(false)
      }
    } catch (err) {
      setLoading(false);
      setPlaceOrderFlag(false)
      if (err.response) {
        toast.error(err.response.data.message?.toString());
      } else if (err.message) {
        toast.error(err.message);
      } else if (err) {
        toast.error(err);
      }
    }
  };

  return (
    <Fragment >
      <CssBaseline />
      <ToastContainer/>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Fragment>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <AddressForm placeOrder={placeOrder} loading={loading} placeOrderFlag={placeOrderFlag} />
              </Grid>
              <Grid item xs={12} md={5}>
                <SideReview />
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={loading}
                onClick={()=>setPlaceOrderFlag(true)}
                size="large"
              >
                Place order
              </Button>
            </div>
          </Fragment>
        </Paper>
      </main>
    </Fragment>
  );
}

export default Checkout;
