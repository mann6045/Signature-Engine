import React, { useRef } from 'react';
import Draggable from 'react-draggable';

const DraggableField = ({ field, onUpdate }) => {
  const nodeRef = useRef(null);

  const handleStop = (e, data) => {
    const container = document.getElementById('pdf-container');
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();

    // Map pixels to percentages for the backend engine
    const leftPct = (data.x / width) * 100;
    const topPct = (data.y / height) * 100;

    onUpdate({ leftPct, topPct });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      onStop={handleStop}
      defaultPosition={{ x: 0, y: 0 }}
    >
      <div
        ref={nodeRef}
        style={{
          position: 'absolute',
          top: `${field.topPct}%`,
          left: `${field.leftPct}%`,
          width: '150px',
          height: '50px',
          border: '2px solid #2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          color: '#2563eb',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'move',
          zIndex: 100,
          borderRadius: '4px'
        }}
      >
        SIGNATURE
      </div>
    </Draggable>
  );
};

export default DraggableField;