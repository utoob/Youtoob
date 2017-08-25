import React, { Component } from 'react'

class UploadForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <form className="upload-form" onSubmit={this.onSubmit}>
        <h2>Upload a Video</h2> 
        <div className="o-form-element">
          <label className="c-label" htmlFor="title">Title:</label>
          <input 
            name="title" 
            className="c-field" 
            onChange={this.onInputChange} 
            defaultValue={this.state.title} 
          />
        </div>
        <div className="o-form-element">
          <label className="c-label" htmlFor="description">Description:</label>
          <textarea 
            name="description" 
            className="c-field" 
            onChange={this.onInputChange} 
            defaultValue={this.state.title}>
          </textarea>
        </div>
      </form>
    )
  }

}

export default UploadForm