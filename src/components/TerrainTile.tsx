
import React, { useEffect, useRef } from "react";
import { TerrainSprite } from "@/types/game";
import { getTerrainById } from "@/data/terrainData";

interface TerrainTileProps {
  type: string;
  x: number;
  y: number;
  tileSize: number;
}

const TerrainTile: React.FC<TerrainTileProps> = ({ type, x, y, tileSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terrain: TerrainSprite = getTerrainById(type);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const img = new Image();
    img.src = terrain.src;
    
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        terrain.frame.x,
        terrain.frame.y,
        terrain.frame.width,
        terrain.frame.height,
        0,
        0,
        tileSize,
        tileSize
      );
    };
  }, [terrain, tileSize]);
  
  return (
    <canvas
      ref={canvasRef}
      width={tileSize}
      height={tileSize}
      className="absolute pixel-art"
      style={{
        left: x * tileSize,
        top: y * tileSize,
      }}
    />
  );
};

export default TerrainTile;
