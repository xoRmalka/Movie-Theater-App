import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage/HomePage";
import MovieOrderPage from "./Pages/HomePage/MovieOrderPage/MovieOrderPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie_order/:id" element={<MovieOrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
