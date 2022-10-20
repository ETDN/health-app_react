import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./img/logo.png";
import exit from "./img/exit.png";
import night from "./img/night.png";
import day from "./img/day.png";
import { ThemeContext, themes } from "../ThemeContext";
import { useState } from "react";
import Home from "./Home";
import ReactSwitch from "react-switch";


export default class Navbar extends React.Component {

  render() {
    return (
      <Container>
        <div className="navbar" id={Home.theme}>
          <Link to="/">
            <img className="logo_app" src={logo} />
          </Link>
          <ul>
            <Link to="/logout" style={{ textDecoration: "none" }}>
              <button className="btn btn_logout" title="Logout">
                <img className="logo_logout" src={exit} />
              </button>
            </Link>
            <button
              className="btn btn_switch"
              title="Switch Theme"
              onClick={Home.toggleTheme}
            >
              {this.context.theme === "dark" ? (
                <img className="logo_theme" src={night} />
              ) : (
                <img className="logo_theme" src={day} />
              )}
            </button>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                My Account
              </Link>
            </li>
            {/* <li>
              <Link to="/registration" style={{ textDecoration: "none" }}>
                Documents
              </Link>
            </li> */}
            <li>
              <Link to="/survey" style={{ textDecoration: "none" }}>
                Survey
              </Link>
            </li>
            <li>
              <Link to="/" style={{ textDecoration: "none" }}>
                Home
              </Link>
            </li>
          </ul>
          {/* <div className="switch_mode">
            <h1>yoooo</h1>
            <ReactSwitch onChange={Home.toggleTheme} checked={Home.theme === "dark"} />
          </div> */}
        </div>
      </Container>
    );
  }
}
Navbar.contextType = ThemeContext;

export class NavbarNotLogged extends React.Component {
  render() {
    return (
      <Container>
        <div className="navbar">
          <Link to="/">
            <img className="logo_app" src={logo} />
          </Link>
          <h1 className="app_title">HealthApp Prevention</h1>
          <ul>
          {/* <div className="switch_mode">
            <ReactSwitch className="navbar_toggle_theme" onChange={Home.toggleTheme} checked={Home.theme === "dark"} />
          </div> */}
            <button style={{ marginTop: "8px" }}
              className="btn btn_switch"
              title="Switch Theme"
              onClick={Home.toggleTheme}
            >
              {this.context.theme === "dark" ? (
                <img className="logo_theme" src={night} />
              ) : (
                <img className="logo_theme" src={day} />
              )}
            </button>
          </ul>
        </div>
      </Container>
    );
  }
}
/* Set the contextType to ThemeContext*/
NavbarNotLogged.contextType = ThemeContext;

const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  /* background-color:pink; */


  .navbar {
    height: 50px;
    width: 100%;
    text-decoration: none !important;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .navbar ul li {
    float: right;
    display: inline;
    background-size: cover;
    background-blend-mode: darken;
    text-decoration: none !important;
    margin-top: 13px;
    line-height: 30px;
    padding: 0px 20px;
    background: linear-gradient(currentColor, currentColor) bottom / 0 0.1em
      no-repeat;
    font-size: 1rem;
    font-family: "Lexend Deca";
    font-weight: 800;
    white-space: nowrap;
    -webkit-text-fill-color: #77c5a6;
    text-transform: uppercase;
    transition: 0.5s background-size;
  }

  .navbar ul li:hover {
    background-size: 75% 0.1em;
    color: #444;
    text-transform: uppercase;
  }

  .logo_app {
    padding-left: 10px;
    padding-right: 10px;
    float: left;
    width: 50px;
    margin-top: 13px;
  }
  .logo_logout {
    padding-top: -10px;
    float: left;
    width: 20px;
    height: 20px;
    margin: -4px;
    margin-left: -10px;
    margin-right: -12px;
  }
  .logo_theme {
    padding-top: -5px;
    float: left;
    width: 20px;
    height: 20px;
    margin: -4px;
    margin-left: -10px;
    margin-right: -12px;
  }
  .app_title {
    padding-left: 10px;
    padding-right: 10px;
    float: left;
    margin-below: 20px;
  }

  .ri-linkedin-circle-line {
    animation-delay: 1s;
  }

  .ri-outlook-line {
    animation-delay: 2s;
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-15px);
    }

    100% {
      transform: translateY(0);
    }
  }
`;
