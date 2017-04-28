import React from 'react';
import { Link } from 'react-router';

const NavBar = (props) => {
  return (
    <nav>
      <ul className="my-nav">
        <Link to="/home"> Home </Link>
        <Link to="/heroes"> Heroes </Link>
      </ul>
    </nav>
  )
}

export default NavBar
