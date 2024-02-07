import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import SingelPokemon from "../Modules/SingelPokemon";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="Full" element={<SingelPokemon />} />
      </Routes>
    </>
  );
};

export default AppRouter;
