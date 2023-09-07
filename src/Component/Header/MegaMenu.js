import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { NavLink, Link, useNavigate  } from "react-router-dom";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { IconButton, Badge } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import useStyles from './header-jss';
import { update, updateActive } from "../../redux/menuReducer";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../Cart/Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line

  return <Link to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
function MegaMenu(props) {
  const { classes, cx } = useStyles();
  const {dataMenu } = props;

  const active = useSelector((state) => state.menu.activeParent);
  const openMenu = useSelector((state) => state.menu.openMenu);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState([]);
  const dispatch = useDispatch();
  const [anchorElCart, setAnchorElCart] = useState(null);
  const cart = useSelector((state) => state.cart.value);
  const navigate = useNavigate()

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
    if (item.child) {
      return (
        <div key={index.toString()}>
          <Button
            aria-owns={open ? "menu-list-grow" : undefined}
            className={cx(
              classes.headMenu,
              open.indexOf(item.key) > -1 ? classes.opened : "",
              active.indexOf(item.key) > -1
                ? classes.selected
                : ""
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
        className={cx(classes.megaItem,active.indexOf(item.key) > -1
              ? classes.selected
              : "")}
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
            className={classes.menuItem}
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
  return (
    <nav className={classes.mainMenu}>
      <div className={classes.megaMenu}>
       {getMenus(null, dataMenu)}
      
        <IconButton onClick={handleClickCart}  style={{marginLeft: "auto", marginRight:'20px'}}>
          <Badge color='primary' badgeContent={cart.length > 0 ? cart.length : ""}>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <Cart
          anchorEl={anchorElCart}
          dataCart={cart}
          close={handleCloseCart}
          checkout={checkout}
          
        />
     
       
      </div>
    </nav>
  );
}



export default MegaMenu;
