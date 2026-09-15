import {
  AiScene,
  ComputeScene,
  ContainersScene,
  DataScene,
  ManagementScene,
  NetworkingScene,
  PlatformScene,
  SecurityScene,
  StorageScene,
} from "@/components/illustrations/scenes";
import { cn } from "@/lib/utils";

const scenes: Record<string, () => React.JSX.Element> = {
  compute: ComputeScene,
  storage: StorageScene,
  networking: NetworkingScene,
  data: DataScene,
  "ai-gpu": AiScene,
  containers: ContainersScene,
  management: ManagementScene,
  security: SecurityScene,
  platform: PlatformScene,
};

/** Solutions map to the scene that best describes the outcome. */
export const solutionScene: Record<string, string> = {
  migration: "networking",
  modernization: "containers",
  "business-continuity": "platform",
  "sovereign-cloud": "security",
  "ai-infrastructure": "ai-gpu",
  "data-platforms": "data",
  "hybrid-cloud": "networking",
};

/**
 * Hero illustration by subject. Isometric SVG with a soft glow underneath;
 * the whole scene drifts slowly so it reads as a living object, not a sticker.
 */
export function Illustration({ scene, className }: { scene: string; className?: string }) {
  const S = scenes[scene] ?? scenes.platform;
  return (
    <div
      aria-hidden="true"
      className={cn(
        "iso-scene relative mx-auto w-full max-w-[42rem] lg:max-w-none lg:scale-[1.08] [mask-image:radial-gradient(ellipse_54%_56%_at_50%_50%,black_48%,transparent_100%)]",
        className,
      )}
    >
      <S />
    </div>
  );
}
