import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as api from '../utils/api'
import FormElement from './FormElement'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', errors: null } 

    this.onSubmit = this.onSubmit.bind(this)
    this.onFormElementChange = this.onFormElementChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    api.login({
      username: this.state.username,
      password: this.state.password
    })
  }

  onFormElementChange(e) {
    const value = e.target.value
    this.setState({ [e.target.name]: value })
  }

  renderError(errors) {
    console.log(errors)
    if (errors) {

    }
  }

  render() {
    return (
      <form 
        className="youtoob-form" 
        onSubmit={this.onSubmit}
      >

        <h2>Login to Youtoob:</h2> 

        <FormElement 
          name="username"
          label="Username:"
          onChange={this.onFormElementChange}
          defaultValue={this.state.username}
        />

        <FormElement 
          type="password"
          name="password"
          label="Password:"
          onChange={this.onFormElementChange}
          defaultValue={this.state.password}
        />

        <div className="mt-1 mb-1">
          Don't have an account? <Link to="/register">Register here.</Link>
        </div>

        <input 
          type="submit" 
          className="c-button c-button--info" 
          value="Login" 
        />

      </form>
    )
  }
}

export default LoginForm