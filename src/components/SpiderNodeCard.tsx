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
  isSelected?: boolean;
  isBranchConnected?: boolean;
  isBranchActive?: boolean;
}

export const SpiderNodeCard: React.FC<SpiderNodeCardProps> = ({
  node,
  theme,
  isDragging,
  isMatched,
  hasQuery,
  onPointerDown,
  onClick,
  isSelected = false,
  isBranchConnected = false,
  isBranchActive = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const isDark = theme === "dark";
  const isRoot = node.level === 0;
  const isL1 = node.level === 1;
  const isL2 = node.level === 2;

  // 3-Tier Branch-Count Shape Architecture:
  // - 3 branches (>= 3): Circle with concentric circular rings ("circle circles")
  // - 2 branches (== 2): Stadium Pill Capsule with halo ring ("the pill")
  // - 1 or 0 branches (<= 1): Original rectangular chip card ("the older")
  const branchCount = node.branchCount ?? (isRoot ? 3 : 0);
  const isCircle = branchCount >= 3;
  const isPill = branchCount === 2;

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

  // Opacity: if query active -> match filter; if branch active -> connected filter
  let opacity = 1;
  if (hasQuery) {
    opacity = isMatched ? 1 : 0.2;
  } else if (isBranchActive) {
    opacity = isBranchConnected ? 1 : 0.18;
  }

  // -------------------------------------------------------------
  // SHAPE 1: "CIRCLE CIRCLES" (3 or more branches / root hubs)
  // Concentric circular orbit rings with a central circular disc
  // -------------------------------------------------------------
  if (isCircle) {
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
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.05 : isSelected ? 1.05 : isHovered ? 1.03 : 1})`,
          cursor: isDragging ? "grabbing" : "pointer",
          zIndex: isDragging ? 35 : isSelected ? 30 : isHovered ? 25 : isRoot ? 20 : 16,
          opacity,
          transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        }}
      >
        {/* Outer Concentric Circle Ring 2 (Dashed Orbital Ring) */}
        <div
          style={{
            position: "absolute",
            inset: isRoot ? "-20px" : "-16px",
            borderRadius: "50%",
            border: `1.5px dashed ${isSelected ? "#f59e0b" : accentColor}`,
            opacity: isDark ? 0.35 : 0.25,
            pointerEvents: "none",
          }}
        />

        {/* Outer Concentric Circle Ring 1 (Pulsing Halo Ring) */}
        <div
          className="animate-pulse-ring"
          style={{
            position: "absolute",
            inset: isRoot ? "-11px" : "-8px",
            borderRadius: "50%",
            border: `2px solid ${isSelected ? "#f59e0b" : accentColor}`,
            opacity: isDark ? 0.5 : 0.38,
            pointerEvents: "none",
          }}
        />

        {/* Core Circular Disc */}
        <div
          style={{
            width: isRoot ? "154px" : "138px",
            height: isRoot ? "154px" : "138px",
            borderRadius: "50%",
            backgroundColor: isDark ? "#0c101d" : "#ffffff",
            background: isDark
              ? "radial-gradient(circle at 50% 35%, #18223a 0%, #0c101d 100%)"
              : "#ffffff",
            border: isSelected
              ? "3px solid #f59e0b"
              : `2.5px solid ${isMatched ? (isDark ? "#f59e0b" : "#d97706") : accentColor}`,
            boxShadow: isSelected
              ? `0 0 35px rgba(245, 158, 11, 0.75), 0 0 20px ${accentColor}`
              : isMatched
              ? `0 0 35px rgba(245, 158, 11, 0.6), 0 0 20px ${accentColor}`
              : isDark
              ? `0 0 35px ${accentColor}40, 0 10px 25px rgba(0,0,0,0.6)`
              : `0 8px 30px rgba(0, 0, 0, 0.08), 0 0 20px ${accentColor}25`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "10px",
            boxSizing: "border-box",
          }}
        >
          {node.badge && (
            <span
              style={{
                fontSize: isRoot ? "10.5px" : "9.5px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: isSelected ? "#f59e0b" : accentColor,
                marginBottom: "2px",
                lineHeight: 1.1,
              }}
            >
              {node.badge}
            </span>
          )}
          <span
            style={{
              fontSize: isRoot ? "16px" : "14px",
              fontWeight: 800,
              color: isDark ? "#ffffff" : "#0f172a",
              letterSpacing: "-0.02em",
              lineHeight: 1.18,
              maxWidth: isRoot ? "124px" : "112px",
            }}
          >
            {node.label}
          </span>
          <div
            style={{
              marginTop: "4px",
              display: "flex",
              alignItems: "center",
              gap: "3.5px",
              fontSize: isRoot ? "10px" : "9.5px",
              color: isSelected
                ? isDark ? "#fde047" : "#b45309"
                : isDark ? "rgba(255,255,255,0.6)" : "var(--text-dim)",
              fontWeight: isSelected ? 700 : 500,
            }}
          >
            <span>{isSelected ? "Active in Notes 📖" : "Story & Notes 📖"}</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SHAPE 2: "THE PILL" (Exactly 2 branches)
  // Stadium capsule with outer stadium halo ring
  // -------------------------------------------------------------
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
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.05 : isSelected ? 1.05 : isHovered ? 1.03 : 1})`,
          cursor: isDragging ? "grabbing" : "pointer",
          zIndex: isDragging ? 35 : isSelected ? 30 : isHovered ? 25 : 16,
          opacity,
          transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        }}
      >
        {/* Pulsing Outer Halo Ring */}
        <div
          className="animate-pulse-ring"
          style={{
            position: "absolute",
            inset: "-11px",
            borderRadius: "999px",
            border: `2px solid ${isSelected ? "#f59e0b" : accentColor}`,
            opacity: isDark ? 0.5 : 0.38,
            pointerEvents: "none",
          }}
        />

        {/* Stadium Capsule Body */}
        <div
          style={{
            minWidth: "165px",
            padding: "12px 22px",
            borderRadius: "999px",
            backgroundColor: isDark ? "#0c101d" : "#ffffff",
            background: isDark
              ? "radial-gradient(circle at 50% 30%, #18223a 0%, #0c101d 100%)"
              : "#ffffff",
            border: isSelected
              ? "2.5px solid #f59e0b"
              : `2.5px solid ${isMatched ? (isDark ? "#f59e0b" : "#d97706") : accentColor}`,
            boxShadow: isSelected
              ? `0 0 30px rgba(245, 158, 11, 0.7), 0 0 15px ${accentColor}`
              : isMatched
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
                fontSize: "10px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: isSelected ? "#f59e0b" : accentColor,
                marginBottom: "2px",
              }}
            >
              {node.badge}
            </span>
          )}
          <span
            style={{
              fontSize: "14.5px",
              fontWeight: 800,
              color: isDark ? "#ffffff" : "#0f172a",
              letterSpacing: "-0.02em",
            }}
          >
            {node.label}
          </span>
          <div
            style={{
              marginTop: "3px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "10px",
              color: isSelected
                ? isDark ? "#fde047" : "#b45309"
                : isDark ? "rgba(255,255,255,0.6)" : "var(--text-dim)",
              fontWeight: isSelected ? 700 : 500,
            }}
          >
            <span>{isSelected ? "Active in Notes 📖" : "Story & Notes 📖"}</span>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // SHAPE 3: "THE OLDER" (1 or 0 branches)
  // Continues to Level 1 / Level 2 / Level 3 compact rectangular chips
  // -------------------------------------------------------------

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
          transform: `translate(-50%, -50%) scale(${isDragging ? 1.05 : isSelected ? 1.06 : isHovered ? 1.04 : 1})`,
          cursor: isDragging ? "grabbing" : "pointer",
          zIndex: isDragging ? 35 : isSelected ? 30 : isHovered ? 25 : 15,
          opacity,
          transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        }}
      >
        <div
          style={{
            padding: "9px 16px",
            borderRadius: "12px",
            backgroundColor: isDark ? (isHovered ? "#161e30" : "#0c101d") : "#ffffff",
            background: isDark
              ? isHovered
                ? "#18223a"
                : "#0c101d"
              : "#ffffff",
            border: isSelected
              ? "2px solid #f59e0b"
              : `1.5px solid ${isMatched ? (isDark ? "#f59e0b" : "#d97706") : isHovered ? accentColor : `${accentColor}80`}`,
            boxShadow: isSelected
              ? `0 0 25px rgba(245, 158, 11, 0.65), 0 0 15px ${accentColor}`
              : isDark
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
              background: isSelected ? "#f59e0b" : accentColor,
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
                color: isSelected ? "#f59e0b" : accentColor,
              }}
            >
              {node.badge}
            </span>
          )}
          <span
            style={{
              fontSize: "10px",
              color: isSelected ? "#f59e0b" : accentColor,
              opacity: isSelected ? 1 : 0.6,
              marginLeft: "2px",
            }}
          >
            📖
          </span>
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
        transform: `translate(-50%, -50%) scale(${isDragging ? 1.08 : isSelected ? 1.08 : isHovered ? 1.05 : 1})`,
        cursor: isDragging ? "grabbing" : "pointer",
        zIndex: isDragging ? 35 : isSelected ? 30 : isHovered ? 25 : isL2 ? 10 : 8,
        opacity,
        transition: isDragging ? "none" : "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
      }}
    >
      <div
        style={{
          padding: isL2 ? "7px 13px" : "5px 10px",
          borderRadius: isL2 ? "10px" : "8px",
          backgroundColor: isDark ? (isHovered ? "#161e30" : "#0c101d") : "#ffffff",
          background: isDark
            ? isHovered
              ? "#18223a"
              : isL2
              ? "#0f1626"
              : "#0c101d"
            : "#ffffff",
          border: isSelected
            ? "2px solid #f59e0b"
            : `1.5px solid ${
                isMatched
                  ? isDark ? "#f59e0b" : "#d97706"
                  : isHovered
                  ? accentColor
                  : isDark
                  ? `${accentColor}55`
                  : `${accentColor}40`
              }`,
          boxShadow: isSelected
            ? `0 0 20px rgba(245, 158, 11, 0.6), 0 0 10px ${accentColor}`
            : isMatched
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
            background: isSelected ? "#f59e0b" : accentColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: isL2 ? "12px" : "11px",
            fontWeight: isSelected ? 700 : isL2 ? 600 : 500,
            color: isDark
              ? isSelected ? "#fde047" : isHovered ? "#ffffff" : isL2 ? "#e2e8f0" : "var(--text-muted)"
              : isSelected ? "#b45309" : isHovered ? "#0f172a" : isL2 ? "#1e293b" : "#475569",
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
              color: isSelected ? "#f59e0b" : accentColor,
              fontWeight: 600,
            }}
          >
            {node.badge}
          </span>
        )}
        <span
          style={{
            fontSize: "9px",
            color: isSelected ? "#f59e0b" : accentColor,
            opacity: isSelected ? 1 : 0.5,
          }}
        >
          📖
        </span>
      </div>
    </div>
  );
};
