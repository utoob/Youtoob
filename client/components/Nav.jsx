import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Icon from './Icon'
import SearchBar from './SearchBar'

class Nav extends Component {
  render() {
    return (
      <nav className='app-nav'>

        <div className='app-nav-left'>
          <Link to='/' className="u-color-brand logo">
            <Icon icon='post-youtube' size="2em" />
            <span>Youtoob</span>
          </Link>
          <SearchBar />
        </div>

        <ul className='app-nav-list'>
          <li>
            <Link 
              to='/videos/new' 
              className="u-color-brand">
              <Icon icon="file-upload" size="1.5em" />
            </Link>
          </li>
          
          <li>
            <Link 
              to='/login' 
              className="c-button c-button--info u-xsmall">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Nav