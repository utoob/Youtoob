import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import * as api from '../utils/api'
import FormElement from './FormElement'

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', confirmPassword: '', error: null, errors: {} }
    
    this.onSubmit = this.onSubmit.bind(this)
    this.onFormElementChange = this.onFormElementChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const { password, confirmPassword } = this.state
    const passwordDoesNotMatch = password !== confirmPassword

    if (passwordDoesNotMatch) {
      this.setState({ error: 'Password does not match.' })
    } else {
      api.register({
        username: this.state.username,
        password: this.state.password
      }).then(() => {
        this.props.history.push('/')
      }).catch((errors) => {
        this.setState({ errors: errors.response.data })
      })
    }
  }

  onFormElementChange(e) {
    const value = e.target.value
    this.setState({ [e.target.name]: value, error: null, errors: {} })
  }

  render() {
    return (
      <form 
        className="youtoob-form" 
        onSubmit={this.onSubmit}
      >

        <h2>Signup to Youtoob:</h2> 

        <FormElement 
          name="username"
          label="* Username:"
          required
          onChange={this.onFormElementChange}
          defaultValue={this.state.username}
          error={this.state.errors.username}
        />

        <FormElement 
          type="password"
          name="password"
          label="* Password:"
          required
          onChange={this.onFormElementChange}
          defaultValue={this.state.password}
        />

        <FormElement 
          type="password"
          name="confirmPassword"
          label="* Confirm Password:"
          required
          onChange={this.onFormElementChange}
          defaultValue={this.state.confirmPassword}
        />

        <div className="mt-1 mb-1">
          Already have an account? <Link to="/login">Login here.</Link>
        </div>

        {this.state.error && <div className="u-color-error mb-1">{this.state.error}</div>}

        <input 
          type="submit" 
          className="c-button c-button--info" 
          value="Signup" 
        />

      </form>
    )
  }
}

export default withRouter(RegisterForm)