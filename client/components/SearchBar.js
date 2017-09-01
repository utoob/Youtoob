import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Icon from './Icon'

class SearchBar extends Component {
  constructor(props) {
    super(props)
    /* Sets the initial state of SearchBar */
    const qs = new URLSearchParams(props.location.search)
    this.state = { query: qs.get('q') }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    const query = e.target.value
    this.setState({ query: query })
  }

  onSubmit(e) {
    e.preventDefault()
    /* Make a client side route transition to videoList passing in the
     * query. (e.g., Redirects to http://localhost:3000/?q=testreactapps)
     */
    const path = this.state.query ? `/?q=${this.state.query}` : '/'
    this.props.history.push(path)
  }

  render() {
    return (
      <form 
        className="c-input-group"
        onSubmit={this.onSubmit}
      >
        <div className="o-field">
          <input 
            className="c-field br2" 
            size="70"
            onChange={this.onChange}
            placeholder="Search here..."
            defaultValue={this.state.query}
          />
        </div>
        <button className="c-button c-button--brand">
          <Icon icon='search' size="1.2em"/>
        </button>
      </form>
    )
  }
}

export default withRouter(SearchBar)