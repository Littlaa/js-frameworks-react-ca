import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    </div>
  );
}
