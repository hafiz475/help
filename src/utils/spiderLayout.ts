import { SpiderNode, ConceptCategory, ALL_NODES } from "@/data/concepts";
import { GroupCardData, getGroupCardsForCategory } from "@/data/groupConcepts";

export type ViewMode = "spider" | "tree" | "group";

export interface PositionedNode extends SpiderNode {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  cardParentId?: string;
  branchIndex?: number; // 0 (Red branch), 1 (Yellow branch), 2 (Green branch)
  branchCount?: number; // Count of outgoing branches created by this node
}

export interface PositionedGroupCard extends GroupCardData {
  x: number;
  y: number;
  branchIndex?: number;
}

export interface Edge {
  source: string;
  target: string;
  category: string;
  level: number;
  cardId?: string;
  itemIndex?: number;
  totalItems?: number;
  branchIndex?: number; // 0: Red, 1: Yellow, 2: Green
}

export interface HierarchyColorSpec {
  stroke: string;
  glow: string;
  name: string;
  points: number;
}

/**
 * 8-Layer Snooker-based Hierarchy Thread Color Architecture:
 * - Red (1 point)
 * - Yellow (2 points)
 * - Green (3 points)
 * - Brown (4 points)
 * - Blue (5 points)
 * - Pink (6 points)
 * - Black (7 points)
 * - Diamond White / Gold (8 points)
 *
 * Core parent radiates max 3 branches:
 * - Branch 0: Red (1 pt) -> Brown (4 pts) -> Black (7 pts) -> Diamond White (8 pts)
 * - Branch 1: Yellow (2 pts) -> Blue (5 pts) -> Black (7 pts) -> Diamond White (8 pts)
 * - Branch 2: Green (3 pts) -> Pink (6 pts) -> Black (7 pts) -> Diamond White (8 pts)
 *
 * Each color point tier lasts for 2 layers:
 * Layer 1 (odd): Glowing / vibrant base
 * Layer 2 (even): Softer / lighter tint
 */
export function getHierarchyThreadColor(
  branchIndex: number = 0,
  level: number = 1,
  isDark: boolean = true
): HierarchyColorSpec {
  const branch = Math.abs(branchIndex) % 3;
  const clampedLevel = Math.max(1, Math.min(level, 8));

  // Branch 0: Tomato Red (1) -> Warm Cinnamon (4) -> Luminous Obsidian (7) -> Diamond White (8)
  if (branch === 0) {
    switch (clampedLevel) {
      case 1:
        return {
          stroke: isDark ? "#ff6b6b" : "#ff5252",
          glow: isDark ? "rgba(255, 107, 107, 0.7)" : "rgba(255, 82, 82, 0.35)",
          name: "Glowing Tomato Red",
          points: 1,
        };
      case 2:
        return {
          stroke: isDark ? "#ffa8a8" : "#ff7675",
          glow: isDark ? "rgba(255, 168, 168, 0.55)" : "rgba(255, 118, 117, 0.3)",
          name: "Light Tomato Red",
          points: 1,
        };
      case 3:
        return {
          stroke: isDark ? "#fb923c" : "#f97316",
          glow: isDark ? "rgba(251, 146, 60, 0.7)" : "rgba(249, 115, 22, 0.35)",
          name: "Glowing Cinnamon Amber",
          points: 4,
        };
      case 4:
        return {
          stroke: isDark ? "#fdba74" : "#fb923c",
          glow: isDark ? "rgba(253, 186, 116, 0.55)" : "rgba(251, 146, 60, 0.3)",
          name: "Light Apricot Caramel",
          points: 4,
        };
      case 5:
        return {
          stroke: isDark ? "#e2e8f0" : "#64748b",
          glow: isDark ? "rgba(226, 232, 240, 0.7)" : "rgba(100, 116, 139, 0.3)",
          name: "Luminous Obsidian Pearl",
          points: 7,
        };
      case 6:
        return {
          stroke: isDark ? "#cbd5e1" : "#94a3b8",
          glow: isDark ? "rgba(203, 213, 225, 0.55)" : "rgba(148, 163, 184, 0.25)",
          name: "Soft Platinum Slate",
          points: 7,
        };
      case 7:
        return {
          stroke: isDark ? "#ffffff" : "#475569",
          glow: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(71, 85, 105, 0.35)",
          name: "Diamond White",
          points: 8,
        };
      case 8:
      default:
        return {
          stroke: isDark ? "#fde047" : "#eab308",
          glow: isDark ? "rgba(253, 224, 71, 0.85)" : "rgba(234, 179, 8, 0.4)",
          name: "Royal Champagne Gold",
          points: 8,
        };
    }
  }

  // Branch 1: Canary Yellow (2) -> Sky Blue (5) -> Luminous Obsidian (7) -> Diamond White (8)
  if (branch === 1) {
    switch (clampedLevel) {
      case 1:
        return {
          stroke: isDark ? "#fde047" : "#eab308",
          glow: isDark ? "rgba(253, 224, 71, 0.75)" : "rgba(234, 179, 8, 0.35)",
          name: "Glowing Canary Yellow",
          points: 2,
        };
      case 2:
        return {
          stroke: isDark ? "#fef08a" : "#facc15",
          glow: isDark ? "rgba(254, 240, 138, 0.55)" : "rgba(250, 204, 21, 0.3)",
          name: "Light Butter Yellow",
          points: 2,
        };
      case 3:
        return {
          stroke: isDark ? "#38bdf8" : "#0284c7",
          glow: isDark ? "rgba(56, 189, 248, 0.7)" : "rgba(2, 132, 199, 0.35)",
          name: "Glowing Sky Blue",
          points: 5,
        };
      case 4:
        return {
          stroke: isDark ? "#93c5fd" : "#38bdf8",
          glow: isDark ? "rgba(147, 197, 253, 0.55)" : "rgba(56, 189, 248, 0.3)",
          name: "Light Powder Blue",
          points: 5,
        };
      case 5:
        return {
          stroke: isDark ? "#e2e8f0" : "#64748b",
          glow: isDark ? "rgba(226, 232, 240, 0.7)" : "rgba(100, 116, 139, 0.3)",
          name: "Luminous Obsidian Pearl",
          points: 7,
        };
      case 6:
        return {
          stroke: isDark ? "#cbd5e1" : "#94a3b8",
          glow: isDark ? "rgba(203, 213, 225, 0.55)" : "rgba(148, 163, 184, 0.25)",
          name: "Soft Platinum Slate",
          points: 7,
        };
      case 7:
        return {
          stroke: isDark ? "#ffffff" : "#475569",
          glow: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(71, 85, 105, 0.35)",
          name: "Diamond White",
          points: 8,
        };
      case 8:
      default:
        return {
          stroke: isDark ? "#fde047" : "#eab308",
          glow: isDark ? "rgba(253, 224, 71, 0.85)" : "rgba(234, 179, 8, 0.4)",
          name: "Royal Champagne Gold",
          points: 8,
        };
    }
  }

  // Branch 2: Mint Green (3) -> Rose Pink (6) -> Luminous Obsidian (7) -> Diamond White (8)
  switch (clampedLevel) {
    case 1:
      return {
        stroke: isDark ? "#34d399" : "#10b981",
        glow: isDark ? "rgba(52, 211, 153, 0.7)" : "rgba(16, 185, 129, 0.35)",
        name: "Glowing Mint Green",
        points: 3,
      };
    case 2:
      return {
        stroke: isDark ? "#6ee7b7" : "#34d399",
        glow: isDark ? "rgba(110, 231, 183, 0.55)" : "rgba(52, 211, 153, 0.3)",
        name: "Light Seafoam Green",
        points: 3,
      };
    case 3:
      return {
        stroke: isDark ? "#f472b6" : "#ec4899",
        glow: isDark ? "rgba(244, 114, 182, 0.7)" : "rgba(236, 72, 153, 0.35)",
        name: "Glowing Rose Pink",
        points: 6,
      };
    case 4:
      return {
        stroke: isDark ? "#fbcfe8" : "#f472b6",
        glow: isDark ? "rgba(251, 207, 232, 0.55)" : "rgba(244, 114, 182, 0.3)",
        name: "Light Sakura Pink",
        points: 6,
      };
    case 5:
      return {
        stroke: isDark ? "#e2e8f0" : "#64748b",
        glow: isDark ? "rgba(226, 232, 240, 0.7)" : "rgba(100, 116, 139, 0.3)",
        name: "Luminous Obsidian Pearl",
        points: 7,
      };
    case 6:
      return {
        stroke: isDark ? "#cbd5e1" : "#94a3b8",
        glow: isDark ? "rgba(203, 213, 225, 0.55)" : "rgba(148, 163, 184, 0.25)",
        name: "Soft Platinum Slate",
        points: 7,
      };
    case 7:
      return {
        stroke: isDark ? "#ffffff" : "#475569",
        glow: isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(71, 85, 105, 0.35)",
        name: "Diamond White",
        points: 8,
      };
    case 8:
    default:
      return {
        stroke: isDark ? "#fde047" : "#eab308",
        glow: isDark ? "rgba(253, 224, 71, 0.85)" : "rgba(234, 179, 8, 0.4)",
        name: "Royal Champagne Gold",
        points: 8,
      };
  }
}

