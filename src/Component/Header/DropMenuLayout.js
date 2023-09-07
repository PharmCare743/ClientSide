import React, { Fragment } from "react";
import Fade from "@mui/material/Fade";
import useStyles from "./appStyles-jss";
import Header from "./Header";
import Decoration from "./Decoration";
import HeaderMenu from "./HeaderMenu";
import dataMenu from "../../Constant/menu";

function DropMenuLayout(props) {
  const { classes, cx } = useStyles();
  const { children, pageLoaded, history } = props;

  return (
    <Fragment>
      {/* <Header /> */}
      <HeaderMenu 
        dataMenu={dataMenu}
        history={history}
      />
      <main
        className={cx(classes.content, classes.highMargin)}
        id="mainContent"
      >
        <Decoration
          mode={"light"}
          gradient={true}
          decoration={true}
          bgPosition={"half"}
          horizontalMenu={true}
        />
         <section className={cx(classes.mainWrap, classes.topbarLayout)}>
         
            <div >
              {/* Application content will load here */}
             
              {children}
            </div>
          
         </section>
      </main>
    </Fragment>
  );
}

export default DropMenuLayout;
