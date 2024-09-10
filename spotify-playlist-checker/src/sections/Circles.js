import React, { useEffect, useState } from 'react';
import './sections.css'; 

const generateRandomCircles = (num) => {
  const circles = [];
  for (let i = 0; i < num; i++) {
    const size = Math.random(0,2) * 130 + 20; 
    const top = Math.random() * 100; 
    const left = Math.random() * 100; 

    circles.push({
      id: i,
      size: `${size}px`,
      top: `${top}%`,
      left: `${left}%`,
    });
  }
  return circles;
};

const BackgroundWithCircles = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const newCircles = generateRandomCircles(10); 
    setCircles(newCircles);
  }, []);

  return (
    <div className="circles-container">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="circle"
          style={{
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left,
          }}
        ></div>
      ))}
    </div>
  );
};

export default BackgroundWithCircles;