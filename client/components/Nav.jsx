import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

class Nav extends Component {
  render() {
    return (
      <nav className='app-nav'>
        <div className='app-nav-left'>
          <Link to='/' className="u-color-brand logo">
            <Icon icon='post-youtube' size="2em" />
            <span>Youtoob</span>
          </Link>
          <div className="c-input-group">
            <div className="o-field">
              <input className="c-field br2" size="70"/>
            </div>
            <button className="c-button c-button--brand br2">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Icon icon='search' size="1.2em"/>
            </button>
          </div>
        </div>
        <ul className='app-nav-list'>
          <li><Link to='/videos/new' className="u-color-brand"><Icon icon="file-upload" size="1.5em" /></Link></li>
          <li><Link to='/me' className="c-button c-button--info u-xsmall">Sign in</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Nav