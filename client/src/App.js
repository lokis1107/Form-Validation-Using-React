import React from "react";
import Home from "./Home";
import { Route, Routes, Link } from "react-router-dom";
import Table from "./Table";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  );
};

export default App;
