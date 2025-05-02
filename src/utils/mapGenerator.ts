
import { Tile, TileMap } from "@/types/game";

// Simple procedural map generator
export function generateTileMap(width: number, height: number): TileMap {
  const map: TileMap = [];
  
  // Initialize with grass
  for (let y = 0; y < height; y++) {
    const row: Tile[] = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, type: "grass" });
    }
    map.push(row);
  }
  
  // Create some paths
  for (let x = 0; x < width; x++) {
    if (Math.random() < 0.7) {
      const pathY = Math.floor(Math.random() * height);
      map[pathY][x].type = "ground";
    }
  }
  
  for (let y = 0; y < height; y++) {
    if (Math.random() < 0.7) {
      const pathX = Math.floor(Math.random() * width);
      map[y][pathX].type = "ground";
    }
  }
  
  // Add rocks
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (map[y][x].type === "grass" && Math.random() < 0.08) {
        map[y][x].type = "rock";
      }
    }
  }
  
  // Add water
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (
        map[y][x].type === "grass" && 
        Math.random() < 0.05 &&
        // Avoid water in the center so the character doesn't spawn on water
        (x < width/2 - 5 || x > width/2 + 5 || y < height/2 - 5 || y > height/2 + 5)
      ) {
        map[y][x].type = "water";
        
        // Create small water pools
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nx = x + dx;
            const ny = y + dy;
            if (
              nx >= 0 && nx < width && ny >= 0 && ny < height &&
              map[ny][nx].type === "grass" && Math.random() < 0.7 &&
              // Still avoid center area
              (nx < width/2 - 5 || nx > width/2 + 5 || ny < height/2 - 5 || ny > height/2 + 5)
            ) {
              map[ny][nx].type = "water";
            }
          }
        }
      }
    }
  }
  
  // Make sure the center (player spawn) is always walkable - create a larger walkable area
  const centerX = Math.floor(width / 2);
  const centerY = Math.floor(height / 2);
  
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      const nx = centerX + dx;
      const ny = centerY + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        map[ny][nx].type = "ground";
      }
    }
  }
  
  return map;
}

// Get the tile at a specific position
export function getTileAt(map: TileMap, x: number, y: number): Tile | null {
  if (y >= 0 && y < map.length && x >= 0 && x < map[0].length) {
    return map[y][x];
  }
  return null;
}
