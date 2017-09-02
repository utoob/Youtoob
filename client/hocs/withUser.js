import React, { Component } from 'react' 
import getDisplayName from './getDisplayName'

import * as api from '../utils/api'

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