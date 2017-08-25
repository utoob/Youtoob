import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import VideoListEntry from './VideoListEntry'

const videos = [
  {id: 1, title: 'Amazing Spiderman', imageUrl: 'https://resizing.flixster.com/ZAK_gek2-c2qNS1G1eng3j7qqoM=/206x305/v1.bTsxMTE2NzQwNjtqOzE3NDA5OzEyMDA7ODAwOzEyMDA'},
  {id: 2, title: 'Iron Man', imageUrl: 'https://www.sideshowtoy.com/wp-content/uploads/2015/12/marvel-iron-man-mark-xlvi-sixth-scale-captain-america-civil-war-hot-toys-feature-902622.jpg'}
]

class VideoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: videos
    }
  }

  render() {
    return (
      <div className="o-container o-container--large mt-1">
        <ul className="video-list">
          {this.state.videos.map(video => <VideoListEntry key={video.id} video={video}/>)}
        </ul>
      </div>
    )
  }
}

export default VideoList