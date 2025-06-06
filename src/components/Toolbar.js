import React from 'react';

const Toolbar = ({ stickerTypes, onAddSticker }) => {
  return (
    <div className="toolbar">
      {stickerTypes.map((type) => (
        <button
          key={type.id}
          className="toolbar-button"
          onClick={() => onAddSticker(type)}
        >
          {type.name}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
