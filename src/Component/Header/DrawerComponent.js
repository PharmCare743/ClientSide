import {
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Paper,
  Grow,
  Popper,
  Button,
  Badge
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import ExpandMore from "@mui/icons-material/ExpandMore";
import useStyles from "./header-jss";
import MenuIcon from "@mui/icons-material/Menu";
import { update, updateActive } from "../../redux/menuReducer";
import { useSelector, useDispatch } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "../Cart/Cart";



const DrawerComp = ({dataMenu}) => {
  const dispatch = useDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { classes, cx } = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState([]);
  const active = useSelector((state) => state.menu.activeParent);
  const openMenu = useSelector((state) => state.menu.openMenu);
  const [anchorElCart, setAnchorElCart] = useState(null);
  const cart = useSelector((state) => state.cart.value);
  const navigate = useNavigate();

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

  const handleClickCart = (event) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorElCart(null);
  };
  const checkout = () => {
    navigate("app/cart_detail");
    setAnchorElCart(null);
  };

  const handleActiveParent = (key) => {
    sessionStorage.setItem("activeParent", JSON.stringify([key]));
    dispatch(updateActive([key]));
    dispatch(update([]));
  };
  const getMenus = (parent, menuArray) =>
    menuArray.map((item, index) => {
      if (item.child) {
        return (
          <div key={index.toString()}>
            <Button
              aria-owns={open ? "menu-list-grow" : undefined}
              className={cx(
                classes.headMenu,
                open.indexOf(item.key) > -1 ? classes.opened : "",
                active.indexOf(item.key) > -1 ? classes.selected : ""
              )}
              onClick={(event) => {
                handleOpenMenu(event, item.key);
              }}
            >
              {item.name}
              {item ? (
                <ExpandMore className={classes.rightIcon} />
              ) : (
                <span className={classes.rightIcon}>&nbsp;&nbsp;</span>
              )}
            </Button>
            {item.child && openMenu.indexOf(item.key) > -1 && (
              <ClickAwayListener onClickAway={handleClose}>
                <List role="menu" component="nav" className={classes.paperMenu}>
                  {/* {getMenus(item.key, item.child)} */}
                  {getChildMenu(item.child, item.key)}
                </List>
              </ClickAwayListener>
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
            active.indexOf(item.key) > -1 ? classes.selected : ""
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
  const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
    // eslint-disable-line

    return <Link to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
  });

  return (
    <nav className={classes.mainMenuDrawer}>
      <Drawer classes={{
          paper: classes.drawerPaper,
          
        }}  open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List >{getMenus(null, dataMenu)}</List>
      </Drawer>
      <div className="d-flex justify-content-center">
       <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ color:(theme=>theme.palette.primary.main),marginLeft: "20px", marginRight:'auto'}}
      >
        <MenuIcon />
      </IconButton>

      <IconButton onClick={handleClickCart}  style={{marginLeft: "auto", marginRight:'20px'}}>
          <Badge color='primary' badgeContent={cart.length > 0 ? cart.length : ""}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        </div>
        <Cart
          anchorEl={anchorElCart}
          dataCart={cart}
          close={handleCloseCart}
          checkout={checkout}
          
        />
    </nav>
  );
};

export default DrawerComp;
