import React from 'react';

/* If you want to add more Icons to this file,
 * visit `http://dmfrancisco.github.io/react-icons/`,
 * look for icon that you want and paste the `case` code in switch statement.
 */

const Icon = ({ icon, size = 24, style }) => {
  function _mergeStyles(...args) {
    return Object.assign({}, ...args);
  }
  function renderGraphic() {
    switch(icon) {
      case 'post-youtube':
        return (
          <g><path d="M20 2h-16c-1.1 0-1.99.9-1.99 2l-.01 16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2zm-1.49 15.5c-.45.15-3.73.5-6.51.5-2.77 0-6.05-.35-6.5-.5-1.17-.39-1.5-2.8-1.5-5.5s.33-5.11 1.5-5.5c.45-.15 3.73-.5 6.5-.5 2.78 0 6.06.36 6.51.51 1.17.39 1.49 2.79 1.49 5.49s-.32 5.11-1.49 5.5zm-8.51-2l5.5-3.5-5.5-3.5v7z"></path></g>
        );
      case 'file-upload':
        return (
          <g><path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2h-14z"></path></g>
        );
      case 'search':
        return (
          <g><path d="M15.5 14h-.79l-.28-.27c.98-1.14 1.57-2.62 1.57-4.23 0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5 2.91 6.5 6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99 1.49-1.49-4.99-5zm-6 0c-2.49 0-4.5-2.01-4.5-4.5s2.01-4.5 4.5-4.5 4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5z"></path></g>
        );
    }
  }
  
  let styles = {
    fill: "currentcolor",
    verticalAlign: "middle",
    width: size,
    height: size
  };
  return (
    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" 
      style={_mergeStyles(
        styles,
        style
      )}>
        {renderGraphic()}
    </svg>
  );
};

export default Icon;