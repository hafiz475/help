"use client";

import React from "react";
import { PositionedNode, getHierarchyThreadColor } from "@/utils/spiderLayout";
import { ExternalLink } from "lucide-react";

interface SpiderNodeCardProps {
  node: PositionedNode;
  theme: "light" | "dark";
  isDragging: boolean;
  isMatched: boolean;
  hasQuery: boolean;
  onPointerDown: (e: React.PointerEvent, node: PositionedNode) => void;
  onClick: (node: PositionedNode) => void;
}

export const SpiderNodeCard: React.FC<SpiderNodeCardProps> = ({
  node,
  theme,
  isDragging,
  isMatched,
  hasQuery,
  onPointerDown,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const isDark = theme === "dark";
  const isRoot = node.level === 0;
  const isL1 = node.level === 1;
  const isL2 = node.level === 2;

  // Rule: When a node creates more than 2 branches (branchCount > 2), or is root hub,
  // it renders as a stadium pill capsule with pulsing halo ring!
  const isPill = isRoot || Boolean(node.branchCount !== undefined && node.branchCount > 2);

  // Accent colors based on hierarchy level (Level 0, 1, 2, 3)
  const getColor = () => {
    if (node.level === 0) {
      return isDark ? "#f59e0b" : "#d97706"; // Amber / Gold for Center Heading
    }
    if (node.branchIndex !== undefined) {
      return getHierarchyThreadColor(node.branchIndex, node.level, isDark).stroke;
    }
    if (node.level === 1) {
      return isDark ? "#38bdf8" : "#0284c7"; // Sky Blue for Major Pillars
    }
    if (node.level === 2) {
      return isDark ? "#c084fc" : "#7c3aed"; // Violet / Purple for Core Concepts
    }
    // Level 3 (Details / Items)
    return isDark ? "#34d399" : "#059669"; // Emerald / Green for Detail Items
  };

  const accentColor = getColor();
  const opacity = hasQuery ? (isMatched ? 1 : 0.2) : 1;

  // Render Stadium Pill Capsule (Root center hub or any node branching out > 2)
  if (isPill) {
    return (
      <div
        id={`node-${node.id}`}
        onPointerDown={(e) => onPointerDown(e, node)}
        onClick={() => onClick(node)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          left: `${node.x}px`,
          top: `${node.y}px`,
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.05 : isHovered ? 1.03 : 1})`,
          cursor: isDragging ? "grabbing" : "pointer",
          zIndex: isDragging ? 35 : isHovered ? 25 : isRoot ? 20 : 16,
          opacity,
          transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        }}
      >
        {/* Pulsing Outer Halo Ring */}
        <div
          className="animate-pulse-ring"
          style={{
            position: "absolute",
            inset: isRoot ? "-14px" : "-11px",
            borderRadius: "999px",
            border: `2px solid ${accentColor}`,
            opacity: isDark ? 0.45 : 0.35,
            pointerEvents: "none",
          }}
        />

        {/* Stadium Capsule Body */}
        <div
          style={{
            minWidth: isRoot ? "190px" : "170px",
            padding: isRoot ? "16px 26px" : "13px 24px",
            borderRadius: "999px",
            background: isDark
              ? `radial-gradient(circle at 50% 30%, ${accentColor}25 0%, #0d1322 95%)`
              : "#ffffff",
            border: `2.5px solid ${isMatched ? (isDark ? "#f59e0b" : "#d97706") : accentColor}`,
            boxShadow: isMatched
              ? `0 0 35px rgba(245, 158, 11, 0.6), 0 0 20px ${accentColor}`
              : isDark
              ? `0 0 35px ${accentColor}40, 0 10px 25px rgba(0,0,0,0.6)`
              : `0 8px 30px rgba(0, 0, 0, 0.08), 0 0 20px ${accentColor}25`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {node.badge && (
            <span
              style={{
                fontSize: isRoot ? "11px" : "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: accentColor,
                marginBottom: "3px",
              }}
            >
              {node.badge}
            </span>
          )}
          <span
            style={{
              fontSize: isRoot ? "17px" : "15px",
              fontWeight: 800,
              color: isDark ? "#ffffff" : "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            {node.label}
          </span>
          <div
            style={{
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: isRoot ? "10.5px" : "10px",
              color: isDark ? "rgba(255,255,255,0.5)" : "var(--text-dim)",
              fontWeight: 500,
            }}
          >
            <span>Google search</span>
            <ExternalLink size={isRoot ? 10 : 9.5} color={accentColor} />
          </div>
        </div>
      </div>
    );
  }

  // Level 1 Pillars
  if (isL1) {
    return (
      <div
        id={`node-${node.id}`}
        onPointerDown={(e) => onPointerDown(e, node)}
        onClick={() => onClick(node)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: "absolute",
          left: `${node.x}px`,
          top: `${node.y}px`,
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.05 : isHovered ? 1.04 : 1})`,
          cursor: isDragging ? "grabbing" : "pointer",
          zIndex: isDragging ? 35 : isHovered ? 25 : 15,
          opacity,
          transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        }}
      >
        <div
          style={{
            padding: "9px 16px",
            borderRadius: "12px",
            background: isDark
              ? isHovered
                ? `linear-gradient(135deg, ${accentColor}25 0%, #151d2f 100%)`
                : "rgba(15, 23, 42, 0.9)"
              : "#ffffff",
            border: `1.5px solid ${isMatched ? (isDark ? "#f59e0b" : "#d97706") : isHovered ? accentColor : `${accentColor}80`}`,
            boxShadow: isDark
              ? isHovered
                ? `0 0 25px ${accentColor}35, 0 8px 20px rgba(0,0,0,0.5)`
                : "0 4px 14px rgba(0,0,0,0.3)"
              : isHovered
              ? `0 6px 20px rgba(0,0,0,0.09), 0 0 16px ${accentColor}30`
              : "0 2px 10px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: accentColor,
            }}
          />
          <span
            style={{
              fontSize: "13.5px",
              fontWeight: 700,
              color: isDark ? "#ffffff" : "#0f172a",
              letterSpacing: "-0.01em",
            }}
          >
            {node.label}
          </span>
          {node.badge && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: "6px",
                background: `${accentColor}18`,
                color: accentColor,
              }}
            >
              {node.badge}
            </span>
          )}
          <ExternalLink
            size={12}
            color={accentColor}
            style={{
              opacity: isHovered ? 1 : 0.45,
              transition: "opacity 0.2s",
            }}
          />
        </div>
      </div>
    );
  }

  // Level 2 Concepts & Level 3 Details
  return (
    <div
      id={`node-${node.id}`}
      onPointerDown={(e) => onPointerDown(e, node)}
      onClick={() => onClick(node)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "absolute",
        left: `${node.x}px`,
        top: `${node.y}px`,
        transform: `translate(-50%, -50%) scale(${isDragging ? 1.08 : isHovered ? 1.05 : 1})`,
        cursor: isDragging ? "grabbing" : "pointer",
        zIndex: isDragging ? 35 : isHovered ? 25 : isL2 ? 10 : 8,
        opacity,
        transition: isDragging ? "none" : "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
      }}
    >
      <div
        style={{
          padding: isL2 ? "7px 13px" : "5px 10px",
          borderRadius: isL2 ? "10px" : "8px",
          background: isDark
            ? isHovered
              ? `linear-gradient(135deg, ${accentColor}20 0%, #151d2f 100%)`
              : isL2
              ? "rgba(15, 23, 42, 0.88)"
              : "rgba(11, 17, 31, 0.85)"
            : isHovered
            ? "#ffffff"
            : isL2
            ? "#ffffff"
            : "rgba(255, 255, 255, 0.95)",
          border: `1.5px solid ${
            isMatched
              ? isDark ? "#f59e0b" : "#d97706"
              : isHovered
              ? accentColor
              : isDark
              ? `${accentColor}55`
              : `${accentColor}40`
          }`,
          boxShadow: isMatched
            ? isDark ? "0 0 16px rgba(245, 158, 11, 0.5)" : "0 0 14px rgba(217, 119, 6, 0.4)"
            : isHovered
            ? isDark ? `0 0 16px ${accentColor}30, 0 4px 12px rgba(0,0,0,0.4)` : `0 4px 14px rgba(0,0,0,0.08), 0 0 12px ${accentColor}25`
            : isDark ? "0 2px 6px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          whiteSpace: "nowrap",
        }}
      >
        {/* Hierarchy dot */}
        <div
          style={{
            width: isL2 ? "6.5px" : "5.5px",
            height: isL2 ? "6.5px" : "5.5px",
            borderRadius: "50%",
            background: accentColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: isL2 ? "12px" : "11px",
            fontWeight: isL2 ? 600 : 500,
            color: isDark
              ? isHovered ? "#ffffff" : isL2 ? "#e2e8f0" : "var(--text-muted)"
              : isHovered ? "#0f172a" : isL2 ? "#1e293b" : "#475569",
            letterSpacing: "-0.01em",
          }}
        >
          {node.label}
        </span>
        {node.badge && (
          <span
            style={{
              fontSize: "9px",
              padding: "1px 5px",
              borderRadius: "4px",
              background: `${accentColor}15`,
              color: accentColor,
              fontWeight: 600,
            }}
          >
            {node.badge}
          </span>
        )}
        <ExternalLink
          size={isL2 ? 10 : 9}
          color={accentColor}
          style={{
            opacity: isHovered ? 1 : 0.35,
            transition: "opacity 0.15s",
          }}
        />
      </div>
    </div>
  );
};
