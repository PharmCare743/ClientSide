import React, { useState, useEffect } from "react";

import useStyles from "./appStyles-jss";
import { useMediaQuery } from "@mui/material";
import DropMenuLayout from "./DropMenuLayout";

function Dashboard(props) {
  const { classes, cx } = useStyles();
  const [appHeight, setAppHeight] = useState(0);
  // const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
   
    // Adjust min height
    setAppHeight(window.innerHeight + 112);

    // Set expanded sidebar menu
  }, []);

  const {
    children,
    history
    
  } = props;

  const titleException = [
    "/app",
    "/app/crm-dashboard",
    "/app/crypto-dashboard",
  ];

  

  return (
    <div
      style={{ minHeight: appHeight }}
      className={cx(classes.appFrameInner, classes.topNav, "light-mode")}
    >
   
      <DropMenuLayout history={history} >
        {children}
      </DropMenuLayout>
    </div>
  );
}

export default Dashboard;
