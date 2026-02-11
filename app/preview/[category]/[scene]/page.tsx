import { notFound } from "next/navigation";
import { scenes } from "@/content/scenes";

type Params = Promise<{ category: string; scene: string }>;

export function generateStaticParams() {
  return scenes.map((scene) => ({
    category: scene.category,
    scene: scene.id,
  }));
}

export default async function PreviewPage({ params }: { params: Params }) {
  const { scene: sceneId } = await params;

  const scene = scenes.find((s) => s.id === sceneId);
  if (!scene) notFound();

  const { default: Component } = await scene.component();

  return (
    <div className="min-h-svh">
      <Component />
    </div>
  );
}
