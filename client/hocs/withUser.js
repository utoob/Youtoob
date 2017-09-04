import React, { Component } from 'react' 
import getDisplayName from './getDisplayName'

import * as api from '../utils/api'

/* This is a higher order component you use to wrap a component if 
 * you want to have access to the currently logged in user.
 * 
 * Usage:
 * At the very end of the file `export default withUser(MyComponent)`.
 * MyComponent will receive a `user`. See `components/Nav.js`.
 */
const withUser = (WrappedComponent) => {
  class WithUser extends Component {
    constructor(props) {
      super(props)
      this.state = { user: api.retrieveUserState() }
      this.onUserStateChange = (e) => this.setState({ user: e.detail })
    }
    componentDidMount() {
      addEventListener(api.USER_CHANGE_EVENT, this.onUserStateChange)
    }
    componentWillMount() {
      removeEventListener(api.USER_CHANGE_EVENT, this.onUserStateChange)
    }
    render() {
      return (
        <WrappedComponent 
          user={this.state.user}
          {...this.props}  
        />
      )
    }
  }
  WithUser.displayName = `WithUser(${getDisplayName(WrappedComponent)})`
  return WithUser
}

export default withUser