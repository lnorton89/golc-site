"use client";

import { useState } from "react";
import { FolderIcon, ChevronRightIcon } from "@/components/icons";
import type { TreeNode } from "./repoTreeData";

function TreeItem({ node, depth }: { node: TreeNode; depth: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = !!node.children?.length;
  const isDir = node.name.endsWith("/");

  return (
    <div>
      <button
        type="button"
        onClick={() => hasChildren && setOpen((v) => !v)}
        className={`flex w-full items-center gap-2 rounded-md py-1.5 pr-2 text-left transition-colors duration-[120ms] ease-out ${
          hasChildren ? "hover:bg-page cursor-pointer" : "cursor-default"
        }`}
        style={{ paddingLeft: 10 + depth * 20 }}
      >
        {hasChildren ? (
          <ChevronRightIcon
            size={12}
            className={`shrink-0 text-muted transition-transform duration-[120ms] ease-out ${
              open ? "rotate-90" : ""
            }`}
          />
        ) : (
          <span className="inline-block w-3 shrink-0" />
        )}
        {isDir ? (
          <FolderIcon size={14} className="shrink-0 text-muted" />
        ) : (
          <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-line" />
        )}
        <span className="font-mono text-[13px] text-ink">{node.name}</span>
      </button>

      {open && node.doc && (
        <p
          className="pb-2 pr-4 text-xs leading-5 text-text2"
          style={{ paddingLeft: 10 + depth * 20 + 20 }}
        >
          {node.doc}
        </p>
      )}

      {hasChildren && open && (
        <div>
          {node.children!.map((c) => (
            <TreeItem key={c.name} node={c} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function RepoTree({ data }: { data: TreeNode[] }) {
  return (
    <div className="rounded-xl border border-line bg-panel p-3">
      <div className="mb-1 flex items-center gap-2 border-b border-line px-2 pb-2">
        <FolderIcon size={14} className="text-muted" />
        <span className="font-mono text-[13px] font-semibold text-ink">golc/</span>
      </div>
      {data.map((n) => (
        <TreeItem key={n.name} node={n} depth={0} />
      ))}
    </div>
  );
}
