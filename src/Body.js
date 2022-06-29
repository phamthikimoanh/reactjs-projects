import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import ToDoList from "./pages/toDoList.js";
import styled from "styled-components";

const StyleBody = styled.div`
  padding: 0 3rem;
  width: 80%;
  max-width: 100%;
  position: relative;
  right: 0;
  top: 0;
  margin: 2rem;
`;

export default function Body() {
  return (
    <StyleBody>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="to-do-list" element={<ToDoList />} />\{" "}
      </Routes>
    </StyleBody>
  );
}
