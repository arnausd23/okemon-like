
import { TerrainSprite } from "@/types/game";

export const terrainSprites: TerrainSprite[] = [
  {
    id: "grass",
    name: "Grass",
    src: "/lovable-uploads/c53e139b-49b6-4bb4-92a7-f3c2e5a290f3.png",
    frame: { x: 0, y: 0, width: 32, height: 32 },
    collidable: false
  },
  {
    id: "water",
    name: "Water",
    src: "/lovable-uploads/5af0a10a-05dd-49fa-9807-2353f0a13a9e.png",
    frame: { x: 0, y: 0, width: 32, height: 32 },
    collidable: true
  },
  {
    id: "rock",
    name: "Rock",
    src: "/lovable-uploads/b5cd923f-31c5-4f89-9e33-d624fae71585.png",
    frame: { x: 0, y: 0, width: 32, height: 32 },
    collidable: true
  },
  {
    id: "ground",
    name: "Ground",
    src: "/lovable-uploads/9c37cff2-6351-40bc-8830-61e51700cee6.png",
    frame: { x: 0, y: 0, width: 32, height: 32 },
    collidable: false
  }
];

// Helper function to get terrain by id
export const getTerrainById = (id: string): TerrainSprite => {
  return terrainSprites.find(terrain => terrain.id === id) || terrainSprites[0];
};

// Helper to check if a position is walkable
export const isWalkable = (tileType: string): boolean => {
  const terrain = getTerrainById(tileType);
  return !terrain.collidable;
};
