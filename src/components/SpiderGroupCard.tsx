"use client";

import React, { useState } from "react";
import { PositionedGroupCard } from "@/utils/spiderLayout";
import { ExternalLink, GripVertical } from "lucide-react";

interface SpiderGroupCardProps {
  card: PositionedGroupCard;
  theme: "light" | "dark";
  isDragging: boolean;
  searchQuery: string;
  onPointerDown: (e: React.PointerEvent, card: PositionedGroupCard) => void;
  onKeywordClick: (query: string) => void;
}

export const SpiderGroupCard: React.FC<SpiderGroupCardProps> = ({
  card,
  theme,
  isDragging,
  searchQuery,
  onPointerDown,
  onKeywordClick,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const isDark = theme === "dark";
  const queryLower = searchQuery.trim().toLowerCase();

  // Check if any item in this card matches search query
  const hasCardMatches = React.useMemo(() => {
    if (!queryLower) return false;
    return card.items.some((item) => {
      const matchItem =
        item.label.toLowerCase().includes(queryLower) ||
        (item.badge && item.badge.toLowerCase().includes(queryLower));
      const matchSub = item.subItems?.some(
        (sub) =>
          sub.label.toLowerCase().includes(queryLower) ||
          (sub.badge && sub.badge.toLowerCase().includes(queryLower))
      );
      return matchItem || matchSub;
    });
  }, [card.items, queryLower]);

  const opacity = queryLower ? (hasCardMatches ? 1 : 0.22) : 1;

  const cardBorder = hasCardMatches
    ? isDark
      ? "2px solid #f59e0b"
      : "2px solid #d97706"
    : `1.5px solid ${card.color}${isDark ? "70" : "50"}`;

  const cardShadow = hasCardMatches
    ? isDark
      ? "0 0 25px rgba(245, 158, 11, 0.45), 0 10px 30px rgba(0,0,0,0.6)"
      : "0 0 20px rgba(217, 119, 6, 0.35), 0 8px 24px rgba(0,0,0,0.12)"
    : isDark
    ? `0 10px 30px rgba(0,0,0,0.65), 0 0 20px ${card.color}25`
    : `0 8px 26px rgba(0, 0, 0, 0.08), 0 0 18px ${card.color}20`;

  return (
    <div
      id={`group-card-${card.id}`}
      onPointerDown={(e) => onPointerDown(e, card)}
      style={{
        position: "absolute",
        left: `${card.x}px`,
        top: `${card.y}px`,
        transform: `translate(-50%, -50%) scale(${isDragging ? 1.02 : 1})`,
        width: "320px",
        borderRadius: "16px",
        background: isDark
          ? "linear-gradient(155deg, rgba(15, 23, 42, 0.94) 0%, rgba(10, 15, 29, 0.97) 100%)"
          : "linear-gradient(155deg, #ffffff 0%, #f8fafc 100%)",
        border: cardBorder,
        boxShadow: cardShadow,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        cursor: isDragging ? "grabbing" : "grab",
        zIndex: isDragging ? 35 : 18,
        opacity,
        transition: isDragging
          ? "none"
          : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s, box-shadow 0.2s",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Header with Pillar Title & Badge */}
      <div
        style={{
          padding: "12px 14px",
          borderBottom: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isDark
            ? `linear-gradient(90deg, ${card.color}18 0%, transparent 100%)`
            : `linear-gradient(90deg, ${card.color}10 0%, transparent 100%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: card.color,
              boxShadow: `0 0 10px ${card.color}`,
              flexShrink: 0,
            }}
          />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontSize: "13.5px",
                fontWeight: 800,
                color: isDark ? "#ffffff" : "#0f172a",
                letterSpacing: "-0.01em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {card.title}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "6px",
              background: `${card.color}20`,
              color: card.color,
              letterSpacing: "0.02em",
            }}
          >
            {card.badge}
          </span>
          <GripVertical
            size={13}
            color={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
          />
        </div>
      </div>

      {/* Card Items Stack */}
      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          maxHeight: "440px",
          overflowY: "auto",
        }}
        className="custom-scrollbar"
      >
        {card.items.map((item, idx) => {
          const itemMatched =
            Boolean(queryLower) &&
            (item.label.toLowerCase().includes(queryLower) ||
              (item.badge && item.badge.toLowerCase().includes(queryLower)));

          const isItemHovered = hoveredItemId === item.id;

          return (
            <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {/* Item Row */}
              <div
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onKeywordClick(item.searchQuery || `${item.label} JavaScript Node.js`);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "5px 8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: itemMatched
                    ? isDark
                      ? "rgba(245, 158, 11, 0.22)"
                      : "rgba(254, 243, 199, 0.85)"
                    : isItemHovered
                    ? isDark
                      ? `${card.color}20`
                      : `${card.color}12`
                    : isDark
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.02)",
                  border: itemMatched
                    ? isDark
                      ? "1px solid #f59e0b"
                      : "1px solid #d97706"
                    : isItemHovered
                    ? `1px solid ${card.color}50`
                    : isDark
                    ? "1px solid rgba(255, 255, 255, 0.04)"
                    : "1px solid rgba(0, 0, 0, 0.04)",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "7px", minWidth: 0 }}>
                  {/* Step Number or Pill Icon */}
                  {item.stepNumber ? (
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: isDark ? `${card.color}30` : `${card.color}18`,
                        color: card.color,
                        fontSize: "9.5px",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.stepNumber}
                    </span>
                  ) : (
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: card.color,
                        opacity: 0.8,
                        flexShrink: 0,
                      }}
                    />
                  )}

                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: isDark
                        ? isItemHovered
                          ? "#ffffff"
                          : "#f1f5f9"
                        : isItemHovered
                        ? "#0f172a"
                        : "#1e293b",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.label}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "5px", flexShrink: 0 }}>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 600,
                        padding: "1px 5px",
                        borderRadius: "4px",
                        background: isDark ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.05)",
                        color: isDark ? "rgba(255, 255, 255, 0.7)" : "#475569",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ExternalLink
                    size={10}
                    color={card.color}
                    style={{
                      opacity: isItemHovered ? 1 : 0.35,
                      transition: "opacity 0.15s",
                    }}
                  />
                </div>
              </div>

              {/* Sub-items (Branches under this keyword) */}
              {item.subItems && item.subItems.length > 0 && (
                <div
                  style={{
                    marginLeft: "24px",
                    paddingLeft: "8px",
                    borderLeft: isDark
                      ? `1.5px solid ${card.color}40`
                      : `1.5px solid ${card.color}30`,
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    marginBottom: "3px",
                  }}
                >
                  {item.subItems.map((sub, sIdx) => {
                    const isLast = sIdx === item.subItems!.length - 1;
                    const subMatched =
                      Boolean(queryLower) &&
                      (sub.label.toLowerCase().includes(queryLower) ||
                        (sub.badge && sub.badge.toLowerCase().includes(queryLower)));

                    const isSubHovered = hoveredItemId === sub.id;

                    return (
                      <div
                        key={sub.id}
                        onMouseEnter={() => setHoveredItemId(sub.id)}
                        onMouseLeave={() => setHoveredItemId(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          onKeywordClick(sub.searchQuery || `${sub.label} JavaScript Node.js`);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "3px 6px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          background: subMatched
                            ? isDark
                              ? "rgba(245, 158, 11, 0.2)"
                              : "rgba(254, 243, 199, 0.8)"
                            : isSubHovered
                            ? isDark
                              ? "rgba(255, 255, 255, 0.07)"
                              : "rgba(0, 0, 0, 0.04)"
                            : "transparent",
                          transition: "background 0.15s",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            minWidth: 0,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "10px",
                              color: isDark ? "rgba(255, 255, 255, 0.35)" : "#94a3b8",
                            }}
                          >
                            {isLast ? "└─" : "├─"}
                          </span>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              color: isDark
                                ? isSubHovered
                                  ? "#ffffff"
                                  : "#cbd5e1"
                                : isSubHovered
                                ? "#0f172a"
                                : "#334155",
                            }}
                          >
                            {sub.label}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            flexShrink: 0,
                          }}
                        >
                          {sub.badge && (
                            <span
                              style={{
                                fontSize: "8.5px",
                                fontWeight: 500,
                                padding: "1px 4px",
                                borderRadius: "3px",
                                background: isDark
                                  ? "rgba(255, 255, 255, 0.05)"
                                  : "rgba(0, 0, 0, 0.04)",
                                color: isDark ? "rgba(255, 255, 255, 0.6)" : "#64748b",
                              }}
                            >
                              {sub.badge}
                            </span>
                          )}
                          <ExternalLink
                            size={9}
                            color={card.color}
                            style={{
                              opacity: isSubHovered ? 1 : 0.3,
                              transition: "opacity 0.15s",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div
        style={{
          padding: "6px 14px",
          borderTop: isDark
            ? "1px solid rgba(255, 255, 255, 0.05)"
            : "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "9.5px",
          color: isDark ? "rgba(255,255,255,0.4)" : "#64748b",
        }}
      >
        <span>Click keyword to search</span>
        <span style={{ color: card.color, fontWeight: 600 }}>{card.items.length} items</span>
      </div>
    </div>
  );
};
