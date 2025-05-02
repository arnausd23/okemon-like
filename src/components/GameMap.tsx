
import React from "react";
import { GameConfig } from "@/types/game";

interface Tile {
  x: number;
  y: number;
  type: "grass" | "ground" | "rock" | "water";
}

interface GameMapProps {
  config: GameConfig;
}

const GameMap: React.FC<GameMapProps> = ({ config }) => {
  const { tileSize, mapWidth, mapHeight, scale } = config;
  
  // Generate a simple map with mostly grass and some paths
  const tiles: Tile[] = [];
  
  // Create a basic map layout
  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      // Create a simple path pattern
      let type: Tile["type"] = "grass";
      
      // Create a horizontal path
      if (y === Math.floor(mapHeight / 2)) {
        type = "ground";
      }
      
      // Create a vertical path
      if (x === Math.floor(mapWidth / 2)) {
        type = "ground";
      }
      
      // Add some rocks randomly
      if (type === "grass" && Math.random() < 0.05) {
        type = "rock";
      }
      
      // Add some water spots
      if (type === "grass" && 
          x > mapWidth * 0.7 && 
          y > mapHeight * 0.7 && 
          Math.random() < 0.4) {
        type = "water";
      }
      
      tiles.push({ x, y, type });
    }
  }

  return (
    <div 
      className="relative"
      style={{
        width: mapWidth * tileSize,
        height: mapHeight * tileSize,
      }}
    >
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`absolute ${getTileClass(tile.type)}`}
          style={{
            width: tileSize,
            height: tileSize,
            left: tile.x * tileSize,
            top: tile.y * tileSize,
          }}
        />
      ))}
    </div>
  );
};

function getTileClass(type: Tile["type"]): string {
  switch (type) {
    case "grass":
      return "bg-game-grass";
    case "ground":
      return "bg-game-ground";
    case "rock":
      return "bg-game-rock";
    case "water":
      return "bg-game-water";
    default:
      return "bg-game-grass";
  }
}

export default GameMap;
