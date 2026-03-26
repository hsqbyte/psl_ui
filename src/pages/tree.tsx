import { useState } from 'react'
import { Link } from 'react-router-dom'
import { protocols } from '@/entities/protocol/model'
import { Button } from '@/shared/ui/button'
import { useI18n } from '@/shared/i18n'

interface TreeNode {
  name: string
  children: TreeNode[]
}

function buildTree(): TreeNode[] {
  const childrenMap = new Map<string, string[]>()
  const allNames = new Set(protocols.map((p) => p.name))

  for (const p of protocols) {
    for (const dep of p.dependsOn) {
      if (allNames.has(dep)) {
        const list = childrenMap.get(dep) || []
        list.push(p.name)
        childrenMap.set(dep, list)
      }
    }
  }

  const roots = protocols.filter((p) => p.dependsOn.length === 0)

  function toNode(name: string): TreeNode {
    const kids = childrenMap.get(name) || []
    return { name, children: kids.map(toNode) }
  }

  return roots.map((r) => toNode(r.name))
}

function TreeItem({ node, expanded, toggleNode }: { node: TreeNode; expanded: Set<string>; toggleNode: (name: string) => void }) {
  const isOpen = expanded.has(node.name)
  const hasChildren = node.children.length > 0

  return (
    <li>
      <div className="flex items-center gap-1 py-0.5">
        {hasChildren ? (
          <button onClick={() => toggleNode(node.name)} className="w-5 text-center text-muted-foreground hover:text-foreground">
            {isOpen ? '▼' : '▶'}
          </button>
        ) : (
          <span className="w-5 text-center text-muted-foreground">·</span>
        )}
        <Link to={`/protocol/${node.name}`} className="text-sm hover:underline">{node.name}</Link>
      </div>
      {hasChildren && isOpen && (
        <ul className="ml-5 border-l border-border pl-2">
          {node.children.map((child) => (
            <TreeItem key={child.name} node={child} expanded={expanded} toggleNode={toggleNode} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function Tree() {
  const { t } = useI18n()
  const tree = buildTree()
  const allNames = new Set<string>()

  function collectNames(nodes: TreeNode[]) {
    for (const n of nodes) {
      allNames.add(n.name)
      collectNames(n.children)
    }
  }
  collectNames(tree)

  const [expanded, setExpanded] = useState<Set<string>>(new Set(allNames))

  const toggleNode = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  const expandAll = () => setExpanded(new Set(allNames))
  const collapseAll = () => setExpanded(new Set())

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('tree')}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>{t('expandAll')}</Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>{t('collapseAll')}</Button>
        </div>
      </div>
      <ul className="space-y-1">
        {tree.map((node) => (
          <TreeItem key={node.name} node={node} expanded={expanded} toggleNode={toggleNode} />
        ))}
      </ul>
    </div>
  )
}
