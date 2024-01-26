import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import CardPage from "./components/CardPage";
import FunctionalLandingPage from "./components/FunctionalLandingPage";
import FunctionalCardPage from "./components/FunctionalCardPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />
      <Route
        path="/:title"
        element={<CardPage />}
      />
      {/* <Route
        path="/"
        element={<FunctionalLandingPage />}
      />
      <Route
        path="/:title"
        element={<FunctionalCardPage />}
      /> */}
    </Routes>
  );
}

export default App;
