import React from 'react'

const ViewCount = ({ Tag = 'div', className, viewCount, prefix }) => {
  prefix = prefix || 'view'
  prefix += viewCount === 1 ? '' : 's'

  return (
    <Tag className={`view-count ${className}`}>
      <span>{`${viewCount} ${prefix}`}</span>
    </Tag>
  )
}

export default ViewCount