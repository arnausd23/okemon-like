
import { Button } from "@/components/ui/button";
import { CharacterSprite, SpriteAnimation } from "@/types/game";
import SpriteRenderer from "./SpriteRenderer";

interface AnimationSelectorProps {
  sprite: CharacterSprite;
  selectedAnimation: SpriteAnimation;
  onSelectAnimation: (animation: SpriteAnimation) => void;
}

const AnimationSelector: React.FC<AnimationSelectorProps> = ({
  sprite,
  selectedAnimation,
  onSelectAnimation
}) => {
  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-bold mb-3">Animations</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {sprite.animations.map((animation) => (
          <Button
            key={animation.id}
            onClick={() => onSelectAnimation(animation)}
            variant={selectedAnimation.id === animation.id ? "default" : "outline"}
            className="h-auto p-2 flex flex-col items-center justify-center gap-2"
          >
            <div className="bg-black/10 rounded-md p-1 flex items-center justify-center h-16 w-16">
              <SpriteRenderer
                sprite={sprite}
                animation={animation}
                scale={2}
                isPlaying={selectedAnimation.id === animation.id}
              />
            </div>
            <span className="text-xs font-medium">{animation.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AnimationSelector;
