
import React from "react";
import { GameConfig, Tile, TileMap } from "@/types/game";
import TerrainTile from "./TerrainTile";
import { terrainSprites } from "@/data/terrainData";

interface GameMapProps {
  config: GameConfig;
  tileMap: TileMap;
}

const GameMap: React.FC<GameMapProps> = ({ config, tileMap }) => {
  const { tileSize, mapWidth, mapHeight } = config;
  
  // Flatten the tilemap for rendering
  const flatTiles: Tile[] = [];
  tileMap.forEach(row => {
    row.forEach(tile => {
      flatTiles.push(tile);
    });
  });
  
  return (
    <div 
      className="relative"
      style={{
        width: mapWidth * tileSize,
        height: mapHeight * tileSize,
      }}
    >
      {flatTiles.map((tile, index) => (
        <TerrainTile
          key={index}
          type={tile.type}
          x={tile.x}
          y={tile.y}
          tileSize={tileSize}
        />
      ))}
    </div>
  );
};

export default GameMap;
