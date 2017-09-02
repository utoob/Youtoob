import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import withUser from '../hocs/withUser'
import Icon from './Icon'
import SearchBar from './SearchBar'
import * as api from '../utils/api'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.renderLogin = this.renderLogin.bind(this)
    this.renderLogout = this.renderLogout.bind(this)
  }
  renderLogin() {
    return (
      <Link 
        to='/login' 
        className="c-button c-button--info u-xsmall">
        Login
      </Link>
    )
  }
  renderLogout() {
    return (
      <a
        onClick={api.logout} 
        className="c-button c-button--error u-xsmall">
        Logout {this.props.user.username}
      </a>
    )
  }
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
            {this[this.props.user ? 'renderLogout' : 'renderLogin']()}
          </li>
        </ul>
      </nav>
    )
  }
}

export default withUser(Nav)