import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/layout";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </div>
  );
}
