
# Game Sprite Modification Guide

This guide explains how to modify sprites in the Pixel Adventure game and provides an overview of key files in the codebase.

## Understanding the Sprite System

Our game uses a canvas-based rendering system to display different types of sprites:

1. **Terrain Sprites**: Background tiles like grass, water, rocks
2. **Character Sprites**: The player character with different animations
3. **NPC Sprites**: Non-player characters in the game world

## Key Files Overview

### Sprite Definitions

- **`src/data/terrainData.ts`**: Defines all terrain tiles (grass, water, rock, ground)
- **`src/data/spriteData.ts`**: Contains player character sprite definitions and animations
- **`src/data/npcData.ts`**: Defines NPC sprites, animations, and placement in the game world

### Sprite Rendering Components

- **`src/components/SpriteRenderer.tsx`**: Core component for rendering any sprite animation
- **`src/components/TerrainTile.tsx`**: Renders individual terrain tiles
- **`src/components/GameCharacter.tsx`**: Manages the player character rendering and positioning
- **`src/components/GameNPC.tsx`**: Handles NPC rendering, positioning and detection zones

### Game Logic Components

- **`src/components/Game.tsx`**: Main game component that orchestrates all game elements
- **`src/components/GameMap.tsx`**: Renders the complete game map with terrain and characters
- **`src/components/GameController.tsx`**: Handles user inputs and character movement
- **`src/components/AnimationSelector.tsx`**: UI for selecting different character animations

### Type Definitions

- **`src/types/game.ts`**: Contains TypeScript interfaces for all game elements

## How to Modify Sprites

### 1. Changing Terrain Sprites

To change a terrain sprite (like water or ground):

```typescript
// In src/data/terrainData.ts
export const terrainSprites: TerrainSprite[] = [
  {
    id: "grass",
    name: "Grass",
    src: "/path/to/your/new/grass/image.png", // Change this path
    frames: [
      { x: 0, y: 0, width: 32, height: 32 },
      // Add more frames for animation
    ],
    frameRate: 8, // Optional: Add this for animated tiles
    collidable: false
  },
  // Other terrain definitions...
];
```

### 2. Changing Character Sprites

To modify the player character sprite:

```typescript
// In src/data/spriteData.ts
export const characterSprites: CharacterSprite[] = [
  {
    id: "character1",
    name: "Character Name",
    src: "/path/to/your/character/spritesheet.png", // Change this path
    animations: [
      // Animation frames can also be modified here
      {
        id: "walk_down",
        name: "Walk Down",
        frames: [
          { x: 0, y: 0, width: 32, height: 32 },
          { x: 32, y: 0, width: 32, height: 32 },
          // Add or change frame positions to match your new spritesheet
        ],
        frameRate: 8 // Speed of animation
      },
      // Other animations...
    ]
  }
];
```

### 3. Adding/Modifying NPCs

To add or change NPCs:

```typescript
// In src/data/npcData.ts
export const npcs: NPC[] = [
  {
    id: "trainer1",
    name: "Bug Catcher",
    position: { x: 8, y: 8 }, // Position on map
    sprite: npcSprites[0], // Reference to sprite definition
    animation: npcSprites[0].animations[0], // Default animation
    detectionRange: 2, // How far they can detect the player
    direction: "down" // Which way they're facing
  },
  // Add more NPCs here
];
```

## Understanding Sprite Animation Parameters

When modifying sprites, these parameters are important:

- **`src`**: Path to the sprite sheet image
- **`frames`**: Array of positions in the sprite sheet (x, y, width, height) in pixels
- **`frameRate`**: Animation speed (frames per second)
- **`collidable`**: Whether the player can walk on this terrain (for terrain sprites)

## Adding Animated Terrain

To create animated terrain (like water):

```typescript
{
  id: "water",
  name: "Water",
  src: "/path/to/water/spritesheet.png",
  frames: [
    { x: 0, y: 0, width: 32, height: 32 },
    { x: 32, y: 0, width: 32, height: 32 },
    { x: 64, y: 0, width: 32, height: 32 }
  ],
  frameRate: 4, // Slower animation for water
  collidable: true
}
```

## Adding New Sprites

To add completely new sprites:

1. **Upload the image file** to your project
2. **Add a new entry** to the appropriate sprite data file
3. **Reference the sprite** in your game components

## Importing Custom Sprites

For custom sprites, make sure:

1. The image is in a web-compatible format (PNG recommended)
2. The sprite dimensions match existing ones (usually 32x32 pixels)
3. For animated sprites, frames should be organized in a consistent grid

## Troubleshooting

If sprites aren't appearing correctly:
- Check that file paths are correct
- Verify frame coordinates match your sprite sheet layout
- Ensure the sprite sheet is properly loaded before rendering
- Check the browser console for any image loading errors

## Best Practices

- Keep sprite sizes consistent (32x32 pixels recommended)
- Organize sprite sheets logically with frames of the same animation in sequence
- Use transparent backgrounds (PNG format) for sprites
- Test sprite changes in different game scenarios
- For animated terrain, use 2-4 frames for subtle effects (water ripples, grass swaying)
