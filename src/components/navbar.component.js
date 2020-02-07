import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Evalua Profesores</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/class" className="nav-link">Clases</Link>{/*Link HOME to class component*/}
          </li>
          <li className="navbar-item">
            <Link to="/subjects" className="nav-link">Crear materia</Link>
          </li>
          <li className="navbar-item">
            <Link to="/teachers" className="nav-link">Nuevo Profesor</Link>
          </li>
          <li className="navbar-item dropdown">
            <Link to="/toprated" className="nav-link">Top Rated Teachers:</Link>
          </li>
          <li>
            <Link to="/top" className="dropdown-item">Positive</Link>
          </li>
          <li>
            <Link to="/worst" className="dropdown-item">Negative</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}