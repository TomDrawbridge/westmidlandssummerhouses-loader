import React, { useEffect, useState } from 'react';
import readingTime from 'reading-time';

const ReadingTime = () => {
  const [readingStats, setReadingStats] = useState(null);

  useEffect(() => {
    const blogContentElement = document.querySelector('.blogcontent');
    if (blogContentElement) {
      const stats = readingTime(blogContentElement.textContent);
      setReadingStats(stats);
    }
  }, []);

  if (!readingStats) {
    return null;
  }

  return (
    <div>
      <p>{readingStats.text}</p>
    </div>
  );
};

export default ReadingTime;
