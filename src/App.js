import React from "react";
import Home from "./Components/Home";
import SingleMovies from "./Components/SingleMovies";
import Error from "./Components/Error";
import { Routes, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie/:id" element={<SingleMovies />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
