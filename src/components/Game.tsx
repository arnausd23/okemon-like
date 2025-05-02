
import React, { useEffect, useRef, useState } from "react";
import GameMap from "./GameMap";
import GameCharacter from "./GameCharacter";
import AnimationSelector from "./AnimationSelector";
import GameController from "./GameController";
import { CharacterSprite, GameConfig, Position, SpriteAnimation } from "@/types/game";
import { characterSprites } from "@/data/spriteData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const Game: React.FC = () => {
  const [sprite] = useState<CharacterSprite>(characterSprites[0]);
  const [selectedAnimation, setSelectedAnimation] = useState<SpriteAnimation>(sprite.animations[0]);
  const [position, setPosition] = useState<Position>({ x: 5, y: 5 });
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const gameConfig: GameConfig = {
    tileSize: 32,
    mapWidth: 20,
    mapHeight: 15,
    scale: 2
  };

  const handleMove = (dx: number, dy: number) => {
    setPosition((prev) => {
      const newX = Math.max(0, Math.min(gameConfig.mapWidth - 1, prev.x + dx));
      const newY = Math.max(0, Math.min(gameConfig.mapHeight - 1, prev.y + dy));
      return { x: newX, y: newY };
    });
  };

  // Scroll the map to center on the character
  useEffect(() => {
    if (gameContainerRef.current) {
      const container = gameContainerRef.current;
      const characterX = position.x * gameConfig.tileSize;
      const characterY = position.y * gameConfig.tileSize;
      
      // Calculate center position
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const scrollX = characterX - containerWidth / 2 + gameConfig.tileSize / 2;
      const scrollY = characterY - containerHeight / 2 + gameConfig.tileSize / 2;
      
      // Scroll the container
      container.scrollTo({
        left: scrollX,
        top: scrollY,
        behavior: 'smooth'
      });
    }
  }, [position, gameConfig.tileSize]);

  return (
    <div className="container py-6 max-w-4xl mx-auto">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Pixel Adventure</h1>
        <p className="text-muted-foreground">A Pokemon-like sprite animation game</p>
      </header>

      <Tabs defaultValue="play">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="play">Play Game</TabsTrigger>
          <TabsTrigger value="animations">Character Animations</TabsTrigger>
        </TabsList>

        <TabsContent value="play">
          <Card>
            <CardHeader>
              <CardTitle>Game World</CardTitle>
              <CardDescription>
                Explore the pixel world with your character
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                ref={gameContainerRef}
                className="relative overflow-auto bg-slate-800 rounded-md mb-4"
                style={{
                  width: "100%",
                  height: "400px",
                  maxWidth: "100%"
                }}
              >
                <div className="relative">
                  <GameMap config={gameConfig} />
                  <GameCharacter
                    sprite={sprite}
                    position={position}
                    animation={selectedAnimation}
                    scale={gameConfig.scale}
                    tileSize={gameConfig.tileSize}
                  />
                </div>
              </div>
              
              <GameController
                onMove={handleMove}
                onAnimationChange={setSelectedAnimation}
                sprite={sprite}
                currentAnimation={selectedAnimation}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="animations">
          <Card>
            <CardHeader>
              <CardTitle>Character Animations</CardTitle>
              <CardDescription>
                Select an animation to preview it
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimationSelector
                sprite={sprite}
                selectedAnimation={selectedAnimation}
                onSelectAnimation={setSelectedAnimation}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Game;
