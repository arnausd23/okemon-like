
export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpriteAnimation {
  id: string;
  name: string;
  frames: SpriteFrame[];
  frameRate: number;
}

export interface CharacterSprite {
  id: string;
  name: string;
  src: string;
  animations: SpriteAnimation[];
}

export interface Position {
  x: number;
  y: number;
}

export interface GameConfig {
  tileSize: number;
  mapWidth: number;
  mapHeight: number;
  scale: number;
}