/**
 * Standard width for grouped concept cards (up to 50 characters of text per item row)
 */
export const GROUP_CARD_WIDTH = 500;

/**
 * Calculates anchor point on the right end of a Group Card for an item row.
 */
export function getCardItemAnchor(
  card: PositionedGroupCard,
  itemIndex: number,
  totalItems: number
): { x: number; y: number } {
  const itemHeight = 36;
  const startY = -(totalItems * itemHeight) / 2 + 18;
  const itemY = Math.round(card.y + startY + itemIndex * itemHeight);
  const anchorX = card.x + Math.round(GROUP_CARD_WIDTH / 2); // Right end of card (width 500px -> +250px from center)
  return { x: anchorX, y: itemY };
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

  let r1 = 280;
  let r2 = 560;
  let r3 = 840;

  if (category === "scope") {
    r1 = 260;
    r2 = 500;
    r3 = 700;
  } else if (category === "node") {
    r1 = 300;
    r2 = 600;
    r3 = 880;
  } else if (category === "oop") {
    r1 = 260;
    r2 = 520;
    r3 = 740;
  } else if (category === "dsa") {
    r1 = 300;
    r2 = 600;
    r3 = 880;
  } else if (category === "all") {
    r1 = 480;
    r2 = 920;
    r3 = 1360;
  }

  // Allocate angular sectors to Level 1 nodes (360 / l1Count)
  l1Children.forEach((l1, i) => {
    const branchIndex = i % 3; // 0: Red, 1: Yellow, 2: Green
    const angle = (2 * Math.PI * i) / l1Count - Math.PI / 2;
    const x1 = Math.round(Math.cos(angle) * r1);
    const y1 = Math.round(Math.sin(angle) * r1);

    positioned.set(l1.id, {
      ...l1,
      x: x1,
      y: y1,
      branchIndex,
    });

    edges.push({
      source: rootNode.id,
      target: l1.id,
      category: l1.category,
      level: 1,
      branchIndex,
    });

    // Level 2 children under this Level 1
    const l2Children = childMap.get(l1.id) || [];
    const l2Count = l2Children.length;

    if (l2Count > 0) {
      const spread = Math.min(((2 * Math.PI) / l1Count) * 0.95, Math.PI * 0.85);
      const startAngle = angle - spread / 2;

      l2Children.forEach((l2, j) => {
        const step = l2Count === 1 ? 0.5 : j / (l2Count - 1);
        const l2Angle = l2Count === 1 ? angle : startAngle + step * spread;

        const staggeredR2 = r2 + (j % 2 === 1 ? 40 : -20);
        const x2 = Math.round(Math.cos(l2Angle) * staggeredR2);
        const y2 = Math.round(Math.sin(l2Angle) * staggeredR2);

        positioned.set(l2.id, {
          ...l2,
          x: x2,
          y: y2,
          branchIndex,
        });

        edges.push({
          source: l1.id,
          target: l2.id,
          category: l2.category,
          level: 2,
          branchIndex,
        });

        // Level 3 children under this Level 2
        const l3Children = childMap.get(l2.id) || [];
        const l3Count = l3Children.length;

        if (l3Count > 0) {
          const l3Spread = Math.min((spread / (l2Count || 1)) * 1.2, 0.45);
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
              branchIndex,
            });

            edges.push({
              source: l2.id,
              target: l3.id,
              category: l3.category,
              level: 3,
              branchIndex,
            });
          });
        }
      });
    }
  });

  // Calculate outgoing branch count for each node
  const outgoingCountMap = new Map<string, number>();
  edges.forEach((edge) => {
    outgoingCountMap.set(edge.source, (outgoingCountMap.get(edge.source) || 0) + 1);
  });
  positioned.forEach((n) => {
    n.branchCount = outgoingCountMap.get(n.id) || 0;
  });

  const posNodes = Array.from(positioned.values());
  preventLayoutOverlaps(posNodes, []);

  return {
    nodes: posNodes,
    edges,
  };
}

