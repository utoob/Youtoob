import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class VideoListEntry extends Component {
  render() {
    const { video: { _id, title, description } } = this.props;

    return (
      <li className="video-list-entry">
        <img src="https://placeholdit.co//i/150x150?text=i%20am%20an%20image&bg=b1b1b1" width="75" height="75"/>
        <div className="stuff">
          <Link to={`/videos/${_id}`} className="video-list-entry-title u-color-brand">{title}</Link>
          <small>{description}</small>
        </div>
      </li>
    );
  }
}

export default VideoListEntry