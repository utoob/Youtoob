import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as api from '../utils/api'
import FormElement from './FormElement'

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', confirmPassword: '' }
    
    this.onSubmit = this.onSubmit.bind(this)
    this.onFormElementChange = this.onFormElementChange.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
  }

  onFormElementChange(e) {
    const value = e.target.value
    this.setState({ [e.target.name]: value })
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

        <FormElement 
          type="password"
          name="confirmPassword"
          label="Password:"
          onChange={this.onFormElementChange}
          defaultValue={this.state.confirmPassword}
        />

        <div className="mt-1 mb-1">
          Already have an account? <Link to="/login">Login here.</Link>
        </div>

        <input 
          type="submit" 
          className="c-button c-button--info" 
          value="Signup" 
        />

      </form>
    )
  }
}

export default RegisterForm