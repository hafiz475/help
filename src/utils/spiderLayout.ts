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
 * Standard dimensions for grouped concept cards
 */
export const GROUP_CARD_WIDTH = 500;
export const GROUP_CARD_HEADER_HEIGHT = 46;
export const GROUP_CARD_FOOTER_HEIGHT = 28;
export const GROUP_CARD_ROW_HEIGHT = 34;
export const GROUP_CARD_ROW_GAP = 6;
export const GROUP_CARD_CONTAINER_PADDING = 10;

/**
 * Calculates anchor point on the right end of a Group Card for an item row.
 * Precisely aligned with the vertical center of the specific row item.
 */
export function getCardItemAnchor(
  card: PositionedGroupCard,
  itemIndex: number,
  totalItems: number
): { x: number; y: number } {
  // Height and vertical positioning matches SpiderGroupCard exact layout:
  // - Header: 46px
  // - Items Container padding top/bottom: 10px each
  // - Item row: 34px, gap: 6px
  // - Footer: 28px
  // Total card height: 40 * totalItems + 88px
  // Top of card: card.y - 20 * totalItems - 44px
  // Center of row i: card.y + (itemIndex - totalItems / 2) * 40 + 29px
  const itemY = Math.round(card.y + (itemIndex - totalItems / 2) * 40 + 29);
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

  if (category === "scope" || category === "closure" || category === "async" || category === "backend" || category === "realtime" || category === "queues" || category === "scaling" || category === "platform" || category === "rendering" || category === "security" || category === "state" || category === "perf" || category === "aimath" || category === "mlcore" || category === "deeplearning" || category === "nlpllms" || category === "vision" || category === "mobile" || category === "data" || category === "gamedev") {
    r1 = 280;
    r2 = 540;
    r3 = 780;
  } else if (category === "node") {
    r1 = 300;
    r2 = 600;
    r3 = 880;
  } else if (category === "oop") {
    r1 = 260;
    r2 = 520;
    r3 = 740;
  } else if (category === "dsa" || category === "bigo") {
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
        ? "Scope"
        : category === "closure"
        ? "Closures"
        : category === "async"
        ? "Async JavaScript"
        : category === "backend"
        ? "Backend & APIs"
        : category === "realtime"
        ? "Real-Time & Sockets"
        : category === "queues"
        ? "Queues & Background Jobs"
        : category === "scaling"
        ? "Scaling & Load Balancing"
        : category === "platform"
        ? "Web Platform & DOM"
        : category === "rendering"
        ? "Browser Rendering"
        : category === "security"
        ? "Cookies, Storage & CORS"
        : category === "state"
        ? "State & Rendering"
        : category === "perf"
        ? "Performance & a11y"
        : category === "aimath"
        ? "AI & Math Prereqs"
        : category === "mlcore"
        ? "Machine Learning"
        : category === "deeplearning"
        ? "Deep Learning"
        : category === "nlpllms"
        ? "NLP & LLMs"
        : category === "vision"
        ? "Computer Vision"
        : category === "mobile"
        ? "Mobile Platform"
        : category === "data"
        ? "Data Engineering"
        : category === "gamedev"
        ? "Game Dev & Graphics"
        : category === "node"
        ? "Node.js Runtime"
        : category === "oop"
        ? "OOP (4 Pillars)"
        : category === "dsa"
        ? "Data Structures"
        : category === "bigo"
        ? "Big O Complexity"
        : "Node.js + JavaScript",
    category: category === "all" ? "root" : category,
    level: 0,
    badge:
      category === "bigo"
        ? "Complexity Tiers"
        : category === "closure"
        ? "Persistent Scope"
        : category === "async"
        ? "Event Scheduling"
        : category === "backend"
        ? "Server Architecture"
        : category === "realtime"
        ? "Bi-Directional Streams"
        : category === "queues"
        ? "Async Task Processing"
        : category === "scaling"
        ? "Traffic Distribution"
        : category === "platform"
        ? "Browser Platform"
        : category === "rendering"
        ? "Critical Path"
        : category === "security"
        ? "Browser Security"
        : category === "state"
        ? "Rendering Engine"
        : category === "perf"
        ? "Core Web Vitals"
        : category === "aimath"
        ? "Tensor Foundations"
        : category === "mlcore"
        ? "Learning Systems"
        : category === "deeplearning"
        ? "Neural Networks"
        : category === "nlpllms"
        ? "Generative Language"
        : category === "vision"
        ? "Spatial Intelligence"
        : category === "mobile"
        ? "Native & Cross-Platform"
        : category === "data"
        ? "Distributed Pipelines & Lakehouse"
        : category === "gamedev"
        ? "Game Loop & GPU Shaders"
        : category === "scope"
        ? "Lexical Boundary"
        : "Core Hub",
    color:
      category === "bigo"
        ? "#f59e0b"
        : category === "closure"
        ? "#e879f9"
        : category === "async"
        ? "#06b6d4"
        : category === "backend"
        ? "#10b981"
        : category === "realtime"
        ? "#0ea5e9"
        : category === "queues"
        ? "#f97316"
        : category === "scaling"
        ? "#14b8a6"
        : category === "platform"
        ? "#6366f1"
        : category === "rendering"
        ? "#f43f5e"
        : category === "security"
        ? "#eab308"
        : category === "state"
        ? "#8b5cf6"
        : category === "perf"
        ? "#84cc16"
        : category === "aimath"
        ? "#d946ef"
        : category === "mlcore"
        ? "#0284c7"
        : category === "deeplearning"
        ? "#7c3aed"
        : category === "nlpllms"
        ? "#10a37f"
        : category === "vision"
        ? "#ef4444"
        : category === "mobile"
        ? "#2563eb"
        : category === "data"
        ? "#ea580c"
        : category === "gamedev"
        ? "#c026d3"
        : category === "scope"
        ? "#a855f7"
        : "#3b82f6",
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
      searchQuery: "JavaScript language core V8 engine scope closures async",
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

    // Sub-Branch 0B: Scope Hub (placed down-left)
    const scopeHubX = -1450;
    const scopeHubY = 150;
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

    // Scope Node 1: Scope Boundaries
    const scopeNodeRaw = allNodes.find((n) => n.id === "scope-scope");
    if (scopeNodeRaw) {
      const scX = -2100;
      const scY = 0;
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
          y: scY - 30,
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

      const typesRaw = allNodes.find((n) => n.id === "scope-types");
      if (typesRaw) {
        positionedNodes.push({
          ...typesRaw,
          x: scX - 320,
          y: scY + 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: scNode.id,
          target: typesRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Scope Node 2: Scope Chain
    const chainRaw = allNodes.find((n) => n.id === "scope-chain");
    if (chainRaw) {
      const chX = -2100;
      const chY = 150;
      const chNode: PositionedNode = {
        ...chainRaw,
        x: chX,
        y: chY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(chNode);
      edges.push({
        source: scopeHubNode.id,
        target: chNode.id,
        category: "scope",
        level: 3,
        branchIndex: 0,
      });

      const orderRaw = allNodes.find((n) => n.id === "scope-chain-order");
      if (orderRaw) {
        positionedNodes.push({
          ...orderRaw,
          x: chX - 320,
          y: chY - 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: chNode.id,
          target: orderRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }

      const shadowRaw = allNodes.find((n) => n.id === "scope-shadowing");
      if (shadowRaw) {
        positionedNodes.push({
          ...shadowRaw,
          x: chX - 320,
          y: chY + 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: chNode.id,
          target: shadowRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Scope Node 3: Lexical Environment
    const lexEnvRaw = allNodes.find((n) => n.id === "scope-lexical-env");
    if (lexEnvRaw) {
      const leX = -2100;
      const leY = 300;
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

      const envRecRaw = allNodes.find((n) => n.id === "scope-env-record");
      if (envRecRaw) {
        positionedNodes.push({
          ...envRecRaw,
          x: leX - 320,
          y: leY - 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: leNode.id,
          target: envRecRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }

      const outRefRaw = allNodes.find((n) => n.id === "scope-outer-ref");
      if (outRefRaw) {
        positionedNodes.push({
          ...outRefRaw,
          x: leX - 320,
          y: leY + 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: leNode.id,
          target: outRefRaw.id,
          category: "scope",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Sub-Branch 0C: Closures Hub (placed down-left)
    const closureHubX = -1450;
    const closureHubY = 680;
    const closureHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-closure")!,
      x: closureHubX,
      y: closureHubY,
      level: 2,
      branchIndex: 0,
    };
    positionedNodes.push(closureHubNode);
    edges.push({
      source: jsCoreNode.id,
      target: closureHubNode.id,
      category: "closure",
      level: 2,
      branchIndex: 0,
    });

    // Closure Node 1: Closure Core
    const closureCoreRaw = allNodes.find((n) => n.id === "closure-core");
    if (closureCoreRaw) {
      const clX = -2100;
      const clY = 550;
      const clNode: PositionedNode = {
        ...closureCoreRaw,
        x: clX,
        y: clY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(clNode);
      edges.push({
        source: closureHubNode.id,
        target: clNode.id,
        category: "closure",
        level: 3,
        branchIndex: 0,
      });

      const detailRaw = allNodes.find((n) => n.id === "scope-closure-detail");
      if (detailRaw) {
        positionedNodes.push({
          ...detailRaw,
          x: clX - 320,
          y: clY - 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: clNode.id,
          target: detailRaw.id,
          category: "closure",
          level: 4,
          branchIndex: 0,
        });
      }

      const heapRaw = allNodes.find((n) => n.id === "closure-heap-retention");
      if (heapRaw) {
        positionedNodes.push({
          ...heapRaw,
          x: clX - 320,
          y: clY + 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: clNode.id,
          target: heapRaw.id,
          category: "closure",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Closure Node 2: The Backpack Story
    const backpackRaw = allNodes.find((n) => n.id === "scope-backpack");
    if (backpackRaw) {
      const bpX = -2100;
      const bpY = 680;
      const bpNode: PositionedNode = {
        ...backpackRaw,
        x: bpX,
        y: bpY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(bpNode);
      edges.push({
        source: closureHubNode.id,
        target: bpNode.id,
        category: "closure",
        level: 3,
        branchIndex: 0,
      });

      const bpVarRaw = allNodes.find((n) => n.id === "backpack-variables");
      if (bpVarRaw) {
        positionedNodes.push({
          ...bpVarRaw,
          x: bpX - 320,
          y: bpY - 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: bpNode.id,
          target: bpVarRaw.id,
          category: "closure",
          level: 4,
          branchIndex: 0,
        });
      }

      const bpLifeRaw = allNodes.find((n) => n.id === "backpack-lifetime");
      if (bpLifeRaw) {
        positionedNodes.push({
          ...bpLifeRaw,
          x: bpX - 320,
          y: bpY + 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: bpNode.id,
          target: bpLifeRaw.id,
          category: "closure",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Closure Node 3: 5 Sentences to Remember
    const sentRaw = allNodes.find((n) => n.id === "scope-5-sentences");
    if (sentRaw) {
      const s5X = -2100;
      const s5Y = 810;
      const s5Node: PositionedNode = {
        ...sentRaw,
        x: s5X,
        y: s5Y,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(s5Node);
      edges.push({
        source: closureHubNode.id,
        target: s5Node.id,
        category: "closure",
        level: 3,
        branchIndex: 0,
      });

      const ruleRaw = allNodes.find((n) => n.id === "sentences-interview-rule");
      if (ruleRaw) {
        positionedNodes.push({
          ...ruleRaw,
          x: s5X - 320,
          y: s5Y,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: s5Node.id,
          target: ruleRaw.id,
          category: "closure",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Sub-Branch 0D: Async JS Hub (placed down-left)
    const asyncHubX = -1450;
    const asyncHubY = 1050;
    const asyncHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-async")!,
      x: asyncHubX,
      y: asyncHubY,
      level: 2,
      branchIndex: 0,
    };
    positionedNodes.push(asyncHubNode);
    edges.push({
      source: jsCoreNode.id,
      target: asyncHubNode.id,
      category: "async",
      level: 2,
      branchIndex: 0,
    });

    // Async Node 1: Callbacks & Flow
    const cbRaw = allNodes.find((n) => n.id === "async-callbacks");
    if (cbRaw) {
      const cbX = -2100;
      const cbY = 860;
      const cbNode: PositionedNode = {
        ...cbRaw,
        x: cbX,
        y: cbY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(cbNode);
      edges.push({
        source: asyncHubNode.id,
        target: cbNode.id,
        category: "async",
        level: 3,
        branchIndex: 0,
      });

      const hellRaw = allNodes.find((n) => n.id === "async-callback-hell");
      if (hellRaw) {
        positionedNodes.push({
          ...hellRaw,
          x: cbX - 320,
          y: cbY - 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: cbNode.id,
          target: hellRaw.id,
          category: "async",
          level: 4,
          branchIndex: 0,
        });
      }

      const errFirstRaw = allNodes.find((n) => n.id === "async-error-first");
      if (errFirstRaw) {
        positionedNodes.push({
          ...errFirstRaw,
          x: cbX - 320,
          y: cbY + 30,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: cbNode.id,
          target: errFirstRaw.id,
          category: "async",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Async Node 2: Promises & Microtasks
    const promRaw = allNodes.find((n) => n.id === "async-promises");
    if (promRaw) {
      const prX = -2100;
      const prY = 1050;
      const prNode: PositionedNode = {
        ...promRaw,
        x: prX,
        y: prY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(prNode);
      edges.push({
        source: asyncHubNode.id,
        target: prNode.id,
        category: "async",
        level: 3,
        branchIndex: 0,
      });

      const statesRaw = allNodes.find((n) => n.id === "async-promise-states");
      if (statesRaw) {
        positionedNodes.push({
          ...statesRaw,
          x: prX - 320,
          y: prY - 45,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: prNode.id,
          target: statesRaw.id,
          category: "async",
          level: 4,
          branchIndex: 0,
        });
      }

      const vipRaw = allNodes.find((n) => n.id === "async-microtask-vip");
      if (vipRaw) {
        positionedNodes.push({
          ...vipRaw,
          x: prX - 320,
          y: prY,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: prNode.id,
          target: vipRaw.id,
          category: "async",
          level: 4,
          branchIndex: 0,
        });
      }

      const combRaw = allNodes.find((n) => n.id === "async-combinators");
      if (combRaw) {
        positionedNodes.push({
          ...combRaw,
          x: prX - 320,
          y: prY + 45,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: prNode.id,
          target: combRaw.id,
          category: "async",
          level: 4,
          branchIndex: 0,
        });
      }
    }

    // Async Node 3: Async / Await Flow
    const awaitRaw = allNodes.find((n) => n.id === "async-await");
    if (awaitRaw) {
      const awX = -2100;
      const awY = 1240;
      const awNode: PositionedNode = {
        ...awaitRaw,
        x: awX,
        y: awY,
        level: 3,
        branchIndex: 0,
      };
      positionedNodes.push(awNode);
      edges.push({
        source: asyncHubNode.id,
        target: awNode.id,
        category: "async",
        level: 3,
        branchIndex: 0,
      });

      const sugarRaw = allNodes.find((n) => n.id === "async-sugar-generators");
      if (sugarRaw) {
        positionedNodes.push({
          ...sugarRaw,
          x: awX - 320,
          y: awY - 45,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: awNode.id,
          target: sugarRaw.id,
          category: "async",
          level: 4,
          branchIndex: 0,
        });
      }

      const concRaw = allNodes.find((n) => n.id === "async-concurrent-await");
      if (concRaw) {
        positionedNodes.push({
          ...concRaw,
          x: awX - 320,
          y: awY,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: awNode.id,
          target: concRaw.id,
          category: "async",
          level: 4,
          branchIndex: 0,
        });
      }

      const tryCatchRaw = allNodes.find((n) => n.id === "async-try-catch");
      if (tryCatchRaw) {
        positionedNodes.push({
          ...tryCatchRaw,
          x: awX - 320,
          y: awY + 45,
          level: 4,
          branchIndex: 0,
        });
        edges.push({
          source: awNode.id,
          target: tryCatchRaw.id,
          category: "async",
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

    // Sub-Branch 1B: Backend & APIs Hub (placed top-right above restaurant)
    const backendHubX = 1300;
    const backendHubY = -1350;
    const backendHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-backend")!,
      x: backendHubX,
      y: backendHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(backendHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: backendHubNode.id,
      category: "backend",
      level: 2,
      branchIndex: 1,
    });

    // Backend Node 1: REST & HTTP Architecture
    const restRaw = allNodes.find((n) => n.id === "backend-rest-http");
    if (restRaw) {
      const restX = 1950;
      const restY = -1550;
      const restNode: PositionedNode = {
        ...restRaw,
        x: restX,
        y: restY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(restNode);
      edges.push({
        source: backendHubNode.id,
        target: restNode.id,
        category: "backend",
        level: 3,
        branchIndex: 1,
      });

      const methodsRaw = allNodes.find((n) => n.id === "backend-http-methods");
      if (methodsRaw) {
        positionedNodes.push({
          ...methodsRaw,
          x: restX + 320,
          y: restY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: restNode.id,
          target: methodsRaw.id,
          category: "backend",
          level: 4,
          branchIndex: 1,
        });
      }

      const statusRaw = allNodes.find((n) => n.id === "backend-status-codes");
      if (statusRaw) {
        positionedNodes.push({
          ...statusRaw,
          x: restX + 320,
          y: restY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: restNode.id,
          target: statusRaw.id,
          category: "backend",
          level: 4,
          branchIndex: 1,
        });
      }

      const crudRaw = allNodes.find((n) => n.id === "backend-stateless-crud");
      if (crudRaw) {
        positionedNodes.push({
          ...crudRaw,
          x: restX + 320,
          y: restY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: restNode.id,
          target: crudRaw.id,
          category: "backend",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Backend Node 2: Express Middleware Pipeline (10-Stage Pipeline Card)
    const mwCard = cardByPillar.get("backend-middleware-pipeline");
    if (mwCard) {
      const cardX = 2100;
      const cardY = -1350;
      const posCard: PositionedGroupCard = {
        ...mwCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: backendHubNode.id,
        target: mwCard.id,
        category: "backend",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Backend Node 3: Production Guards & Security
    const guardsRaw = allNodes.find((n) => n.id === "backend-production-guards");
    if (guardsRaw) {
      const guardX = 1950;
      const guardY = -1150;
      const guardNode: PositionedNode = {
        ...guardsRaw,
        x: guardX,
        y: guardY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(guardNode);
      edges.push({
        source: backendHubNode.id,
        target: guardNode.id,
        category: "backend",
        level: 3,
        branchIndex: 1,
      });

      const jwtRaw = allNodes.find((n) => n.id === "backend-auth-jwt");
      if (jwtRaw) {
        positionedNodes.push({
          ...jwtRaw,
          x: guardX + 320,
          y: guardY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: guardNode.id,
          target: jwtRaw.id,
          category: "backend",
          level: 4,
          branchIndex: 1,
        });
      }

      const corsRaw = allNodes.find((n) => n.id === "backend-cors-headers");
      if (corsRaw) {
        positionedNodes.push({
          ...corsRaw,
          x: guardX + 320,
          y: guardY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: guardNode.id,
          target: corsRaw.id,
          category: "backend",
          level: 4,
          branchIndex: 1,
        });
      }

      const rateRaw = allNodes.find((n) => n.id === "backend-rate-limiting");
      if (rateRaw) {
        positionedNodes.push({
          ...rateRaw,
          x: guardX + 320,
          y: guardY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: guardNode.id,
          target: rateRaw.id,
          category: "backend",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1C: Real-Time & Sockets Hub (placed top-right above backend at y = -1950)
    const realtimeHubX = 1300;
    const realtimeHubY = -1950;
    const realtimeHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-realtime")!,
      x: realtimeHubX,
      y: realtimeHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(realtimeHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: realtimeHubNode.id,
      category: "realtime",
      level: 2,
      branchIndex: 1,
    });

    // Real-Time Node 1: Transport & Handshake
    const protoRaw = allNodes.find((n) => n.id === "realtime-protocols");
    if (protoRaw) {
      const protoX = 1950;
      const protoY = -2150;
      const protoNode: PositionedNode = {
        ...protoRaw,
        x: protoX,
        y: protoY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(protoNode);
      edges.push({
        source: realtimeHubNode.id,
        target: protoNode.id,
        category: "realtime",
        level: 3,
        branchIndex: 1,
      });

      const wsRaw = allNodes.find((n) => n.id === "realtime-ws-handshake");
      if (wsRaw) {
        positionedNodes.push({
          ...wsRaw,
          x: protoX + 320,
          y: protoY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: protoNode.id,
          target: wsRaw.id,
          category: "realtime",
          level: 4,
          branchIndex: 1,
        });
      }

      const sseRaw = allNodes.find((n) => n.id === "realtime-sse-streams");
      if (sseRaw) {
        positionedNodes.push({
          ...sseRaw,
          x: protoX + 320,
          y: protoY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: protoNode.id,
          target: sseRaw.id,
          category: "realtime",
          level: 4,
          branchIndex: 1,
        });
      }

      const pollRaw = allNodes.find((n) => n.id === "realtime-polling-fallback");
      if (pollRaw) {
        positionedNodes.push({
          ...pollRaw,
          x: protoX + 320,
          y: protoY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: protoNode.id,
          target: pollRaw.id,
          category: "realtime",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Real-Time Node 2: Socket.io 9-Stage Lifecycle (Group Card)
    const rtCard = cardByPillar.get("realtime-socketio-lifecycle");
    if (rtCard) {
      const cardX = 2100;
      const cardY = -1950;
      const posCard: PositionedGroupCard = {
        ...rtCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: realtimeHubNode.id,
        target: rtCard.id,
        category: "realtime",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Real-Time Node 3: Rooms, Namespaces & State
    const roomsRaw = allNodes.find((n) => n.id === "realtime-rooms-presence");
    if (roomsRaw) {
      const roomX = 1950;
      const roomY = -1750;
      const roomNode: PositionedNode = {
        ...roomsRaw,
        x: roomX,
        y: roomY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(roomNode);
      edges.push({
        source: realtimeHubNode.id,
        target: roomNode.id,
        category: "realtime",
        level: 3,
        branchIndex: 1,
      });

      const broadRaw = allNodes.find((n) => n.id === "realtime-rooms-broadcast");
      if (broadRaw) {
        positionedNodes.push({
          ...broadRaw,
          x: roomX + 320,
          y: roomY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: roomNode.id,
          target: broadRaw.id,
          category: "realtime",
          level: 4,
          branchIndex: 1,
        });
      }

      const presRaw = allNodes.find((n) => n.id === "realtime-presence-state");
      if (presRaw) {
        positionedNodes.push({
          ...presRaw,
          x: roomX + 320,
          y: roomY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: roomNode.id,
          target: presRaw.id,
          category: "realtime",
          level: 4,
          branchIndex: 1,
        });
      }

      const redisRaw = allNodes.find((n) => n.id === "realtime-redis-adapter");
      if (redisRaw) {
        positionedNodes.push({
          ...redisRaw,
          x: roomX + 320,
          y: roomY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: roomNode.id,
          target: redisRaw.id,
          category: "realtime",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1D: Queues & Background Jobs Hub (placed top-right above realtime at y = -2550)
    const queuesHubX = 1300;
    const queuesHubY = -2550;
    const queuesHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-queues")!,
      x: queuesHubX,
      y: queuesHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(queuesHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: queuesHubNode.id,
      category: "queues",
      level: 2,
      branchIndex: 1,
    });

    // Queues Node 1: Queue Architecture & Redis
    const qArchRaw = allNodes.find((n) => n.id === "queues-architecture");
    if (qArchRaw) {
      const qArchX = 1950;
      const qArchY = -2750;
      const qArchNode: PositionedNode = {
        ...qArchRaw,
        x: qArchX,
        y: qArchY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(qArchNode);
      edges.push({
        source: queuesHubNode.id,
        target: qArchNode.id,
        category: "queues",
        level: 3,
        branchIndex: 1,
      });

      const streamsRaw = allNodes.find((n) => n.id === "queues-redis-streams");
      if (streamsRaw) {
        positionedNodes.push({
          ...streamsRaw,
          x: qArchX + 320,
          y: qArchY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: qArchNode.id,
          target: streamsRaw.id,
          category: "queues",
          level: 4,
          branchIndex: 1,
        });
      }

      const prodRaw = allNodes.find((n) => n.id === "queues-job-producers");
      if (prodRaw) {
        positionedNodes.push({
          ...prodRaw,
          x: qArchX + 320,
          y: qArchY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: qArchNode.id,
          target: prodRaw.id,
          category: "queues",
          level: 4,
          branchIndex: 1,
        });
      }

      const schedRaw = allNodes.find((n) => n.id === "queues-delayed-scheduled");
      if (schedRaw) {
        positionedNodes.push({
          ...schedRaw,
          x: qArchX + 320,
          y: qArchY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: qArchNode.id,
          target: schedRaw.id,
          category: "queues",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Queues Node 2: BullMQ 9-Stage Job Lifecycle (Group Card)
    const qCard = cardByPillar.get("queues-bullmq-lifecycle");
    if (qCard) {
      const cardX = 2100;
      const cardY = -2550;
      const posCard: PositionedGroupCard = {
        ...qCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: queuesHubNode.id,
        target: qCard.id,
        category: "queues",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Queues Node 3: Workers & Resiliency
    const qResilRaw = allNodes.find((n) => n.id === "queues-workers-resilience");
    if (qResilRaw) {
      const qResilX = 1950;
      const qResilY = -2350;
      const qResilNode: PositionedNode = {
        ...qResilRaw,
        x: qResilX,
        y: qResilY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(qResilNode);
      edges.push({
        source: queuesHubNode.id,
        target: qResilNode.id,
        category: "queues",
        level: 3,
        branchIndex: 1,
      });

      const workerRaw = allNodes.find((n) => n.id === "queues-worker-threads");
      if (workerRaw) {
        positionedNodes.push({
          ...workerRaw,
          x: qResilX + 320,
          y: qResilY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: qResilNode.id,
          target: workerRaw.id,
          category: "queues",
          level: 4,
          branchIndex: 1,
        });
      }

      const dlqRaw = allNodes.find((n) => n.id === "queues-dlq-quarantine");
      if (dlqRaw) {
        positionedNodes.push({
          ...dlqRaw,
          x: qResilX + 320,
          y: qResilY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: qResilNode.id,
          target: dlqRaw.id,
          category: "queues",
          level: 4,
          branchIndex: 1,
        });
      }

      const idempRaw = allNodes.find((n) => n.id === "queues-idempotency");
      if (idempRaw) {
        positionedNodes.push({
          ...idempRaw,
          x: qResilX + 320,
          y: qResilY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: qResilNode.id,
          target: idempRaw.id,
          category: "queues",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1E: Scaling & Load Balancing Hub (placed top-right above queues at y = -3150)
    const scalingHubX = 1300;
    const scalingHubY = -3150;
    const scalingHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-scaling")!,
      x: scalingHubX,
      y: scalingHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(scalingHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: scalingHubNode.id,
      category: "scaling",
      level: 2,
      branchIndex: 1,
    });

    // Scaling Node 1: Balancing Algorithms
    const sAlgoRaw = allNodes.find((n) => n.id === "scaling-algorithms");
    if (sAlgoRaw) {
      const sAlgoX = 1950;
      const sAlgoY = -3350;
      const sAlgoNode: PositionedNode = {
        ...sAlgoRaw,
        x: sAlgoX,
        y: sAlgoY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(sAlgoNode);
      edges.push({
        source: scalingHubNode.id,
        target: sAlgoNode.id,
        category: "scaling",
        level: 3,
        branchIndex: 1,
      });

      const rrRaw = allNodes.find((n) => n.id === "scaling-round-robin");
      if (rrRaw) {
        positionedNodes.push({
          ...rrRaw,
          x: sAlgoX + 320,
          y: sAlgoY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sAlgoNode.id,
          target: rrRaw.id,
          category: "scaling",
          level: 4,
          branchIndex: 1,
        });
      }

      const lcRaw = allNodes.find((n) => n.id === "scaling-least-connections");
      if (lcRaw) {
        positionedNodes.push({
          ...lcRaw,
          x: sAlgoX + 320,
          y: sAlgoY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sAlgoNode.id,
          target: lcRaw.id,
          category: "scaling",
          level: 4,
          branchIndex: 1,
        });
      }

      const ipRaw = allNodes.find((n) => n.id === "scaling-ip-hash");
      if (ipRaw) {
        positionedNodes.push({
          ...ipRaw,
          x: sAlgoX + 320,
          y: sAlgoY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sAlgoNode.id,
          target: ipRaw.id,
          category: "scaling",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Scaling Node 2: NGINX 9-Stage Reverse Proxy Pipeline (Group Card)
    const sCard = cardByPillar.get("scaling-nginx-pipeline");
    if (sCard) {
      const cardX = 2100;
      const cardY = -3150;
      const posCard: PositionedGroupCard = {
        ...sCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: scalingHubNode.id,
        target: sCard.id,
        category: "scaling",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Scaling Node 3: Horizontal & Elastic Scale
    const sScaleRaw = allNodes.find((n) => n.id === "scaling-horizontal-scale");
    if (sScaleRaw) {
      const sScaleX = 1950;
      const sScaleY = -2950;
      const sScaleNode: PositionedNode = {
        ...sScaleRaw,
        x: sScaleX,
        y: sScaleY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(sScaleNode);
      edges.push({
        source: scalingHubNode.id,
        target: sScaleNode.id,
        category: "scaling",
        level: 3,
        branchIndex: 1,
      });

      const workersRaw = allNodes.find((n) => n.id === "scaling-stateless-workers");
      if (workersRaw) {
        positionedNodes.push({
          ...workersRaw,
          x: sScaleX + 320,
          y: sScaleY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sScaleNode.id,
          target: workersRaw.id,
          category: "scaling",
          level: 4,
          branchIndex: 1,
        });
      }

      const asgRaw = allNodes.find((n) => n.id === "scaling-auto-scaling-groups");
      if (asgRaw) {
        positionedNodes.push({
          ...asgRaw,
          x: sScaleX + 320,
          y: sScaleY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sScaleNode.id,
          target: asgRaw.id,
          category: "scaling",
          level: 4,
          branchIndex: 1,
        });
      }

      const cdnRaw = allNodes.find((n) => n.id === "scaling-global-cdn-anycast");
      if (cdnRaw) {
        positionedNodes.push({
          ...cdnRaw,
          x: sScaleX + 320,
          y: sScaleY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sScaleNode.id,
          target: cdnRaw.id,
          category: "scaling",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1F: Web Platform & DOM Hub (placed top-right above scaling at y = -3750)
    const platformHubX = 1300;
    const platformHubY = -3750;
    const platformHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-platform")!,
      x: platformHubX,
      y: platformHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(platformHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: platformHubNode.id,
      category: "platform",
      level: 2,
      branchIndex: 1,
    });

    // Platform Node 1: Semantic HTML & DOM Tree
    const pSemRaw = allNodes.find((n) => n.id === "platform-semantic-dom");
    if (pSemRaw) {
      const pSemX = 1950;
      const pSemY = -3950;
      const pSemNode: PositionedNode = {
        ...pSemRaw,
        x: pSemX,
        y: pSemY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(pSemNode);
      edges.push({
        source: platformHubNode.id,
        target: pSemNode.id,
        category: "platform",
        level: 3,
        branchIndex: 1,
      });

      const nodesRaw = allNodes.find((n) => n.id === "platform-dom-nodes");
      if (nodesRaw) {
        positionedNodes.push({
          ...nodesRaw,
          x: pSemX + 320,
          y: pSemY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pSemNode.id,
          target: nodesRaw.id,
          category: "platform",
          level: 4,
          branchIndex: 1,
        });
      }

      const bubbleRaw = allNodes.find((n) => n.id === "platform-event-bubbling");
      if (bubbleRaw) {
        positionedNodes.push({
          ...bubbleRaw,
          x: pSemX + 320,
          y: pSemY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pSemNode.id,
          target: bubbleRaw.id,
          category: "platform",
          level: 4,
          branchIndex: 1,
        });
      }

      const mutRaw = allNodes.find((n) => n.id === "platform-mutation-observer");
      if (mutRaw) {
        positionedNodes.push({
          ...mutRaw,
          x: pSemX + 320,
          y: pSemY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pSemNode.id,
          target: mutRaw.id,
          category: "platform",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Platform Node 2: CSS Layout & Box Model (Group Card)
    const pCard = cardByPillar.get("platform-css-pipeline");
    if (pCard) {
      const cardX = 2100;
      const cardY = -3750;
      const posCard: PositionedGroupCard = {
        ...pCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: platformHubNode.id,
        target: pCard.id,
        category: "platform",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Platform Node 3: Modern Native Web & DOM APIs
    const pApisRaw = allNodes.find((n) => n.id === "platform-dom-apis");
    if (pApisRaw) {
      const pApisX = 1950;
      const pApisY = -3550;
      const pApisNode: PositionedNode = {
        ...pApisRaw,
        x: pApisX,
        y: pApisY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(pApisNode);
      edges.push({
        source: platformHubNode.id,
        target: pApisNode.id,
        category: "platform",
        level: 3,
        branchIndex: 1,
      });

      const shadowRaw = allNodes.find((n) => n.id === "platform-shadow-dom");
      if (shadowRaw) {
        positionedNodes.push({
          ...shadowRaw,
          x: pApisX + 320,
          y: pApisY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pApisNode.id,
          target: shadowRaw.id,
          category: "platform",
          level: 4,
          branchIndex: 1,
        });
      }

      const obsRaw = allNodes.find((n) => n.id === "platform-intersection-observer");
      if (obsRaw) {
        positionedNodes.push({
          ...obsRaw,
          x: pApisX + 320,
          y: pApisY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pApisNode.id,
          target: obsRaw.id,
          category: "platform",
          level: 4,
          branchIndex: 1,
        });
      }

      const canvasRaw = allNodes.find((n) => n.id === "platform-canvas-webgl");
      if (canvasRaw) {
        positionedNodes.push({
          ...canvasRaw,
          x: pApisX + 320,
          y: pApisY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pApisNode.id,
          target: canvasRaw.id,
          category: "platform",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1G: Browser Rendering Hub (placed top-right above platform at y = -4350)
    const renderingHubX = 1300;
    const renderingHubY = -4350;
    const renderingHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-rendering")!,
      x: renderingHubX,
      y: renderingHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(renderingHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: renderingHubNode.id,
      category: "rendering",
      level: 2,
      branchIndex: 1,
    });

    // Rendering Node 1: Critical Rendering Path (Group Card)
    const rCard = cardByPillar.get("rendering-pipeline");
    if (rCard) {
      const cardX = 2100;
      const cardY = -4350;
      const posCard: PositionedGroupCard = {
        ...rCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: renderingHubNode.id,
        target: rCard.id,
        category: "rendering",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Rendering Node 2: Reflow vs Repaint Mechanics
    const rReflowRaw = allNodes.find((n) => n.id === "rendering-reflow-repaint");
    if (rReflowRaw) {
      const rReflowX = 1950;
      const rReflowY = -4550;
      const rReflowNode: PositionedNode = {
        ...rReflowRaw,
        x: rReflowX,
        y: rReflowY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(rReflowNode);
      edges.push({
        source: renderingHubNode.id,
        target: rReflowNode.id,
        category: "rendering",
        level: 3,
        branchIndex: 1,
      });

      const thrashRaw = allNodes.find((n) => n.id === "rendering-layout-thrashing");
      if (thrashRaw) {
        positionedNodes.push({
          ...thrashRaw,
          x: rReflowX + 320,
          y: rReflowY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: rReflowNode.id,
          target: thrashRaw.id,
          category: "rendering",
          level: 4,
          branchIndex: 1,
        });
      }

      const compOnlyRaw = allNodes.find((n) => n.id === "rendering-composite-only");
      if (compOnlyRaw) {
        positionedNodes.push({
          ...compOnlyRaw,
          x: rReflowX + 320,
          y: rReflowY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: rReflowNode.id,
          target: compOnlyRaw.id,
          category: "rendering",
          level: 4,
          branchIndex: 1,
        });
      }

      const containRaw = allNodes.find((n) => n.id === "rendering-containment");
      if (containRaw) {
        positionedNodes.push({
          ...containRaw,
          x: rReflowX + 320,
          y: rReflowY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: rReflowNode.id,
          target: containRaw.id,
          category: "rendering",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Rendering Node 3: Render Performance & Scheduling
    const rOptRaw = allNodes.find((n) => n.id === "rendering-optimizations");
    if (rOptRaw) {
      const rOptX = 1950;
      const rOptY = -4150;
      const rOptNode: PositionedNode = {
        ...rOptRaw,
        x: rOptX,
        y: rOptY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(rOptNode);
      edges.push({
        source: renderingHubNode.id,
        target: rOptNode.id,
        category: "rendering",
        level: 3,
        branchIndex: 1,
      });

      const rafRaw = allNodes.find((n) => n.id === "rendering-request-animation-frame");
      if (rafRaw) {
        positionedNodes.push({
          ...rafRaw,
          x: rOptX + 320,
          y: rOptY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: rOptNode.id,
          target: rafRaw.id,
          category: "rendering",
          level: 4,
          branchIndex: 1,
        });
      }

      const critCssRaw = allNodes.find((n) => n.id === "rendering-critical-css");
      if (critCssRaw) {
        positionedNodes.push({
          ...critCssRaw,
          x: rOptX + 320,
          y: rOptY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: rOptNode.id,
          target: critCssRaw.id,
          category: "rendering",
          level: 4,
          branchIndex: 1,
        });
      }

      const vdomRaw = allNodes.find((n) => n.id === "rendering-virtual-dom-reconciliation");
      if (vdomRaw) {
        positionedNodes.push({
          ...vdomRaw,
          x: rOptX + 320,
          y: rOptY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: rOptNode.id,
          target: vdomRaw.id,
          category: "rendering",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1H: Web Security & Storage Hub (placed top-right above rendering at y = -4950)
    const securityHubX = 1300;
    const securityHubY = -4950;
    const securityHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-security")!,
      x: securityHubX,
      y: securityHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(securityHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: securityHubNode.id,
      category: "security",
      level: 2,
      branchIndex: 1,
    });

    // Security Node 1: Same-Origin Policy & CORS
    const sOriginRaw = allNodes.find((n) => n.id === "security-same-origin-cors");
    if (sOriginRaw) {
      const sOriginX = 1950;
      const sOriginY = -5150;
      const sOriginNode: PositionedNode = {
        ...sOriginRaw,
        x: sOriginX,
        y: sOriginY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(sOriginNode);
      edges.push({
        source: securityHubNode.id,
        target: sOriginNode.id,
        category: "security",
        level: 3,
        branchIndex: 1,
      });

      const sopRaw = allNodes.find((n) => n.id === "security-sop-boundary");
      if (sopRaw) {
        positionedNodes.push({
          ...sopRaw,
          x: sOriginX + 320,
          y: sOriginY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sOriginNode.id,
          target: sopRaw.id,
          category: "security",
          level: 4,
          branchIndex: 1,
        });
      }

      const preflightRaw = allNodes.find((n) => n.id === "security-cors-preflight");
      if (preflightRaw) {
        positionedNodes.push({
          ...preflightRaw,
          x: sOriginX + 320,
          y: sOriginY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sOriginNode.id,
          target: preflightRaw.id,
          category: "security",
          level: 4,
          branchIndex: 1,
        });
      }

      const credRaw = allNodes.find((n) => n.id === "security-credentialed-requests");
      if (credRaw) {
        positionedNodes.push({
          ...credRaw,
          x: sOriginX + 320,
          y: sOriginY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sOriginNode.id,
          target: credRaw.id,
          category: "security",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Security Node 2: Cookie Security & Storage Pipeline (Group Card)
    const secCard = cardByPillar.get("security-cookie-lifecycle");
    if (secCard) {
      const cardX = 2100;
      const cardY = -4950;
      const posCard: PositionedGroupCard = {
        ...secCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: securityHubNode.id,
        target: secCard.id,
        category: "security",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // Security Node 3: Client-Side Defense Architecture
    const sDefenseRaw = allNodes.find((n) => n.id === "security-web-defenses");
    if (sDefenseRaw) {
      const sDefenseX = 1950;
      const sDefenseY = -4750;
      const sDefenseNode: PositionedNode = {
        ...sDefenseRaw,
        x: sDefenseX,
        y: sDefenseY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(sDefenseNode);
      edges.push({
        source: securityHubNode.id,
        target: sDefenseNode.id,
        category: "security",
        level: 3,
        branchIndex: 1,
      });

      const cspRaw = allNodes.find((n) => n.id === "security-csp-headers");
      if (cspRaw) {
        positionedNodes.push({
          ...cspRaw,
          x: sDefenseX + 320,
          y: sDefenseY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sDefenseNode.id,
          target: cspRaw.id,
          category: "security",
          level: 4,
          branchIndex: 1,
        });
      }

      const sriRaw = allNodes.find((n) => n.id === "security-subresource-integrity");
      if (sriRaw) {
        positionedNodes.push({
          ...sriRaw,
          x: sDefenseX + 320,
          y: sDefenseY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sDefenseNode.id,
          target: sriRaw.id,
          category: "security",
          level: 4,
          branchIndex: 1,
        });
      }

      const ttRaw = allNodes.find((n) => n.id === "security-trusted-types");
      if (ttRaw) {
        positionedNodes.push({
          ...ttRaw,
          x: sDefenseX + 320,
          y: sDefenseY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sDefenseNode.id,
          target: ttRaw.id,
          category: "security",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1I: State Management & Rendering Hub (placed top-right above security at y = -5550)
    const stateHubX = 1300;
    const stateHubY = -5550;
    const stateHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-state")!,
      x: stateHubX,
      y: stateHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(stateHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: stateHubNode.id,
      category: "state",
      level: 2,
      branchIndex: 1,
    });

    // State Node 1: State & Reactivity Models
    const sReactivityRaw = allNodes.find((n) => n.id === "state-reactivity-pillar");
    if (sReactivityRaw) {
      const sReactivityX = stateHubX + 650;
      const sReactivityY = stateHubY - 180;
      const sReactivityNode: PositionedNode = {
        ...sReactivityRaw,
        x: sReactivityX,
        y: sReactivityY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(sReactivityNode);
      edges.push({
        source: stateHubNode.id,
        target: sReactivityNode.id,
        category: "state",
        level: 3,
        branchIndex: 1,
      });

      const uniRaw = allNodes.find((n) => n.id === "state-unidirectional-flow");
      if (uniRaw) {
        positionedNodes.push({
          ...uniRaw,
          x: sReactivityX + 320,
          y: sReactivityY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sReactivityNode.id,
          target: uniRaw.id,
          category: "state",
          level: 4,
          branchIndex: 1,
        });
      }

      const sigRaw = allNodes.find((n) => n.id === "state-fine-grained-signals");
      if (sigRaw) {
        positionedNodes.push({
          ...sigRaw,
          x: sReactivityX + 320,
          y: sReactivityY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sReactivityNode.id,
          target: sigRaw.id,
          category: "state",
          level: 4,
          branchIndex: 1,
        });
      }

      const swrRaw = allNodes.find((n) => n.id === "state-server-client-sync");
      if (swrRaw) {
        positionedNodes.push({
          ...swrRaw,
          x: sReactivityX + 320,
          y: sReactivityY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sReactivityNode.id,
          target: swrRaw.id,
          category: "state",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // State Node 2: 9-Stage Rendering Pipeline (Group Card)
    const stateCard = cardByPillar.get("state-rendering-pipeline");
    if (stateCard) {
      const cardX = stateHubX + 800;
      const cardY = stateHubY;
      const posCard: PositionedGroupCard = {
        ...stateCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: stateHubNode.id,
        target: stateCard.id,
        category: "state",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 1);
    }

    // State Node 3: Hydration & Modern Architectures
    const sHydrationRaw = allNodes.find((n) => n.id === "state-hydration-islands");
    if (sHydrationRaw) {
      const sHydrationX = stateHubX + 650;
      const sHydrationY = stateHubY + 180;
      const sHydrationNode: PositionedNode = {
        ...sHydrationRaw,
        x: sHydrationX,
        y: sHydrationY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(sHydrationNode);
      edges.push({
        source: stateHubNode.id,
        target: sHydrationNode.id,
        category: "state",
        level: 3,
        branchIndex: 1,
      });

      const hydRaw = allNodes.find((n) => n.id === "state-dom-hydration");
      if (hydRaw) {
        positionedNodes.push({
          ...hydRaw,
          x: sHydrationX + 320,
          y: sHydrationY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sHydrationNode.id,
          target: hydRaw.id,
          category: "state",
          level: 4,
          branchIndex: 1,
        });
      }

      const islRaw = allNodes.find((n) => n.id === "state-selective-islands");
      if (islRaw) {
        positionedNodes.push({
          ...islRaw,
          x: sHydrationX + 320,
          y: sHydrationY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sHydrationNode.id,
          target: islRaw.id,
          category: "state",
          level: 4,
          branchIndex: 1,
        });
      }

      const rscRaw = allNodes.find((n) => n.id === "state-resumability-rsc");
      if (rscRaw) {
        positionedNodes.push({
          ...rscRaw,
          x: sHydrationX + 320,
          y: sHydrationY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: sHydrationNode.id,
          target: rscRaw.id,
          category: "state",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Sub-Branch 1J: Performance & a11y Hub (placed top-right above state at y = -6150)
    const perfHubX = 1300;
    const perfHubY = -6150;
    const perfHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-perf")!,
      x: perfHubX,
      y: perfHubY,
      level: 2,
      branchIndex: 1,
    };
    positionedNodes.push(perfHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: perfHubNode.id,
      category: "perf",
      level: 2,
      branchIndex: 1,
    });

    // Perf Node 1: Core Web Vitals & Auditing
    const pVitalsRaw = allNodes.find((n) => n.id === "perf-vitals-pillar");
    if (pVitalsRaw) {
      const pVitalsX = perfHubX + 650;
      const pVitalsY = perfHubY - 180;
      const pVitalsNode: PositionedNode = {
        ...pVitalsRaw,
        x: pVitalsX,
        y: pVitalsY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(pVitalsNode);
      edges.push({
        source: perfHubNode.id,
        target: pVitalsNode.id,
        category: "perf",
        level: 3,
        branchIndex: 1,
      });

      const lcpRaw = allNodes.find((n) => n.id === "perf-lcp-metric");
      if (lcpRaw) {
        positionedNodes.push({
          ...lcpRaw,
          x: pVitalsX + 320,
          y: pVitalsY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pVitalsNode.id,
          target: lcpRaw.id,
          category: "perf",
          level: 4,
          branchIndex: 1,
        });
      }

      const inpRaw = allNodes.find((n) => n.id === "perf-inp-metric");
      if (inpRaw) {
        positionedNodes.push({
          ...inpRaw,
          x: pVitalsX + 320,
          y: pVitalsY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pVitalsNode.id,
          target: inpRaw.id,
          category: "perf",
          level: 4,
          branchIndex: 1,
        });
      }

      const clsRaw = allNodes.find((n) => n.id === "perf-cls-metric");
      if (clsRaw) {
        positionedNodes.push({
          ...clsRaw,
          x: pVitalsX + 320,
          y: pVitalsY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pVitalsNode.id,
          target: clsRaw.id,
          category: "perf",
          level: 4,
          branchIndex: 1,
        });
      }
    }

    // Perf Node 2: 9-Stage Performance & a11y Pipeline (Group Card)
    const perfCard = cardByPillar.get("perf-optimization-pipeline");
    if (perfCard) {
      const cardX = perfHubX + 800;
      const cardY = perfHubY;
      const posCard: PositionedGroupCard = {
        ...perfCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: perfHubNode.id,
        target: perfCard.id,
        category: "perf",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 1);
    }

    // Perf Node 3: Accessibility (a11y) & Screen Readers
    const pA11yRaw = allNodes.find((n) => n.id === "perf-a11y-tree-pillar");
    if (pA11yRaw) {
      const pA11yX = perfHubX + 650;
      const pA11yY = perfHubY + 180;
      const pA11yNode: PositionedNode = {
        ...pA11yRaw,
        x: pA11yX,
        y: pA11yY,
        level: 3,
        branchIndex: 1,
      };
      positionedNodes.push(pA11yNode);
      edges.push({
        source: perfHubNode.id,
        target: pA11yNode.id,
        category: "perf",
        level: 3,
        branchIndex: 1,
      });

      const ariaRaw = allNodes.find((n) => n.id === "perf-aria-roles");
      if (ariaRaw) {
        positionedNodes.push({
          ...ariaRaw,
          x: pA11yX + 320,
          y: pA11yY - 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pA11yNode.id,
          target: ariaRaw.id,
          category: "perf",
          level: 4,
          branchIndex: 1,
        });
      }

      const focusRaw = allNodes.find((n) => n.id === "perf-keyboard-focus");
      if (focusRaw) {
        positionedNodes.push({
          ...focusRaw,
          x: pA11yX + 320,
          y: pA11yY,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pA11yNode.id,
          target: focusRaw.id,
          category: "perf",
          level: 4,
          branchIndex: 1,
        });
      }

      const annRaw = allNodes.find((n) => n.id === "perf-screen-reader-announcers");
      if (annRaw) {
        positionedNodes.push({
          ...annRaw,
          x: pA11yX + 320,
          y: pA11yY + 35,
          level: 4,
          branchIndex: 1,
        });
        edges.push({
          source: pA11yNode.id,
          target: annRaw.id,
          category: "perf",
          level: 4,
          branchIndex: 1,
        });
      }
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

    // 3. libuv (C Async Engine Keyword Node) -> Down-Right
    const libuvHubX = 1380;
    const libuvHubY = 400;
    const libuvHubNode: PositionedNode = {
      id: "node-libuv-pillar",
      label: "libuv",
      category: "node",
      level: 2,
      badge: "C Async Engine",
      color: "#14b8a6",
      searchQuery: "Node.js libuv architecture C library async IO event loop threadpool",
      x: libuvHubX,
      y: libuvHubY,
      branchIndex: 1,
    };
    positionedNodes.push(libuvHubNode);
    edges.push({
      source: nodeHubNode.id,
      target: libuvHubNode.id,
      category: "node",
      level: 2,
      branchIndex: 1,
    });

    // 3a. libuv Thread Pool & OS I/O Card -> placed at x = 2250, y = 200
    const libuvCard = cardByPillar.get("node-libuv-infra");
    if (libuvCard) {
      const cardX = 2250;
      const cardY = 200;
      const posCard: PositionedGroupCard = {
        ...libuvCard,
        x: cardX,
        y: cardY,
        branchIndex: 1,
      };
      positionedCards.push(posCard);
      edges.push({
        source: libuvHubNode.id,
        target: libuvCard.id,
        category: "node",
        level: 3,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 4, 1);
    }

    // 3b. Event Loop Keyword Node -> placed at x = 1800, y = 780
    const elHubX = 1800;
    const elHubY = 780;
    const elHubNode: PositionedNode = {
      id: "node-eventloop-pillar",
      label: "Event Loop",
      category: "node",
      level: 3,
      badge: "Coordinator",
      color: "#22c55e",
      searchQuery: "Node.js Event Loop explained coordinator tick cycle",
      x: elHubX,
      y: elHubY,
      branchIndex: 1,
    };
    positionedNodes.push(elHubNode);
    edges.push({
      source: libuvHubNode.id,
      target: elHubNode.id,
      category: "node",
      level: 3,
      branchIndex: 1,
    });

    // 3c. Event Loop 5 Phases Card -> placed at x = 2450, y = 780
    const phasesCard = cardByPillar.get("node-phases-pillar");
    if (phasesCard) {
      const cardX = 2450;
      const cardY = 780;
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
        level: 4,
        branchIndex: 1,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 5, 1);
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
      badge: "OOP, DSA & Big O",
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
        category: "bigo",
        level: 2,
        branchIndex: 2,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 2);
    }

    // ==========================================
    // BRANCH 3: AI & MACHINE LEARNING (Magenta, branch 3)
    // ==========================================
    // Sub-Branch 3A: AI & Math Prerequisites Hub (placed top-left at x = -1300, y = -1350)
    const aimathHubX = -1300;
    const aimathHubY = -1350;
    const aimathHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-aimath")!,
      x: aimathHubX,
      y: aimathHubY,
      level: 1,
      branchIndex: 3,
    };
    positionedNodes.push(aimathHubNode);
    edges.push({
      source: rootNode.id,
      target: aimathHubNode.id,
      category: "aimath",
      level: 1,
      branchIndex: 3,
    });

    // AIMath Node 1: Linear Algebra & Tensor Spaces (Left)
    const linAlgRaw = allNodes.find((n) => n.id === "aimath-linear-algebra-pillar");
    if (linAlgRaw) {
      const linAlgX = aimathHubX - 650;
      const linAlgY = aimathHubY - 180;
      const linAlgNode: PositionedNode = {
        ...linAlgRaw,
        x: linAlgX,
        y: linAlgY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(linAlgNode);
      edges.push({
        source: aimathHubNode.id,
        target: linAlgNode.id,
        category: "aimath",
        level: 3,
        branchIndex: 3,
      });

      const vecRaw = allNodes.find((n) => n.id === "aimath-vectors-matrices");
      if (vecRaw) {
        positionedNodes.push({
          ...vecRaw,
          x: linAlgX - 320,
          y: linAlgY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: linAlgNode.id,
          target: vecRaw.id,
          category: "aimath",
          level: 4,
          branchIndex: 3,
        });
      }

      const matRaw = allNodes.find((n) => n.id === "aimath-matrix-multiplication");
      if (matRaw) {
        positionedNodes.push({
          ...matRaw,
          x: linAlgX - 320,
          y: linAlgY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: linAlgNode.id,
          target: matRaw.id,
          category: "aimath",
          level: 4,
          branchIndex: 3,
        });
      }

      const eigRaw = allNodes.find((n) => n.id === "aimath-eigenvalues-svd");
      if (eigRaw) {
        positionedNodes.push({
          ...eigRaw,
          x: linAlgX - 320,
          y: linAlgY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: linAlgNode.id,
          target: eigRaw.id,
          category: "aimath",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // AIMath Node 2: 9-Stage Tensor Math & Probability Pipeline (Group Card, Left-Center)
    const aimathCard = cardByPillar.get("aimath-pipeline-pillar");
    if (aimathCard) {
      const cardX = aimathHubX - 800;
      const cardY = aimathHubY;
      const posCard: PositionedGroupCard = {
        ...aimathCard,
        x: cardX,
        y: cardY,
        branchIndex: 3,
      };
      positionedCards.push(posCard);
      edges.push({
        source: aimathHubNode.id,
        target: aimathCard.id,
        category: "aimath",
        level: 3,
        branchIndex: 3,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 3);
    }

    // AIMath Node 3: Probability, Calculus & NumPy (Left-Down)
    const probCalcRaw = allNodes.find((n) => n.id === "aimath-probability-calc-pillar");
    if (probCalcRaw) {
      const probX = aimathHubX - 650;
      const probY = aimathHubY + 180;
      const probNode: PositionedNode = {
        ...probCalcRaw,
        x: probX,
        y: probY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(probNode);
      edges.push({
        source: aimathHubNode.id,
        target: probNode.id,
        category: "aimath",
        level: 3,
        branchIndex: 3,
      });

      const bayesRaw = allNodes.find((n) => n.id === "aimath-bayes-distributions");
      if (bayesRaw) {
        positionedNodes.push({
          ...bayesRaw,
          x: probX - 320,
          y: probY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: probNode.id,
          target: bayesRaw.id,
          category: "aimath",
          level: 4,
          branchIndex: 3,
        });
      }

      const gradRaw = allNodes.find((n) => n.id === "aimath-gradients-chain-rule");
      if (gradRaw) {
        positionedNodes.push({
          ...gradRaw,
          x: probX - 320,
          y: probY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: probNode.id,
          target: gradRaw.id,
          category: "aimath",
          level: 4,
          branchIndex: 3,
        });
      }

      const npRaw = allNodes.find((n) => n.id === "aimath-numpy-broadcasting");
      if (npRaw) {
        positionedNodes.push({
          ...npRaw,
          x: probX - 320,
          y: probY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: probNode.id,
          target: npRaw.id,
          category: "aimath",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // Sub-Branch 3B: Machine Learning (Supervised & Unsupervised) Hub (placed at x = -1300, y = -1950)
    const mlHubX = -1300;
    const mlHubY = -1950;
    const mlHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-mlcore")!,
      x: mlHubX,
      y: mlHubY,
      level: 1,
      branchIndex: 3,
    };
    positionedNodes.push(mlHubNode);
    edges.push({
      source: aimathHubNode.id,
      target: mlHubNode.id,
      category: "mlcore",
      level: 1,
      branchIndex: 3,
    });

    // ML Node 1: Supervised Learning Models (Left-Up)
    const supRaw = allNodes.find((n) => n.id === "mlcore-supervised-pillar");
    if (supRaw) {
      const supX = mlHubX - 650;
      const supY = mlHubY - 180;
      const supNode: PositionedNode = {
        ...supRaw,
        x: supX,
        y: supY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(supNode);
      edges.push({
        source: mlHubNode.id,
        target: supNode.id,
        category: "mlcore",
        level: 3,
        branchIndex: 3,
      });

      const regRaw = allNodes.find((n) => n.id === "mlcore-regression-models");
      if (regRaw) {
        positionedNodes.push({
          ...regRaw,
          x: supX - 320,
          y: supY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: supNode.id,
          target: regRaw.id,
          category: "mlcore",
          level: 4,
          branchIndex: 3,
        });
      }

      const treeRaw = allNodes.find((n) => n.id === "mlcore-trees-ensembles");
      if (treeRaw) {
        positionedNodes.push({
          ...treeRaw,
          x: supX - 320,
          y: supY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: supNode.id,
          target: treeRaw.id,
          category: "mlcore",
          level: 4,
          branchIndex: 3,
        });
      }

      const svmRaw = allNodes.find((n) => n.id === "mlcore-svm-kernels");
      if (svmRaw) {
        positionedNodes.push({
          ...svmRaw,
          x: supX - 320,
          y: supY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: supNode.id,
          target: svmRaw.id,
          category: "mlcore",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // ML Node 2: 9-Stage Machine Learning Pipeline (Group Card, Left-Center)
    const mlCard = cardByPillar.get("mlcore-pipeline-pillar");
    if (mlCard) {
      const cardX = mlHubX - 800;
      const cardY = mlHubY;
      const posCard: PositionedGroupCard = {
        ...mlCard,
        x: cardX,
        y: cardY,
        branchIndex: 3,
      };
      positionedCards.push(posCard);
      edges.push({
        source: mlHubNode.id,
        target: mlCard.id,
        category: "mlcore",
        level: 3,
        branchIndex: 3,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 3);
    }

    // ML Node 3: Unsupervised & Model Tuning (Left-Down)
    const unsupRaw = allNodes.find((n) => n.id === "mlcore-unsupervised-eval-pillar");
    if (unsupRaw) {
      const unsupX = mlHubX - 650;
      const unsupY = mlHubY + 180;
      const unsupNode: PositionedNode = {
        ...unsupRaw,
        x: unsupX,
        y: unsupY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(unsupNode);
      edges.push({
        source: mlHubNode.id,
        target: unsupNode.id,
        category: "mlcore",
        level: 3,
        branchIndex: 3,
      });

      const kmRaw = allNodes.find((n) => n.id === "mlcore-kmeans-clustering");
      if (kmRaw) {
        positionedNodes.push({
          ...kmRaw,
          x: unsupX - 320,
          y: unsupY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: unsupNode.id,
          target: kmRaw.id,
          category: "mlcore",
          level: 4,
          branchIndex: 3,
        });
      }

      const bvRaw = allNodes.find((n) => n.id === "mlcore-bias-variance-tradeoff");
      if (bvRaw) {
        positionedNodes.push({
          ...bvRaw,
          x: unsupX - 320,
          y: unsupY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: unsupNode.id,
          target: bvRaw.id,
          category: "mlcore",
          level: 4,
          branchIndex: 3,
        });
      }

      const regEvalRaw = allNodes.find((n) => n.id === "mlcore-regularization-eval");
      if (regEvalRaw) {
        positionedNodes.push({
          ...regEvalRaw,
          x: unsupX - 320,
          y: unsupY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: unsupNode.id,
          target: regEvalRaw.id,
          category: "mlcore",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // Sub-Branch 3C: Deep Learning (Neural Networks & Transformers) Hub (placed at x = -1300, y = -2550)
    const deepHubX = -1300;
    const deepHubY = -2550;
    const deepHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-deeplearning")!,
      x: deepHubX,
      y: deepHubY,
      level: 1,
      branchIndex: 3,
    };
    positionedNodes.push(deepHubNode);
    edges.push({
      source: mlHubNode.id,
      target: deepHubNode.id,
      category: "deeplearning",
      level: 1,
      branchIndex: 3,
    });

    // DL Node 1: Neural Network Architectures (Left-Up)
    const archRaw = allNodes.find((n) => n.id === "dl-architecture-pillar");
    if (archRaw) {
      const archX = deepHubX - 650;
      const archY = deepHubY - 180;
      const archNode: PositionedNode = {
        ...archRaw,
        x: archX,
        y: archY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(archNode);
      edges.push({
        source: deepHubNode.id,
        target: archNode.id,
        category: "deeplearning",
        level: 3,
        branchIndex: 3,
      });

      const mlpRaw = allNodes.find((n) => n.id === "dl-feedforward-perceptrons");
      if (mlpRaw) {
        positionedNodes.push({
          ...mlpRaw,
          x: archX - 320,
          y: archY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: archNode.id,
          target: mlpRaw.id,
          category: "deeplearning",
          level: 4,
          branchIndex: 3,
        });
      }

      const actRaw = allNodes.find((n) => n.id === "dl-activation-functions");
      if (actRaw) {
        positionedNodes.push({
          ...actRaw,
          x: archX - 320,
          y: archY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: archNode.id,
          target: actRaw.id,
          category: "deeplearning",
          level: 4,
          branchIndex: 3,
        });
      }

      const tfRaw = allNodes.find((n) => n.id === "dl-transformers-attention");
      if (tfRaw) {
        positionedNodes.push({
          ...tfRaw,
          x: archX - 320,
          y: archY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: archNode.id,
          target: tfRaw.id,
          category: "deeplearning",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // DL Node 2: 9-Stage Deep Learning Pipeline (Group Card, Left-Center)
    const dlCard = cardByPillar.get("dl-pipeline-pillar");
    if (dlCard) {
      const cardX = deepHubX - 800;
      const cardY = deepHubY;
      const posCard: PositionedGroupCard = {
        ...dlCard,
        x: cardX,
        y: cardY,
        branchIndex: 3,
      };
      positionedCards.push(posCard);
      edges.push({
        source: deepHubNode.id,
        target: dlCard.id,
        category: "deeplearning",
        level: 3,
        branchIndex: 3,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 3);
    }

    // DL Node 3: Optimization & Loss Dynamics (Left-Down)
    const optRaw = allNodes.find((n) => n.id === "dl-optimization-pillar");
    if (optRaw) {
      const optX = deepHubX - 650;
      const optY = deepHubY + 180;
      const optNode: PositionedNode = {
        ...optRaw,
        x: optX,
        y: optY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(optNode);
      edges.push({
        source: deepHubNode.id,
        target: optNode.id,
        category: "deeplearning",
        level: 3,
        branchIndex: 3,
      });

      const gradRaw = allNodes.find((n) => n.id === "dl-vanishing-exploding-grad");
      if (gradRaw) {
        positionedNodes.push({
          ...gradRaw,
          x: optX - 320,
          y: optY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: optNode.id,
          target: gradRaw.id,
          category: "deeplearning",
          level: 4,
          branchIndex: 3,
        });
      }

      const surfRaw = allNodes.find((n) => n.id === "dl-loss-surfaces");
      if (surfRaw) {
        positionedNodes.push({
          ...surfRaw,
          x: optX - 320,
          y: optY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: optNode.id,
          target: surfRaw.id,
          category: "deeplearning",
          level: 4,
          branchIndex: 3,
        });
      }

      const distRaw = allNodes.find((n) => n.id === "dl-distributed-training");
      if (distRaw) {
        positionedNodes.push({
          ...distRaw,
          x: optX - 320,
          y: optY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: optNode.id,
          target: distRaw.id,
          category: "deeplearning",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // Sub-Branch 3D: NLP & Large Language Models (LLMs) Hub (placed at x = -1300, y = -3150)
    const nlpHubX = -1300;
    const nlpHubY = -3150;
    const nlpHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-nlpllms")!,
      x: nlpHubX,
      y: nlpHubY,
      level: 1,
      branchIndex: 3,
    };
    positionedNodes.push(nlpHubNode);
    edges.push({
      source: deepHubNode.id,
      target: nlpHubNode.id,
      category: "nlpllms",
      level: 1,
      branchIndex: 3,
    });

    // NLP Node 1: Tokenization & Embedding Foundations (Left-Up)
    const tokRaw = allNodes.find((n) => n.id === "nlp-token-embeddings-pillar");
    if (tokRaw) {
      const tokX = nlpHubX - 650;
      const tokY = nlpHubY - 180;
      const tokNode: PositionedNode = {
        ...tokRaw,
        x: tokX,
        y: tokY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(tokNode);
      edges.push({
        source: nlpHubNode.id,
        target: tokNode.id,
        category: "nlpllms",
        level: 3,
        branchIndex: 3,
      });

      const subwordRaw = allNodes.find((n) => n.id === "nlp-subword-tokenization");
      if (subwordRaw) {
        positionedNodes.push({
          ...subwordRaw,
          x: tokX - 320,
          y: tokY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: tokNode.id,
          target: subwordRaw.id,
          category: "nlpllms",
          level: 4,
          branchIndex: 3,
        });
      }

      const denseRaw = allNodes.find((n) => n.id === "nlp-dense-embeddings");
      if (denseRaw) {
        positionedNodes.push({
          ...denseRaw,
          x: tokX - 320,
          y: tokY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: tokNode.id,
          target: denseRaw.id,
          category: "nlpllms",
          level: 4,
          branchIndex: 3,
        });
      }

      const posEncRaw = allNodes.find((n) => n.id === "nlp-positional-encodings");
      if (posEncRaw) {
        positionedNodes.push({
          ...posEncRaw,
          x: tokX - 320,
          y: tokY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: tokNode.id,
          target: posEncRaw.id,
          category: "nlpllms",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // NLP Node 2: 9-Stage LLM Inference & RAG Pipeline (Group Card, Left-Center)
    const nlpCard = cardByPillar.get("nlp-pipeline-pillar");
    if (nlpCard) {
      const cardX = nlpHubX - 800;
      const cardY = nlpHubY;
      const posCard: PositionedGroupCard = {
        ...nlpCard,
        x: cardX,
        y: cardY,
        branchIndex: 3,
      };
      positionedCards.push(posCard);
      edges.push({
        source: nlpHubNode.id,
        target: nlpCard.id,
        category: "nlpllms",
        level: 3,
        branchIndex: 3,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 3);
    }

    // NLP Node 3: Modern LLM Architectures & Reasoning (Left-Down)
    const nlpArchRaw = allNodes.find((n) => n.id === "nlp-architecture-pillar");
    if (nlpArchRaw) {
      const nlpArchX = nlpHubX - 650;
      const nlpArchY = nlpHubY + 180;
      const nlpArchNode: PositionedNode = {
        ...nlpArchRaw,
        x: nlpArchX,
        y: nlpArchY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(nlpArchNode);
      edges.push({
        source: nlpHubNode.id,
        target: nlpArchNode.id,
        category: "nlpllms",
        level: 3,
        branchIndex: 3,
      });

      const decRaw = allNodes.find((n) => n.id === "nlp-decoder-only-models");
      if (decRaw) {
        positionedNodes.push({
          ...decRaw,
          x: nlpArchX - 320,
          y: nlpArchY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: nlpArchNode.id,
          target: decRaw.id,
          category: "nlpllms",
          level: 4,
          branchIndex: 3,
        });
      }

      const moeRaw = allNodes.find((n) => n.id === "nlp-mixture-of-experts");
      if (moeRaw) {
        positionedNodes.push({
          ...moeRaw,
          x: nlpArchX - 320,
          y: nlpArchY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: nlpArchNode.id,
          target: moeRaw.id,
          category: "nlpllms",
          level: 4,
          branchIndex: 3,
        });
      }

      const rlhfRaw = allNodes.find((n) => n.id === "nlp-reasoning-alignment");
      if (rlhfRaw) {
        positionedNodes.push({
          ...rlhfRaw,
          x: nlpArchX - 320,
          y: nlpArchY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: nlpArchNode.id,
          target: rlhfRaw.id,
          category: "nlpllms",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // Sub-Branch 3E: Computer Vision Hub (placed at x = -1300, y = -3750)
    const visionHubX = -1300;
    const visionHubY = -3750;
    const visionHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-vision")!,
      x: visionHubX,
      y: visionHubY,
      level: 1,
      branchIndex: 3,
    };
    positionedNodes.push(visionHubNode);
    edges.push({
      source: nlpHubNode.id,
      target: visionHubNode.id,
      category: "vision",
      level: 1,
      branchIndex: 3,
    });

    // Vision Node 1: Convolutional Foundations (Left-Up)
    const convRaw = allNodes.find((n) => n.id === "vision-conv-foundations-pillar");
    if (convRaw) {
      const convX = visionHubX - 650;
      const convY = visionHubY - 180;
      const convNode: PositionedNode = {
        ...convRaw,
        x: convX,
        y: convY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(convNode);
      edges.push({
        source: visionHubNode.id,
        target: convNode.id,
        category: "vision",
        level: 3,
        branchIndex: 3,
      });

      const conv2dRaw = allNodes.find((n) => n.id === "vision-2d-convolutions");
      if (conv2dRaw) {
        positionedNodes.push({
          ...conv2dRaw,
          x: convX - 320,
          y: convY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: convNode.id,
          target: conv2dRaw.id,
          category: "vision",
          level: 4,
          branchIndex: 3,
        });
      }

      const poolRaw = allNodes.find((n) => n.id === "vision-pooling-receptive-field");
      if (poolRaw) {
        positionedNodes.push({
          ...poolRaw,
          x: convX - 320,
          y: convY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: convNode.id,
          target: poolRaw.id,
          category: "vision",
          level: 4,
          branchIndex: 3,
        });
      }

      const resnetRaw = allNodes.find((n) => n.id === "vision-resnet-backbones");
      if (resnetRaw) {
        positionedNodes.push({
          ...resnetRaw,
          x: convX - 320,
          y: convY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: convNode.id,
          target: resnetRaw.id,
          category: "vision",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // Vision Node 2: 9-Stage Computer Vision & Detection Pipeline (Group Card, Left-Center)
    const visionCard = cardByPillar.get("vision-pipeline-pillar");
    if (visionCard) {
      const cardX = visionHubX - 800;
      const cardY = visionHubY;
      const posCard: PositionedGroupCard = {
        ...visionCard,
        x: cardX,
        y: cardY,
        branchIndex: 3,
      };
      positionedCards.push(posCard);
      edges.push({
        source: visionHubNode.id,
        target: visionCard.id,
        category: "vision",
        level: 3,
        branchIndex: 3,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 3);
    }

    // Vision Node 3: Vision Transformers & SOTA (Left-Down)
    const vitPillarRaw = allNodes.find((n) => n.id === "vision-vit-multimodal-pillar");
    if (vitPillarRaw) {
      const vitX = visionHubX - 650;
      const vitY = visionHubY + 180;
      const vitNode: PositionedNode = {
        ...vitPillarRaw,
        x: vitX,
        y: vitY,
        level: 3,
        branchIndex: 3,
      };
      positionedNodes.push(vitNode);
      edges.push({
        source: visionHubNode.id,
        target: vitNode.id,
        category: "vision",
        level: 3,
        branchIndex: 3,
      });

      const vitRaw = allNodes.find((n) => n.id === "vision-transformers-vit");
      if (vitRaw) {
        positionedNodes.push({
          ...vitRaw,
          x: vitX - 320,
          y: vitY - 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: vitNode.id,
          target: vitRaw.id,
          category: "vision",
          level: 4,
          branchIndex: 3,
        });
      }

      const yoloRaw = allNodes.find((n) => n.id === "vision-yolo-detection");
      if (yoloRaw) {
        positionedNodes.push({
          ...yoloRaw,
          x: vitX - 320,
          y: vitY,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: vitNode.id,
          target: yoloRaw.id,
          category: "vision",
          level: 4,
          branchIndex: 3,
        });
      }

      const maskRaw = allNodes.find((n) => n.id === "vision-mask-rcnn-segmentation");
      if (maskRaw) {
        positionedNodes.push({
          ...maskRaw,
          x: vitX - 320,
          y: vitY + 35,
          level: 4,
          branchIndex: 3,
        });
        edges.push({
          source: vitNode.id,
          target: maskRaw.id,
          category: "vision",
          level: 4,
          branchIndex: 3,
        });
      }
    }

    // ==========================================
    // BRANCH 4: MOBILE, DATA & EMERGING TECH (Blue, branch 4)
    // ==========================================
    // Sub-Branch 4A: Mobile Platform Hub (placed along the left spine at x = -1300, y = -4350)
    const mobileHubX = -1300;
    const mobileHubY = -4350;
    const mobileHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-mobile")!,
      x: mobileHubX,
      y: mobileHubY,
      level: 1,
      branchIndex: 4,
    };
    positionedNodes.push(mobileHubNode);
    edges.push({
      source: visionHubNode.id,
      target: mobileHubNode.id,
      category: "mobile",
      level: 1,
      branchIndex: 4,
    });

    // Mobile Node 1: Lifecycle & Memory Management (Left-Up)
    const lifeRaw = allNodes.find((n) => n.id === "mobile-lifecycle-memory-pillar");
    if (lifeRaw) {
      const lifeX = mobileHubX - 650;
      const lifeY = mobileHubY - 180;
      const lifeNode: PositionedNode = {
        ...lifeRaw,
        x: lifeX,
        y: lifeY,
        level: 3,
        branchIndex: 4,
      };
      positionedNodes.push(lifeNode);
      edges.push({
        source: mobileHubNode.id,
        target: lifeNode.id,
        category: "mobile",
        level: 3,
        branchIndex: 4,
      });

      const stateRaw = allNodes.find((n) => n.id === "mobile-app-lifecycle-states");
      if (stateRaw) {
        positionedNodes.push({
          ...stateRaw,
          x: lifeX - 320,
          y: lifeY - 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: lifeNode.id,
          target: stateRaw.id,
          category: "mobile",
          level: 4,
          branchIndex: 4,
        });
      }

      const arcRaw = allNodes.find((n) => n.id === "mobile-memory-constraints-arc");
      if (arcRaw) {
        positionedNodes.push({
          ...arcRaw,
          x: lifeX - 320,
          y: lifeY,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: lifeNode.id,
          target: arcRaw.id,
          category: "mobile",
          level: 4,
          branchIndex: 4,
        });
      }

      const uiRaw = allNodes.find((n) => n.id === "mobile-ui-rendering-thread");
      if (uiRaw) {
        positionedNodes.push({
          ...uiRaw,
          x: lifeX - 320,
          y: lifeY + 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: lifeNode.id,
          target: uiRaw.id,
          category: "mobile",
          level: 4,
          branchIndex: 4,
        });
      }
    }

    // Mobile Node 2: 9-Stage Mobile App Runtime & Delivery Pipeline (Group Card, Left-Center)
    const mobileCard = cardByPillar.get("mobile-pipeline-pillar");
    if (mobileCard) {
      const cardX = mobileHubX - 800;
      const cardY = mobileHubY;
      const posCard: PositionedGroupCard = {
        ...mobileCard,
        x: cardX,
        y: cardY,
        branchIndex: 4,
      };
      positionedCards.push(posCard);
      edges.push({
        source: mobileHubNode.id,
        target: mobileCard.id,
        category: "mobile",
        level: 3,
        branchIndex: 4,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 4);
    }

    // Mobile Node 3: Cross-Platform & Native Engine (Left-Down)
    const crossPillarRaw = allNodes.find((n) => n.id === "mobile-crossplatform-ecosystem-pillar");
    if (crossPillarRaw) {
      const crossX = mobileHubX - 650;
      const crossY = mobileHubY + 180;
      const crossNode: PositionedNode = {
        ...crossPillarRaw,
        x: crossX,
        y: crossY,
        level: 3,
        branchIndex: 4,
      };
      positionedNodes.push(crossNode);
      edges.push({
        source: mobileHubNode.id,
        target: crossNode.id,
        category: "mobile",
        level: 3,
        branchIndex: 4,
      });

      const rnRaw = allNodes.find((n) => n.id === "mobile-react-native-jsc-hermes");
      if (rnRaw) {
        positionedNodes.push({
          ...rnRaw,
          x: crossX - 320,
          y: crossY - 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: crossNode.id,
          target: rnRaw.id,
          category: "mobile",
          level: 4,
          branchIndex: 4,
        });
      }

      const fltRaw = allNodes.find((n) => n.id === "mobile-flutter-dart-engine");
      if (fltRaw) {
        positionedNodes.push({
          ...fltRaw,
          x: crossX - 320,
          y: crossY,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: crossNode.id,
          target: fltRaw.id,
          category: "mobile",
          level: 4,
          branchIndex: 4,
        });
      }

      const offRaw = allNodes.find((n) => n.id === "mobile-offline-first-sync");
      if (offRaw) {
        positionedNodes.push({
          ...offRaw,
          x: crossX - 320,
          y: crossY + 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: crossNode.id,
          target: offRaw.id,
          category: "mobile",
          level: 4,
          branchIndex: 4,
        });
      }
    }

    // Sub-Branch 4B: Data Engineering Hub (placed along the left spine at x = -1300, y = -4950)
    const dataHubX = -1300;
    const dataHubY = -4950;
    const dataHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-data")!,
      x: dataHubX,
      y: dataHubY,
      level: 1,
      branchIndex: 4,
    };
    positionedNodes.push(dataHubNode);
    edges.push({
      source: mobileHubNode.id,
      target: dataHubNode.id,
      category: "data",
      level: 1,
      branchIndex: 4,
    });

    // Data Node 1: Distributed Compute & Spark (Left-Up)
    const sparkPillarRaw = allNodes.find((n) => n.id === "data-distributed-compute-pillar");
    if (sparkPillarRaw) {
      const sparkX = dataHubX - 650;
      const sparkY = dataHubY - 180;
      const sparkNode: PositionedNode = {
        ...sparkPillarRaw,
        x: sparkX,
        y: sparkY,
        level: 3,
        branchIndex: 4,
      };
      positionedNodes.push(sparkNode);
      edges.push({
        source: dataHubNode.id,
        target: sparkNode.id,
        category: "data",
        level: 3,
        branchIndex: 4,
      });

      const rddRaw = allNodes.find((n) => n.id === "data-spark-rdd-dataframes");
      if (rddRaw) {
        positionedNodes.push({
          ...rddRaw,
          x: sparkX - 320,
          y: sparkY - 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: sparkNode.id,
          target: rddRaw.id,
          category: "data",
          level: 4,
          branchIndex: 4,
        });
      }

      const partRaw = allNodes.find((n) => n.id === "data-partitioning-shuffling-skew");
      if (partRaw) {
        positionedNodes.push({
          ...partRaw,
          x: sparkX - 320,
          y: sparkY,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: sparkNode.id,
          target: partRaw.id,
          category: "data",
          level: 4,
          branchIndex: 4,
        });
      }

      const streamRaw = allNodes.find((n) => n.id === "data-batch-vs-streaming");
      if (streamRaw) {
        positionedNodes.push({
          ...streamRaw,
          x: sparkX - 320,
          y: sparkY + 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: sparkNode.id,
          target: streamRaw.id,
          category: "data",
          level: 4,
          branchIndex: 4,
        });
      }
    }

    // Data Node 2: 9-Stage Lakehouse & Data Pipeline (Group Card, Left-Center)
    const dataCard = cardByPillar.get("data-pipeline-pillar");
    if (dataCard) {
      const cardX = dataHubX - 800;
      const cardY = dataHubY;
      const posCard: PositionedGroupCard = {
        ...dataCard,
        x: cardX,
        y: cardY,
        branchIndex: 4,
      };
      positionedCards.push(posCard);
      edges.push({
        source: dataHubNode.id,
        target: dataCard.id,
        category: "data",
        level: 3,
        branchIndex: 4,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 4);
    }

    // Data Node 3: Lakehouse Storage & Governance (Left-Down)
    const lakehouseRaw = allNodes.find((n) => n.id === "data-lakehouse-governance-pillar");
    if (lakehouseRaw) {
      const lakeX = dataHubX - 650;
      const lakeY = dataHubY + 180;
      const lakeNode: PositionedNode = {
        ...lakehouseRaw,
        x: lakeX,
        y: lakeY,
        level: 3,
        branchIndex: 4,
      };
      positionedNodes.push(lakeNode);
      edges.push({
        source: dataHubNode.id,
        target: lakeNode.id,
        category: "data",
        level: 3,
        branchIndex: 4,
      });

      const acidRaw = allNodes.find((n) => n.id === "data-delta-iceberg-acid");
      if (acidRaw) {
        positionedNodes.push({
          ...acidRaw,
          x: lakeX - 320,
          y: lakeY - 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: lakeNode.id,
          target: acidRaw.id,
          category: "data",
          level: 4,
          branchIndex: 4,
        });
      }

      const dbtRaw = allNodes.find((n) => n.id === "data-dbt-dimensional-modeling");
      if (dbtRaw) {
        positionedNodes.push({
          ...dbtRaw,
          x: lakeX - 320,
          y: lakeY,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: lakeNode.id,
          target: dbtRaw.id,
          category: "data",
          level: 4,
          branchIndex: 4,
        });
      }

      const qualRaw = allNodes.find((n) => n.id === "data-lineage-quality-contracts");
      if (qualRaw) {
        positionedNodes.push({
          ...qualRaw,
          x: lakeX - 320,
          y: lakeY + 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: lakeNode.id,
          target: qualRaw.id,
          category: "data",
          level: 4,
          branchIndex: 4,
        });
      }
    }

    // Sub-Branch 4C: Game Dev & Graphics Hub (placed along the left spine at x = -1300, y = -5550)
    const gameHubX = -1300;
    const gameHubY = -5550;
    const gameHubNode: PositionedNode = {
      ...allNodes.find((n) => n.id === "root-gamedev")!,
      x: gameHubX,
      y: gameHubY,
      level: 1,
      branchIndex: 4,
    };
    positionedNodes.push(gameHubNode);
    edges.push({
      source: dataHubNode.id,
      target: gameHubNode.id,
      category: "gamedev",
      level: 1,
      branchIndex: 4,
    });

    // Game Node 1: Game Loop & Physics Dynamics (Left-Up)
    const loopPillarRaw = allNodes.find((n) => n.id === "gamedev-game-loop-pillar");
    if (loopPillarRaw) {
      const loopX = gameHubX - 650;
      const loopY = gameHubY - 180;
      const loopNode: PositionedNode = {
        ...loopPillarRaw,
        x: loopX,
        y: loopY,
        level: 3,
        branchIndex: 4,
      };
      positionedNodes.push(loopNode);
      edges.push({
        source: gameHubNode.id,
        target: loopNode.id,
        category: "gamedev",
        level: 3,
        branchIndex: 4,
      });

      const fuiRaw = allNodes.find((n) => n.id === "gamedev-fixed-update-interpolation");
      if (fuiRaw) {
        positionedNodes.push({
          ...fuiRaw,
          x: loopX - 320,
          y: loopY - 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: loopNode.id,
          target: fuiRaw.id,
          category: "gamedev",
          level: 4,
          branchIndex: 4,
        });
      }

      const bncRaw = allNodes.find((n) => n.id === "gamedev-broadphase-narrowphase-collision");
      if (bncRaw) {
        positionedNodes.push({
          ...bncRaw,
          x: loopX - 320,
          y: loopY,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: loopNode.id,
          target: bncRaw.id,
          category: "gamedev",
          level: 4,
          branchIndex: 4,
        });
      }

      const rspRaw = allNodes.find((n) => n.id === "gamedev-rigid-body-spatial-partitioning");
      if (rspRaw) {
        positionedNodes.push({
          ...rspRaw,
          x: loopX - 320,
          y: loopY + 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: loopNode.id,
          target: rspRaw.id,
          category: "gamedev",
          level: 4,
          branchIndex: 4,
        });
      }
    }

    // Game Node 2: 9-Stage Real-Time Game Rendering Pipeline (Group Card, Left-Center)
    const gameCard = cardByPillar.get("gamedev-pipeline-pillar");
    if (gameCard) {
      const cardX = gameHubX - 800;
      const cardY = gameHubY;
      const posCard: PositionedGroupCard = {
        ...gameCard,
        x: cardX,
        y: cardY,
        branchIndex: 4,
      };
      positionedCards.push(posCard);
      edges.push({
        source: gameHubNode.id,
        target: gameCard.id,
        category: "gamedev",
        level: 3,
        branchIndex: 4,
      });
      layoutCardSubItems(posCard, positionedNodes, edges, 3, 4);
    }

    // Game Node 3: GPU Shaders & Scene Graph (Left-Down)
    const shaderPillarRaw = allNodes.find((n) => n.id === "gamedev-gpu-shaders-pillar");
    if (shaderPillarRaw) {
      const shaderX = gameHubX - 650;
      const shaderY = gameHubY + 180;
      const shaderNode: PositionedNode = {
        ...shaderPillarRaw,
        x: shaderX,
        y: shaderY,
        level: 3,
        branchIndex: 4,
      };
      positionedNodes.push(shaderNode);
      edges.push({
        source: gameHubNode.id,
        target: shaderNode.id,
        category: "gamedev",
        level: 3,
        branchIndex: 4,
      });

      const ppsRaw = allNodes.find((n) => n.id === "gamedev-programmable-pipeline-shaders");
      if (ppsRaw) {
        positionedNodes.push({
          ...ppsRaw,
          x: shaderX - 320,
          y: shaderY - 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: shaderNode.id,
          target: ppsRaw.id,
          category: "gamedev",
          level: 4,
          branchIndex: 4,
        });
      }

      const sgtRaw = allNodes.find((n) => n.id === "gamedev-scene-graph-transform-hierarchies");
      if (sgtRaw) {
        positionedNodes.push({
          ...sgtRaw,
          x: shaderX - 320,
          y: shaderY,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: shaderNode.id,
          target: sgtRaw.id,
          category: "gamedev",
          level: 4,
          branchIndex: 4,
        });
      }

      const lpsRaw = allNodes.find((n) => n.id === "gamedev-lighting-pbr-shadow-maps");
      if (lpsRaw) {
        positionedNodes.push({
          ...lpsRaw,
          x: shaderX - 320,
          y: shaderY + 35,
          level: 4,
          branchIndex: 4,
        });
        edges.push({
          source: shaderNode.id,
          target: lpsRaw.id,
          category: "gamedev",
          level: 4,
          branchIndex: 4,
        });
      }
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
    pillarIds = ["scope-scope", "scope-chain", "scope-lexical-env"];
  } else if (category === "closure") {
    pillarIds = ["closure-core", "scope-backpack", "scope-5-sentences"];
  } else if (category === "async") {
    pillarIds = ["async-callbacks", "async-promises", "async-await"];
  } else if (category === "node") {
    pillarIds = ["node-restaurant-pillar", "node-apis-pillar", "node-libuv-pillar"];
  } else if (category === "backend") {
    pillarIds = ["backend-rest-http", "backend-middleware-pipeline", "backend-production-guards"];
  } else if (category === "realtime") {
    pillarIds = ["realtime-protocols", "realtime-socketio-lifecycle", "realtime-rooms-presence"];
  } else if (category === "queues") {
    pillarIds = ["queues-architecture", "queues-bullmq-lifecycle", "queues-workers-resilience"];
  } else if (category === "scaling") {
    pillarIds = ["scaling-algorithms", "scaling-nginx-pipeline", "scaling-horizontal-scale"];
  } else if (category === "platform") {
    pillarIds = ["platform-semantic-dom", "platform-css-pipeline", "platform-dom-apis"];
  } else if (category === "rendering") {
    pillarIds = ["rendering-pipeline", "rendering-reflow-repaint", "rendering-optimizations"];
  } else if (category === "security") {
    pillarIds = ["security-same-origin-cors", "security-cookie-lifecycle", "security-web-defenses"];
  } else if (category === "state") {
    pillarIds = ["state-reactivity-pillar", "state-rendering-pipeline", "state-hydration-islands"];
  } else if (category === "perf") {
    pillarIds = ["perf-vitals-pillar", "perf-optimization-pipeline", "perf-a11y-tree-pillar"];
  } else if (category === "aimath") {
    pillarIds = ["aimath-linear-algebra-pillar", "aimath-pipeline-pillar", "aimath-probability-calc-pillar"];
  } else if (category === "mlcore") {
    pillarIds = ["mlcore-supervised-pillar", "mlcore-pipeline-pillar", "mlcore-unsupervised-eval-pillar"];
  } else if (category === "deeplearning") {
    pillarIds = ["dl-architecture-pillar", "dl-pipeline-pillar", "dl-optimization-pillar"];
  } else if (category === "nlpllms") {
    pillarIds = ["nlp-token-embeddings-pillar", "nlp-pipeline-pillar", "nlp-architecture-pillar"];
  } else if (category === "vision") {
    pillarIds = ["vision-conv-foundations-pillar", "vision-pipeline-pillar", "vision-vit-multimodal-pillar"];
  } else if (category === "mobile") {
    pillarIds = ["mobile-lifecycle-memory-pillar", "mobile-pipeline-pillar", "mobile-crossplatform-ecosystem-pillar"];
  } else if (category === "data") {
    pillarIds = ["data-distributed-compute-pillar", "data-pipeline-pillar", "data-lakehouse-governance-pillar"];
  } else if (category === "gamedev") {
    pillarIds = ["gamedev-game-loop-pillar", "gamedev-pipeline-pillar", "gamedev-gpu-shaders-pillar"];
  } else if (category === "oop") {
    pillarIds = ["oop-pillars-pillar"];
  } else if (category === "dsa") {
    pillarIds = ["dsa-structures-pillar"];
  } else if (category === "bigo") {
    pillarIds = ["dsa-big-o-pillar"];
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

            // Child has children of its own (Level 3 keyword nodes or Group Cards)
            const subChildren = allNodes.filter((n) => n.parentId === child.id);
            const k = subChildren.length;
            if (k > 0) {
              const subSpread = 0.50;
              const subStartAngle = k === 1 ? childAngle : childAngle - subSpread / 2;

              subChildren.forEach((sub, sIdx) => {
                const subStep = k === 1 ? 0 : sIdx / (k - 1);
                const subAngle = k === 1 ? childAngle : subStartAngle + subStep * subSpread;

                // Check if this subChild itself has a Group Card (e.g. Event Loop 5 Phases)
                const subCardData = cardByPillar.get(sub.id);
                if (subCardData) {
                  const rSubCard = r2 + 480;
                  const cardX = Math.round(Math.cos(subAngle) * rSubCard);
                  const cardY = Math.round(Math.sin(subAngle) * rSubCard);

                  const posSubCard: PositionedGroupCard = {
                    ...subCardData,
                    x: cardX,
                    y: cardY,
                    branchIndex,
                  };
                  positionedCards.push(posSubCard);

                  edges.push({
                    source: childNode.id,
                    target: subCardData.id,
                    category: subCardData.category,
                    level: l3,
                    branchIndex,
                  });

                  layoutCardSubItems(posSubCard, positionedNodes, edges, l3 + 1, branchIndex);
                } else {
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
                }
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
        searchQuery: "JavaScript language core V8 engine scope closures async",
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
    const closureRoot = {
      ...allNodes.find((n) => n.id === "root-closure")!,
      parentId: "root-js-core",
      level: 2,
    };
    const asyncRoot = {
      ...allNodes.find((n) => n.id === "root-async")!,
      parentId: "root-js-core",
      level: 2,
    };
    const backendRoot = {
      ...allNodes.find((n) => n.id === "root-backend")!,
      parentId: "root-node",
      level: 2,
    };
    const realtimeRoot = {
      ...allNodes.find((n) => n.id === "root-realtime")!,
      parentId: "root-node",
      level: 2,
    };
    const queuesRoot = {
      ...allNodes.find((n) => n.id === "root-queues")!,
      parentId: "root-node",
      level: 2,
    };
    const scalingRoot = {
      ...allNodes.find((n) => n.id === "root-scaling")!,
      parentId: "root-node",
      level: 2,
    };
    const platformRoot = {
      ...allNodes.find((n) => n.id === "root-platform")!,
      parentId: "root-node",
      level: 2,
    };
    const renderingRoot = {
      ...allNodes.find((n) => n.id === "root-rendering")!,
      parentId: "root-node",
      level: 2,
    };
    const securityRoot = {
      ...allNodes.find((n) => n.id === "root-security")!,
      parentId: "root-node",
      level: 2,
    };
    const stateRoot = {
      ...allNodes.find((n) => n.id === "root-state")!,
      parentId: "root-node",
      level: 2,
    };
    const perfRoot = {
      ...allNodes.find((n) => n.id === "root-perf")!,
      parentId: "root-node",
      level: 2,
    };
    const aimathRoot = {
      ...allNodes.find((n) => n.id === "root-aimath")!,
      parentId: "root-all",
      level: 1,
    };
    const mlcoreRoot = {
      ...allNodes.find((n) => n.id === "root-mlcore")!,
      parentId: "root-all",
      level: 1,
    };
    const deepRoot = {
      ...allNodes.find((n) => n.id === "root-deeplearning")!,
      parentId: "root-all",
      level: 1,
    };
    const nlpRoot = {
      ...allNodes.find((n) => n.id === "root-nlpllms")!,
      parentId: "root-all",
      level: 1,
    };
    const visionRoot = {
      ...allNodes.find((n) => n.id === "root-vision")!,
      parentId: "root-all",
      level: 1,
    };
    const mobileRoot = {
      ...allNodes.find((n) => n.id === "root-mobile")!,
      parentId: "root-all",
      level: 1,
    };
    const dataRoot = {
      ...allNodes.find((n) => n.id === "root-data")!,
      parentId: "root-all",
      level: 1,
    };
    const gameRoot = {
      ...allNodes.find((n) => n.id === "root-gamedev")!,
      parentId: "root-all",
      level: 1,
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
    const bigoRoot = {
      ...allNodes.find((n) => n.id === "root-bigo")!,
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
        n.id !== "root-closure" &&
        n.id !== "root-async" &&
        n.id !== "root-node" &&
        n.id !== "root-backend" &&
        n.id !== "root-realtime" &&
        n.id !== "root-queues" &&
        n.id !== "root-scaling" &&
        n.id !== "root-platform" &&
        n.id !== "root-rendering" &&
        n.id !== "root-security" &&
        n.id !== "root-state" &&
        n.id !== "root-perf" &&
        n.id !== "root-aimath" &&
        n.id !== "root-mlcore" &&
        n.id !== "root-deeplearning" &&
        n.id !== "root-nlpllms" &&
        n.id !== "root-vision" &&
        n.id !== "root-mobile" &&
        n.id !== "root-data" &&
        n.id !== "root-gamedev" &&
        n.id !== "root-oop" &&
        n.id !== "root-dsa" &&
        n.id !== "root-bigo"
    );

    return {
      nodes: [rootAll, jsCoreRoot, nodeRoot, csFoundRoot, v8Root, scopeRoot, closureRoot, asyncRoot, backendRoot, realtimeRoot, queuesRoot, scalingRoot, platformRoot, renderingRoot, securityRoot, stateRoot, perfRoot, aimathRoot, mlcoreRoot, deepRoot, nlpRoot, visionRoot, mobileRoot, dataRoot, gameRoot, oopRoot, dsaRoot, bigoRoot, ...remaining],
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
