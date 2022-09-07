import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import "antd/dist/antd.css";
import "react-owl-carousel2/lib/styles.css";
import "@splidejs/react-splide/css";
// import "imports?jQuery=jquery!owl.carousel";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DefaultLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
