import React from 'react'

const ProgressBar = ({ progress=0, label }) => {
  return (
    <div className="c-progress mt-1 mb-1">
      <div 
        className="c-progress__bar c-progress__bar--success" 
        style={{width: `${progress}%`}}>
        {label}
      </div>
    </div>
  )
}

export default ProgressBar