
import React, { useEffect, useState, useCallback } from "react";
import { CharacterSprite, Position, SpriteAnimation } from "@/types/game";
import { Button } from "./ui/button";
import { toast } from "@/components/ui/sonner";

interface GameControllerProps {
  onMove: (dx: number, dy: number) => void;
  onAnimationChange: (animation: SpriteAnimation) => void;
  sprite: CharacterSprite;
  currentAnimation: SpriteAnimation;
}

const GameController: React.FC<GameControllerProps> = ({
  onMove,
  onAnimationChange,
  sprite,
  currentAnimation
}) => {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

  const getAnimationByDirection = useCallback(
    (direction: string): SpriteAnimation => {
      const dirMap: Record<string, string> = {
        up: "walk_up",
        down: "walk_down",
        left: "walk_left",
        right: "walk_right",
      };

      const animationId = dirMap[direction] || "idle_down";
      return (
        sprite.animations.find((anim) => anim.id === animationId) ||
        sprite.animations[0]
      );
    },
    [sprite]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Handle only arrow keys, WASD already handled in existing code
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        e.preventDefault();
        setKeysPressed((prev) => ({ ...prev, [e.key]: true }));

        // Change animation based on direction
        let direction = "";
        switch (e.key) {
          case "ArrowUp":
          case "w":
            direction = "up";
            break;
          case "ArrowDown":
          case "s":
            direction = "down";
            break;
          case "ArrowLeft":
          case "a":
            direction = "left";
            break;
          case "ArrowRight":
          case "d":
            direction = "right";
            break;
        }

        if (direction) {
          onAnimationChange(getAnimationByDirection(direction));
        }
      }
    },
    [onAnimationChange, getAnimationByDirection]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
        setKeysPressed((prev) => ({ ...prev, [e.key]: false }));
      }
    },
    []
  );

  // Handle keyboard movement
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // Process movement based on keys pressed
  useEffect(() => {
    const moveInterval = setInterval(() => {
      let dx = 0;
      let dy = 0;

      if (keysPressed["ArrowUp"] || keysPressed["w"]) dy = -1;
      if (keysPressed["ArrowDown"] || keysPressed["s"]) dy = 1;
      if (keysPressed["ArrowLeft"] || keysPressed["a"]) dx = -1;
      if (keysPressed["ArrowRight"] || keysPressed["d"]) dx = 1;

      if (dx !== 0 || dy !== 0) {
        onMove(dx, dy);
      }
    }, 200); // Movement speed

    return () => clearInterval(moveInterval);
  }, [keysPressed, onMove]);

  // On-screen controls for mobile
  const handleButtonPress = (direction: string) => {
    let dx = 0;
    let dy = 0;

    switch (direction) {
      case "up":
        dy = -1;
        break;
      case "down":
        dy = 1;
        break;
      case "left":
        dx = -1;
        break;
      case "right":
        dx = 1;
        break;
    }

    onMove(dx, dy);
    onAnimationChange(getAnimationByDirection(direction));
  };

  return (
    <div className="mt-4">
      <p className="text-sm text-muted-foreground mb-2">
        Use arrow keys or WASD to move, or tap the buttons below
      </p>
      
      <div className="grid grid-cols-3 gap-2 w-48 mx-auto">
        <div></div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleButtonPress("up")}
        >
          ↑
        </Button>
        <div></div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleButtonPress("left")}
        >
          ←
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleButtonPress("down")}
        >
          ↓
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleButtonPress("right")}
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default GameController;
