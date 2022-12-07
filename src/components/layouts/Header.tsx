import React from 'react'
import { Link } from 'react-router-dom'

export default function Header () {
  return(
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/nothing-here'>Nothing Here</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}