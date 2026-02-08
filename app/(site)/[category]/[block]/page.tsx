import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockPreview } from "@/components/block-preview";
import { CliCommand } from "@/components/cli-command";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { blocks, categories } from "@/content/blocks";
import { getBlockSource } from "@/lib/get-block-source";

type Params = Promise<{ category: string; block: string }>;

export function generateStaticParams() {
  return blocks.map((block) => ({
    category: block.category,
    block: block.id,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { block: blockId } = await params;
  const block = blocks.find((b) => b.id === blockId);
  if (!block) return {};
  return {
    title: block.name,
    description: block.description,
  };
}

export default async function BlockPage({ params }: { params: Params }) {
  const { category: categoryId, block: blockId } = await params;

  const block = blocks.find((b) => b.id === blockId);
  const category = categories.find((c) => c.id === categoryId);
  if (!block || !category) notFound();

  const source = getBlockSource(blockId);

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
        <span>{block.name}</span>
      </nav>

      {/* Header */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight">{block.name}</h1>
        <p className="mt-1 text-muted-foreground">{block.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {block.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Install command */}
      <div className="mt-8">
        <CliCommand command={`npx shadcn@latest add @panes/${block.id}`} />
      </div>

      {/* Preview + Code */}
      <div className="mt-8">
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="mt-4">
            <BlockPreview category={categoryId} blockId={blockId} />
          </TabsContent>
          <TabsContent value="code" className="mt-4">
            <CodeBlock code={source} filename={`${block.id}.tsx`} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dependencies */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {block.registryDependencies.length > 0 && (
          <div>
            <h3 className="text-sm font-medium">shadcn/ui components</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {block.registryDependencies.map((dep) => (
                <Badge key={dep} variant="secondary" className="font-normal">
                  {dep}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {block.dependencies.length > 0 && (
          <div>
            <h3 className="text-sm font-medium">npm packages</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {block.dependencies.map((dep) => (
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