/**
 * Calculates hierarchical Top-to-Bottom Tree layout.
 */
export function calculateTreeLayout(
  nodes: SpiderNode[],
  rootId: string
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

  const yLevel0 = -320;
  const yLevel1 = -130;
  const yLevel2 = 90;
  const yLevel3 = 320;

  function countLeaves(nodeId: string): number {
    const children = childMap.get(nodeId) || [];
    if (children.length === 0) return 1;
    let sum = 0;
    for (const child of children) {
      sum += countLeaves(child.id);
    }
    return sum;
  }

  const leafSpacing = 240;
  const totalLeaves = countLeaves(rootNode.id);
  const totalWidth = totalLeaves * leafSpacing;
  let currentLeafX = -Math.round(totalWidth / 2) + Math.round(leafSpacing / 2);

  function layoutSubtree(node: SpiderNode, currentLevel: number, branchIndex?: number): number {
    const children = childMap.get(node.id) || [];
    let yPos = yLevel0;
    if (currentLevel === 1) yPos = yLevel1;
    else if (currentLevel === 2) yPos = yLevel2;
    else if (currentLevel >= 3) yPos = yLevel3;

    if (children.length === 0) {
      const nodeX = currentLeafX;
      currentLeafX += leafSpacing;
      positioned.set(node.id, {
        ...node,
        x: nodeX,
        y: yPos,
        branchIndex,
      });
      return nodeX;
    }

    const childXPositions: number[] = [];
    children.forEach((child, idx) => {
      const childBranch = currentLevel === 0 ? idx % 3 : branchIndex;
      edges.push({
        source: node.id,
        target: child.id,
        category: child.category,
        level: currentLevel + 1,
        branchIndex: childBranch,
      });
      const cX = layoutSubtree(child, currentLevel + 1, childBranch);
      childXPositions.push(cX);
    });

    const firstX = childXPositions[0];
    const lastX = childXPositions[childXPositions.length - 1];
    const nodeX = Math.round((firstX + lastX) / 2);

    positioned.set(node.id, {
      ...node,
      x: nodeX,
      y: yPos,
      branchIndex,
    });

    return nodeX;
  }

  layoutSubtree(rootNode, 0);

  // Calculate outgoing branch count for each node
  const outgoingCountMap = new Map<string, number>();
  edges.forEach((edge) => {
    outgoingCountMap.set(edge.source, (outgoingCountMap.get(edge.source) || 0) + 1);
  });
  positioned.forEach((n) => {
    n.branchCount = outgoingCountMap.get(n.id) || 0;
  });

  const posNodes = Array.from(positioned.values());
  preventLayoutOverlaps(posNodes, []);

  return {
    nodes: posNodes,
    edges,
  };
}

/**
 * Calculates Group / Codrin View:
 * STRICT RULE APPLIED AT EVERY LEVEL (Root -> Children -> Grandchildren):
 * - Exactly 3 main connections from the center parent circle (360° / 3 = 120°).
 * - Up to 3 children (<= 3): remain individual KEYWORD NODES.
 * - More than 3 children (> 3): grouped into a single CARD STACK.
 * - From the right end of a card: sub-items (<= 3) branch out as individual keyword nodes via threads!
 */
/**
 * Helper to branch out sub-items from a card's right socket anchor ports
 */
function layoutCardSubItems(
  positionedCard: PositionedGroupCard,
  positionedNodes: PositionedNode[],
  edges: Edge[],
  level: number,
  branchIndex: number
) {
  const totalItems = positionedCard.items.length;
  positionedCard.items.forEach((item, itemIdx) => {
    const subCount = item.subItems?.length || 0;
    if (subCount > 0) {
      const anchor = getCardItemAnchor(positionedCard, itemIdx, totalItems);
      const lineLength = 110;
      const leftEdgeX = anchor.x + lineLength;

      item.subItems!.forEach((sub, sIdx) => {
        const estimatedWidth =
          46 +
          Math.round(sub.label.length * 6.8) +
          (sub.badge ? Math.round(sub.badge.length * 5.5 + 10) : 0);
        const nodeX = Math.round(leftEdgeX + estimatedWidth / 2);

        let nodeY = anchor.y;
        if (subCount === 2) {
          nodeY = anchor.y + (sIdx === 0 ? -20 : 20);
        } else if (subCount === 3) {
          nodeY = anchor.y + (sIdx === 0 ? -32 : sIdx === 1 ? 0 : 32);
        } else if (subCount > 3) {
          nodeY = anchor.y + Math.round((sIdx - (subCount - 1) / 2) * 26);
        }

        const subKeywordNode: PositionedNode = {
          id: sub.id,
          label: sub.label,
          category: positionedCard.category,
          parentId: item.id,
          level,
          badge: sub.badge,
          searchQuery: sub.searchQuery,
          color: positionedCard.color,
          x: nodeX,
          y: nodeY,
          cardParentId: positionedCard.id,
          branchIndex,
        };
        positionedNodes.push(subKeywordNode);

        edges.push({
          source: `${positionedCard.id}:${item.id}`,
          target: sub.id,
          category: positionedCard.category,
          level,
          cardId: positionedCard.id,
          itemIndex: itemIdx,
          totalItems,
          branchIndex,
        });
      });
    }
  });
}

/**
 * Automated AABB overlap prevention & dynamic distribution engine.
 * Ensures that even as cards or nodes grow in item count or text length,
 * everything distributes freely across the infinite 2D canvas with zero overlaps.
 */
