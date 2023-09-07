import { Button, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { update } from "../../redux/cartReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addOrder } from "../../services/order.service";

const CartDetail = () => {
  const prevCart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  let total = 0

  const placeOrder = async () => {
    try {
      if (prevCart?.length <= 0) return toast.error("Your Cart is empty");
      if (!email || email?.trim() == "")
        return toast.error("Please Enter Email");
      if (!name || name?.trim() == "") return toast.error("Please Enter Name");
      if (!phone || phone?.trim() == "")
        return toast.error("Please Enter Phone");
      if (!address || address?.trim() == "")
        return toast.error("Please Enter Address");
      setLoading(true);
      const response = await addOrder(email, phone, address, name, prevCart, total);
      if (response.data.status == 200) {
        toast.success(response.data.message);
        setEmail("");
        setName("");
        setAddress("");
        setPhone("");
        dispatch(update([]));
        navigate("/app/medicine");
        setLoading(false);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
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
    <div
      className="row"
      style={{
        marginTop: "70px",
        width:'100%'
      }}
    >
      <ToastContainer />
      <div className="row justify-content-start">
        <div className="col-sm-12 col-md-6">
          <Typography variant="h5" className="mx-3 my-3" color="black">
            Contact Details
          </Typography>
          <div className="mx-3 mb-4">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mx-3 mb-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="mx-3 mb-4">
            <TextField
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
            />
          </div>
          <div className="mx-3 mb-4">
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <Typography variant="h5" className="mx-3 my-3" >
            Order Details
          </Typography>

          {prevCart?.map((item, index) => {
            total = total + ( (item.discount_price > 0
                          ? item.discount_price
                          : item.price) * (item.quantity))
            return (
              <div className="row mb-3 py-2" key={index}>
                <div className="col-md-3 mx-2">
                  <img
                    src={item.image}
                    style={{ width: "auto", maxHeight: "80px", height: "auto" }}
                  />
                </div>
                <div className="col-md-6 mx-2">
                  <div>
                    Name: <span className="fw-bold">{item.item_name} </span>
                  </div>
                  <div>
                    Pack Size <span className="fw-bold">{item.pack_size} </span>
                  </div>
                  <div>
                    Price:{" "}
                    <span className="fw-bold">
                      {" "}
                      {"Rs " +
                        (item.discount_price > 0
                          ? item.discount_price
                          : item.price)}{" "}
                    </span>
                  </div>
                  <div>
                    Quantity:<span className="fw-bold"> {item.quantity} </span>
                  </div>
                </div>
                <div className="col-md-2 ">
                  <IconButton
                    onClick={() => {
                      let temp = [...prevCart];
                      temp.splice(index, 1);
                      dispatch(update(temp));
                      sessionStorage.setItem("orderItem", JSON.stringify(temp));
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
              </div>
            );
          })}
          <Typography variant="body1"  className="mx-3 my-3 fw-bold" >
            Total:Rs{total}
          </Typography>

        </div>
      </div>
      <div className="row justify-content-start mx-3">
        <Button
          className="col-md-2  my-3"
          variant="contained"
          style={{ minWidth: "fit-content" }}
          disabled={loading}
          onClick={() => placeOrder()}
        >
          Submit Order
        </Button>
      </div>
    </div>
  );
};

export default CartDetail;
