import { notFound } from "next/navigation";
import { blocks } from "@/content/blocks";

type Params = Promise<{ category: string; block: string }>;

export function generateStaticParams() {
  return blocks.map((block) => ({
    category: block.category,
    block: block.id,
  }));
}

export default async function PreviewPage({ params }: { params: Params }) {
  const { block: blockId } = await params;

  const block = blocks.find((b) => b.id === blockId);
  if (!block) notFound();

  const { default: Component } = await block.component();

  return (
    <div className="flex min-h-svh items-center justify-center p-2 sm:p-6 md:p-10">
      <Component />
    </div>
  );
}
