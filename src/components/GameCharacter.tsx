
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
      containerRef.current.style.transform = `translate(${position.x * tileSize}px, ${position.y * tileSize}px)`;
    }
  }, [position, tileSize]);

  return (
    <div 
      ref={containerRef}
      className="absolute transition-transform duration-300"
      style={{
        zIndex: position.y + 10,
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
