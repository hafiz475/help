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

  return {
    nodes: Array.from(positioned.values()),
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

  return {
    nodes: Array.from(positioned.values()),
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
    // Radiates STRICTLY 3 primary branches (120° Triad):
    // - Branch 0: JavaScript & V8 Core (Top-Left -150°) -> Red (branch 0)
    // - Branch 1: Node.js Runtime (Top-Right -30°) -> Yellow (branch 1)
    // - Branch 2: CS Foundations (OOP & DSA) (Bottom 90°) -> Green (branch 2)

    // ==========================================
    // BRANCH 0: JAVASCRIPT & V8 CORE (Red, branch 0)
    // ==========================================
    const jsCoreX = -460;
    const jsCoreY = -270;
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

    // Sub-Branch 0A: V8 Engine (angle -165° from jsCore)
    const v8Layout = calculateGroupLayout(allNodes, "v8", 0, 2);
    const v8HubX = jsCoreX - 440;
    const v8HubY = jsCoreY - 260;
    edges.push({
      source: jsCoreNode.id,
      target: v8Layout.rootNode.id,
      category: "v8",
      level: 2,
      branchIndex: 0,
    });
    positionedNodes.push({
      ...v8Layout.rootNode,
      x: v8HubX,
      y: v8HubY,
      level: 2,
      branchIndex: 0,
    });
    v8Layout.nodes.forEach((n) => {
      if (n.id !== v8Layout.rootNode.id) {
        positionedNodes.push({
          ...n,
          x: n.x + v8HubX,
          y: n.y + v8HubY,
          branchIndex: 0,
        });
      }
    });
    v8Layout.cards.forEach((c) => {
      positionedCards.push({
        ...c,
        x: c.x + v8HubX,
        y: c.y + v8HubY,
        branchIndex: 0,
      });
    });
    edges.push(...v8Layout.edges);

    // Sub-Branch 0B: Scope & Closures (angle -110° from jsCore)
    const scopeLayout = calculateGroupLayout(allNodes, "scope", 0, 2);
    const scopeHubX = jsCoreX - 380;
    const scopeHubY = jsCoreY + 220;
    edges.push({
      source: jsCoreNode.id,
      target: scopeLayout.rootNode.id,
      category: "scope",
      level: 2,
      branchIndex: 0,
    });
    positionedNodes.push({
      ...scopeLayout.rootNode,
      x: scopeHubX,
      y: scopeHubY,
      level: 2,
      branchIndex: 0,
    });
    scopeLayout.nodes.forEach((n) => {
      if (n.id !== scopeLayout.rootNode.id) {
        positionedNodes.push({
          ...n,
          x: n.x + scopeHubX,
          y: n.y + scopeHubY,
          branchIndex: 0,
        });
      }
    });
    scopeLayout.cards.forEach((c) => {
      positionedCards.push({
        ...c,
        x: c.x + scopeHubX,
        y: c.y + scopeHubY,
        branchIndex: 0,
      });
    });
    edges.push(...scopeLayout.edges);

    // ==========================================
    // BRANCH 1: NODE.JS RUNTIME (Yellow, branch 1)
    // ==========================================
    const nodeLayout = calculateGroupLayout(allNodes, "node", 1, 1);
    const nodeHubX = 460;
    const nodeHubY = -270;
    edges.push({
      source: rootNode.id,
      target: nodeLayout.rootNode.id,
      category: "node",
      level: 1,
      branchIndex: 1,
    });
    positionedNodes.push({
      ...nodeLayout.rootNode,
      x: nodeHubX,
      y: nodeHubY,
      level: 1,
      branchIndex: 1,
    });
    nodeLayout.nodes.forEach((n) => {
      if (n.id !== nodeLayout.rootNode.id) {
        positionedNodes.push({
          ...n,
          x: n.x + nodeHubX,
          y: n.y + nodeHubY,
          branchIndex: 1,
        });
      }
    });
    nodeLayout.cards.forEach((c) => {
      positionedCards.push({
        ...c,
        x: c.x + nodeHubX,
        y: c.y + nodeHubY,
        branchIndex: 1,
      });
    });
    edges.push(...nodeLayout.edges);

    // ==========================================
    // BRANCH 2: CS FOUNDATIONS (OOP & DSA) (Green, branch 2)
    // ==========================================
    const csFoundX = 0;
    const csFoundY = 460;
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

    // CS Foundations connects directly to the 3 Group Cards:
    // 1. OOP 4 Pillars & Analogies (Card) -> Bottom-Left (-580px)
    // 2. Data Structures & Stories (Card) -> Bottom-Center (straight down)
    // 3. Big O Time Complexity (Card) -> Bottom-Right (+580px)
    const oopCard = cardByPillar.get("oop-pillars-pillar");
    if (oopCard) {
      const oopCardX = csFoundX - 580;
      const oopCardY = csFoundY + 440;
      positionedCards.push({
        ...oopCard,
        x: oopCardX,
        y: oopCardY,
        branchIndex: 2,
      });
      edges.push({
        source: csFoundNode.id,
        target: oopCard.id,
        category: "oop",
        level: 2,
        branchIndex: 2,
      });
    }

    const dsCard = cardByPillar.get("dsa-structures-pillar");
    if (dsCard) {
      const dsCardX = csFoundX;
      const dsCardY = csFoundY + 680;
      positionedCards.push({
        ...dsCard,
        x: dsCardX,
        y: dsCardY,
        branchIndex: 2,
      });
      edges.push({
        source: csFoundNode.id,
        target: dsCard.id,
        category: "dsa",
        level: 2,
        branchIndex: 2,
      });
    }

    const bigOCard = cardByPillar.get("dsa-big-o-pillar");
    if (bigOCard) {
      const bigOCardX = csFoundX + 580;
      const bigOCardY = csFoundY + 440;
      positionedCards.push({
        ...bigOCard,
        x: bigOCardX,
        y: bigOCardY,
        branchIndex: 2,
      });
      edges.push({
        source: csFoundNode.id,
        target: bigOCard.id,
        category: "dsa",
        level: 2,
        branchIndex: 2,
      });
    }

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
  const r1 = 260;

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
      // Do NOT push a duplicate keyword node to positionedNodes.
      const rCard = r1 + (cardData.items.length > 6 ? 440 : 380);
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

      // Branch out sub-items from the right end of the card!
      const totalItems = cardData.items.length;
      cardData.items.forEach((item, itemIdx) => {
        const subCount = item.subItems?.length || 0;
        if (subCount > 0 && subCount <= 3) {
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
            }

            const subKeywordNode: PositionedNode = {
              id: sub.id,
              label: sub.label,
              category: cardData.category,
              parentId: item.id,
              level: l3,
              badge: sub.badge,
              searchQuery: sub.searchQuery,
              color: cardData.color,
              x: nodeX,
              y: nodeY,
              cardParentId: cardData.id,
              branchIndex,
            };
            positionedNodes.push(subKeywordNode);

            edges.push({
              source: `${cardData.id}:${item.id}`,
              target: sub.id,
              category: cardData.category,
              level: l3,
              cardId: cardData.id,
              itemIndex: itemIdx,
              totalItems,
              branchIndex,
            });
          });
        }
      });
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
        const spread = hasChildCard ? 1.1 : 0.65;
        const startAngle = m === 1 ? angle : angle - spread / 2;

        children.forEach((child, j) => {
          const step = m === 1 ? 0 : j / (m - 1);
          const childAngle = m === 1 ? angle : startAngle + step * spread;
          const r2 = r1 + 190;
          const c2x = Math.round(Math.cos(childAngle) * r2);
          const c2y = Math.round(Math.sin(childAngle) * r2);

          // Check if this child itself has a Group Card (> 3 items, e.g. Event Loop Phases)
          const childCardData = cardByPillar.get(child.id);
          if (childCardData) {
            // Group Card represents this branch directly — connect pillarNode directly to the card!
            const rChildCard = r1 + 440;
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

            // Branch out sub-items from this card's right edge
            const totalChildItems = childCardData.items.length;
            childCardData.items.forEach((item, itemIdx) => {
              const subCount = item.subItems?.length || 0;
              if (subCount > 0 && subCount <= 3) {
                const anchor = getCardItemAnchor(posChildCard, itemIdx, totalChildItems);
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
                  }

                  const subNode: PositionedNode = {
                    id: sub.id,
                    label: sub.label,
                    category: childCardData.category,
                    parentId: item.id,
                    level: l3,
                    badge: sub.badge,
                    searchQuery: sub.searchQuery,
                    color: childCardData.color,
                    x: nodeX,
                    y: nodeY,
                    cardParentId: childCardData.id,
                    branchIndex,
                  };
                  positionedNodes.push(subNode);

                  edges.push({
                    source: `${childCardData.id}:${item.id}`,
                    target: sub.id,
                    category: childCardData.category,
                    level: l3,
                    cardId: childCardData.id,
                    itemIndex: itemIdx,
                    totalItems: totalChildItems,
                    branchIndex,
                  });
                });
              }
            });
          } else {
            // Regular child without card (e.g. Single-Threaded JS, Queues / Scheduling)
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
              const subSpread = 0.35;
              const subStartAngle = k === 1 ? childAngle : childAngle - subSpread / 2;

              subChildren.forEach((sub, sIdx) => {
                const subStep = k === 1 ? 0 : sIdx / (k - 1);
                const subAngle = k === 1 ? childAngle : subStartAngle + subStep * subSpread;
                const r3 = r2 + 160;
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
