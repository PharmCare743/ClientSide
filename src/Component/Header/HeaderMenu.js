import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { Badge } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import MenuIcon from "@mui/icons-material/Menu";
//import SidebarContent from '../Sidebar/SidebarContent';
import DropListMenu from "./DropListMenu";
import MegaMenu from "./MegaMenu";
import useStyles from "./header-jss";
import { useTheme } from "@mui/material/styles";
import DrawerComp from "./DrawerComponent";


const elem = document.documentElement;

function HeaderMenu(props) {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [fixed, setFixed] = useState(false);

  // Initial menu ui
  let flagFixedMenu = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixedMenu = scroll > 64;
    if (flagFixedMenu !== newFlagFixedMenu) {
      setFixed(newFlagFixedMenu);
      flagFixedMenu = newFlagFixedMenu;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const turnMode = (mode) => {
    if (mode === "light") {
      props.changeMode("dark");
    } else {
      props.changeMode("light");
    }
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { dataMenu, history } = props;

  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  
  return (
    <AppBar
      className={cx(
        classes.appBar,
        classes.attachedbar,
        fixed ? classes.fixed : "",
        'px-0'
      )}
    >
      {!mdDown ? (
        <MegaMenu dataMenu={dataMenu} />
      ) : (
        <DrawerComp dataMenu={dataMenu} />
      )}
    
      {/* {!lgUp && (
        <SwipeableDrawer
          onClose={toggleDrawerOpen}
          onOpen={toggleDrawerOpen}
          open={!openMobileNav}
          anchor="left"
        >
          <div className={classes.swipeDrawerPaper}>
            <SidebarContent
              drawerPaper
              leftSidebar
              toggleDrawerOpen={toggleDrawerOpen}
              loadTransition={loadTransition}
              dataMenu={dataMenu}
              status={status}
              anchorEl={anchorEl}
              openMenuStatus={handleOpen}
              closeMenuStatus={handleClose}
              changeStatus={handleChangeStatus}
              isLogin={isLogin}
            />
          </div>
        </SwipeableDrawer>
      )} */}
    </AppBar>
  );
}

HeaderMenu.defaultProps = {
  isLogin: true,
  logoLink: "/",
};

export default HeaderMenu;
