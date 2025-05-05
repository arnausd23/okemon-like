
import React from "react";
import { NPC, Position } from "@/types/game";
import SpriteRenderer from "./SpriteRenderer";

interface GameNPCProps {
  npc: NPC;
  tileSize: number;
  scale: number;
}

const GameNPC: React.FC<GameNPCProps> = ({
  npc,
  tileSize,
  scale
}) => {
  // Get detection tiles based on NPC direction
  const getDetectionTiles = (): Position[] => {
    const tiles: Position[] = [];
    const { x, y } = npc.position;
    
    for (let i = 1; i <= npc.detectionRange; i++) {
      switch(npc.direction) {
        case "up":
          tiles.push({ x, y: y - i });
          break;
        case "down":
          tiles.push({ x, y: y + i });
          break;
        case "left":
          tiles.push({ x: x - i, y });
          break;
        case "right":
          tiles.push({ x: x + i, y });
          break;
      }
    }
    
    return tiles;
  };

  const detectionTiles = getDetectionTiles();
  
  return (
    <div className="npc-container">
      {/* Render the NPC character */}
      <div
        className="absolute transition-transform"
        style={{
          transform: `translate(${npc.position.x * tileSize}px, ${npc.position.y * tileSize}px)`,
          zIndex: 10,
        }}
      >
        <SpriteRenderer
          sprite={npc.sprite}
          animation={npc.animation}
          scale={scale}
        />
      </div>
      
      {/* Render detection tiles */}
      {detectionTiles.map((tile, index) => (
        <div
          key={`detection-${npc.id}-${index}`}
          className="absolute bg-red-500/30 border border-red-600/50"
          style={{
            width: tileSize,
            height: tileSize,
            transform: `translate(${tile.x * tileSize}px, ${tile.y * tileSize}px)`,
            zIndex: 5
          }}
        />
      ))}
    </div>
  );
};

export default GameNPC;
