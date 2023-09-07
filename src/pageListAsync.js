
import React from "react";
import Loading from "./Component/Loading/index";
import loadable from "./Utils/loadable";


export const Listing =loadable(
  () => import("./Component/Listings/listing"),
  {
    fallback: <Loading />,
  }
);

export const Checkout =loadable(
  () => import("./Component/Listings/CheckoutPage"),
  {
    fallback: <Loading />,
  }
);

export const Prescription =loadable(
  () => import("./Component/Listings/prescription"),
  {
    fallback: <Loading />,
  }
);