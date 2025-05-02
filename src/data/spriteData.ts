
import { CharacterSprite } from "@/types/game";

// Default character sprite data based on the provided spritesheet
export const characterSprites: CharacterSprite[] = [
  {
    id: "character1",
    name: "White Hair Character",
    src: "/lovable-uploads/872eb6a0-ebec-42a0-96dc-e1663382a996.png",
    animations: [
      {
        id: "idle_down",
        name: "Idle Down",
        frames: [
          { x: 0, y: 0, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "walk_down",
        name: "Walk Down",
        frames: [
          { x: 0, y: 0, width: 32, height: 32 },
          { x: 32, y: 0, width: 32, height: 32 },
          { x: 64, y: 0, width: 32, height: 32 }
        ],
        frameRate: 8
      },
      {
        id: "walk_left",
        name: "Walk Left",
        frames: [
          { x: 0, y: 32, width: 32, height: 32 },
          { x: 32, y: 32, width: 32, height: 32 },
          { x: 64, y: 32, width: 32, height: 32 }
        ],
        frameRate: 8
      },
      {
        id: "walk_right",
        name: "Walk Right",
        frames: [
          { x: 0, y: 64, width: 32, height: 32 },
          { x: 32, y: 64, width: 32, height: 32 },
          { x: 64, y: 64, width: 32, height: 32 }
        ],
        frameRate: 8
      },
      {
        id: "walk_up",
        name: "Walk Up",
        frames: [
          { x: 0, y: 96, width: 32, height: 32 },
          { x: 32, y: 96, width: 32, height: 32 },
          { x: 64, y: 96, width: 32, height: 32 }
        ],
        frameRate: 8
      }
    ]
  }
];
