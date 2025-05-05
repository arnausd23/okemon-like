
import React, { useEffect, useRef } from "react";
import { CharacterSprite, Position, SpriteAnimation } from "@/types/game";
import SpriteRenderer from "./SpriteRenderer";

interface GameCharacterProps {
  sprite: CharacterSprite;
  position: Position;
  animation: SpriteAnimation;
  scale: number;
  tileSize: number;
}

const GameCharacter: React.FC<GameCharacterProps> = ({
  sprite,
  position,
  animation,
  scale,
  tileSize
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Position the character directly on top of the terrain
      const x = position.x * 32;
      const y = position.y * 32;
      const scaleRatio = tileSize / 32;
      
      containerRef.current.style.transform = `translate(${x * scaleRatio}px, ${y * scaleRatio}px)`;
    }
  }, [position, tileSize]);

  return (
    <div 
      ref={containerRef}
      className="absolute transition-transform duration-300"
      style={{
        zIndex: 10, // Higher than the terrain z-index but not too high
        willChange: "transform",
        pointerEvents: "none" // Prevents character from blocking interactions
      }}
    >
      <SpriteRenderer
        sprite={sprite}
        animation={animation}
        scale={scale}
      />
    </div>
  );
};

export default GameCharacter;
