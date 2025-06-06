import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

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

export default Sticker;