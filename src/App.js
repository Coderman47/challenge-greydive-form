import React from "react";
import { Routes, Route } from "react-router-dom";
import SurveysForm from "./Components/SurveysForm";
import Home from "./Components/Home";
import { Stack } from "@chakra-ui/react";

export default function App() {
  return (
    <Stack>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>

      <Routes>
        <Route path="/createSurveys" element={<SurveysForm />}></Route>
      </Routes>
    </Stack>
  );
}