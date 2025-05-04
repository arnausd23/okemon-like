
import React, { useEffect, useRef, useState } from "react";
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
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const terrain: TerrainSprite = getTerrainById(type);
  
  // Load the sprite image
  useEffect(() => {
    const img = new Image();
    img.src = terrain.src;
    img.onload = () => {
      imageRef.current = img;
      renderFrame();
    };
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [terrain.src]);

  // Animation loop - only runs if frameRate is defined and frames length > 1
  useEffect(() => {
    if (!terrain.frameRate || terrain.frames.length <= 1) return;

    const fps = terrain.frameRate;
    const frameInterval = 1000 / fps;

    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current || timestamp - lastFrameTimeRef.current >= frameInterval) {
        lastFrameTimeRef.current = timestamp;
        setCurrentFrame((prev) => (prev + 1) % terrain.frames.length);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [terrain]);

  // Render the current frame
  useEffect(() => {
    renderFrame();
  }, [currentFrame]);

  const renderFrame = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;

    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = terrain.frames[currentFrame];
    if (!frame) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the sprite frame
    ctx.drawImage(
      img,
      frame.x,
      frame.y,
      frame.width,
      frame.height,
      0,
      0,
      tileSize,
      tileSize
    );
  };
  
  return (
    <canvas
      ref={canvasRef}
      width={tileSize}
      height={tileSize}
      className="absolute pixel-art"
      style={{
        left: x * tileSize,
        top: y * tileSize,
        zIndex: 1 // Lower z-index than character
      }}
    />
  );
};

export default TerrainTile;
