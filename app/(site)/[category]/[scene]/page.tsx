import Link from "next/link";
import { notFound } from "next/navigation";
import { ScenePreview } from "@/components/scene-preview";
import { CliCommand } from "@/components/cli-command";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { scenes, categories } from "@/content/scenes";
import { getSceneSource } from "@/lib/get-scene-source";

type Params = Promise<{ category: string; scene: string }>;

export function generateStaticParams() {
  return scenes.map((scene) => ({
    category: scene.category,
    scene: scene.id,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { scene: sceneId } = await params;
  const scene = scenes.find((s) => s.id === sceneId);
  if (!scene) return {};
  return {
    title: scene.name,
    description: scene.description,
  };
}

export default async function ScenePage({ params }: { params: Params }) {
  const { category: categoryId, scene: sceneId } = await params;

  const scene = scenes.find((s) => s.id === sceneId);
  const category = categories.find((c) => c.id === categoryId);
  if (!scene || !category) notFound();

  const source = getSceneSource(sceneId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm">
        <Link href="/" className="text-muted-foreground hover:underline underline-offset-4">
          Home
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <Link
          href={`/${categoryId}`}
          className="text-muted-foreground hover:underline underline-offset-4"
        >
          {category.label}
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span>{scene.name}</span>
      </nav>

      {/* Header */}
      <div className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight">{scene.name}</h1>
        <p className="mt-1 text-muted-foreground">{scene.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {scene.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Install command */}
      <div className="mt-8">
        <CliCommand command={`npx shadcn@latest add @scenes/${scene.id}`} />
      </div>

      {/* Preview + Code */}
      <div className="mt-8">
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <ScenePreview category={categoryId} sceneId={sceneId} />
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            <CodeBlock code={source} filename={`${scene.id}.tsx`} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dependencies */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {scene.registryDependencies.length > 0 && (
          <div>
            <h3 className="text-sm font-medium">shadcn/ui components</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {scene.registryDependencies.map((dep) => (
                <Badge key={dep} variant="secondary" className="font-normal">
                  {dep}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {scene.dependencies.length > 0 && (
          <div>
            <h3 className="text-sm font-medium">npm packages</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {scene.dependencies.map((dep) => (
                <Badge key={dep} variant="secondary" className="font-normal">
                  {dep}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
