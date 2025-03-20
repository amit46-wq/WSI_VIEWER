// components/ZoomView.js
import React, { useRef, useEffect, useState } from 'react';

const ZoomView = ({ zoomLevel, position, detectionResults, onPositionChange }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const image = new Image();
    image.src = './samplewsi.png'; 
    image.onload = () => {
      imageRef.current = image;
      drawZoomView();
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      drawZoomView();
    }
  }, [zoomLevel, position, detectionResults]);

  const drawZoomView = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imageRef.current) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sourceWidth = canvas.width / zoomLevel;
    const sourceHeight = canvas.height / zoomLevel;
    const sourceX = position.x - (sourceWidth / 2);
    const sourceY = position.y - (sourceHeight / 2);

    ctx.drawImage(
      imageRef.current,
      Math.max(0, sourceX),
      Math.max(0, sourceY),
      Math.min(sourceWidth, imageRef.current.width - sourceX),
      Math.min(sourceHeight, imageRef.current.height - sourceY),
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.font = '12px Arial';
    ctx.fillStyle = 'red';

    detectionResults.forEach(result => {
      const [x1, y1, x2, y2, label] = result;
      const boxX = ((x1 - sourceX) * zoomLevel);
      const boxY = ((y1 - sourceY) * zoomLevel);
      const boxWidth = (x2 - x1) * zoomLevel;
      const boxHeight = (y2 - y1) * zoomLevel;

      if (boxX + boxWidth > 0 && boxX < canvas.width && boxY + boxHeight > 0 && boxY < canvas.height) {
        ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
        ctx.fillText(label, boxX, boxY - 5);
      }
    });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = (e.clientX - dragStart.x) / zoomLevel;
    const deltaY = (e.clientY - dragStart.y) / zoomLevel;
    
    onPositionChange({
      x: position.x - deltaX,
      y: position.y - deltaY
    });
    
    setDragStart({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseWheel = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    const newZoom = Math.max(1, Math.min(10, zoomLevel + delta * -0.5));
    onZoomChange(newZoom);
  };

  const onZoomChange = (newZoom) => {
    console.log('New zoom level:', newZoom);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('wheel', handleMouseWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', handleMouseWheel);
    };
  }, [zoomLevel]);

  return (
    <div className="zoom-view" ref={containerRef}>
      <div className="zoom-header">
        <h3>WSI Zoomed IN View</h3>
      </div>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={500} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="zoom-canvas"
      />
      <div className="zoom-controls">
        <button onClick={() => onZoomChange(zoomLevel + 0.5)}>+</button>
        <span>{Math.round(zoomLevel * 100)}%</span>
        <button onClick={() => onZoomChange(Math.max(1, zoomLevel - 0.5))}>-</button>
      </div>
    </div>
  );
};

export default ZoomView;
