import React, { useState, useRef } from 'react';
import { Stage, Layer, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import './App.css';

// Inline Sticker component to avoid import issues
const Sticker = ({ sticker, onDelete, onDragEnd }) => {
  const [image] = useImage(sticker.src);
  
  return (
    <KonvaImage
      key={sticker.id}
      image={image}
      x={sticker.x}
      y={sticker.y}
      width={sticker.width}
      height={sticker.height}
      draggable
      onDragEnd={(e) => {
        // Snap to 40px grid (bonus feature)
        const x = Math.round(e.target.x() / 40) * 40;
        const y = Math.round(e.target.y() / 40) * 40;
        onDragEnd(sticker.id, x, y);
      }}
      onDblClick={() => onDelete(sticker.id)}
      onClick={(e) => {
        // Prevent canvas click when clicking sticker
        e.cancelBubble = true;
      }}
    />
  );
};

// Inline StickerButton component
const StickerButton = ({ stickerType, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="sticker-button"
      title={`Add ${stickerType.name} sticker`}
    >
      {stickerType.name}
    </button>
  );
};

// Inline DownloadButton component
const DownloadButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="download-button">
      <svg className="download-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
        />
      </svg>
      Download Canvas
    </button>
  );
};

// Inline sticker types data
const stickerTypes = [
  {
    id: 'star',
    name: '⭐',
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDhMMzguNjQgMjQuNjRMNTYgMzJMMzguNjQgMzkuMzZMMzIgNTZMMjUuMzYgMzkuMzZMOCAzMkwyNS4zNiAyNC42NEwzMiA4WiIgZmlsbD0iI0ZGRDcwMCIgc3Ryb2tlPSIjRkZBNTAwIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+',
    width: 50,
    height: 50
  },
  {
    id: 'heart',
    name: '❤️',
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMyIDU2TDI3LjIgNTAuNEMxMC44IDM1LjIgMCAyNS42IDAgMTQuNEMwIDYuNCA2LjQgMCAxNC40IDBDMjAuOCAwIDI2LjggMy4yIDMyIDguOEMzNy4yIDMuMiA0My4yIDAgNDkuNiAwQzU3LjYgMCA2NCA2LjQgNjQgMTQuNEM2NCAyNS42IDUzLjIgMzUuMiAzNi44IDUwLjRMMzIgNTZaIiBmaWxsPSIjRkYxNzQ0Ii8+Cjwvc3ZnPg==',
    width: 50,
    height: 50
  },
  {
    id: 'smile',
    name: '😊',
    src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiNGRkQ3MDAiIHN0cm9rZT0iI0ZGQTUwMCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CjxjaXJjbGUgY3g9IjIyIiBjeT0iMjQiIHI9IjQiIGZpbGw9IiMzMzMiLz4KPGNpcmNsZSBjeD0iNDIiIGN5PSIyNCIgcj0iNCIgZmlsbD0iIzMzMyIvPgo8cGF0aCBkPSJNMjAgNDBDMjAgNDAgMjQgNDggMzIgNDhDNDAgNDggNDQgNDAgNDQgNDAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KPC9zdmc+',
    width: 50,
    height: 50
  }
];

function App() {
  const [stickers, setStickers] = useState([]);
  const stageRef = useRef();

  // Add a new sticker to the canvas
  const addSticker = (stickerType) => {
    const newSticker = {
      id: Date.now() + Math.random(),
      ...stickerType,
      x: Math.random() * 200 + 50, // Random position with some padding
      y: Math.random() * 200 + 50
    };
    setStickers([...stickers, newSticker]);
  };

  // Delete a sticker
  const deleteSticker = (id) => {
    setStickers(stickers.filter(sticker => sticker.id !== id));
  };

  // Update sticker position after drag
  const updateStickerPosition = (id, x, y) => {
    setStickers(stickers.map(sticker => 
      sticker.id === id ? { ...sticker, x, y } : sticker
    ));
  };

  // Download canvas as PNG
  const downloadCanvas = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement('a');
    link.download = 'sticker-canvas.png';
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>MyEra Sticker Canvas</h1>
        <p>Click buttons to add stickers, drag to move them, double-click to delete!</p>
        <span className="grid-info">Stickers snap to a 40px grid when dragged</span>
      </header>
      
      <div className="main-content">
        {/* Sticker Buttons */}
        <div className="sticker-buttons">
          <h3>Stickers</h3>
          {stickerTypes.map((stickerType) => (
            <StickerButton
              key={stickerType.id}
              stickerType={stickerType}
              onClick={() => addSticker(stickerType)}
            />
          ))}
        </div>

        {/* Konva Canvas */}
        <div className="canvas-container">
          <Stage 
            width={600} 
            height={400} 
            ref={stageRef}
            className="canvas"
          >
            <Layer>
              {stickers.map((sticker) => (
                <Sticker
                  key={sticker.id}
                  sticker={sticker}
                  onDelete={deleteSticker}
                  onDragEnd={updateStickerPosition}
                />
              ))}
            </Layer>
          </Stage>
          
          {/* Grid overlay visualization */}
          <div className="grid-overlay">
            <svg width="600" height="400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <DownloadButton onClick={downloadCanvas} />

      {/* Instructions */}
      <div className="instructions">
        <p>🎯 Click sticker buttons to add them to canvas</p>
        <p>🖱️ Drag stickers to move them around</p>
        <p>❌ Double-click any sticker to delete it</p>
        <p>📏 Stickers snap to 40px grid when moved</p>
        <p>💾 Use Download to save as PNG</p>
      </div>
    </div>
  );
}

export default App;