/** @format */

import React, { useEffect, useRef } from 'react';
import type { JSX } from 'react';

interface GardenRoomPlannerProps {
  className?: string;
  appLink?: string;
}

const GardenRoomPlanner: React.FC<GardenRoomPlannerProps> = ({ 
  className,
  appLink = 'https://gardenroomplanner.com/editor-app/8422220f-797f-4669-9621-a96b64a3a4db/app.html'
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && typeof window !== 'undefined' && window.location.search) {
      iframe.src = appLink + window.location.search;
    }
  }, [appLink]);

  return (
    <div 
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '75vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <style jsx>{`
        iframe {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          border: none;
          overflow: hidden;
        }
      `}</style>
      <iframe 
        ref={iframeRef}
        id="configurator"
        src={appLink}
        title="Garden Room Planner"
        style={{
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
          border: 'none',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default GardenRoomPlanner;
