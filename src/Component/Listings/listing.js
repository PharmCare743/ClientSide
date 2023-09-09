import {
  Button,
  Pagination,
  IconButton,
  TextField,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import {
  getAllProductByType,
  getAllProductByTypePaginate,
} from "../../services/product.service";

import { makeStyles } from "tss-react/mui";
import CircularProgress from "@mui/material/CircularProgress";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";

import { update } from "../../redux/cartReducer";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { alphabets } from "../../Constant/constant";
import ProductCard from "./ProductCard";
import "./bg-gradient.css";

const useStyles = makeStyles()(() => ({
  circularProgress: {
    position: "fixed",
    top: "calc(50% - 45px)",
    left: "calc(50% - 45px)",
  },
}));
const Listing = () => {
  const { classes } = useStyles();
  const [pathName, setPathName] = useState("");
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [addToCartModal, setAddToCartModal] = useState(false);
  const [selectItem, setSelectItem] = useState({});
  const [selectQuantity, setSelectQuantity] = useState("1");
  const prevCart = useSelector((state) => state.cart.value);
  const [startWith, setStartWith] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ] != "medicine"
    ) {
      setStartWith("");
    }
    getDataByType(1, "");
  }, [window.location.pathname]);
  const getDataByType = async (page, value) => {
    try {
      setLoading(true);
      let type =
        window.location.pathname.split("/")[
          window.location.pathname.split("/").length - 1
        ];
      const response = await getAllProductByTypePaginate(
        type,
        page,
        "8",
        value
      );
      if (response.data.status == 200) {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setPageNumber(page);
        setLoading(false);
      } else {
        setLoading(false);
        setData([]);
        toast.error(response.data.message);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);
      } else if (err) {
        toast.error(err);
      }
    }
  };

  const handlePaginationChange = async (event, page) => {
    getDataByType(page, startWith);
  };

  const BootstrapDialogTitle = (props) => {
    const { children, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}

        <IconButton
          aria-label="close"
          onClick={() => {
            setAddToCartModal(false);
            setSelectQuantity("1");
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  };

  function isStringified(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return str;
    }
  }

  return (
    <div
      className="row  "
      style={{
        marginTop: "65px",
        display: "flex",
        flex: 1,
      }}
    >
      <ToastContainer />
      {/* Add To Cart */}
      <Dialog
        open={addToCartModal}
        maxWidth="xs"
        fullWidth
        onClose={() => setAddToCartModal(false)}
      >
        <BootstrapDialogTitle>Add To Cart</BootstrapDialogTitle>
        <DialogContent className="pt-2">
          <div className="row justify-content-start">
            <ToastContainer />
            <div className="col-md-12">
              <div className="my-1">
                Name: <span className="fw-bold">{selectItem?.item_name}</span>
              </div>
              <div className="my-1">
                Description:{" "}
                <span className="fw-bold">{selectItem?.description}</span>
              </div>
              <div className="my-1">
                Pack Size:{" "}
                <span className="fw-bold">{selectItem?.pack_size}</span>
              </div>
              <div className="my-1">
                Price:{" "}
                <span className="fw-bold">
                  {(selectItem?.discount_price
                    ? selectItem?.discount_price
                    : selectItem?.item_price) + " Rs"}
                </span>
              </div>
              <div className="my-3">
                <TextField
                  variant="outlined"
                  size="small"
                  label="Quantity"
                  type="number"
                  value={selectQuantity}
                  onChange={(e) => {
                    if (parseInt(e.target.value || "0") >= 0) {
                      setSelectQuantity(e.target.value);
                    }
                  }}
                />
              </div>

              <Button
                variant="contained"
                className="mx-2 my-2"
                onClick={() => {
                  if (parseInt(selectQuantity || "0") <= 0) {
                    return toast.error("Quantity must be greater than 0");
                  }

                  let temp = [];

                  prevCart.forEach((item, index) => {
                    temp[index] = { ...item };
                  });
                  let find = temp.findIndex(
                    (item) => item._id == selectItem?._id
                  );
                  if (find > -1) {
                    temp[find].quantity =
                      temp[find].quantity + parseInt(selectQuantity || "0");
                  } else {
                    temp.push({
                      ...selectItem,
                      item_name: selectItem.item_name,
                      id: selectItem._id,
                      price: parseInt(selectItem.item_price || "0"),
                      discount_price: parseInt(
                        selectItem.discount_price || "0"
                      ),
                      quantity: parseInt(selectQuantity || "0"),
                      image: selectItem.image,
                    });
                  }

                  sessionStorage.setItem("orderItem", JSON.stringify(temp));

                  dispatch(update(temp));
                  setSelectQuantity("1");
                  setSelectItem();
                  setAddToCartModal(false);
                }}
              >
                Continue Shopping
              </Button>
              <Button
                variant="contained"
                className="mx-2 my-2"
                onClick={() => {
                  if (parseInt(selectQuantity || "0") <= 0) {
                    return toast.error("Quantity must be greater than 0");
                  }

                  let temp = [];

                  prevCart.forEach((item, index) => {
                    temp[index] = { ...item };
                  });
                  let find = temp.findIndex(
                    (item) => item._id == selectItem?._id
                  );
                  if (find > -1) {
                    temp[find].quantity =
                      temp[find].quantity + parseInt(selectQuantity || "0");
                  } else {
                    temp.push({
                      ...selectItem,
                      item_name: selectItem.item_name,
                      id: selectItem._id,
                      price: parseInt(selectItem.item_price || "0"),
                      discount_price: parseInt(
                        selectItem.discount_price || "0"
                      ),
                      quantity: parseInt(selectQuantity || "0"),
                      image: selectItem.image,
                    });
                  }

                  sessionStorage.setItem("orderItem", JSON.stringify(temp));

                  dispatch(update(temp));
                  setSelectQuantity("1");
                  setSelectItem();
                  setAddToCartModal(false);
                  navigate("/app/cart_detail");
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ] == "medicine" && (
        <div className="row justify-content-center mt-3 mb-5">
          <Paper className=" col-md-9 text-center" style={{marginLeft:"24px"}}>
            {alphabets.map((item, index) => (
              <IconButton
                key={index}
                className="mx-1"
                style={{
                  cursor: "pointer",
                  backgroundColor: item == startWith ? "#C0C0C0" : "",
                }}
                onClick={() => {
                  if (startWith == item) {
                    setStartWith("");
                    getDataByType(1, "");
                  } else {
                    setStartWith(item);
                    getDataByType(1, item);
                  }
                }}
              >
                {item}
              </IconButton>
            ))}
          </Paper>
        </div>
      )}
      {loading ? (
        <CircularProgress
          className={classes.circularProgress}
          size={100}
          thickness={1}
          color="secondary"
        />
      ) : (
        <Grid container spacing={3} >
          {data.map((item, index) => {
            return (
              <Grid item sm={4} xs={12}>
                <ProductCard
                  discount={item.discount_percentage}
                  thumbnail={item.image}
                  name={item.item_name}
                  desc={item.description}
                  pack_size={item.pack_size}
                  price={
                    item.discount_price ? item.discount_price : item.item_price
                  }
                  prevPrice={ item.discount_price ? item.item_price : ""}
                  itemDetails={item}
                  setSelectItem={setSelectItem}
                  setAddToCartModal={setAddToCartModal}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
      {data?.length > 0 && (
        <div className="d-flex justify-content-center p-2">
          <Pagination
            count={totalPages}
            page={pageNumber}
            variant="outlined"
            color="primary"
            onChange={handlePaginationChange}
          />
        </div>
      )}
    </div>
  );
};

export default Listing;
