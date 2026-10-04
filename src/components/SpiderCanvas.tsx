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
  getNodesForCategory,
} from "@/utils/spiderLayout";
import { SpiderNodeCard } from "./SpiderNodeCard";
import { SpiderGroupCard } from "./SpiderGroupCard";

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

  // Nodes & Edges state
  const [nodes, setNodes] = useState<PositionedNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Group View Cards state (only for groups with > 3 items)
  const [groupCards, setGroupCards] = useState<PositionedGroupCard[]>([]);
  const [groupRootNode, setGroupRootNode] = useState<PositionedNode | null>(null);

  // Dragging states
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const dragPointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragNodeStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragCardStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
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

  // Handle Zoom via mouse wheel around cursor
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.18), 2.5);

    const newPanX = Math.round(mouseX - (mouseX - pan.x) * (newZoom / zoom));
    const newPanY = Math.round(mouseY - (mouseY - pan.y) * (newZoom / zoom));

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // Mouse / Pointer Canvas Panning
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
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
    }
  };

  const handlePointerUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
    setDraggedCardId(null);
  };

  // Mobile multi-touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
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

  // Click on Node -> Open Google Search
  const handleNodeClick = (node: PositionedNode) => {
    if (hasMovedSignificantlyRef.current) {
      return;
    }
    const query = node.searchQuery || `${node.label} JavaScript Node.js`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, "_blank", "noopener,noreferrer");
  };

  // Click on Group Keyword -> Open Google Search
  const handleGroupKeywordClick = (query: string) => {
    if (hasMovedSignificantlyRef.current) {
      return;
    }
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, "_blank", "noopener,noreferrer");
  };

  // Filter visible nodes based on Level 3 toggle
  const visibleNodes = nodes.filter((n) => (showLevel3 ? true : n.level < 3));
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));

  const nodeMap = new Map<string, PositionedNode>();
  nodes.forEach((n) => nodeMap.set(n.id, n));

  const cardMap = new Map<string, PositionedGroupCard>();
  groupCards.forEach((c) => cardMap.set(c.id, c));

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
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

            {/* Connecting Edges (both node-to-node and node-to-card) */}
            {edges.map((edge, idx) => {
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

                const strokeColor = isCardMatched
                  ? isDark
                    ? "#f59e0b"
                    : "#d97706"
                  : targetCard.color;
                const strokeWidth = isCardMatched ? 4.5 : 2.8;

                return (
                  <g key={`edge-card-${edge.source}-${edge.target}-${idx}`}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={isCardMatched ? 1 : 0.8}
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={1.8}
                      className="web-flow-line"
                      strokeOpacity={0.9}
                    />
                  </g>
                );
              }

              // 2. Connection between Keyword Nodes (when child count <= 3)
              if (targetNode) {
                // If level 3 is hidden in spider/tree mode
                if (viewMode !== "group" && !showLevel3 && targetNode.level >= 3) {
                  return null;
                }

                const isHighlighted =
                  matchedNodes.has(edge.source) || matchedNodes.has(edge.target);

                let strokeColor = "";
                let strokeWidth = 1.5;
                let strokeOpacity = 0.7;

                if (edge.level === 1) {
                  strokeColor = isDark ? "#38bdf8" : "#0284c7";
                  strokeWidth = isHighlighted ? 4.5 : 3;
                  strokeOpacity = isHighlighted ? 1 : 0.85;
                } else if (edge.level === 2) {
                  strokeColor = isDark ? "#c084fc" : "#7c3aed";
                  strokeWidth = isHighlighted ? 3.5 : 2;
                  strokeOpacity = isHighlighted ? 1 : 0.75;
                } else {
                  strokeColor = isDark ? "#34d399" : "#059669";
                  strokeWidth = isHighlighted ? 3 : 1.5;
                  strokeOpacity = isHighlighted ? 1 : 0.65;
                }

                if (isHighlighted) {
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
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                    />

                    {edge.level <= 2 && (
                      <path
                        d={pathData}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={edge.level === 1 ? 2.2 : 1.4}
                        className="web-flow-line"
                        strokeOpacity={0.9}
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
          {/* Keyword Nodes: Root, Level 1 pillars, and Level 2/3 keyword nodes (<= 3 children) */}
          {(viewMode === "group" ? nodes : visibleNodes).map((node) => (
            <SpiderNodeCard
              key={node.id}
              node={node}
              theme={theme}
              isDragging={draggedNodeId === node.id}
              isMatched={matchedNodes.has(node.id)}
              hasQuery={Boolean(queryLower)}
              onPointerDown={handleNodePointerDown}
              onClick={handleNodeClick}
            />
          ))}

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
              />
            ))}
        </div>
      </div>
    </div>
  );
};
