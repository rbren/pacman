
import { useState, useEffect } from 'react';

const Pacman = () => {
  const [pacmanPosition, setPacmanPosition] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('right');
  const [gameBoard, setGameBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    const handleKeydown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          setDirection('left');
          break;
        case 'ArrowRight':
          setDirection('right');
          break;
        case 'ArrowUp':
          setDirection('up');
          break;
        case 'ArrowDown':
          setDirection('down');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      switch (direction) {
        case 'left':
          if (pacmanPosition.x > 0) {
            setPacmanPosition((prev) => ({ x: prev.x - 1, y: prev.y }));
          }
          break;
        case 'right':
          if (pacmanPosition.x < 9) {
            setPacmanPosition((prev) => ({ x: prev.x + 1, y: prev.y }));
          }
          break;
        case 'up':
          if (pacmanPosition.y > 0) {
            setPacmanPosition((prev) => ({ x: prev.x, y: prev.y - 1 }));
          }
          break;
        case 'down':
          if (pacmanPosition.y < 9) {
            setPacmanPosition((prev) => ({ x: prev.x, y: prev.y + 1 }));
          }
          break;
        default:
          break;
      }
    }, 100);

    return () => clearInterval(interval);
  }, [direction, pacmanPosition]);

  return (
    <div>
      {gameBoard.map((row, y) =>
        row.map((cell, x) => (
          <div
            key={`${x}-${y}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: cell === 1 ? 'blue' : 'white',
              border: '1px solid black',
              display: 'inline-block',
            }}
          />
        ))
      )}
      <div
        style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          backgroundColor: 'yellow',
          borderRadius: '50%',
          left: `${pacmanPosition.x * 20}px`,
          top: `${pacmanPosition.y * 20}px`,
        }}
      />
    </div>
  );
};

export default Pacman;
