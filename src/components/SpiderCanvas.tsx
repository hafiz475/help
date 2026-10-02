"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { SpiderNode, ConceptCategory, ALL_NODES } from "@/data/concepts";
import {
  PositionedNode,
  Edge,
  calculateSpiderLayout,
  getNodesForCategory,
} from "@/utils/spiderLayout";
import { SpiderNodeCard } from "./SpiderNodeCard";

interface SpiderCanvasProps {
  currentCategory: ConceptCategory;
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

  // Pan state (canvas offset in px)
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Nodes & Edges state
  const [nodes, setNodes] = useState<PositionedNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Dragging states
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const dragPointerStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragNodeStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedSignificantlyRef = useRef<boolean>(false);

  // Initialize/Recalculate Spider Layout
  const initLayout = useCallback(() => {
    const { nodes: catNodes, rootId: rId } = getNodesForCategory(
      ALL_NODES,
      currentCategory
    );
    const layout = calculateSpiderLayout(catNodes, rId, currentCategory);
    setNodes(layout.nodes);
    setEdges(layout.edges);
  }, [currentCategory]);

  useEffect(() => {
    initLayout();
    if (typeof window !== "undefined") {
      setPan({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, [initLayout]);

  // Recenter trigger
  useEffect(() => {
    if (recenterTrigger > 0 && typeof window !== "undefined") {
      setPan({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
  }, [recenterTrigger]);

  // Reset layout trigger
  useEffect(() => {
    if (resetLayoutTrigger > 0) {
      initLayout();
    }
  }, [resetLayoutTrigger, initLayout]);

  // Search filtering
  const queryLower = searchQuery.trim().toLowerCase();
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

  useEffect(() => {
    onMatchCountChange?.(matchedNodes.size);
  }, [matchedNodes, onMatchCountChange]);

  // Auto-center on first search match
  useEffect(() => {
    if (queryLower && matchedNodes.size > 0 && typeof window !== "undefined") {
      const firstMatchId = Array.from(matchedNodes)[0];
      const matchNode = nodes.find((n) => n.id === firstMatchId);
      if (matchNode) {
        setPan({
          x: Math.round(window.innerWidth / 2 - matchNode.x * zoom),
          y: Math.round(window.innerHeight / 2 - matchNode.y * zoom),
        });
      }
    }
  }, [queryLower, matchedNodes, nodes, zoom]);

  // Handle Zoom via mouse wheel around cursor
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
    const newZoom = Math.min(Math.max(zoom * zoomFactor, 0.2), 2.5);

    const newPanX = Math.round(mouseX - (mouseX - pan.x) * (newZoom / zoom));
    const newPanY = Math.round(mouseY - (mouseY - pan.y) * (newZoom / zoom));

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // Canvas Panning (pointer events on empty canvas)
  const handleCanvasPointerDown = (e: React.PointerEvent) => {
    if (e.target !== containerRef.current && (e.target as HTMLElement).tagName !== "svg") {
      return;
    }
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  // Node Drag Start
  const handleNodePointerDown = (e: React.PointerEvent, node: PositionedNode) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    setDraggedNodeId(node.id);
    dragPointerStartRef.current = { x: e.clientX, y: e.clientY };
    dragNodeStartRef.current = { x: node.x, y: node.y };
    hasMovedSignificantlyRef.current = false;
  };

  // Global Pointer Move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPanning) {
      setPan({
        x: Math.round(e.clientX - panStart.x),
        y: Math.round(e.clientY - panStart.y),
      });
    } else if (draggedNodeId) {
      const dx = (e.clientX - dragPointerStartRef.current.x) / zoom;
      const dy = (e.clientY - dragPointerStartRef.current.y) / zoom;

      if (Math.hypot(dx, dy) > 4) {
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
    }
  };

  // Global Pointer Up
  const handlePointerUp = () => {
    setIsPanning(false);
    setDraggedNodeId(null);
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

  // Filter visible nodes based on Level 3 toggle
  const visibleNodes = nodes.filter((n) => (showLevel3 ? true : n.level < 3));
  const visibleNodeIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = edges.filter(
    (e) => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
  );

  const nodeMap = new Map<string, PositionedNode>();
  visibleNodes.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handleCanvasPointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="spider-web-bg"
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
        {/* SVG Layer for Spider Web Rings & Edges */}
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
            {/* Spider concentric rings - Light theme */}
            {showSpiderRings && (
              <g opacity="0.45">
                {[140, 280, 420, 560, 700, 840, 980].map((radius, idx) => (
                  <circle
                    key={radius}
                    cx="0"
                    cy="0"
                    r={radius}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth={idx % 2 === 1 ? "1" : "0.75"}
                    strokeDasharray={idx % 2 === 1 ? "5 6" : "none"}
                  />
                ))}

                {/* Spider radial spokes with rounded coordinates to avoid float hydration differences */}
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
                        stroke="#cbd5e1"
                        strokeWidth="0.8"
                        strokeDasharray="4 6"
                      />
                    );
                  }
                )}
              </g>
            )}

            {/* Connecting Edges */}
            {visibleEdges.map((edge, idx) => {
              const sourceNode = nodeMap.get(edge.source);
              const targetNode = nodeMap.get(edge.target);
              if (!sourceNode || !targetNode) return null;

              const isHighlighted =
                matchedNodes.has(edge.source) || matchedNodes.has(edge.target);

              // Light theme stroke colors
              let strokeColor = "rgba(2, 132, 199, 0.45)";
              if (edge.category === "scope") strokeColor = "rgba(124, 58, 237, 0.45)";
              if (edge.category === "node") strokeColor = "rgba(22, 163, 74, 0.45)";
              if (edge.category === "all") strokeColor = "rgba(217, 119, 6, 0.45)";

              if (isHighlighted) {
                strokeColor = "#d97706";
              }

              // Subtle curved spider thread (cubic bezier)
              const dx = targetNode.x - sourceNode.x;
              const dy = targetNode.y - sourceNode.y;
              const cx1 = Math.round(sourceNode.x + dx * 0.4);
              const cy1 = Math.round(sourceNode.y + dy * 0.1);
              const cx2 = Math.round(sourceNode.x + dx * 0.6);
              const cy2 = Math.round(sourceNode.y + dy * 0.9);

              const pathData = `M ${sourceNode.x} ${sourceNode.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${targetNode.x} ${targetNode.y}`;

              return (
                <g key={`${edge.source}-${edge.target}-${idx}`}>
                  <path
                    d={pathData}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isHighlighted ? 3.5 : edge.level === 1 ? 2.5 : 1.5}
                    strokeOpacity={isHighlighted ? 0.9 : 0.6}
                  />

                  {/* Flow animation for major spokes */}
                  {edge.level <= 2 && (
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={edge.level === 1 ? 1.8 : 1.2}
                      className="web-flow-line"
                      strokeOpacity="0.8"
                    />
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* HTML Draggable Nodes */}
        <div style={{ pointerEvents: "auto" }}>
          {visibleNodes.map((node) => (
            <SpiderNodeCard
              key={node.id}
              node={node}
              isDragging={draggedNodeId === node.id}
              isMatched={matchedNodes.has(node.id)}
              hasQuery={Boolean(queryLower)}
              onPointerDown={handleNodePointerDown}
              onClick={handleNodeClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
