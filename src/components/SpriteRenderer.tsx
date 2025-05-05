
import React, { useEffect, useRef, useState } from "react";
import { CharacterSprite, SpriteAnimation } from "@/types/game";

interface SpriteRendererProps {
  sprite: CharacterSprite;
  animation: SpriteAnimation;
  scale: number;
  isPlaying?: boolean;
}

const SpriteRenderer: React.FC<SpriteRendererProps> = ({
  sprite,
  animation,
  scale,
  isPlaying = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);

  // Load the sprite image
  useEffect(() => {
    const img = new Image();
    img.src = sprite.src;
    img.onload = () => {
      imageRef.current = img;
      renderFrame();
    };

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [sprite.src]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying || animation.frames.length <= 1) return;

    const fps = animation.frameRate;
    const frameInterval = 1000 / fps;

    const animate = (timestamp: number) => {
      if (!lastFrameTimeRef.current || timestamp - lastFrameTimeRef.current >= frameInterval) {
        lastFrameTimeRef.current = timestamp;
        setCurrentFrame((prev) => (prev + 1) % animation.frames.length);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animation, isPlaying]);

  // Render the current frame
  useEffect(() => {
    renderFrame();
  }, [currentFrame, animation]);

  const renderFrame = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;

    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = animation.frames[currentFrame];
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
      32 * scale,  // Always use 32px as the base size multiplied by scale
      32 * scale   // Always use 32px as the base size multiplied by scale
    );
  };

  // Set a fixed size of 32px × scale for all sprites
  const width = 32 * scale;
  const height = 32 * scale;

  return (
    <canvas 
      ref={canvasRef} 
      width={width} 
      height={height} 
      className="pixel-art"
    />
  );
};

export default SpriteRenderer;
