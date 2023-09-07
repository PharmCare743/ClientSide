import React, { Fragment, useState } from "react";
import {
  Typography,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  IconButton,
  Badge,
} from "@mui/material";
import DrawerComp from "./DrawerComponent";
import dataMenu from "../../Constant/menu";
import { NavLink, Link,  } from "react-router-dom";
import ExpandMore from "@mui/icons-material/ExpandMore";
import useStyles from "./header-jss";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";
import { update, updateActive } from "../../redux/menuReducer";
import "../Listings/bg-gradient.css";


const Header = (props) => {
  const [value, setValue] = useState();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const { classes, cx } = useStyles();
  const active = useSelector((state) => state.menu.activeParent);
  const openMenu = useSelector((state) => state.menu.openMenu);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState([]);
  const cart = useSelector((state) => state.cart.value);
 // const navigate = useNavigate();
  const [anchorElCart, setAnchorElCart] = useState(null);
  const dispatch = useDispatch();

  const handleClickCart = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  const handleOpenMenu = (event, key) => {
    if (openMenu.indexOf(key) > -1) {
      dispatch(update([]));
      setAnchorEl(null);
    } else {
      dispatch(update([key]));
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (event) => {
    if (anchorEl?.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
    dispatch(update([]));
  };

  const handleActiveParent = (key) => {
    sessionStorage.setItem("activeParent", JSON.stringify([key]));
    dispatch(updateActive([key]));
    dispatch(update([]));
  };
  const getMenus = (parent, menuArray) =>
    menuArray.map((item, index) => {
      if (item.child.length > 0) {
        return (
          <div key={index.toString()}>
            <Button
              aria-owns={open ? "menu-list-grow" : undefined}
              className={cx(
                classes.headMenu,
                open.indexOf(item.key) > -1 ? classes.opened : "",
                active.indexOf(item.key) > -1
                  ? classes.selected
                  : classes.unselected
              )}
              onClick={(event) => {
                handleOpenMenu(event, item.key);
              }}
            >
              {item.name}
              {item.child?.length > 0 ? (
                <ExpandMore className={classes.rightIcon} />
              ) : (
                <span className={classes.rightIcon}>&nbsp;&nbsp;</span>
              )}
            </Button>
            {item.child?.length > 0 && (
              <Popper
                open={openMenu.indexOf(item.key) > -1}
                anchorEl={anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper className={classes.dropDownMenu}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <List
                          role="menu"
                          component="nav"
                          className={classes.paperMenu}
                        >
                          {getChildMenu(item.child, item.key)}
                        </List>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            )}
          </div>
        );
      }

      return (
        <ListItem
          key={index.toString()}
          button
          exact
          className={cx(
            classes.menuItem,
            classes.headMenu,
            active.indexOf(item.key) > -1
              ? classes.selected
              : classes.unselected
          )}
          activeClassName={classes.active}
          component={LinkBtn}
          to={item.route}
          onClick={() => handleActiveParent(item.key)}
        >
          <ListItemText primary={item.name} />
        </ListItem>
      );
    });
  const getChildMenu = (menuArray, parent) => {
    return (
      <>
        {menuArray.map((item, index) => {
          return (
            <ListItem
              key={index.toString()}
              button
              exact
              className={classes.item}
              activeClassName={classes.active}
              component={LinkBtn}
              to={item.route}
              onClick={(e) => {
                handleActiveParent(parent);
                handleClose(e);
              }}
            >
              <ListItemText className={classes.text} primary={item.name} />
            </ListItem>
          );
        })}
      </>
    );
  };
  const checkout = () => {
    // navigate("app/cart_detail");
    setAnchorElCart(null);
  };

  const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
    // eslint-disable-line

    return <Link to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
  });
  return (
    <Fragment style={{ outerHeight: "fit-content" }}>
      <AppBar>
        <Toolbar style={{ backgroundColor: "#2196F3" }}>
          {mdDown ? (
            <>
              <DrawerComp />
              <div style={{ cursor: "pointer", marginLeft: "auto" }}>
                <IconButton onClick={handleClickCart}>
                  <Badge
                    badgeContent={cart.length > 0 ? cart.length : ""}
                    style={{ color: "#ffffff" }}
                  >
                    <ShoppingCartIcon style={{ color: "#ffffff" }} />
                  </Badge>
                </IconButton>
                <Cart
                  anchorEl={anchorElCart}
                  dataCart={cart}
                  close={handleCloseCart}
                  checkout={checkout}
                  totalPrice={"30"}
                />
              </div>
            </>
          ) : (
            <>
              <IconButton>
                <LocalPharmacyIcon style={{ color: "#ffffff" }} />
              </IconButton>
              {getMenus(null, dataMenu)}
              <div style={{ cursor: "pointer", marginLeft: "auto" }}>
                <IconButton onClick={handleClickCart}>
                  <Badge
                    badgeContent={cart.length > 0 ? cart.length : ""}
                    style={{ color: "#ffffff" }}
                  >
                    <ShoppingCartIcon style={{ color: "#ffffff" }} />
                  </Badge>
                </IconButton>
                <Cart
                  anchorEl={anchorElCart}
                  dataCart={cart}
                  close={handleCloseCart}
                  checkout={checkout}
                  totalPrice={"30"}
                />
              </div>

              {/* <Avatar
                sx={{
                  cursor: "pointer",
                  marginLeft: "auto",
                  backgroundColor: theme.palette.primary.main,
                }}
              /> */}
            </>
          )}
          
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;
