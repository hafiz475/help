"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { SpiderNode, ConceptCategory, ALL_NODES } from "@/data/concepts";
import {
  PositionedNode,
  PositionedGroupCard,
  Edge,
  ViewMode,
  calculateSpiderLayout,
  calculateTreeLayout,
  calculateGroupLayout,
  getCardItemAnchor,
  getNodesForCategory,
  getHierarchyThreadColor,
} from "@/utils/spiderLayout";
import { SpiderNodeCard } from "./SpiderNodeCard";
import { SpiderGroupCard } from "./SpiderGroupCard";
import { ConceptNotebookDrawer } from "./ConceptNotebookDrawer";
import { X } from "lucide-react";

interface SpiderCanvasProps {
  currentCategory: ConceptCategory;
  viewMode: ViewMode;
  theme: "light" | "dark";
  searchQuery: string;
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  showLevel3: boolean;
  showSpiderRings: boolean;
  recenterTrigger: number;
  resetLayoutTrigger: number;
  onMatchCountChange?: (count: number) => void;
}

export const SpiderCanvas: React.FC<SpiderCanvasProps> = ({
  currentCategory,
  viewMode,
  theme,
  searchQuery,
  zoom,
  setZoom,
  showLevel3,
  showSpiderRings,
  recenterTrigger,
  resetLayoutTrigger,
  onMatchCountChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  // Pan state (canvas offset in px)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Zoom & Pan refs to ensure event listeners always access latest values without setState-in-render issues
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const panRef = useRef(pan);
  panRef.current = pan;

  // Nodes & Edges state
  const [nodes, setNodes] = useState<PositionedNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Group View Cards state (only for groups with > 3 items)
  const [groupCards, setGroupCards] = useState<PositionedGroupCard[]>([]);
  const [groupRootNode, setGroupRootNode] = useState<PositionedNode | null>(null);

  // Active selected nodes in the Concept Notebook
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);

  // Dragging states
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const dragPointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragNodeStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragCardStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const cardSubNodesStartRef = useRef<Map<string, { x: number; y: number }>>(
    new Map()
  );
  const hasMovedSignificantlyRef = useRef<boolean>(false);

  // Multi-touch Pinch to Zoom refs
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);
  const pinchStartPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchMidpointRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Initialize/Recalculate Layout based on current viewMode
  const initLayout = useCallback(() => {
    if (viewMode === "group") {
      const layout = calculateGroupLayout(ALL_NODES, currentCategory);
      setGroupRootNode(layout.rootNode);
      setGroupCards(layout.cards);
      setNodes(layout.nodes);
      setEdges(layout.edges);
    } else {
      setGroupCards([]);
      setGroupRootNode(null);
      const { nodes: catNodes, rootId: rId } = getNodesForCategory(
        ALL_NODES,
        currentCategory
      );
      const layout =
        viewMode === "tree"
          ? calculateTreeLayout(catNodes, rId)
          : calculateSpiderLayout(catNodes, rId, currentCategory);

      setNodes(layout.nodes);
      setEdges(layout.edges);
    }
  }, [currentCategory, viewMode]);

  useEffect(() => {
    initLayout();
    if (typeof window !== "undefined") {
      const centerY =
        viewMode === "tree" ? window.innerHeight * 0.45 : window.innerHeight / 2;
      setPan({ x: window.innerWidth / 2, y: centerY });
    }
  }, [initLayout, viewMode]);

  // Recenter trigger
  useEffect(() => {
    if (recenterTrigger > 0 && typeof window !== "undefined") {
      const centerY =
        viewMode === "tree" ? window.innerHeight * 0.45 : window.innerHeight / 2;
      setPan({ x: window.innerWidth / 2, y: centerY });
    }
  }, [recenterTrigger, viewMode]);

  // Reset layout trigger
  useEffect(() => {
    if (resetLayoutTrigger > 0) {
      initLayout();
    }
  }, [resetLayoutTrigger, initLayout]);

  // Search filtering
  const queryLower = searchQuery.trim().toLowerCase();

  // Matched nodes
  const matchedNodes = React.useMemo(() => {
    if (!queryLower) return new Set<string>();
    const matches = new Set<string>();
    nodes.forEach((n) => {
      if (
        n.label.toLowerCase().includes(queryLower) ||
        (n.badge && n.badge.toLowerCase().includes(queryLower)) ||
        (n.searchQuery && n.searchQuery.toLowerCase().includes(queryLower))
      ) {
        matches.add(n.id);
      }
    });
    return matches;
  }, [nodes, queryLower]);

  // Matched count including both keyword nodes and cards
  const totalMatchCount = React.useMemo(() => {
    if (!queryLower) return 0;
    let count = matchedNodes.size;

    if (viewMode === "group") {
      groupCards.forEach((c) => {
        if (
          c.title.toLowerCase().includes(queryLower) ||
          c.badge.toLowerCase().includes(queryLower)
        ) {
          count++;
        }
        c.items.forEach((item) => {
          if (
            item.label.toLowerCase().includes(queryLower) ||
            (item.badge && item.badge.toLowerCase().includes(queryLower))
          ) {
            count++;
          }
          item.subItems?.forEach((sub) => {
            if (
              sub.label.toLowerCase().includes(queryLower) ||
              (sub.badge && sub.badge.toLowerCase().includes(queryLower))
            ) {
              count++;
            }
          });
        });
      });
    }

    return count;
  }, [matchedNodes, groupCards, queryLower, viewMode]);

  useEffect(() => {
    onMatchCountChange?.(totalMatchCount);
  }, [totalMatchCount, onMatchCountChange]);

  // Auto-center on first search match
  useEffect(() => {
    if (!queryLower || typeof window === "undefined") return;

    if (viewMode === "group" && groupCards.length > 0) {
      const matchingCard = groupCards.find((c) => {
        const titleMatch =
          c.title.toLowerCase().includes(queryLower) ||
          c.badge.toLowerCase().includes(queryLower);
        const itemMatch = c.items.some(
          (item) =>
            item.label.toLowerCase().includes(queryLower) ||
            (item.badge && item.badge.toLowerCase().includes(queryLower)) ||
            item.subItems?.some(
              (sub) =>
                sub.label.toLowerCase().includes(queryLower) ||
                (sub.badge && sub.badge.toLowerCase().includes(queryLower))
            )
        );
        return titleMatch || itemMatch;
      });

      if (matchingCard) {
        setPan({
          x: Math.round(window.innerWidth / 2 - matchingCard.x * zoom),
          y: Math.round(window.innerHeight / 2 - matchingCard.y * zoom),
        });
        return;
      }
    }

    if (matchedNodes.size > 0) {
      const firstMatchId = Array.from(matchedNodes)[0];
      const matchNode = nodes.find((n) => n.id === firstMatchId);
      if (matchNode) {
        setPan({
          x: Math.round(window.innerWidth / 2 - matchNode.x * zoom),
          y: Math.round(window.innerHeight / 2 - matchNode.y * zoom),
        });
      }
    }
  }, [queryLower, matchedNodes, nodes, groupCards, viewMode, zoom]);

  // Handle Zoom via native non-passive wheel listener around cursor (prevents 'Unable to preventDefault inside passive event listener' error)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // If mouse is inside the notebook drawer or scrollable card, do NOT zoom canvas! Let sidebar scroll naturally!
      if (
        (e.target as HTMLElement)?.closest?.("aside") ||
        (e.target as HTMLElement)?.closest?.('[aria-label="Concept Notebook"]') ||
        (e.target as HTMLElement)?.closest?.(".custom-scrollbar")
      ) {
        return;
      }

      e.preventDefault();

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const currentZoom = zoomRef.current;
      const currentPan = panRef.current;

      const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
      const newZoom = Math.min(Math.max(currentZoom * zoomFactor, 0.18), 2.5);

      const newPanX = Math.round(mouseX - (mouseX - currentPan.x) * (newZoom / currentZoom));
      const newPanY = Math.round(mouseY - (mouseY - currentPan.y) * (newZoom / currentZoom));

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, [setZoom]);

  // Mouse / Pointer Canvas Panning
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if (
      (e.target as HTMLElement)?.closest?.("aside") ||
      (e.target as HTMLElement)?.closest?.('[aria-label="Concept Notebook"]')
    ) {
      return;
    }
    if (e.target !== containerRef.current && (e.target as HTMLElement).tagName !== "svg") {
      return;
    }
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  // Node Drag Start (Mouse & Touch)
  const handleNodePointerDown = (e: React.PointerEvent, node: PositionedNode) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    setDraggedNodeId(node.id);
    dragPointerStartRef.current = { x: e.clientX, y: e.clientY };
    dragNodeStartRef.current = { x: node.x, y: node.y };
    hasMovedSignificantlyRef.current = false;
  };

  // Group Card Drag Start
  const handleCardPointerDown = (e: React.PointerEvent, card: PositionedGroupCard) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    setDraggedCardId(card.id);
    dragPointerStartRef.current = { x: e.clientX, y: e.clientY };
    dragCardStartRef.current = { x: card.x, y: card.y };
    hasMovedSignificantlyRef.current = false;

    // Track initial positions of attached sub-nodes
    cardSubNodesStartRef.current.clear();
    nodes.forEach((n) => {
      if (n.cardParentId === card.id) {
        cardSubNodesStartRef.current.set(n.id, { x: n.x, y: n.y });
      }
    });
  };

  // Global Pointer Move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      setPan({
        x: Math.round(e.clientX - panStartRef.current.x),
        y: Math.round(e.clientY - panStartRef.current.y),
      });
    } else if (draggedNodeId) {
      const dx = (e.clientX - dragPointerStartRef.current.x) / zoom;
      const dy = (e.clientY - dragPointerStartRef.current.y) / zoom;

      if (Math.hypot(dx, dy) > 6) {
        hasMovedSignificantlyRef.current = true;
      }

      setNodes((prev) =>
        prev.map((n) => {
          if (n.id === draggedNodeId) {
            return {
              ...n,
              x: Math.round(dragNodeStartRef.current.x + dx),
              y: Math.round(dragNodeStartRef.current.y + dy),
            };
          }
          return n;
        })
      );

      if (groupRootNode && groupRootNode.id === draggedNodeId) {
        setGroupRootNode((prev) =>
          prev
            ? {
                ...prev,
                x: Math.round(dragNodeStartRef.current.x + dx),
                y: Math.round(dragNodeStartRef.current.y + dy),
              }
            : null
        );
      }
    } else if (draggedCardId) {
      const dx = (e.clientX - dragPointerStartRef.current.x) / zoom;
      const dy = (e.clientY - dragPointerStartRef.current.y) / zoom;

      if (Math.hypot(dx, dy) > 6) {
        hasMovedSignificantlyRef.current = true;
      }

      setGroupCards((prev) =>
        prev.map((c) => {
          if (c.id === draggedCardId) {
            return {
              ...c,
              x: Math.round(dragCardStartRef.current.x + dx),
              y: Math.round(dragCardStartRef.current.y + dy),
            };
          }
          return c;
        })
      );

      // Translate attached sub-nodes so the cluster moves together
      setNodes((prev) =>
        prev.map((n) => {
          if (n.cardParentId === draggedCardId) {
            const start = cardSubNodesStartRef.current.get(n.id);
            if (start) {
              return {
                ...n,
                x: Math.round(start.x + dx),
                y: Math.round(start.y + dy),
              };
            }
          }
          return n;
        })
      );
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
    setDraggedCardId(null);
    cardSubNodesStartRef.current.clear();
  };

  // Mobile multi-touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    if (
      (e.target as HTMLElement)?.closest?.("aside") ||
      (e.target as HTMLElement)?.closest?.('[aria-label="Concept Notebook"]')
    ) {
      return;
    }

    if (e.touches.length === 2) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const dist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      pinchStartDistRef.current = dist;
      pinchStartZoomRef.current = zoom;
      pinchStartPanRef.current = { ...pan };
      pinchMidpointRef.current = {
        x: (t0.clientX + t1.clientX) / 2,
        y: (t0.clientY + t1.clientY) / 2,
      };
      setIsPanning(false);
    } else if (e.touches.length === 1 && !draggedNodeId && !draggedCardId) {
      const t = e.touches[0];
      panStartRef.current = { x: t.clientX - pan.x, y: t.clientY - pan.y };
      setIsPanning(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (
      (e.target as HTMLElement)?.closest?.("aside") ||
      (e.target as HTMLElement)?.closest?.('[aria-label="Concept Notebook"]')
    ) {
      return;
    }

    if (e.touches.length === 2 && pinchStartDistRef.current !== null && containerRef.current) {
      const t0 = e.touches[0];
      const t1 = e.touches[1];
      const currentDist = Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
      const scaleFactor = currentDist / pinchStartDistRef.current;
      const newZoom = Math.min(Math.max(pinchStartZoomRef.current * scaleFactor, 0.18), 2.5);

      const rect = containerRef.current.getBoundingClientRect();
      const midX = pinchMidpointRef.current.x - rect.left;
      const midY = pinchMidpointRef.current.y - rect.top;

      const newPanX = Math.round(
        midX - (midX - pinchStartPanRef.current.x) * (newZoom / pinchStartZoomRef.current)
      );
      const newPanY = Math.round(
        midY - (midY - pinchStartPanRef.current.y) * (newZoom / pinchStartZoomRef.current)
      );

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
    } else if (e.touches.length === 1 && isPanning && !draggedNodeId && !draggedCardId) {
      const t = e.touches[0];
      setPan({
        x: Math.round(t.clientX - panStartRef.current.x),
        y: Math.round(t.clientY - panStartRef.current.y),
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      pinchStartDistRef.current = null;
    }
    if (e.touches.length === 0) {
      setIsPanning(false);
    }
  };

  // Reset active selection when category or view mode changes
  useEffect(() => {
    setSelectedNodeIds([]);
    setIsNotebookOpen(false);
  }, [currentCategory, viewMode]);

  // Active selected nodes list for the notebook drawer
  const selectedNodesList = React.useMemo(() => {
    return selectedNodeIds
      .map((id) => {
        const found = nodes.find((n) => n.id === id);
        if (found) return found;
        const fromAll = ALL_NODES.find((n) => n.id === id);
        if (fromAll) {
          return {
            ...fromAll,
            x: 0,
            y: 0,
          } as PositionedNode;
        }
        return null;
      })
      .filter((n): n is PositionedNode => n !== null);
  }, [selectedNodeIds, nodes]);

  const isBranchActive = selectedNodeIds.length > 0;

  // Set of node IDs that belong to the active highlighted branch:
  // ONLY 1st stage parent + the selected node(s) + 1st stage children dots (NO parent siblings!)
  const highlightedNodeIds = React.useMemo(() => {
    if (selectedNodeIds.length === 0) return new Set<string>();

    const set = new Set<string>();

    selectedNodeIds.forEach((id) => {
      set.add(id);

      const current = nodes.find((n) => n.id === id);
      if (current) {
        // 1. 1st stage parent (ONLY direct parent, no parent siblings!)
        if (current.parentId) {
          set.add(current.parentId);
        }

        // 2. 1st stage children (all immediate children)
        nodes.forEach((child) => {
          if (child.parentId === id) {
            set.add(child.id);
          }
        });
      }

      // Also attach connected card or target nodes via direct edges
      edges.forEach((edge) => {
        if (edge.source === id) {
          set.add(edge.target);
        }
        if (edge.target === id) {
          set.add(edge.source);
        }
      });
    });

    return set;
  }, [selectedNodeIds, nodes, edges]);

  // Check if an edge is part of the highlighted branch
  const isEdgeHighlighted = useCallback(
    (edge: Edge) => {
      if (selectedNodeIds.length === 0) return false;
      return selectedNodeIds.some((id) => edge.source === id || edge.target === id);
    },
    [selectedNodeIds]
  );

  // Click on Node -> Highlight branch and open Notebook!
  const handleNodeClick = (node: PositionedNode) => {
    if (hasMovedSignificantlyRef.current) {
      return;
    }
    setSelectedNodeIds((prev) => {
      if (prev.includes(node.id)) {
        return prev;
      }
      return [...prev, node.id];
    });
    setIsNotebookOpen(true);
  };

  // Click on Group Keyword -> Attach to Notebook!
  const handleGroupKeywordClick = (query: string) => {
    if (hasMovedSignificantlyRef.current) {
      return;
    }
    const found = nodes.find(
      (n) => n.label.toLowerCase() === query.toLowerCase() || n.id === query
    );
    if (found) {
      handleNodeClick(found);
    } else {
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
      window.open(googleUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Filter visible nodes based on Level 3 toggle (Spider/Tree view)
  const visibleNodes = nodes.filter((n) => (showLevel3 ? true : n.level < 3));

  const nodeMap = new Map<string, PositionedNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const cardMap = new Map<string, PositionedGroupCard>();
  groupCards.forEach((c) => cardMap.set(c.id, c));

  // Collect unique card item anchor ports where mini cards branch out
  const cardPorts = React.useMemo(() => {
    if (viewMode !== "group") return [];

    const portsMap = new Map<
      string,
      {
        key: string;
        x: number;
        y: number;
        color: string;
        glow: string;
        isHighlighted: boolean;
      }
    >();

    edges.forEach((edge) => {
      if (
        edge.cardId &&
        edge.itemIndex !== undefined &&
        edge.totalItems !== undefined
      ) {
        const portKey = `${edge.cardId}-${edge.itemIndex}`;
        if (!portsMap.has(portKey)) {
          const card = cardMap.get(edge.cardId);
          if (card) {
            const anchor = getCardItemAnchor(card, edge.itemIndex, edge.totalItems);
            const isHighlighted =
              matchedNodes.has(edge.target) ||
              Boolean(queryLower && card.title.toLowerCase().includes(queryLower));

            const colorSpec = getHierarchyThreadColor(
              edge.branchIndex ?? card.branchIndex ?? 0,
              edge.level,
              isDark
            );

            portsMap.set(portKey, {
              key: portKey,
              x: anchor.x,
              y: anchor.y,
              color: isHighlighted
                ? isDark
                  ? "#f59e0b"
                  : "#d97706"
                : colorSpec.stroke,
              glow: colorSpec.glow,
              isHighlighted,
            });
          }
        }
      }
    });

    return Array.from(portsMap.values());
  }, [edges, groupCards, viewMode, isDark, matchedNodes, queryLower, cardMap]);

  return (
    <div
      ref={containerRef}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="spider-web-bg canvas-touch-container"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        cursor: isPanning ? "grabbing" : "grab",
      }}
    >
      {/* Transformed World Container */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
          pointerEvents: "none",
        }}
      >
        {/* SVG Layer for Spider Web Rings, Curves & Edges */}
        <svg
          style={{
            position: "absolute",
            left: "-4000px",
            top: "-4000px",
            width: "8000px",
            height: "8000px",
            overflow: "visible",
            pointerEvents: "none",
          }}
        >
          <g transform="translate(4000, 4000)">
            {/* Spider concentric rings - Only displayed in Spider Mode */}
            {viewMode === "spider" && showSpiderRings && (
              <g opacity={isDark ? "0.2" : "0.45"}>
                {[140, 280, 420, 560, 700, 840, 980].map((radius, idx) => (
                  <circle
                    key={radius}
                    cx="0"
                    cy="0"
                    r={radius}
                    fill="none"
                    stroke={isDark ? "#38bdf8" : "#94a3b8"}
                    strokeWidth={idx % 2 === 1 ? "1" : "0.75"}
                    strokeDasharray={idx % 2 === 1 ? "5 6" : "none"}
                  />
                ))}

                {/* Spider radial spokes */}
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                  (deg) => {
                    const rad = (deg * Math.PI) / 180;
                    const x2 = Math.round(Math.cos(rad) * 1100);
                    const y2 = Math.round(Math.sin(rad) * 1100);
                    return (
                      <line
                        key={deg}
                        x1="0"
                        y1="0"
                        x2={x2}
                        y2={y2}
                        stroke={isDark ? "#38bdf8" : "#cbd5e1"}
                        strokeWidth="0.8"
                        strokeDasharray="4 6"
                      />
                    );
                  }
                )}
              </g>
            )}

            {/* Connecting Edges */}
            {edges.map((edge, idx) => {
              // 0. Connection from Card Item to branched keyword node (e.g. Call Stack -> LIFO)
              if (
                edge.cardId &&
                edge.itemIndex !== undefined &&
                edge.totalItems !== undefined
              ) {
                const card = cardMap.get(edge.cardId);
                const targetNode = nodeMap.get(edge.target);
                if (!card || !targetNode) return null;

                const anchor = getCardItemAnchor(card, edge.itemIndex, edge.totalItems);
                const sx = anchor.x;
                const sy = anchor.y;

                // Connect directly to the mini card's left-hand hierarchy dot
                const estimatedWidth =
                  46 +
                  Math.round(targetNode.label.length * 6.8) +
                  (targetNode.badge ? Math.round(targetNode.badge.length * 5.5 + 10) : 0);
                const tx = Math.round(targetNode.x - estimatedWidth / 2 + 13);
                const ty = targetNode.y;

                // Crisp, laser-straight thread from card socket dot to mini card dot
                const pathData = `M ${sx} ${sy} L ${tx} ${ty}`;

                const isHighlighted =
                  matchedNodes.has(edge.target) ||
                  Boolean(queryLower && card.title.toLowerCase().includes(queryLower));

                const colorSpec = getHierarchyThreadColor(
                  edge.branchIndex ?? card.branchIndex ?? 0,
                  edge.level,
                  isDark
                );

                const strokeColor = isHighlighted
                  ? isDark
                    ? "#f59e0b"
                    : "#d97706"
                  : colorSpec.stroke;
                const strokeWidth = isHighlighted ? 3.0 : 1.6;
                const strokeOpacity = isHighlighted ? 1 : 0.85;

                return (
                  <g key={`edge-card-item-${edge.source}-${edge.target}-${idx}`}>
                    {/* Ambient Glow */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={colorSpec.glow}
                      strokeWidth={strokeWidth + 2.8}
                      strokeOpacity={0.28}
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={1.2}
                      className="web-flow-line"
                      strokeOpacity={0.85}
                    />
                    {/* Origin connector dot on card border */}
                    <circle
                      cx={sx}
                      cy={sy}
                      r={5}
                      fill={strokeColor}
                      stroke={isDark ? "#0f172a" : "#ffffff"}
                      strokeWidth={1.8}
                    />
                  </g>
                );
              }

              const sourceNode = nodeMap.get(edge.source);
              if (!sourceNode) return null;

              const targetCard = viewMode === "group" ? cardMap.get(edge.target) : undefined;
              const targetNode = nodeMap.get(edge.target);

              // 1. Connection from Node to Group Card (when child count > 3)
              if (targetCard) {
                const sx = sourceNode.x;
                const sy = sourceNode.y;
                const tx = targetCard.x;
                const ty = targetCard.y;

                const dx = tx - sx;
                const dy = ty - sy;
                const cx1 = Math.round(sx + dx * 0.45);
                const cy1 = Math.round(sy + dy * 0.15);
                const cx2 = Math.round(sx + dx * 0.55);
                const cy2 = Math.round(sy + dy * 0.85);
                const pathData = `M ${sx} ${sy} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${tx} ${ty}`;

                const isCardMatched =
                  Boolean(queryLower) &&
                  (targetCard.title.toLowerCase().includes(queryLower) ||
                    targetCard.badge.toLowerCase().includes(queryLower) ||
                    targetCard.items.some(
                      (item) =>
                        item.label.toLowerCase().includes(queryLower) ||
                        (item.badge && item.badge.toLowerCase().includes(queryLower)) ||
                        item.subItems?.some(
                          (sub) =>
                            sub.label.toLowerCase().includes(queryLower) ||
                            (sub.badge && sub.badge.toLowerCase().includes(queryLower))
                        )
                    ));

                const colorSpec = getHierarchyThreadColor(
                  edge.branchIndex ?? targetCard.branchIndex ?? 0,
                  edge.level,
                  isDark
                );

                const isCardHighlighted = isEdgeHighlighted(edge);
                const edgeDimmed = isBranchActive && !isCardHighlighted;

                // Keep authentic branch color on highlight, only use amber for explicit text search match
                const strokeColor = isCardMatched
                  ? isDark
                    ? "#f59e0b"
                    : "#d97706"
                  : colorSpec.stroke;
                const strokeWidth = isCardHighlighted ? 4.0 : isCardMatched ? 4.0 : 2.2;
                const strokeOpacity = edgeDimmed ? 0.08 : isCardHighlighted ? 1 : isCardMatched ? 1 : 0.85;

                return (
                  <g key={`edge-card-${edge.source}-${edge.target}-${idx}`}>
                    {/* Ambient Glow */}
                    {(isCardHighlighted || !edgeDimmed) && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke={isCardMatched ? (isDark ? "rgba(245, 158, 11, 0.6)" : "rgba(217, 119, 6, 0.4)") : colorSpec.glow}
                        strokeWidth={strokeWidth + 3.2}
                        strokeOpacity={isCardHighlighted ? 0.65 : 0.28}
                      />
                    )}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={1.6}
                      className="web-flow-line"
                      strokeOpacity={edgeDimmed ? 0.05 : 0.9}
                    />
                  </g>
                );
              }

              // 2. Connection between Keyword Nodes (when child count <= 3)
              if (targetNode) {
                if (viewMode !== "group" && !showLevel3 && targetNode.level >= 3) {
                  return null;
                }

                const isHighlighted =
                  matchedNodes.has(edge.source) || matchedNodes.has(edge.target);
                const isEdgeActive = isEdgeHighlighted(edge);
                const edgeDimmed = isBranchActive && !isEdgeActive;

                const colorSpec = getHierarchyThreadColor(
                  edge.branchIndex ?? targetNode.branchIndex ?? 0,
                  edge.level,
                  isDark
                );

                let strokeColor = colorSpec.stroke;
                let strokeWidth = 1.4;
                let strokeOpacity = edgeDimmed ? 0.08 : isEdgeActive ? 1.0 : 0.7;

                if (edge.level === 1) {
                  strokeWidth = isEdgeActive ? 4.2 : isHighlighted ? 4.0 : 2.4;
                  strokeOpacity = edgeDimmed ? 0.08 : isEdgeActive ? 1 : isHighlighted ? 1 : 0.88;
                } else if (edge.level === 2) {
                  strokeWidth = isEdgeActive ? 3.4 : isHighlighted ? 3.0 : 1.8;
                  strokeOpacity = edgeDimmed ? 0.08 : isEdgeActive ? 1 : isHighlighted ? 1 : 0.82;
                } else {
                  strokeWidth = isEdgeActive ? 2.8 : isHighlighted ? 2.4 : 1.4;
                  strokeOpacity = edgeDimmed ? 0.08 : isEdgeActive ? 1 : isHighlighted ? 1 : 0.72;
                }

                // Only override to amber if explicit text search keyword match
                if (isHighlighted && queryLower) {
                  strokeColor = isDark ? "#f59e0b" : "#d97706";
                }

                let pathData = "";
                if (viewMode === "tree") {
                  const dy = targetNode.y - sourceNode.y;
                  const cy1 = Math.round(sourceNode.y + dy * 0.5);
                  const cy2 = Math.round(targetNode.y - dy * 0.5);
                  pathData = `M ${sourceNode.x} ${sourceNode.y} C ${sourceNode.x} ${cy1}, ${targetNode.x} ${cy2}, ${targetNode.x} ${targetNode.y}`;
                } else {
                  const dx = targetNode.x - sourceNode.x;
                  const dy = targetNode.y - sourceNode.y;
                  const cx1 = Math.round(sourceNode.x + dx * 0.4);
                  const cy1 = Math.round(sourceNode.y + dy * 0.1);
                  const cx2 = Math.round(sourceNode.x + dx * 0.6);
                  const cy2 = Math.round(sourceNode.y + dy * 0.9);
                  pathData = `M ${sourceNode.x} ${sourceNode.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${targetNode.x} ${targetNode.y}`;
                }

                return (
                  <g key={`edge-node-${edge.source}-${edge.target}-${idx}`}>
                    {/* Ambient Glow for active or L1/L2 threads - preserves native thread color! */}
                    {(isEdgeActive || (edge.level <= 2 && !edgeDimmed)) && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke={isHighlighted && queryLower ? (isDark ? "rgba(245, 158, 11, 0.6)" : "rgba(217, 119, 6, 0.4)") : colorSpec.glow}
                        strokeWidth={strokeWidth + 4.2}
                        strokeOpacity={isEdgeActive ? 0.68 : 0.35}
                      />
                    )}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                    />

                    {(isEdgeActive || edge.level <= 2) && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={edge.level === 1 ? 2.2 : 1.4}
                        className="web-flow-line"
                        strokeOpacity={edgeDimmed ? 0.05 : 0.9}
                      />
                    )}
                  </g>
                );
              }

              return null;
            })}
          </g>
        </svg>

        {/* HTML Draggable Nodes & Group Cards */}
        <div style={{ pointerEvents: "auto" }}>
          {/* Keyword Nodes (including center circle, pillars, and branched sub-items) */}
          {(() => {
            const primarySelectedId =
              selectedNodeIds.length > 0 ? selectedNodeIds[selectedNodeIds.length - 1] : null;

            return (viewMode === "group" ? nodes : visibleNodes).map((node) => (
              <SpiderNodeCard
                key={node.id}
                node={node}
                theme={theme}
                isDragging={draggedNodeId === node.id}
                isMatched={matchedNodes.has(node.id)}
                hasQuery={Boolean(queryLower)}
                onPointerDown={handleNodePointerDown}
                onClick={handleNodeClick}
                isSelected={selectedNodeIds.includes(node.id)}
                isPrimarySelected={node.id === primarySelectedId}
                isBranchConnected={highlightedNodeIds.has(node.id)}
                isBranchActive={isBranchActive}
              />
            ));
          })()}

          {/* Group Cards: ONLY for groups that have > 3 children */}
          {viewMode === "group" &&
            groupCards.map((card) => (
              <SpiderGroupCard
                key={card.id}
                card={card}
                theme={theme}
                isDragging={draggedCardId === card.id}
                searchQuery={searchQuery}
                onPointerDown={handleCardPointerDown}
                onKeywordClick={handleGroupKeywordClick}
                isBranchActive={isBranchActive}
                isBranchConnected={highlightedNodeIds.has(card.id) || selectedNodeIds.includes(card.pillarId)}
              />
            ))}
        </div>

        {/* Top SVG Overlay for Card Connector Ports (renders directly on top of cards) */}
        {viewMode === "group" && cardPorts.length > 0 && (
          <svg
            style={{
              position: "absolute",
              left: "-4000px",
              top: "-4000px",
              width: "8000px",
              height: "8000px",
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 25,
            }}
          >
            <g transform="translate(4000, 4000)">
              {cardPorts.map((port) => (
                <g key={`top-port-${port.key}`}>
                  {/* Outer glowing halo */}
                  <circle
                    cx={port.x}
                    cy={port.y}
                    r={9}
                    fill="none"
                    stroke={port.glow || port.color}
                    strokeWidth={2}
                    strokeOpacity={0.55}
                  />
                  {/* Main connector socket disc */}
                  <circle
                    cx={port.x}
                    cy={port.y}
                    r={5.5}
                    fill={port.color}
                    stroke={isDark ? "#0f172a" : "#ffffff"}
                    strokeWidth={2}
                  />
                  {/* Center pin core highlight */}
                  <circle
                    cx={port.x}
                    cy={port.y}
                    r={2}
                    fill="#ffffff"
                    opacity={0.95}
                  />
                </g>
              ))}
            </g>
          </svg>
        )}
      </div>

      {/* Active Concept Notebook Sidebar Drawer */}
      <ConceptNotebookDrawer
        selectedNodes={selectedNodesList}
        allNodes={ALL_NODES}
        theme={theme}
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        onSelectNode={(node) => {
          setSelectedNodeIds((prev) => {
            if (prev.includes(node.id)) return prev;
            return [...prev, node.id];
          });
        }}
        onRemoveNode={(nodeId) => {
          setSelectedNodeIds((prev) => {
            const next = prev.filter((id) => id !== nodeId);
            if (next.length === 0) setIsNotebookOpen(false);
            return next;
          });
        }}
        onClearAll={() => {
          setSelectedNodeIds([]);
          setIsNotebookOpen(false);
        }}
        onClearAndClose={() => {
          setSelectedNodeIds([]);
          setIsNotebookOpen(false);
        }}
      />

      {/* Floating Canvas Close & Unblur Button (Top-Right, immediately visible on mobile & desktop when notebook is closed) */}
      {isBranchActive && !isNotebookOpen && (
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "16px",
            zIndex: 48,
          }}
        >
          <button
            onClick={() => {
              setSelectedNodeIds([]);
              setIsNotebookOpen(false);
            }}
            title="Clear branch focus and unblur canvas"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "9999px",
              backgroundColor: isDark ? "rgba(15, 23, 42, 0.96)" : "rgba(255, 255, 255, 0.98)",
              border: isDark ? "1.5px solid rgba(244, 33, 46, 0.6)" : "1.5px solid rgba(244, 33, 46, 0.5)",
              color: isDark ? "#ff6b6b" : "#e11d48",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(12px)",
            }}
          >
            <X size={14} strokeWidth={2.4} />
            <span>Clear Focus & Unblur</span>
          </button>
        </div>
      )}

      {/* Floating Bottom Bar: Active Branch Status */}
      {isBranchActive && (
        <div
          style={{
            position: "fixed",
            bottom: "max(20px, env(safe-area-inset-bottom, 20px))",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 45,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 14px",
            borderRadius: "999px",
            backgroundColor: isDark ? "rgba(15, 23, 42, 0.94)" : "rgba(255, 255, 255, 0.96)",
            border: isDark ? "1px solid rgba(245, 158, 11, 0.45)" : "1px solid rgba(217, 119, 6, 0.45)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(16px)",
            maxWidth: "94vw",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 700, color: isDark ? "#ffffff" : "#0f172a", whiteSpace: "nowrap" }}>
            ⚡ {selectedNodeIds.length} in Focus
          </span>
          {!isNotebookOpen && (
            <button
              onClick={() => setIsNotebookOpen(true)}
              style={{
                padding: "4px 10px",
                borderRadius: "9999px",
                backgroundColor: "#f59e0b",
                color: "#000000",
                fontSize: "11px",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Open Notebook 📖
            </button>
          )}
          <button
            onClick={() => {
              setSelectedNodeIds([]);
              setIsNotebookOpen(false);
            }}
            title="Clear all active focus and unblur canvas"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "4px 10px",
              borderRadius: "9999px",
              backgroundColor: isDark ? "rgba(244, 33, 46, 0.15)" : "rgba(244, 33, 46, 0.08)",
              border: "1px solid rgba(244, 33, 46, 0.35)",
              color: isDark ? "#ff6b6b" : "#e11d48",
              fontSize: "11px",
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <X size={12} strokeWidth={2.4} />
            <span>Clear Highlighting</span>
          </button>
        </div>
      )}
    </div>
  );
};
