import React from 'react'

const ViewCount = ({ viewCount, prefix }) => {
  prefix = prefix || 'view'
  prefix += viewCount === 1 ? '' : 's'

  return (
    <div className="view-count">
      <span>{`${viewCount} ${prefix}`}</span>
    </div>
  )
}

export default ViewCount