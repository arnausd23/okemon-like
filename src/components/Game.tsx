import React, { useEffect, useRef, useState } from "react";
import GameMap from "./GameMap";
import AnimationSelector from "./AnimationSelector";
import GameController from "./GameController";
import { CharacterSprite, GameConfig, NPC, Position, SpriteAnimation, TileMap } from "@/types/game";
import { characterSprites } from "@/data/spriteData";
import { npcs } from "@/data/npcData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { generateTileMap, getTileAt } from "@/utils/mapGenerator";
import { isWalkable, terrainSprites } from "@/data/terrainData";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { toast } from "./ui/sonner";
import SpriteRenderer from "./SpriteRenderer";

const Game: React.FC = () => {
  const [sprite] = useState<CharacterSprite>(characterSprites[0]);
  const [selectedAnimation, setSelectedAnimation] = useState<SpriteAnimation>(sprite.animations[0]);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [showBattleAlert, setShowBattleAlert] = useState(false);
  const [battleAlertText, setBattleAlertText] = useState("");
  const [gameNPCs, setGameNPCs] = useState<NPC[]>(npcs);

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
    
    // Ensure NPC positions are walkable
    gameNPCs.forEach(npc => {
      const { x, y } = npc.position;
      if (x >= 0 && x < gameConfig.mapWidth && y >= 0 && y < gameConfig.mapHeight) {
        map[y][x].type = "ground";
      }
    });
    
    setTileMap([...map]); // Update with the modified map
  }, [gameConfig.mapWidth, gameConfig.mapHeight, gameNPCs]);

  const checkForBattle = (tileType: string) => {
    // Only trigger battles on grass tiles
    if (tileType === "grass") {
      // 60% chance to trigger a battle
      if (Math.random() < 0.6) {
        toast("Battle triggered!", {
          description: "A wild Pokémon appeared!",
          duration: 3000,
        });
        setBattleAlertText("A wild Pokémon appeared!");
        setShowBattleAlert(true);
        
        // Hide the alert after 3 seconds
        setTimeout(() => {
          setShowBattleAlert(false);
        }, 3000);
      }
    }
  };

  const checkForNPCEncounter = (newPos: Position): boolean => {
    for (const npc of gameNPCs) {
      // Check if character is in NPC's detection range
      const detectionTiles: Position[] = [];
      const { x, y } = npc.position;
      
      for (let i = 1; i <= npc.detectionRange; i++) {
        switch(npc.direction) {
          case "up":
            detectionTiles.push({ x, y: y - i });
            break;
          case "down":
            detectionTiles.push({ x, y: y + i });
            break;
          case "left":
            detectionTiles.push({ x: x - i, y });
            break;
          case "right":
            detectionTiles.push({ x: x + i, y });
            break;
        }
      }
      
      // Check if new position matches any of the detection tiles
      const isInDetectionRange = detectionTiles.some(
        tile => tile.x === newPos.x && tile.y === newPos.y
      );
      
      if (isInDetectionRange) {
        handleNPCEncounter(npc);
        return true;
      }
    }
    
    return false;
  };

  const handleNPCEncounter = (npc: NPC) => {
    toast("Trainer battle!", {
      description: `${npc.name} wants to battle!`,
      duration: 3000,
    });
    setBattleAlertText(`${npc.name} wants to battle!`);
    setShowBattleAlert(true);
    
    // Hide the alert after 3 seconds
    setTimeout(() => {
      setShowBattleAlert(false);
    }, 3000);
  };

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
      
      // Check if the new position is occupied by an NPC
      const isNPCPosition = gameNPCs.some(
        npc => npc.position.x === newX && npc.position.y === newY
      );
      
      if (isNPCPosition) {
        return prev;
      }
      
      // Check if the new position is in NPC detection range
      const triggerNPCBattle = checkForNPCEncounter({ x: newX, y: newY });
      
      // Check if the new position is walkable
      const targetTile = getTileAt(tileMap, newX, newY);
      if (targetTile && isWalkable(targetTile.type)) {
        // If NPC battle triggered, stay in place
        if (triggerNPCBattle) {
          return prev;
        }
        
        // Check for wild Pokémon battle trigger
        checkForBattle(targetTile.type);
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

      {showBattleAlert && (
        <div className="mb-4">
          <Alert>
            <AlertTitle>{battleAlertText.includes("Trainer") ? "Trainer battle!" : "Battle triggered!"}</AlertTitle>
            <AlertDescription>
              {battleAlertText}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <Tabs defaultValue="play">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="play">Play Game</TabsTrigger>
          <TabsTrigger value="sprites">Game Sprites</TabsTrigger>
        </TabsList>

        <TabsContent value="play">
          <Card>
            <CardHeader>
              <CardTitle>Game World</CardTitle>
              <CardDescription>
                Explore the pixel world with your character. Use arrow keys or WASD to move.
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
                      npcs={gameNPCs}
                      onNPCEncounter={handleNPCEncounter}
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
        
        <TabsContent value="sprites">
          <Card>
            <CardHeader>
              <CardTitle>Game Sprites</CardTitle>
              <CardDescription>
                All sprites and animations used in the game
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <section>
                  <h3 className="font-semibold text-lg mb-3">Character Animations</h3>
                  <AnimationSelector
                    sprite={sprite}
                    selectedAnimation={selectedAnimation}
                    onSelectAnimation={setSelectedAnimation}
                  />
                </section>
                
                <section>
                  <h3 className="font-semibold text-lg mb-3">NPCs</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {gameNPCs.map((npc) => (
                      <div 
                        key={npc.id}
                        className="bg-card rounded-lg border p-3 flex flex-col items-center"
                      >
                        <div className="bg-black/10 rounded-md p-2 mb-2">
                          <div className="w-16 h-16 relative">
                            <SpriteRenderer
                              sprite={npc.sprite}
                              animation={npc.animation}
                              scale={2}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium">{npc.name}</span>
                        <span className="text-xs text-muted-foreground">
                          Facing: {npc.direction}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="font-semibold text-lg mb-3">Terrain Sprites</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {terrainSprites.map((terrain) => (
                      <div 
                        key={terrain.id}
                        className="bg-card rounded-lg border p-3 flex flex-col items-center"
                      >
                        <div className="bg-black/10 rounded-md p-2 mb-2">
                          <img 
                            src={terrain.src} 
                            alt={terrain.name}
                            className="w-16 h-16 object-contain pixel-art"
                          />
                        </div>
                        <span className="text-sm font-medium">{terrain.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {terrain.collidable ? "Not Walkable" : "Walkable"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Game;
