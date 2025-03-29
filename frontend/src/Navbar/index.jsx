// components/Navbar/index.js

import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

const Navbar = () => {
  const currentDate = new Date();
  const startDate = new Date("2025-03-20T011:30:00");

  //const act08DueDate = new Date("2025-03-12T12:20:00") // Set the due date for Homework 2 with hours and minutes
  const DueDate = new Date("2025-03-20T12:20:00"); // Set the due date for Homework 2 with hours and minutes

  const isAvailable =
    currentDate >= startDate && currentDate <= DueDate ? true : false;

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/Home">Home</NavLink>
          <NavLink to="/questions-mc">questions-mc</NavLink>
          <NavLink to="/canvas">canvas</NavLink>
          <NavLink to="/questions-hw">Question-mc2</NavLink>
          {true && <NavLink to="/pset3">Pset 3</NavLink>}
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
