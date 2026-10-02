import { SpiderNode, ConceptCategory } from "@/data/concepts";

export interface PositionedNode extends SpiderNode {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
}

export interface Edge {
  source: string;
  target: string;
  category: string;
  level: number;
}

/**
 * Calculates initial positions for nodes in a radial spider-web arrangement.
 */
export function calculateSpiderLayout(
  nodes: SpiderNode[],
  rootId: string,
  category: ConceptCategory
): { nodes: PositionedNode[]; edges: Edge[] } {
  const rootNode = nodes.find((n) => n.id === rootId);
  if (!rootNode) return { nodes: [], edges: [] };

  const childMap = new Map<string, SpiderNode[]>();
  nodes.forEach((node) => {
    if (node.parentId) {
      const list = childMap.get(node.parentId) || [];
      list.push(node);
      childMap.set(node.parentId, list);
    }
  });

  const positioned: Map<string, PositionedNode> = new Map();
  const edges: Edge[] = [];

  // Root at center (0, 0)
  positioned.set(rootNode.id, {
    ...rootNode,
    x: 0,
    y: 0,
  });

  // Level 1 children
  const l1Children = childMap.get(rootNode.id) || [];
  const l1Count = l1Children.length;

  // Base radii for spider rings
  let r1 = 280;
  let r2 = 560;
  let r3 = 840;

  if (category === "scope") {
    r1 = 260;
    r2 = 500;
    r3 = 700;
  } else if (category === "node") {
    r1 = 340;
    r2 = 680;
    r3 = 980;
  } else if (category === "all") {
    r1 = 440;
    r2 = 850;
    r3 = 1260;
  }

  // Allocate angular sectors to Level 1 nodes
  l1Children.forEach((l1, i) => {
    // Distribute angles evenly around the 360 circle
    const angle = (2 * Math.PI * i) / l1Count - Math.PI / 2;
    const x1 = Math.round(Math.cos(angle) * r1);
    const y1 = Math.round(Math.sin(angle) * r1);

    positioned.set(l1.id, {
      ...l1,
      x: x1,
      y: y1,
    });

    edges.push({
      source: rootNode.id,
      target: l1.id,
      category: l1.category,
      level: 1,
    });

    // Level 2 children under this Level 1
    const l2Children = childMap.get(l1.id) || [];
    const l2Count = l2Children.length;

    if (l2Count > 0) {
      // Angular spread for Level 2 children around the parent's heading angle
      const spread = Math.min((2 * Math.PI) / l1Count * 0.95, Math.PI * 0.85);
      const startAngle = angle - spread / 2;

      l2Children.forEach((l2, j) => {
        const step = l2Count === 1 ? 0.5 : j / (l2Count - 1);
        const l2Angle = l2Count === 1 ? angle : startAngle + step * spread;
        
        // Add subtle staggered radius so items don't collide if many
        const staggeredR2 = r2 + (j % 2 === 1 ? 40 : -20);
        const x2 = Math.round(Math.cos(l2Angle) * staggeredR2);
        const y2 = Math.round(Math.sin(l2Angle) * staggeredR2);

        positioned.set(l2.id, {
          ...l2,
          x: x2,
          y: y2,
        });

        edges.push({
          source: l1.id,
          target: l2.id,
          category: l2.category,
          level: 2,
        });

        // Level 3 children under this Level 2
        const l3Children = childMap.get(l2.id) || [];
        const l3Count = l3Children.length;

        if (l3Count > 0) {
          const l3Spread = Math.min(spread / (l2Count || 1) * 1.2, 0.45);
          const l3StartAngle = l2Angle - l3Spread / 2;

          l3Children.forEach((l3, k) => {
            const l3Step = l3Count === 1 ? 0.5 : k / (l3Count - 1);
            const l3Angle = l3Count === 1 ? l2Angle : l3StartAngle + l3Step * l3Spread;
            const staggeredR3 = r3 + (k % 2 === 1 ? 50 : 0);
            const x3 = Math.round(Math.cos(l3Angle) * staggeredR3);
            const y3 = Math.round(Math.sin(l3Angle) * staggeredR3);

            positioned.set(l3.id, {
              ...l3,
              x: x3,
              y: y3,
            });

            edges.push({
              source: l2.id,
              target: l3.id,
              category: l3.category,
              level: 3,
            });
          });
        }
      });
    }
  });

  return {
    nodes: Array.from(positioned.values()),
    edges,
  };
}

/**
 * Filter nodes for the chosen category tab
 */
export function getNodesForCategory(
  allNodes: SpiderNode[],
  category: ConceptCategory
): { nodes: SpiderNode[]; rootId: string } {
  if (category === "all") {
    // For all, make root-all the master parent of the 3 root category nodes
    const rootAll = allNodes.find((n) => n.id === "root-all")!;
    const v8Root = { ...allNodes.find((n) => n.id === "root-v8")!, parentId: "root-all", level: 1 };
    const scopeRoot = { ...allNodes.find((n) => n.id === "root-scope")!, parentId: "root-all", level: 1 };
    const nodeRoot = { ...allNodes.find((n) => n.id === "root-node")!, parentId: "root-all", level: 1 };

    const remaining = allNodes.filter(
      (n) => n.id !== "root-all" && n.id !== "root-v8" && n.id !== "root-scope" && n.id !== "root-node"
    );

    return {
      nodes: [rootAll, v8Root, scopeRoot, nodeRoot, ...remaining],
      rootId: "root-all",
    };
  }

  const rootId = `root-${category}`;
  const categoryNodes = allNodes.filter(
    (n) => n.category === category || n.id === rootId
  );

  return {
    nodes: categoryNodes,
    rootId,
  };
}
