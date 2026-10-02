"use client";

import React from "react";
import { PositionedNode } from "@/utils/spiderLayout";
import { ExternalLink } from "lucide-react";

interface SpiderNodeCardProps {
  node: PositionedNode;
  isDragging: boolean;
  isMatched: boolean;
  hasQuery: boolean;
  onPointerDown: (e: React.PointerEvent, node: PositionedNode) => void;
  onClick: (node: PositionedNode) => void;
}

export const SpiderNodeCard: React.FC<SpiderNodeCardProps> = ({
  node,
  isDragging,
  isMatched,
  hasQuery,
  onPointerDown,
  onClick,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const isRoot = node.level === 0;
  const isL1 = node.level === 1;
  const isL2 = node.level === 2;

  // Category Light Mode Accent colors
  const getColor = () => {
    if (node.color) return node.color;
    switch (node.category) {
      case "v8":
        return "#0284c7"; // Sky 600
      case "scope":
        return "#7c3aed"; // Violet 600
      case "node":
        return "#16a34a"; // Green 600
      default:
        return "#d97706"; // Amber 600
    }
  };

  const accentColor = getColor();
  const opacity = hasQuery ? (isMatched ? 1 : 0.2) : 1;

  // Render Root (Center concept)
  if (isRoot) {
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
          cursor: isDragging ? "grabbing" : "grab",
          zIndex: isDragging ? 35 : 20,
          opacity,
          transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s",
        }}
      >
        {/* Pulsing ring around root */}
        <div
          className="animate-pulse-ring"
          style={{
            position: "absolute",
            inset: "-14px",
            borderRadius: "999px",
            border: `2px solid ${accentColor}`,
            opacity: 0.35,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            minWidth: "190px",
            padding: "16px 26px",
            borderRadius: "999px",
            background: "#ffffff",
            border: `2.5px solid ${isHovered ? accentColor : accentColor}`,
            boxShadow: `0 8px 30px rgba(0, 0, 0, 0.08), 0 0 20px ${accentColor}25`,
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
                fontSize: "11px",
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
              fontSize: "17px",
              fontWeight: 800,
              color: "#0f172a",
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
              fontSize: "10.5px",
              color: "var(--text-dim)",
              fontWeight: 500,
            }}
          >
            <span>Google search</span>
            <ExternalLink size={10} color={accentColor} />
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
            background: "#ffffff",
            border: `1.5px solid ${isMatched ? "#d97706" : isHovered ? accentColor : `${accentColor}80`}`,
            boxShadow: isHovered
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
              color: "#0f172a",
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
                background: `${accentColor}15`,
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
          background: isHovered ? "#ffffff" : isL2 ? "#ffffff" : "rgba(255, 255, 255, 0.95)",
          border: `1px solid ${
            isMatched
              ? "#d97706"
              : isHovered
              ? accentColor
              : isL2
              ? "#cbd5e1"
              : "#e2e8f0"
          }`,
          boxShadow: isMatched
            ? "0 0 14px rgba(217, 119, 6, 0.4)"
            : isHovered
            ? `0 4px 14px rgba(0,0,0,0.08), 0 0 12px ${accentColor}25`
            : "0 1px 4px rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          gap: "7px",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            fontSize: isL2 ? "12px" : "11px",
            fontWeight: isL2 ? 600 : 500,
            color: isHovered ? "#0f172a" : isL2 ? "#1e293b" : "#475569",
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
              background: `${accentColor}12`,
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
