// components/HubView.js
import React, { useRef, useEffect } from 'react';
import { patient_info } from '../data';

const HubView = ({ position, zoomLevel, viewportSize, onPositionChange }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const hubSize = { width: 200, height: 200 };
  
  useEffect(() => {
    const image = new Image();
    image.src = './samplewsi.png'; 
    image.onload = () => {
      imageRef.current = image;
      drawHubView();
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      drawHubView();
    }
  }, [position, zoomLevel, viewportSize]);

  const drawHubView = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the whole slide image
    ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

    // Draw the viewport rectangle
    const viewportWidth = viewportSize.width / zoomLevel;
    const viewportHeight = viewportSize.height / zoomLevel;
    
    // Scale the viewport rectangle to fit the hub view
    const scaleX = canvas.width / imageRef.current.width;
    const scaleY = canvas.height / imageRef.current.height;
    
    const rectX = position.x * scaleX;
    const rectY = position.y * scaleY;
    const rectWidth = viewportWidth * scaleX;
    const rectHeight = viewportHeight * scaleY;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);
  };

  const handleHubClick = (e) => {
    if (!containerRef.current || !imageRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Convert click coordinates to image coordinates
    const imageX = (x / hubSize.width) * imageRef.current.width;
    const imageY = (y / hubSize.height) * imageRef.current.height;
    
    // Update position based on click
    onPositionChange({ x: imageX, y: imageY });
  };

  return (
    <div className="hub-view" ref={containerRef}>
      <div className="hub-header">
        <h3>WSI Zoomed out View (Hub)</h3>
      </div>
      <canvas 
        ref={canvasRef} 
        width={hubSize.width} 
        height={hubSize.height} 
        onClick={handleHubClick}
        className="hub-canvas"
      />
      <div className="patient-info">
        <div className="info-item">
          <label>Patient ID:</label>
          <span>{patient_info.id}</span>
        </div>
        <div className="info-item">
          <label>Sample Type:</label>
          <span>{patient_info.sample_type}</span>
        </div>
      </div>
    </div>
  );
};

export default HubView;