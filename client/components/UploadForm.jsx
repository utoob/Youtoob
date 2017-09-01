import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import * as api from '../utils/api'
import FormElement from './FormElement'
import Progress from './Progress'

class UploadForm extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      percentCompleted: 0,
      title: '',
      description: ''
    }

    this.onFormElementChange = this.onFormElementChange.bind(this)
    this.onUploadProgress = this.onUploadProgress.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  /* Generic onChange handler for form inputs.
   * Sets the name of the input as the key in the state.
   * For e.g. <input name="gender" onChange={this.onFormElementChange} />
   *   will set the state to { gender: <whatever value> } upon change.
   */
  onFormElementChange(e) {
    const value = e.target.type === 'file' 
      ? e.target.files[0]
      : e.target.value
    this.setState({ [e.target.name]: value })
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
      <form 
        className="youtoob-form" 
        onSubmit={this.onSubmit}
      >
        <h2>Upload a Video</h2> 

        <FormElement 
          name="title"
          label="Title:"
          onChange={this.onFormElementChange}
          defaultValue={this.state.title}
        />

        <FormElement
          Tag="textarea"
          name="description"
          label="Description:"
          onChange={this.onFormElementChange}
          defaultValue={this.state.description}
        />

        <FormElement 
          type="file"
          name="videoFile"
          label="Video File:"
          onChange={this.onFormElementChange}
        />

        <Progress
          progress={this.state.percentCompleted}
          label={`${this.state.percentCompleted}%`}
        /> 

        <input 
          type="submit" 
          className="c-button c-button--success" 
          value="Submit" 
        />

      </form>
    )
  }

}

export default UploadForm