export function preventLayoutOverlaps(
  nodes: PositionedNode[],
  cards: PositionedGroupCard[]
): void {
  if (nodes.length === 0 && cards.length === 0) return;

  // Build parent -> children map for keyword nodes to preserve subtree structures
  const childrenMap = new Map<string, string[]>();
  nodes.forEach((n) => {
    if (n.parentId && !n.cardParentId) {
      const list = childrenMap.get(n.parentId) || [];
      list.push(n.id);
      childrenMap.set(n.parentId, list);
    }
  });

  // Helper to get all descendant node IDs of a node
  const getSubtreeDescendants = (rootId: string): string[] => {
    const result: string[] = [];
    const queue = [rootId];
    while (queue.length > 0) {
      const curr = queue.shift()!;
      const children = childrenMap.get(curr);
      if (children) {
        for (const childId of children) {
          result.push(childId);
          queue.push(childId);
        }
      }
    }
    return result;
  };

  const nodeMap = new Map<string, PositionedNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const shiftNodeSubtree = (nodeId: string, dx: number, dy: number) => {
    const node = nodeMap.get(nodeId);
    if (!node) return;
    node.x += dx;
    node.y += dy;
    const descendants = getSubtreeDescendants(nodeId);
    for (const dId of descendants) {
      const dNode = nodeMap.get(dId);
      if (dNode) {
        dNode.x += dx;
        dNode.y += dy;
      }
    }
  };

  // Accurate AABB bounds calculation for Group Cards including all attached right-hand socket sub-nodes
  const getCardBounds = (card: PositionedGroupCard) => {
    const hasSubItems = card.items.some((it) => it.subItems && it.subItems.length > 0);
    let maxSubWidth = 0;
    if (hasSubItems) {
      card.items.forEach((it) => {
        it.subItems?.forEach((sub) => {
          const w = 46 + Math.round(sub.label.length * 7.5) + (sub.badge ? Math.round(sub.badge.length * 6 + 10) : 0);
          if (w > maxSubWidth) maxSubWidth = w;
        });
      });
    }

    const leftMargin = 45;
    const rightMargin = 45;
    const minX = card.x - GROUP_CARD_WIDTH / 2 - leftMargin;
    const maxX = hasSubItems
      ? card.x + GROUP_CARD_WIDTH / 2 + 110 + maxSubWidth + rightMargin
      : card.x + GROUP_CARD_WIDTH / 2 + rightMargin;

    const cardHeight = Math.max(260, 70 + card.items.length * 38);
    const topMargin = 45;
    const bottomMargin = 45;
    const minY = card.y - cardHeight / 2 - topMargin;
    const maxY = card.y + cardHeight / 2 + bottomMargin;

    const width = maxX - minX;
    const height = maxY - minY;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    return {
      minX,
      maxX,
      minY,
      maxY,
      centerX,
      centerY,
      halfW: width / 2,
      halfH: height / 2,
    };
  };

  // Accurate AABB bounds for Standalone Keyword Nodes
  const getNodeBounds = (node: PositionedNode) => {
    const w = Math.max(160, 46 + node.label.length * 7.5 + (node.badge ? node.badge.length * 6 : 0));
    const h = 54;
    const marginX = 35;
    const marginY = 30;
    return {
      minX: node.x - w / 2 - marginX,
      maxX: node.x + w / 2 + marginX,
      minY: node.y - h / 2 - marginY,
      maxY: node.y + h / 2 + marginY,
      centerX: node.x,
      centerY: node.y,
      halfW: w / 2 + marginX,
      halfH: h / 2 + marginY,
    };
  };

  // Anchor nodes that should remain fixed at their designated hub positions
  const isFixedAnchorNode = (id: string, level?: number) => {
    return (
      id === "root-all" ||
      id === "root-js-core" ||
      id === "root-node" ||
      id === "root-cs-foundations" ||
      level === 0
    );
  };

  // Run up to 35 relaxation passes
  for (let iter = 0; iter < 35; iter++) {
    let hadCollision = false;

    // 1. CARD vs CARD separation
    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        const cA = cards[i];
        const cB = cards[j];
        const bA = getCardBounds(cA);
        const bB = getCardBounds(cB);

        const dx = bB.centerX - bA.centerX;
        const dy = bB.centerY - bA.centerY;
        const overlapX = bA.halfW + bB.halfW - Math.abs(dx);
        const overlapY = bA.halfH + bB.halfH - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
          hadCollision = true;
          if (overlapX < overlapY) {
            const shift = Math.ceil(overlapX / 2 + 30);
            const sign = dx >= 0 ? 1 : -1;
            cA.x -= shift * sign;
            cB.x += shift * sign;
          } else {
            const shift = Math.ceil(overlapY / 2 + 30);
            const sign = dy >= 0 ? 1 : -1;
            cA.y -= shift * sign;
            cB.y += shift * sign;
          }
        }
      }
    }

    // 2. CARD vs STANDALONE KEYWORD NODE separation
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const bCard = getCardBounds(card);

      for (let j = 0; j < nodes.length; j++) {
        const node = nodes[j];
        if (node.cardParentId) continue;
        if (isFixedAnchorNode(node.id, node.level)) continue;

        const bNode = getNodeBounds(node);
        const dx = bNode.centerX - bCard.centerX;
        const dy = bNode.centerY - bCard.centerY;
        const overlapX = bCard.halfW + bNode.halfW - Math.abs(dx);
        const overlapY = bCard.halfH + bNode.halfH - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
          hadCollision = true;
          if (overlapX < overlapY) {
            const shift = Math.ceil(overlapX + 35);
            const sign = dx >= 0 ? 1 : -1;
            shiftNodeSubtree(node.id, shift * sign, 0);
          } else {
            const shift = Math.ceil(overlapY + 35);
            const sign = dy >= 0 ? 1 : -1;
            shiftNodeSubtree(node.id, 0, shift * sign);
          }
        }
      }
    }

    // 3. STANDALONE NODE vs STANDALONE NODE separation
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nA = nodes[i];
        const nB = nodes[j];
        if (nA.cardParentId || nB.cardParentId) continue;
        if (nA.parentId === nB.id || nB.parentId === nA.id) continue;

        const bA = getNodeBounds(nA);
        const bB = getNodeBounds(nB);
        const dx = bB.centerX - bA.centerX;
        const dy = bB.centerY - bA.centerY;
        const overlapX = bA.halfW + bB.halfW - Math.abs(dx);
        const overlapY = bA.halfH + bB.halfH - Math.abs(dy);

        if (overlapX > 0 && overlapY > 0) {
          hadCollision = true;
          const aFixed = isFixedAnchorNode(nA.id, nA.level);
          const bFixed = isFixedAnchorNode(nB.id, nB.level);

          if (aFixed && !bFixed) {
            if (overlapX < overlapY) {
              const shift = Math.ceil(overlapX + 25);
              const sign = dx >= 0 ? 1 : -1;
              shiftNodeSubtree(nB.id, shift * sign, 0);
            } else {
              const shift = Math.ceil(overlapY + 25);
              const sign = dy >= 0 ? 1 : -1;
              shiftNodeSubtree(nB.id, 0, shift * sign);
            }
          } else if (!aFixed && bFixed) {
            if (overlapX < overlapY) {
              const shift = Math.ceil(overlapX + 25);
              const sign = dx >= 0 ? -1 : 1;
              shiftNodeSubtree(nA.id, shift * sign, 0);
            } else {
              const shift = Math.ceil(overlapY + 25);
              const sign = dy >= 0 ? -1 : 1;
              shiftNodeSubtree(nA.id, 0, shift * sign);
            }
          } else if (!aFixed && !bFixed) {
            if (overlapX < overlapY) {
              const shift = Math.ceil(overlapX / 2 + 18);
              const sign = dx >= 0 ? 1 : -1;
              shiftNodeSubtree(nA.id, -shift * sign, 0);
              shiftNodeSubtree(nB.id, shift * sign, 0);
            } else {
              const shift = Math.ceil(overlapY / 2 + 18);
              const sign = dy >= 0 ? 1 : -1;
              shiftNodeSubtree(nA.id, 0, -shift * sign);
              shiftNodeSubtree(nB.id, 0, shift * sign);
            }
          }
        }
      }
    }

    if (!hadCollision) break;
  }

  // 4. Finally, synchronize all card-attached sub-nodes to their moved card's anchor ports
  cards.forEach((card) => {
    const totalItems = card.items.length;
    card.items.forEach((item, itemIdx) => {
      const subCount = item.subItems?.length || 0;
      if (subCount > 0) {
        const anchor = getCardItemAnchor(card, itemIdx, totalItems);
        const lineLength = 110;
        const leftEdgeX = anchor.x + lineLength;

        item.subItems!.forEach((sub, sIdx) => {
          const subNode = nodeMap.get(sub.id);
          if (subNode && subNode.cardParentId === card.id) {
            const estimatedWidth =
              46 +
              Math.round(sub.label.length * 6.8) +
              (sub.badge ? Math.round(sub.badge.length * 5.5 + 10) : 0);
            subNode.x = Math.round(leftEdgeX + estimatedWidth / 2);
            let nodeY = anchor.y;
            if (subCount === 2) {
              nodeY = anchor.y + (sIdx === 0 ? -20 : 20);
            } else if (subCount === 3) {
              nodeY = anchor.y + (sIdx === 0 ? -32 : sIdx === 1 ? 0 : 32);
            } else if (subCount > 3) {
              nodeY = anchor.y + Math.round((sIdx - (subCount - 1) / 2) * 26);
            }
            subNode.y = nodeY;
          }
        });
      }
    });
  });
}

