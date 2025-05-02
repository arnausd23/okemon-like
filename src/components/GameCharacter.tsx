
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
      // Position the character directly on the tile, not above it
      containerRef.current.style.transform = `translate(${position.x * tileSize}px, ${position.y * tileSize}px)`;
    }
  }, [position, tileSize]);

  // Using a higher z-index to ensure character is above terrain
  return (
    <div 
      ref={containerRef}
      className="absolute transition-transform duration-300"
      style={{
        zIndex: 20, // Higher z-index than terrain tiles
        willChange: "transform"
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
