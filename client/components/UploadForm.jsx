import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import * as api from '../utils/api'

class UploadForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      percentCompleted: 0,
      title: '',
      description: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.onUploadProgress = this.onUploadProgress.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  onFileChange(e) {
    this.setState({[e.target.name]: e.target.files[0]})
  }

  onUploadProgress(progressEvent) {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    this.setState({ percentCompleted: percentCompleted })
  }

  onSubmit(e) {
    e.preventDefault()
    const videoObject = {
      title: this.state.title,
      description: this.state.description,
      videoFile: this.state.videoFile
    }
    api
      .uploadVideo(videoObject, this.onUploadProgress)
      .then((video) => {
        this.props.history.push(`/videos/${video._id}`)
      })
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
        <div className="o-form-element">
          <label className="c-label" htmlFor="videoFile">Video File:</label>
          <input
            type="file" 
            name="videoFile" 
            className="c-field" 
            onChange={this.onFileChange} />
        </div>
        <br />
        <div className="c-progress">
          <div 
            className="c-progress__bar c-progress__bar--success" 
            style={{width: `${this.state.percentCompleted}%`}}>
            {this.state.percentCompleted}%
          </div>
        </div>
        <br />
        <input type="submit" className="c-button c-button--success" value="Submit" />
      </form>
    )
  }

}

export default UploadForm