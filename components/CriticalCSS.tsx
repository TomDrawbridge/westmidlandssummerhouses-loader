import React from 'react';

const CriticalCSS: React.FC = () => {
  return (
    <style jsx global>{`
      /* Critical styles to prevent FOUC */
      
      /* Base layout styles */
      * {
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      
      /* YouTube component critical styles */
      .youtube-container {
        position: relative;
        background-color: #000;
        border-radius: 8px;
        overflow: hidden;
        display: block;
      }
      
      .youtube-container .play-button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 68px;
        height: 48px;
        background-color: rgba(255, 0, 0, 0.8);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        cursor: pointer;
      }
      
      /* Video component critical styles */
      .video-container {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      
      .optimized-video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
        will-change: auto;
        transform: translateZ(0);
      }
      
      /* Gallery component critical styles */
      .lightgallery {
        display: grid;
        gap: 10px;
      }
      
      .lightgallery .lg-item {
        cursor: pointer;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
      }
      
      /* Vertical slider critical styles */
      .vertical-slider {
        position: relative;
        overflow: hidden;
        width: 100%;
      }
      
      .vertical-slider .slide {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.8s ease-in-out;
      }
      
      .vertical-slider .slide.active {
        opacity: 1;
      }
      
      /* Ant Design critical base styles (if using antd) */
      .ant-btn {
        position: relative;
        display: inline-block;
        font-weight: 400;
        white-space: nowrap;
        text-align: center;
        background-image: none;
        border: 1px solid transparent;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        user-select: none;
        touch-action: manipulation;
        height: 32px;
        padding: 4px 15px;
        font-size: 14px;
        border-radius: 6px;
        color: rgba(0, 0, 0, 0.88);
        background: #fff;
        border-color: #d9d9d9;
      }
      
      .ant-btn:hover {
        color: #4096ff;
        border-color: #4096ff;
      }
      
      .ant-input {
        position: relative;
        display: inline-block;
        width: 100%;
        min-width: 0;
        padding: 4px 11px;
        color: rgba(0, 0, 0, 0.88);
        font-size: 14px;
        line-height: 1.5714285714285714;
        background-color: #fff;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        transition: all 0.2s;
      }
      
      .ant-select {
        position: relative;
        display: inline-block;
        cursor: pointer;
      }
      
      .ant-select-selector {
        position: relative;
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        transition: all 0.2s;
      }
      
      /* Utility classes for common layouts */
      .flex {
        display: flex;
      }
      
      .flex-col {
        flex-direction: column;
      }
      
      .items-center {
        align-items: center;
      }
      
      .justify-center {
        justify-content: center;
      }
      
      .relative {
        position: relative;
      }
      
      .absolute {
        position: absolute;
      }
      
      .w-full {
        width: 100%;
      }
      
      .h-full {
        height: 100%;
      }
      
      /* Loading states */
      .loading {
        opacity: 0.6;
        pointer-events: none;
      }
      
      /* Skeleton loading for components */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% {
          background-position: 200% 0;
        }
        100% {
          background-position: -200% 0;
        }
      }
    `}</style>
  );
};

export default CriticalCSS;
