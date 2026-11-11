import type { Block } from "@/lib/posts";

export function PostBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return <ul className="ml-5 list-disc space-y-1.5">{block.items.map((i) => <li key={i}>{i}</li>)}</ul>;
    case "ol":
      return <ol className="ml-5 list-decimal space-y-1.5">{block.items.map((i) => <li key={i}>{i}</li>)}</ol>;
    case "tip":
      return (
        <p className="rounded-xl border border-primary/25 bg-primary/[0.04] p-4 text-foreground/90">{block.text}</p>
      );
  }
}
