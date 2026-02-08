import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { blocks, categories } from "@/content/blocks";

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category: categoryId } = await params;
  const category = categories.find((c) => c.id === categoryId);
  if (!category) return {};
  return {
    title: category.label,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category: categoryId } = await params;
  const category = categories.find((c) => c.id === categoryId);
  if (!category) notFound();

  const categoryBlocks = blocks.filter((b) => b.category === categoryId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div>
        <Link href="/" className="text-sm text-muted-foreground hover:underline underline-offset-4">
          Home
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-sm">{category.label}</span>
      </div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{category.label}</h1>
      <p className="mt-1 text-muted-foreground">{category.description}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryBlocks.map((block) => (
          <Link key={block.id} href={`/${categoryId}/${block.id}`}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">{block.name}</CardTitle>
                <CardDescription>{block.description}</CardDescription>
                <div className="flex flex-wrap gap-1 pt-2">
                  {block.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
