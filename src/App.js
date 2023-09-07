import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./Component/Header/Header";
import { Listing, Checkout, Prescription } from "./pageListAsync";
import Dashboard from "./Component/Header/Dashboard";

function App({props}) {
  return (
    
    <Dashboard>
     
      
        <Routes>
          <Route path="/app/medicine" Component={Listing} />
          <Route path="/app/cosmetics" Component={Listing} />
          <Route path="/app/optics" Component={Listing} />
          <Route path="/app/oral_hygine" Component={Listing} />
          <Route path="/app/skin_care" Component={Listing} />
          <Route path="/app/hair_nail_care" Component={Listing} />
          <Route path="/app/fragnances" Component={Listing} />
          <Route path="/app/baby_nutrition" Component={Listing} />
          <Route path="/app/baby_bath" Component={Listing} />
          <Route path="/app/baby_essentials" Component={Listing} />
          <Route path="/app/daily_well_being" Component={Listing} />
          <Route path="/app/men_health" Component={Listing} />
          <Route path="/app/women_health" Component={Listing} />
          <Route path="/app/elder_care" Component={Listing} />
          <Route path="/app/homeopethic" Component={Listing} />
          <Route path="/app/organic_health" Component={Listing} />
          <Route path="/app/herbal_care" Component={Listing} />
          <Route path="/app/medical_equipment" Component={Listing} />
          <Route path="/app/supports_braces" Component={Listing} />
          <Route path="/app/cart_detail" Component={Checkout} />
          <Route path="/app/prescription" Component={Prescription} />
          <Route
            path="*"
            Component={() => <Navigate to="/app/medicine" replace />}
          />
        </Routes>
     
      </Dashboard>
    
  );
}

export default App;
