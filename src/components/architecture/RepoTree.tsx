"use client";

import { useMemo, useState } from "react";
import { FolderIcon, ChevronRightIcon } from "@/components/icons";
import type { TreeNode } from "./repoTreeData";

function allExpandablePaths(nodes: TreeNode[], prefix = ""): string[] {
  const out: string[] = [];
  for (const n of nodes) {
    const path = `${prefix}/${n.name}`;
    if (n.children?.length) {
      out.push(path);
      out.push(...allExpandablePaths(n.children, path));
    }
  }
  return out;
}

function TreeItem({
  node,
  depth,
  path,
  expanded,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  path: string;
  expanded: Set<string>;
  onToggle: (path: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const open = expanded.has(path);

  return (
    <div>
      <button
        type="button"
        onClick={() => hasChildren && onToggle(path)}
        className={`flex w-full items-start gap-2 rounded-md py-1.5 pr-2 text-left transition-colors duration-[120ms] ease-out ${
          hasChildren ? "hover:bg-page cursor-pointer" : "cursor-default"
        }`}
        style={{ paddingLeft: 10 + depth * 20 }}
      >
        {hasChildren ? (
          <ChevronRightIcon
            size={12}
            className={`mt-0.5 shrink-0 text-muted transition-transform duration-[120ms] ease-out ${
              open ? "rotate-90" : ""
            }`}
          />
        ) : (
          <span className="inline-block w-3 shrink-0" />
        )}
        <FolderIcon size={14} className="mt-0.5 shrink-0 text-muted" />
        <span className="min-w-0">
          <span className="font-mono text-[13px] text-ink">{node.name}</span>
          {node.doc && (
            <span className="block text-xs leading-5 text-text2">{node.doc}</span>
          )}
        </span>
      </button>

      {hasChildren && open && (
        <div>
          {node.children!.map((c) => (
            <TreeItem
              key={c.name}
              node={c}
              depth={depth + 1}
              path={`${path}/${c.name}`}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RepoTree({ data }: { data: TreeNode[] }) {
  const allPaths = useMemo(() => allExpandablePaths(data), [data]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(path: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  const allOpen = allPaths.length > 0 && allPaths.every((p) => expanded.has(p));

  return (
    <div className="rounded-xl border border-line bg-panel p-3">
      <div className="mb-1 flex items-center justify-between border-b border-line px-2 pb-2">
        <div className="flex items-center gap-2">
          <FolderIcon size={14} className="text-muted" />
          <span className="font-mono text-[13px] font-semibold text-ink">golc/</span>
        </div>
        <button
          type="button"
          onClick={() => setExpanded(allOpen ? new Set() : new Set(allPaths))}
          className="font-mono text-[10px] uppercase tracking-wider text-muted transition-colors duration-[120ms] ease-out hover:text-accent"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      {data.map((n) => (
        <TreeItem
          key={n.name}
          node={n}
          depth={0}
          path={`/${n.name}`}
          expanded={expanded}
          onToggle={toggle}
        />
      ))}
    </div>
  );
}
