import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { videoThumbnailUrl } from '../utils/api'

const thumbnailStyles = {
  display: 'block',
  minWidth: '180px',
  minHeight: '100px',
  width: '180px',
  height: '100px'
}

class VideoListEntry extends Component {
  render() {
    const { video: { _id, title, description } } = this.props;

    return (
      <li className="video-list-entry">

        <img 
          src={`${videoThumbnailUrl(this.props.video)}`}
          style={thumbnailStyles}
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