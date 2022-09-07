import React from "react";
import { Route, Routes } from "react-router-dom";
import routers from "../router";
const Main: React.FC = () => {
  return (
    <main id="main">
      <Routes>
        {routers.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </main>
  );
};

export default Main;
