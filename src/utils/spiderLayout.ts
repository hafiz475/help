import { SpiderNode, ConceptCategory, ALL_NODES } from "@/data/concepts";
import { GroupCardData, getGroupCardsForCategory } from "@/data/groupConcepts";

export type ViewMode = "spider" | "tree" | "group";

export interface PositionedNode extends SpiderNode {
  x: number;
  y: number;
  vx?: number;
  vy?: number;
  cardParentId?: string;
}

export interface PositionedGroupCard extends GroupCardData {
  x: number;
  y: number;
}

export interface Edge {
  source: string;
  target: string;
  category: string;
  level: number;
  cardId?: string;
  itemIndex?: number;
  totalItems?: number;
}

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
  const anchorX = card.x + 160; // Right end of card (width 320px -> +160px from center)
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
  } else if (category === "all") {
    r1 = 440;
    r2 = 850;
    r3 = 1260;
  }

  // Allocate angular sectors to Level 1 nodes (360 / l1Count)
  l1Children.forEach((l1, i) => {
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

  function layoutSubtree(node: SpiderNode, currentLevel: number): number {
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
      });
      return nodeX;
    }

    const childXPositions: number[] = [];
    for (const child of children) {
      edges.push({
        source: node.id,
        target: child.id,
        category: child.category,
        level: currentLevel + 1,
      });
      const cX = layoutSubtree(child, currentLevel + 1);
      childXPositions.push(cX);
    }

    const firstX = childXPositions[0];
    const lastX = childXPositions[childXPositions.length - 1];
    const nodeX = Math.round((firstX + lastX) / 2);

    positioned.set(node.id, {
      ...node,
      x: nodeX,
      y: yPos,
    });

    return nodeX;
  }

  layoutSubtree(rootNode, 0);

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
  category: ConceptCategory
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
    // 3 sectors for All Concepts: V8 (top -90°), Scope (bottom-left 150°), Node (bottom-right 30°)
    const subCats: { cat: ConceptCategory; angle: number }[] = [
      { cat: "v8", angle: -Math.PI / 2 },
      { cat: "node", angle: Math.PI / 6 },
      { cat: "scope", angle: (5 * Math.PI) / 6 },
    ];

    subCats.forEach(({ cat, angle }) => {
      const subLayout = calculateGroupLayout(allNodes, cat);
      const sectorDist = 840;
      const secX = Math.round(Math.cos(angle) * sectorDist);
      const secY = Math.round(Math.sin(angle) * sectorDist);

      edges.push({
        source: rootNode.id,
        target: subLayout.rootNode.id,
        category: cat,
        level: 1,
      });

      positionedNodes.push({
        ...subLayout.rootNode,
        x: secX,
        y: secY,
        level: 1,
      });

      subLayout.nodes.forEach((n) => {
        if (n.id !== subLayout.rootNode.id) {
          positionedNodes.push({
            ...n,
            x: n.x + secX,
            y: n.y + secY,
          });
        }
      });

      subLayout.cards.forEach((c) => {
        positionedCards.push({
          ...c,
          x: c.x + secX,
          y: c.y + secY,
        });
      });

      edges.push(...subLayout.edges);
    });

    return {
      rootNode,
      nodes: positionedNodes,
      cards: positionedCards,
      edges,
    };
  }

  // Exactly 3 Level 1 Pillars for each category (360° / 3 = 120°)
  let pillarIds: string[] = [];
  if (category === "v8") {
    pillarIds = ["v8-js-exec", "v8-memory", "v8-stack-pillar"];
  } else if (category === "scope") {
    pillarIds = ["scope-scope", "scope-lexical-env", "scope-closure"];
  } else if (category === "node") {
    // Exactly 3 pillars from Node.js Runtime parent: APIs, libuv, Event Loop
    pillarIds = ["node-apis-pillar", "node-libuv-pillar", "node-eventloop-pillar"];
  }

  const pillarCount = pillarIds.length; // Always 3!
  const r1 = 260;

  pillarIds.forEach((pId, i) => {
    const rawPillar = allNodes.find((n) => n.id === pId);
    if (!rawPillar) return;

    // Distribute angles evenly around 360° (360° / 3 = 120°): -90°, 30°, 150°
    const angle = (2 * Math.PI * i) / pillarCount - Math.PI / 2;
    const px = Math.round(Math.cos(angle) * r1);
    const py = Math.round(Math.sin(angle) * r1);

    const pillarNode: PositionedNode = {
      ...rawPillar,
      x: px,
      y: py,
      level: 1,
    };
    positionedNodes.push(pillarNode);

    edges.push({
      source: rootNode.id,
      target: pillarNode.id,
      category: pillarNode.category,
      level: 1,
    });

    // Check if this Level 1 pillar has a Group Card (children > 3)
    const cardData = cardByPillar.get(pId);
    if (cardData) {
      // Group Card attached to this pillar
      const rCard = r1 + (cardData.items.length > 6 ? 400 : 360);
      const cx = Math.round(Math.cos(angle) * rCard);
      const cy = Math.round(Math.sin(angle) * rCard);

      const positionedCard: PositionedGroupCard = {
        ...cardData,
        x: cx,
        y: cy,
      };
      positionedCards.push(positionedCard);

      edges.push({
        source: pillarNode.id,
        target: cardData.id,
        category: cardData.category,
        level: 2,
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
              level: 3,
              badge: sub.badge,
              searchQuery: sub.searchQuery,
              color: cardData.color,
              x: nodeX,
              y: nodeY,
              cardParentId: cardData.id,
            };
            positionedNodes.push(subKeywordNode);

            edges.push({
              source: `${cardData.id}:${item.id}`,
              target: sub.id,
              category: cardData.category,
              level: 3,
              cardId: cardData.id,
              itemIndex: itemIdx,
              totalItems,
            });
          });
        }
      });
    } else {
      // Pillar has <= 3 children: Render them as individual keyword nodes!
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
            const rChildCard = r1 + 380;
            const cardX = Math.round(Math.cos(childAngle) * rChildCard);
            const cardY = Math.round(Math.sin(childAngle) * rChildCard);

            const posChildCard: PositionedGroupCard = {
              ...childCardData,
              x: cardX,
              y: cardY,
            };
            positionedCards.push(posChildCard);

            edges.push({
              source: pillarNode.id,
              target: childCardData.id,
              category: childCardData.category,
              level: 2,
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
                    level: 3,
                    badge: sub.badge,
                    searchQuery: sub.searchQuery,
                    color: childCardData.color,
                    x: nodeX,
                    y: nodeY,
                    cardParentId: childCardData.id,
                  };
                  positionedNodes.push(subNode);

                  edges.push({
                    source: `${childCardData.id}:${item.id}`,
                    target: sub.id,
                    category: childCardData.category,
                    level: 3,
                    cardId: childCardData.id,
                    itemIndex: itemIdx,
                    totalItems: totalChildItems,
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
              level: 2,
            };
            positionedNodes.push(childNode);

            edges.push({
              source: pillarNode.id,
              target: childNode.id,
              category: childNode.category,
              level: 2,
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
                  level: 3,
                };
                positionedNodes.push(subNode);

                edges.push({
                  source: childNode.id,
                  target: subNode.id,
                  category: subNode.category,
                  level: 3,
                });
              });
            }
          }
        });
      }
    }
  });

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
    const v8Root = {
      ...allNodes.find((n) => n.id === "root-v8")!,
      parentId: "root-all",
      level: 1,
    };
    const scopeRoot = {
      ...allNodes.find((n) => n.id === "root-scope")!,
      parentId: "root-all",
      level: 1,
    };
    const nodeRoot = {
      ...allNodes.find((n) => n.id === "root-node")!,
      parentId: "root-all",
      level: 1,
    };

    const remaining = allNodes.filter(
      (n) =>
        n.id !== "root-all" &&
        n.id !== "root-v8" &&
        n.id !== "root-scope" &&
        n.id !== "root-node"
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