/**
 * Calculates positions for Group View (Concepts with > 3 items become Group Cards).
 * In All Concepts view, radiates strictly 3 primary branches with non-overlapping sectors.
 */
export function calculateGroupLayout(
  allNodes: SpiderNode[],
  category: ConceptCategory,
  overrideBranchIndex?: number,
  baseLevelOffset: number = 0
): {
  rootNode: PositionedNode;
  nodes: PositionedNode[];
  cards: PositionedGroupCard[];
  edges: Edge[];
} {
  const positionedNodes: PositionedNode[] = [];
  const positionedCards: PositionedGroupCard[] = [];
  const edges: Edge[] = [];

  const availableCards = getGroupCardsForCategory(category);
  const cardByPillar = new Map<string, GroupCardData>();
  availableCards.forEach((c) => cardByPillar.set(c.pillarId, c));

  let rootId = `root-${category}`;
  if (category === "all") rootId = "root-all";

  const rawRoot = allNodes.find((n) => n.id === rootId) || {
    id: rootId,
    label:
      category === "v8"
        ? "V8 Engine"
        : category === "scope"
        ? "Scope & Closures"
        : category === "node"
        ? "Node.js Runtime"
        : category === "oop"
        ? "OOP (4 Pillars)"
        : category === "dsa"
        ? "DSA & Big O"
        : "Node.js + JavaScript",
    category: category === "all" ? "root" : category,
    level: 0,
    badge: "Core Hub",
    color: "#f59e0b",
  };

  const rootNode: PositionedNode = {
    ...rawRoot,
    x: 0,
    y: 0,
  };
  positionedNodes.push(rootNode);

  if (category === "all") {
    // Center Hub: MASTER UNIVERSE (Node.js + JavaScript)
    // Radiates STRICTLY 3 primary branches (120° Triad) with infinite open canvas spacing:
    // - Branch 0: JavaScript & V8 Core (Left & Top-Left) -> Red (branch 0)
    // - Branch 1: Node.js Runtime (Right & Top-Right) -> Yellow (branch 1)
    // - Branch 2: CS Foundations (OOP & DSA) (Bottom) -> Green (branch 2)

    // ==========================================
    // BRANCH 0: JAVASCRIPT & V8 CORE (Red, branch 0)
    // ==========================================
    const jsCoreX = -750;
    const jsCoreY = -120;
    const jsCoreNode: PositionedNode = {
      id: "root-js-core",
      label: "JavaScript & V8 Core",
      category: "root",
      level: 1,
      badge: "Language & Engine",
      color: "#ff6b6b",
      searchQuery: "JavaScript language core V8 engine scope closures",
      x: jsCoreX,
      y: jsCoreY,
      branchIndex: 0,
    };
    positionedNodes.push(jsCoreNode);
    edges.push({
      source: rootNode.id,
      target: jsCoreNode.id,
      category: "root",
      level: 1,
      branchIndex: 0,
    });

    // Sub-Branch 0A: V8 Engine Hub (North-West)
    const v8HubX = -1450;
    const v8HubY = -700;
    const v8HubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-v8")!,
      x: v8HubX,
      y: v8HubY,
      level: 2,
      branchIndex: 0,
    };
    positionedNodes.push(v8HubNode);
    edges.push({
      source: jsCoreNode.id,
      target: v8HubNode.id,
      category: "v8",
      level: 2,
      branchIndex: 0,
    });

    // V8 Card 1: JavaScript Execution Pipeline (9 steps) -> Outer North-West
    const v8ExecCard = cardByPillar.get("v8-js-exec");
    if (v8ExecCard) {
      const cardX = -2400;
      const cardY = -1050;
      const posCard: PositionedGroupCard = {
        ...v8ExecCard,
        x: cardX,
        y: cardY,
        branchIndex: 0,
      };
      positionedCards.push(posCard);
      edges.push({
        source: v8HubNode.id,
        target: v8ExecCard.id,
        category: "v8",
        level: 3,
        branchIndex: 0,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 0);
    }

    // V8 Node 2: Memory (Heap & GC) -> North from v8HubNode
    const memNodeRaw = allNodes.find((n) => n.id === "v8-memory");
    if (memNodeRaw) {
      const memX = -1450;
      const memY = -1250;
      const memNode: PositionedNode = {
        ...memNodeRaw,
        x: memX,
        y: memY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(memNode);
      edges.push({
        source: v8HubNode.id,
        target: memNode.id,
        category: "v8",
        level: 3,
        branchIndex: 0,
      });

      const heapRaw = allNodes.find((n) => n.id === "v8-heap");
      if (heapRaw) {
        positionedNodes.push({
          ...heapRaw,
          x: memX - 250,
          y: memY - 60,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: memNode.id,
          target: heapRaw.id,
          category: "v8",
          level: 4,
          branchIndex: 0,
        });
      }

      const gcRaw = allNodes.find((n) => n.id === "v8-gc");
      if (gcRaw) {
        positionedNodes.push({
          ...gcRaw,
          x: memX + 250,
          y: memY - 60,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: memNode.id,
          target: gcRaw.id,
          category: "v8",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // V8 Card 3: Execution Stack & Context (4 items) -> West from v8HubNode
    const v8StackCard = cardByPillar.get("v8-stack-pillar");
    if (v8StackCard) {
      const cardX = -2400;
      const cardY = -450;
      const posCard: PositionedGroupCard = {
        ...v8StackCard,
        x: cardX,
        y: cardY,
        branchIndex: 0,
      };
      positionedCards.push(posCard);
      edges.push({
        source: v8HubNode.id,
        target: v8StackCard.id,
        category: "v8",
        level: 3,
        branchIndex: 0,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 0);
    }

    // Sub-Branch 0B: Scope & Closures Hub (placed down-left)
    const scopeHubX = -1450;
    const scopeHubY = 400;
    const scopeHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-scope")!,
      x: scopeHubX,
      y: scopeHubY,
      level: 2,
      branchIndex: 0,
    };
    positionedNodes.push(scopeHubNode);
    edges.push({
      source: jsCoreNode.id,
      target: scopeHubNode.id,
      category: "scope",
      level: 2,
      branchIndex: 0,
    });

    // Scope Node 1: Scope & Scope Chain
    const scopeNodeRaw = allNodes.find((n) => n.id === "scope-scope");
    if (scopeNodeRaw) {
      const scX = -2100;
      const scY = 160;
      const scNode: PositionedNode = {
        ...scopeNodeRaw,
        x: scX,
        y: scY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(scNode);
      edges.push({
        source: scopeHubNode.id,
        target: scNode.id,
        category: "scope",
        level: 3,
        branchIndex: 0,
      });

      const lexRaw = allNodes.find((n) => n.id === "scope-lexical");
      if (lexRaw) {
        positionedNodes.push({
          ...lexRaw,
          x: scX - 320,
          y: scY - 50,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: scNode.id,
          target: lexRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }

      const chainRaw = allNodes.find((n) => n.id === "scope-chain");
      if (chainRaw) {
        const chX = scX - 320;
        const chY = scY + 50;
        positionedNodes.push({
          ...chainRaw,
          x: chX,
          y: chY,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: scNode.id,
          target: chainRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });

        const orderRaw = allNodes.find((n) => n.id === "scope-chain-order");
        if (orderRaw) {
          positionedNodes.push({
            ...orderRaw,
            x: chX - 320,
            y: chY,
            level: 5,
            branchIndex: 0,
          });
          edges.push({
            source: chainRaw.id,
            target: orderRaw.id,
            category: "scope",
            level: 5,
            branchIndex: 0,
          });
        }
      }
    }

    // Scope Node 2: Lexical Environment
    const lexEnvRaw = allNodes.find((n) => n.id === "scope-lexical-env");
    if (lexEnvRaw) {
      const leX = -2100;
      const leY = 400;
      const leNode: PositionedNode = {
        ...lexEnvRaw,
        x: leX,
        y: leY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(leNode);
      edges.push({
        source: scopeHubNode.id,
        target: leNode.id,
        category: "scope",
        level: 3,
        branchIndex: 0,
      });
    }

    // Scope Node 3: Closure
    const closureRaw = allNodes.find((n) => n.id === "scope-closure");
    if (closureRaw) {
      const clX = -2100;
      const clY = 640;
      const clNode: PositionedNode = {
        ...closureRaw,
        x: clX,
        y: clY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(clNode);
      edges.push({
        source: scopeHubNode.id,
        target: clNode.id,
        category: "scope",
        level: 3,
        branchIndex: 0,
      });

      const detailRaw = allNodes.find((n) => n.id === "scope-closure-detail");
      if (detailRaw) {
        positionedNodes.push({
          ...detailRaw,
          x: clX - 320,
          y: clY - 60,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: clNode.id,
          target: detailRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }

      const backpackRaw = allNodes.find((n) => n.id === "scope-backpack");
      if (backpackRaw) {
        positionedNodes.push({
          ...backpackRaw,
          x: clX - 320,
          y: clY,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: clNode.id,
          target: backpackRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }

      const sentRaw = allNodes.find((n) => n.id === "scope-5-sentences");
      if (sentRaw) {
        positionedNodes.push({
          ...sentRaw,
          x: clX - 320,
          y: clY + 60,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: clNode.id,
          target: sentRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // ==========================================
    // BRANCH 1: NODE.JS RUNTIME (Yellow, branch 1)
    // ==========================================
    const nodeHubX = 750;
    const nodeHubY = -120;
    const nodeHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-node")!,
      x: nodeHubX,
      y: nodeHubY,
      level: 1,
      branchIndex: 1,
    };
    positionedNodes.push(nodeHubNode);
    edges.push({
      source: rootNode.id,
      target: nodeHubNode.id,
      category: "node",
      level: 1,
      branchIndex: 1,
    });

    // 1. The Restaurant Cast (Group Card, 6 items) -> Top-Right
    const restCard = cardByPillar.get("node-restaurant-pillar");
    if (restCard) {
      const cardX = 1750;
      const cardY = -800;
      const posCard: PositionedGroupCard = {
        ...restCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: nodeHubNode.id,
        target: restCard.id,
        category: "node",
        level: 2,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 1);
    }

    // 2. Node.js Built-in APIs (Group Card, 4 items) -> Right
    const apisCard = cardByPillar.get("node-apis-pillar");
    if (apisCard) {
      const cardX = 1750;
      const cardY = -200;
      const posCard: PositionedGroupCard = {
        ...apisCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: nodeHubNode.id,
        target: apisCard.id,
        category: "node",
        level: 2,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 1);
    }

    // 3. Event Loop & libuv (Engine Hub Keyword Node) -> Down-Right
    const elHubX = 1400;
    const elHubY = 450;
    const elHubNode: PositionedNode = {
      id: "node-eventloop-pillar",
      label: "Event Loop & libuv",
      category: "node",
      level: 2,
      badge: "Coordinator",
      color: "#22c55e",
      searchQuery: "Node.js Event Loop explained coordinator libuv",
      x: elHubX,
      y: elHubY,
      branchIndex: 1,
    };
    positionedNodes.push(elHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: elHubNode.id,
      category: "node",
      level: 2,
      branchIndex: 1,
    });

    // libuv Infrastructure Card -> placed at x = 2250, y = 280
    const libuvCard = cardByPillar.get("node-libuv-pillar");
    if (libuvCard) {
      const cardX = 2250;
      const cardY = 280;
      const posCard: PositionedGroupCard = {
        ...libuvCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: elHubNode.id,
        target: libuvCard.id,
        category: "node",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Event Loop 5 Phases Card -> placed at x = 2250, y = 850
    const phasesCard = cardByPillar.get("node-phases-pillar");
    if (phasesCard) {
      const cardX = 2250;
      const cardY = 850;
      const posCard: PositionedGroupCard = {
        ...phasesCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: elHubNode.id,
        target: phasesCard.id,
        category: "node",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // ==========================================
    // BRANCH 2: CS FOUNDATIONS (OOP & DSA) (Green, branch 2)
    // ==========================================
    const csFoundX = 0;
    const csFoundY = 750;
    const csFoundNode: PositionedNode = {
      id: "root-cs-foundations",
      label: "CS Foundations",
      category: "root",
      level: 1,
      badge: "OOP & DSA",
      color: "#10b981",
      searchQuery: "Computer Science Foundations OOP Data Structures Algorithms Big O",
      x: csFoundX,
      y: csFoundY,
      branchIndex: 2,
    };
    positionedNodes.push(csFoundNode);
    edges.push({
      source: rootNode.id,
      target: csFoundNode.id,
      category: "root",
      level: 1,
      branchIndex: 2,
    });

    // 1. OOP 4 Pillars & Analogies (Card) -> Bottom-Left (-1200px)
    const oopCard = cardByPillar.get("oop-pillars-pillar");
    if (oopCard) {
      const cardX = -1200;
      const cardY = 1450;
      const posCard: PositionedGroupCard = {
        ...oopCard,
        x: cardX,
        y: cardY,
        branchIndex: 2,
      };
      positionedCards.push(posCard);
      edges.push({
        source: csFoundNode.id,
        target: oopCard.id,
        category: "oop",
        level: 2,
        branchIndex: 2,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 2);
    }

    // 2. Data Structures & Stories (Card) -> Bottom-Center (0px)
    const dsCard = cardByPillar.get("dsa-structures-pillar");
    if (dsCard) {
      const cardX = 0;
      const cardY = 1600;
      const posCard: PositionedGroupCard = {
        ...dsCard,
        x: cardX,
        y: cardY,
        branchIndex: 2,
      };
      positionedCards.push(posCard);
      edges.push({
        source: csFoundNode.id,
        target: dsCard.id,
        category: "dsa",
        level: 2,
        branchIndex: 2,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 2);
    }

    // 3. Big O Time Complexity (Card) -> Bottom-Right (+1250px)
    const bigOCard = cardByPillar.get("dsa-big-o-pillar");
    if (bigOCard) {
      const cardX = 1250;
      const cardY = 1450;
      const posCard: PositionedGroupCard = {
        ...bigOCard,
        x: cardX,
        y: cardY,
        branchIndex: 2,
      };
      positionedCards.push(posCard);
      edges.push({
        source: csFoundNode.id,
        target: bigOCard.id,
        category: "dsa",
        level: 2,
        branchIndex: 2,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 2);
    }

    // Automated overlap prevention relaxation pass
    preventLayoutOverlaps(positionedNodes, positionedCards);

    // Calculate outgoing branch count for each node in All Concepts view
    const outgoingCountMap = new Map<string, number>();
    edges.forEach((edge) => {
      if (!edge.source.includes(":")) {
        outgoingCountMap.set(edge.source, (outgoingCountMap.get(edge.source) || 0) + 1);
      }
    });

    positionedNodes.forEach((n) => {
      n.branchCount = outgoingCountMap.get(n.id) || 0;
    });
    rootNode.branchCount = outgoingCountMap.get(rootNode.id) || 0;

    return {
      rootNode,
      nodes: positionedNodes,
      cards: positionedCards,
      edges,
    };
  }

  // Level 1 Pillars for each category (strictly max 3 pillars per hub!)
  let pillarIds: string[] = [];
  if (category === "v8") {
    pillarIds = ["v8-js-exec", "v8-memory", "v8-stack-pillar"];
  } else if (category === "scope") {
    pillarIds = ["scope-scope", "scope-lexical-env", "scope-closure"];
  } else if (category === "node") {
    pillarIds = ["node-restaurant-pillar", "node-apis-pillar", "node-eventloop-pillar"];
  } else if (category === "oop") {
    pillarIds = ["oop-pillars-pillar"];
  } else if (category === "dsa") {
    pillarIds = ["dsa-structures-pillar", "dsa-big-o-pillar"];
  }

  const pillarCount = pillarIds.length || 1;
  const r1 = 340;

  pillarIds.forEach((pId, i) => {
    const rawPillar = allNodes.find((n) => n.id === pId);
    if (!rawPillar) return;

    const branchIndex = overrideBranchIndex !== undefined ? overrideBranchIndex : i;
    const l1 = 1 + baseLevelOffset;
    const l2 = 2 + baseLevelOffset;
    const l3 = 3 + baseLevelOffset;

    // Distribute angles evenly around 360° (360° / 3 = 120°): -90°, 30°, 150°
    const angle = (2 * Math.PI * i) / pillarCount - Math.PI / 2;

    // Check if this Level 1 pillar has a Group Card (children > 3)
    const cardData = cardByPillar.get(pId);
    if (cardData) {
      // Group Card directly represents this pillar (> 3 items)
      // Connect rootNode DIRECTLY to the Group Card with 1 single thread!
      const rCard = r1 + (cardData.items.length > 6 ? 560 : 480);
      const cx = Math.round(Math.cos(angle) * rCard);
      const cy = Math.round(Math.sin(angle) * rCard);

      const positionedCard: PositionedGroupCard = {
        ...cardData,
        x: cx,
        y: cy,
        branchIndex,
      };
      positionedCards.push(positionedCard);

      edges.push({
        source: rootNode.id,
        target: cardData.id,
        category: cardData.category,
        level: l1,
        branchIndex,
      });

      layoutCardSubItems(positionedCard, positionedNodes, edges, l3, branchIndex);
    } else {
      // Pillar has <= 3 children: Render as keyword node!
      const px = Math.round(Math.cos(angle) * r1);
      const py = Math.round(Math.sin(angle) * r1);

      const pillarNode: PositionedNode = {
        ...rawPillar,
        x: px,
        y: py,
        level: l1,
        branchIndex,
      };
      positionedNodes.push(pillarNode);

      edges.push({
        source: rootNode.id,
        target: pillarNode.id,
        category: pillarNode.category,
        level: l1,
        branchIndex,
      });

      const children = allNodes.filter((n) => n.parentId === pId);
      const m = children.length;
      if (m > 0) {
        const hasChildCard = children.some((c) => cardByPillar.has(c.id));
        const spread = hasChildCard ? 1.8 : 0.85;
        const startAngle = m === 1 ? angle : angle - spread / 2;

        children.forEach((child, j) => {
          const step = m === 1 ? 0 : j / (m - 1);
          const childAngle = m === 1 ? angle : startAngle + step * spread;
          const r2 = r1 + 260;
          const c2x = Math.round(Math.cos(childAngle) * r2);
          const c2y = Math.round(Math.sin(childAngle) * r2);

          // Check if this child itself has a Group Card (> 3 items, e.g. Event Loop Phases)
          const childCardData = cardByPillar.get(child.id);
          if (childCardData) {
            const rChildCard = r1 + 600;
            const cardX = Math.round(Math.cos(childAngle) * rChildCard);
            const cardY = Math.round(Math.sin(childAngle) * rChildCard);

            const posChildCard: PositionedGroupCard = {
              ...childCardData,
              x: cardX,
              y: cardY,
              branchIndex,
            };
            positionedCards.push(posChildCard);

            edges.push({
              source: pillarNode.id,
              target: childCardData.id,
              category: childCardData.category,
              level: l2,
              branchIndex,
            });

            layoutCardSubItems(posChildCard, positionedNodes, edges, l3, branchIndex);
          } else {
            // Regular child without card
            const childNode: PositionedNode = {
              ...child,
              x: c2x,
              y: c2y,
              level: l2,
              branchIndex,
            };
            positionedNodes.push(childNode);

            edges.push({
              source: pillarNode.id,
              target: childNode.id,
              category: childNode.category,
              level: l2,
              branchIndex,
            });

            // Child has <= 3 children of its own (Level 3 keyword nodes)
            const subChildren = allNodes.filter((n) => n.parentId === child.id);
            const k = subChildren.length;
            if (k > 0) {
              const subSpread = 0.50;
              const subStartAngle = k === 1 ? childAngle : childAngle - subSpread / 2;

              subChildren.forEach((sub, sIdx) => {
                const subStep = k === 1 ? 0 : sIdx / (k - 1);
                const subAngle = k === 1 ? childAngle : subStartAngle + subStep * subSpread;
                const r3 = r2 + 200;
                const c3x = Math.round(Math.cos(subAngle) * r3);
                const c3y = Math.round(Math.sin(subAngle) * r3);

                const subNode: PositionedNode = {
                  ...sub,
                  x: c3x,
                  y: c3y,
                  level: l3,
                  branchIndex,
                };
                positionedNodes.push(subNode);

                edges.push({
                  source: childNode.id,
                  target: subNode.id,
                  category: subNode.category,
                  level: l3,
                  branchIndex,
                });
              });
            }
          }
        });
      }
    }
  });

  // Automated overlap prevention relaxation pass
  preventLayoutOverlaps(positionedNodes, positionedCards);

  // Calculate outgoing branch count for each node in single category view
  const outgoingCountMap = new Map<string, number>();
  edges.forEach((edge) => {
    if (!edge.source.includes(":")) {
      outgoingCountMap.set(edge.source, (outgoingCountMap.get(edge.source) || 0) + 1);
    }
  });

  positionedNodes.forEach((n) => {
    n.branchCount = outgoingCountMap.get(n.id) || 0;
  });
  rootNode.branchCount = outgoingCountMap.get(rootNode.id) || 0;

  return {
    rootNode,
    nodes: positionedNodes,
    cards: positionedCards,
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
    const rootAll = allNodes.find((n) => n.id === "root-all")!;
    const jsCoreRoot = {
      ...(allNodes.find((n) => n.id === "root-js-core") || {
        id: "root-js-core",
        label: "JavaScript & V8 Core",
        category: "root" as const,
        level: 1,
        searchQuery: "JavaScript language core V8 engine scope closures",
        badge: "Language & Engine",
        color: "#ff6b6b",
      }),
      parentId: "root-all",
      level: 1,
    };
    const nodeRoot = {
      ...allNodes.find((n) => n.id === "root-node")!,
      parentId: "root-all",
      level: 1,
    };
    const csFoundRoot = {
      ...(allNodes.find((n) => n.id === "root-cs-foundations") || {
        id: "root-cs-foundations",
        label: "CS Foundations",
        category: "root" as const,
        level: 1,
        searchQuery: "Computer Science Foundations OOP Data Structures Algorithms Big O",
        badge: "OOP & DSA",
        color: "#10b981",
      }),
      parentId: "root-all",
      level: 1,
    };

    const v8Root = {
      ...allNodes.find((n) => n.id === "root-v8")!,
      parentId: "root-js-core",
      level: 2,
    };
    const scopeRoot = {
      ...allNodes.find((n) => n.id === "root-scope")!,
      parentId: "root-js-core",
      level: 2,
    };
    const oopRoot = {
      ...allNodes.find((n) => n.id === "root-oop")!,
      parentId: "root-cs-foundations",
      level: 2,
    };
    const dsaRoot = {
      ...allNodes.find((n) => n.id === "root-dsa")!,
      parentId: "root-cs-foundations",
      level: 2,
    };

    const remaining = allNodes.filter(
      (n) =>
        n.id !== "root-all" &&
        n.id !== "root-js-core" &&
        n.id !== "root-cs-foundations" &&
        n.id !== "root-v8" &&
        n.id !== "root-scope" &&
        n.id !== "root-node" &&
        n.id !== "root-oop" &&
        n.id !== "root-dsa"
    );

    return {
      nodes: [rootAll, jsCoreRoot, nodeRoot, csFoundRoot, v8Root, scopeRoot, oopRoot, dsaRoot, ...remaining],
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
