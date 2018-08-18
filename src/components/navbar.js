import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark navbar-expand-md bg-success justify-content-between">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-target=".dual-nav"
          />
          <div className="navbar-collapse dual-nav w-50 order-1 order-md-0">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink to="/profile" className="nav-link">
                  <i className="fa fa-user" />
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink
            to="/suggestedmatches"
            className="navbar-brand mx-auto d-block text-center order-0 order-md-1 w-25"
          >
            Accomplice
          </NavLink>
          <div className="navbar-collapse dual-nav w-50 order-2">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/matches" className="nav-link">
                  <i className="fa fa-comment" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
