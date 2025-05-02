import React, { useEffect, useRef, useState } from "react";
import GameMap from "./GameMap";
import AnimationSelector from "./AnimationSelector";
import GameController from "./GameController";
import { CharacterSprite, GameConfig, Position, SpriteAnimation, TileMap } from "@/types/game";
import { characterSprites } from "@/data/spriteData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { generateTileMap, getTileAt } from "@/utils/mapGenerator";
import { isWalkable } from "@/data/terrainData";

const Game: React.FC = () => {
  const [sprite] = useState<CharacterSprite>(characterSprites[0]);
  const [selectedAnimation, setSelectedAnimation] = useState<SpriteAnimation>(sprite.animations[0]);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const gameConfig: GameConfig = {
    tileSize: 32,
    mapWidth: 25,
    mapHeight: 20,
    scale: 2
  };

  const [tileMap, setTileMap] = useState<TileMap>([]);
  const [position, setPosition] = useState<Position>({ 
    x: Math.floor(gameConfig.mapWidth / 2),
    y: Math.floor(gameConfig.mapHeight / 2)
  });

  // Generate the map on initial render
  useEffect(() => {
    const map = generateTileMap(gameConfig.mapWidth, gameConfig.mapHeight);
    setTileMap(map);
    
    // Ensure the starting position is walkable
    const centerX = Math.floor(gameConfig.mapWidth / 2);
    const centerY = Math.floor(gameConfig.mapHeight / 2);
    
    if (map[centerY] && map[centerY][centerX]) {
      map[centerY][centerX].type = "ground"; // Ensure spawn position is walkable
      
      // Make the area around the character walkable too
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = centerX + dx;
          const ny = centerY + dy;
          if (nx >= 0 && nx < gameConfig.mapWidth && ny >= 0 && ny < gameConfig.mapHeight) {
            map[ny][nx].type = "ground";
          }
        }
      }
    }
    
    setTileMap([...map]); // Update with the modified map
  }, [gameConfig.mapWidth, gameConfig.mapHeight]);

  const handleMove = (dx: number, dy: number) => {
    if (tileMap.length === 0) return; // Don't move if map isn't generated yet
    
    setPosition((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;
      
      // Check if the new position is within map boundaries
      if (
        newX < 0 || newX >= gameConfig.mapWidth || 
        newY < 0 || newY >= gameConfig.mapHeight
      ) {
        return prev;
      }
      
      // Check if the new position is walkable
      const targetTile = getTileAt(tileMap, newX, newY);
      if (targetTile && isWalkable(targetTile.type)) {
        return { x: newX, y: newY };
      }
      
      return prev;
    });
  };

  // Center the map view on the character with smooth scrolling
  useEffect(() => {
    if (gameContainerRef.current && tileMap.length > 0) {
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
        left: Math.max(0, scrollX),
        top: Math.max(0, scrollY),
        behavior: 'smooth'
      });
    }
  }, [position, gameConfig.tileSize, tileMap]);

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
                Explore the pixel world with your character. Use arrow keys or on-screen controls to move.
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
                  {tileMap.length > 0 && (
                    <GameMap 
                      config={gameConfig} 
                      tileMap={tileMap}
                      characterPosition={position}
                      characterSprite={sprite}
                      characterAnimation={selectedAnimation}
                    />
                  )}
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
