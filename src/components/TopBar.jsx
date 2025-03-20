// components/TopBar.js
import React from 'react';

const TopBar = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="top-bar">
      {currentDate}
    </div>
  );
};

export default TopBar;