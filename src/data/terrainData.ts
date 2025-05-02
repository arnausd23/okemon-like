
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
    src: "/lovable-uploads/e2f81feb-01b8-4e86-9ea2-016d1d35e55e.png",
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
    src: "/lovable-uploads/8b4edc24-e884-43b9-adb4-95e11e5ccdb7.png",
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
