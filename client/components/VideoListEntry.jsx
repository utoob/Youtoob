import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { videoThumbnailUrl } from '../utils/api'

class VideoListEntry extends Component {
  render() {
    const { video: { _id, title, description } } = this.props;

    return (
      <li className="video-list-entry">

        <img 
          src={`${videoThumbnailUrl(this.props.video)}`}
          width="180" 
          height="100"
        />

        <div className="stuff">
          <Link 
            to={`/videos/${_id}`} 
            className="video-list-entry-title u-color-brand"
          >
            {title}
          </Link>
          
          <small>{description}</small>
        </div>
      </li>
    );
  }
}

export default VideoListEntry