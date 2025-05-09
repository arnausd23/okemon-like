
import React from "react";
import { CharacterSprite, GameConfig, NPC, Position, SpriteAnimation, Tile, TileMap } from "@/types/game";
import TerrainTile from "./TerrainTile";
import GameCharacter from "./GameCharacter";
import GameNPC from "./GameNPC";

interface GameMapProps {
  config: GameConfig;
  tileMap: TileMap;
  characterPosition: Position;
  characterSprite: CharacterSprite;
  characterAnimation: SpriteAnimation;
  npcs: NPC[];
  onNPCEncounter: (npc: NPC) => void;
}

const GameMap: React.FC<GameMapProps> = ({ 
  config, 
  tileMap, 
  characterPosition, 
  characterSprite, 
  characterAnimation,
  npcs,
  onNPCEncounter
}) => {
  const { tileSize, mapWidth, mapHeight, scale } = config;
  
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
        position: 'relative',
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
      
      {/* Render NPCs */}
      {npcs.map((npc) => (
        <GameNPC 
          key={npc.id}
          npc={npc}
          tileSize={tileSize}
          scale={scale}
        />
      ))}
      
      {/* Render character within the map */}
      <GameCharacter
        sprite={characterSprite}
        position={characterPosition}
        animation={characterAnimation}
        scale={scale}
        tileSize={tileSize}
      />
    </div>
  );
};

export default GameMap;
