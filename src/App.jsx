// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { detection_results } from './data';
import Sidebar from './components/Sidebar';
import HubView from './components/HubView';
import ZoomView from './components/ZoomView';
import TopBar from './components/TopBar';

function App() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [detectionResults, setDetectionResults] = useState([]);
  const mainViewRef = useRef(null);

  useEffect(() => {
    // Parse detection results from the data
    if (detection_results && detection_results.length > 0) {
      setDetectionResults(detection_results);
    }
  }, []);

  useEffect(() => {
    if (mainViewRef.current) {
      setViewportSize({
        width: mainViewRef.current.offsetWidth,
        height: mainViewRef.current.offsetHeight
      });
    }
  }, [mainViewRef]);

  const handleZoomChange = (newZoom) => {
    setZoomLevel(newZoom);
  };

  const handlePositionChange = (newPosition) => {
    setPosition(newPosition);
  };

  return (
    <div className="app-container">
      <TopBar />
      <div className="main-content">
        <Sidebar />
        <div className="viewer-container">
          <div className="zoom-view-container" ref={mainViewRef}>
            <ZoomView 
              zoomLevel={zoomLevel} 
              position={position} 
              detectionResults={detectionResults}
              onPositionChange={handlePositionChange}
            />
          </div>
          <div className="hub-view-container">
            <HubView 
              position={position} 
              zoomLevel={zoomLevel} 
              viewportSize={viewportSize}
              onPositionChange={handlePositionChange}
            />
            <div className="report-button-container">
              <button className="report-button">Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;