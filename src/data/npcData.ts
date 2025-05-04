
import { CharacterSprite, NPC } from "@/types/game";

// Define NPC character sprites based on the provided spritesheet
export const npcSprites: CharacterSprite[] = [
  {
    id: "npc_green",
    name: "Green Hat Trainer",
    src: "/lovable-uploads/a578b1a8-bb47-415e-a3e1-b4caadbac9c5.png",
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
        id: "idle_left",
        name: "Idle Left",
        frames: [
          { x: 0, y: 32, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_right",
        name: "Idle Right",
        frames: [
          { x: 0, y: 64, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_up",
        name: "Idle Up",
        frames: [
          { x: 0, y: 96, width: 32, height: 32 }
        ],
        frameRate: 1
      }
    ]
  },
  {
    id: "npc_brown",
    name: "Brown Hair Trainer",
    src: "/lovable-uploads/a578b1a8-bb47-415e-a3e1-b4caadbac9c5.png",
    animations: [
      {
        id: "idle_down",
        name: "Idle Down",
        frames: [
          { x: 96, y: 0, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_left",
        name: "Idle Left",
        frames: [
          { x: 96, y: 32, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_right",
        name: "Idle Right",
        frames: [
          { x: 96, y: 64, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_up",
        name: "Idle Up",
        frames: [
          { x: 96, y: 96, width: 32, height: 32 }
        ],
        frameRate: 1
      }
    ]
  },
  {
    id: "npc_red",
    name: "Ginger Trainer",
    src: "/lovable-uploads/a578b1a8-bb47-415e-a3e1-b4caadbac9c5.png",
    animations: [
      {
        id: "idle_down",
        name: "Idle Down",
        frames: [
          { x: 192, y: 0, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_left",
        name: "Idle Left",
        frames: [
          { x: 192, y: 32, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_right",
        name: "Idle Right",
        frames: [
          { x: 192, y: 64, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_up",
        name: "Idle Up",
        frames: [
          { x: 192, y: 96, width: 32, height: 32 }
        ],
        frameRate: 1
      }
    ]
  },
  {
    id: "npc_elder",
    name: "Elder Trainer",
    src: "/lovable-uploads/a578b1a8-bb47-415e-a3e1-b4caadbac9c5.png",
    animations: [
      {
        id: "idle_down",
        name: "Idle Down",
        frames: [
          { x: 288, y: 0, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_left",
        name: "Idle Left",
        frames: [
          { x: 288, y: 32, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_right",
        name: "Idle Right",
        frames: [
          { x: 288, y: 64, width: 32, height: 32 }
        ],
        frameRate: 1
      },
      {
        id: "idle_up",
        name: "Idle Up",
        frames: [
          { x: 288, y: 96, width: 32, height: 32 }
        ],
        frameRate: 1
      }
    ]
  }
];

// Utility function to get animation based on direction
export const getNpcAnimationByDirection = (
  sprite: CharacterSprite,
  direction: 'up' | 'down' | 'left' | 'right'
): SpriteAnimation => {
  const dirMap: Record<string, string> = {
    up: "idle_up",
    down: "idle_down",
    left: "idle_left",
    right: "idle_right",
  };

  const animationId = dirMap[direction];
  return (
    sprite.animations.find((anim) => anim.id === animationId) ||
    sprite.animations[0]
  );
};

// Create a list of NPCs for the game map
export const npcs: NPC[] = [
  {
    id: "trainer1",
    name: "Bug Catcher",
    position: { x: 8, y: 8 },
    sprite: npcSprites[0], // Green hat trainer
    animation: npcSprites[0].animations[0], // Idle down
    detectionRange: 2,
    direction: "down"
  },
  {
    id: "trainer2",
    name: "Youngster",
    position: { x: 15, y: 12 },
    sprite: npcSprites[1], // Brown hair trainer
    animation: npcSprites[1].animations[2], // Idle right
    detectionRange: 2,
    direction: "right"
  },
  {
    id: "trainer3",
    name: "Hiker",
    position: { x: 5, y: 15 },
    sprite: npcSprites[2], // Ginger trainer
    animation: npcSprites[2].animations[1], // Idle left
    detectionRange: 2,
    direction: "left"
  },
  {
    id: "trainer4",
    name: "Elder",
    position: { x: 20, y: 5 },
    sprite: npcSprites[3], // Elder trainer
    animation: npcSprites[3].animations[3], // Idle up
    detectionRange: 2,
    direction: "up"
  }
];
