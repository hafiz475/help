"use client";

import React, { useState } from "react";
import { PositionedGroupCard, getHierarchyThreadColor } from "@/utils/spiderLayout";
import { GroupItem } from "@/data/groupConcepts";
import { ExternalLink, GripVertical } from "lucide-react";

interface SpiderGroupCardProps {
  card: PositionedGroupCard;
  theme: "light" | "dark";
  isDragging: boolean;
  searchQuery: string;
  selectedNodeIds?: string[];
  onPointerDown: (e: React.PointerEvent, card: PositionedGroupCard) => void;
  onKeywordClick?: (query: string) => void;
  onCardClick?: (card: PositionedGroupCard, e: React.MouseEvent) => void;
  onItemClick?: (item: GroupItem, card: PositionedGroupCard, e: React.MouseEvent) => void;
  onSearchClick?: (query: string, e: React.MouseEvent) => void;
  isBranchActive?: boolean;
  isBranchConnected?: boolean;
}

export const SpiderGroupCard: React.FC<SpiderGroupCardProps> = ({
  card,
  theme,
  isDragging,
  searchQuery,
  selectedNodeIds = [],
  onPointerDown,
  onKeywordClick,
  onCardClick,
  onItemClick,
  onSearchClick,
  isBranchActive = false,
  isBranchConnected = false,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const isDark = theme === "dark";
  const queryLower = searchQuery.trim().toLowerCase();

  const cardThemeColor =
    card.branchIndex !== undefined
      ? getHierarchyThreadColor(card.branchIndex, 2, isDark).stroke
      : card.color;

  const isCardSelected =
    selectedNodeIds.includes(card.pillarId) || selectedNodeIds.includes(card.id);
  const hasSelectedChild = card.items.some((item) =>
    selectedNodeIds.includes(item.id)
  );

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

  let opacity = 1;
  if (queryLower) {
    opacity = hasCardMatches ? 1 : 0.22;
  } else if (isBranchActive) {
    opacity = isBranchConnected || isCardSelected || hasSelectedChild ? 1 : 0.18;
  }

  const cardBorder = hasCardMatches
    ? isDark
      ? "2px solid #f59e0b"
      : "2px solid #d97706"
    : isCardSelected
    ? `2px solid ${cardThemeColor}`
    : hasSelectedChild
    ? `1.5px solid ${cardThemeColor}`
    : `1.5px solid ${cardThemeColor}${isDark ? "70" : "50"}`;

  const cardShadow = hasCardMatches
    ? isDark
      ? "0 0 25px rgba(245, 158, 11, 0.45), 0 10px 30px rgba(0,0,0,0.6)"
      : "0 0 20px rgba(217, 119, 6, 0.35), 0 8px 24px rgba(0,0,0,0.12)"
    : isCardSelected
    ? isDark
      ? `0 10px 35px rgba(0,0,0,0.7), 0 0 26px ${cardThemeColor}45`
      : `0 8px 30px rgba(0,0,0,0.12), 0 0 22px ${cardThemeColor}35`
    : hasSelectedChild
    ? isDark
      ? `0 10px 30px rgba(0,0,0,0.65), 0 0 20px ${cardThemeColor}30`
      : `0 8px 26px rgba(0,0,0,0.08), 0 0 18px ${cardThemeColor}25`
    : isDark
    ? `0 10px 30px rgba(0,0,0,0.65), 0 0 20px ${cardThemeColor}25`
    : `0 8px 26px rgba(0, 0, 0, 0.08), 0 0 18px ${cardThemeColor}20`;

  const handleSearch = (query: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSearchClick) {
      onSearchClick(query, e);
    } else if (onKeywordClick) {
      onKeywordClick(query);
    } else {
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(query)}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <div
      id={`group-card-${card.id}`}
      onPointerDown={(e) => onPointerDown(e, card)}
      onClick={(e) => {
        onCardClick?.(card, e);
      }}
      style={{
        position: "absolute",
        left: `${card.x}px`,
        top: `${card.y}px`,
        transform: `translate(-50%, -50%) scale(${isDragging ? 1.02 : 1})`,
        width: "324px",
        borderRadius: "16px",
        background: isDark
          ? "linear-gradient(155deg, rgba(15, 23, 42, 0.94) 0%, rgba(10, 15, 29, 0.97) 100%)"
          : "linear-gradient(155deg, #ffffff 0%, #f8fafc 100%)",
        border: cardBorder,
        boxShadow: cardShadow,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        cursor: isDragging ? "grabbing" : "default",
        zIndex: isDragging ? 35 : isCardSelected ? 25 : 18,
        opacity,
        transition: isDragging
          ? "none"
          : "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s, box-shadow 0.2s",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* Header with Pillar Title & Badge - Clickable to open card notebook */}
      <div
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => setIsHeaderHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          onCardClick?.(card, e);
        }}
        title="Click card to open in Concept Notebook"
        style={{
          padding: "12px 14px",
          borderBottom: isDark
            ? "1px solid rgba(255, 255, 255, 0.08)"
            : "1px solid rgba(0, 0, 0, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          background: isCardSelected
            ? isDark
              ? `linear-gradient(90deg, ${cardThemeColor}30 0%, ${cardThemeColor}12 100%)`
              : `linear-gradient(90deg, ${cardThemeColor}20 0%, ${cardThemeColor}08 100%)`
            : isHeaderHovered
            ? isDark
              ? `linear-gradient(90deg, ${cardThemeColor}24 0%, transparent 100%)`
              : `linear-gradient(90deg, ${cardThemeColor}16 0%, transparent 100%)`
            : isDark
            ? `linear-gradient(90deg, ${cardThemeColor}18 0%, transparent 100%)`
            : `linear-gradient(90deg, ${cardThemeColor}10 0%, transparent 100%)`,
          transition: "background 0.15s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: cardThemeColor,
              boxShadow: `0 0 10px ${cardThemeColor}`,
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
          {isCardSelected && (
            <span
              style={{
                fontSize: "9.5px",
                fontWeight: 800,
                padding: "2px 6px",
                borderRadius: "6px",
                background: "#f59e0b",
                color: "#000000",
                display: "flex",
                alignItems: "center",
                gap: "2px",
              }}
            >
              📖 Active
            </span>
          )}
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
        onWheel={(e) => e.stopPropagation()}
        style={{
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          maxHeight: "440px",
          overflowY: "auto",
          overscrollBehavior: "contain",
        }}
        className="custom-scrollbar"
      >
        {card.items.map((item, idx) => {
          const itemMatched =
            Boolean(queryLower) &&
            (item.label.toLowerCase().includes(queryLower) ||
              (item.badge && item.badge.toLowerCase().includes(queryLower)));

          const isItemHovered = hoveredItemId === item.id;
          const isItemSelected = selectedNodeIds.includes(item.id);
          const hasChildren = item.subItems && item.subItems.length > 0;

          return (
            <div key={item.id} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {/* Item Row - Click to open notebook drawer for this child! */}
              <div
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick?.(item, card, e);
                }}
                title={`Click to open "${item.label}" in Concept Notebook`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: isItemSelected
                    ? isDark
                      ? `${card.color}35`
                      : `${card.color}20`
                    : itemMatched
                    ? isDark
                      ? "rgba(245, 158, 11, 0.22)"
                      : "rgba(254, 243, 199, 0.85)"
                    : isItemHovered
                    ? isDark
                      ? `${card.color}22`
                      : `${card.color}14`
                    : isDark
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.02)",
                  border: isItemSelected
                    ? `1.5px solid ${card.color}`
                    : itemMatched
                    ? isDark
                      ? "1px solid #f59e0b"
                      : "1px solid #d97706"
                    : isItemHovered
                    ? `1px solid ${card.color}50`
                    : isDark
                    ? "1px solid rgba(255, 255, 255, 0.04)"
                    : "1px solid rgba(0, 0, 0, 0.04)",
                  boxShadow: isItemSelected
                    ? `0 0 10px ${card.color}35`
                    : "none",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "7px", minWidth: 0 }}>
                  {/* Step Number or Bullet Icon */}
                  {item.stepNumber ? (
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: isItemSelected
                          ? card.color
                          : isDark
                          ? `${card.color}30`
                          : `${card.color}18`,
                        color: isItemSelected ? "#ffffff" : card.color,
                        fontSize: "9.5px",
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: isItemSelected ? `0 0 8px ${card.color}` : "none",
                      }}
                    >
                      {item.stepNumber}
                    </span>
                  ) : (
                    <span
                      style={{
                        width: isItemSelected ? "8px" : "6px",
                        height: isItemSelected ? "8px" : "6px",
                        borderRadius: "50%",
                        background: card.color,
                        opacity: isItemSelected ? 1 : 0.8,
                        boxShadow: isItemSelected ? `0 0 8px ${card.color}` : "none",
                        flexShrink: 0,
                        transition: "all 0.15s ease",
                      }}
                    />
                  )}

                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: isItemSelected ? 800 : 700,
                      color: isDark
                        ? isItemSelected || isItemHovered
                          ? "#ffffff"
                          : "#f1f5f9"
                        : isItemSelected || isItemHovered
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
                  {isItemSelected && (
                    <span
                      style={{
                        fontSize: "8.5px",
                        fontWeight: 800,
                        padding: "1px 5px",
                        borderRadius: "4px",
                        background: card.color,
                        color: "#ffffff",
                      }}
                    >
                      ✓ In Notebook
                    </span>
                  )}

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

                  {/* Branch indicator if child keywords connect out from the right */}
                  {hasChildren && (
                    <span
                      style={{
                        fontSize: "8.5px",
                        fontWeight: 700,
                        padding: "1px 5px",
                        borderRadius: "4px",
                        background: isDark ? `${card.color}25` : `${card.color}18`,
                        color: card.color,
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                      title={`${item.subItems!.length} keyword branch${item.subItems!.length > 1 ? "es" : ""} connected`}
                    >
                      <span>{item.subItems!.length}</span>
                      <span style={{ fontSize: "9px" }}>→</span>
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: isDark ? "#34d399" : "#059669",
                          boxShadow: isDark
                            ? "0 0 6px rgba(52, 211, 153, 0.7)"
                            : "0 0 4px rgba(5, 150, 105, 0.5)",
                          display: "inline-block",
                        }}
                      />
                    </span>
                  )}

                  {/* Dedicated Google Search Button */}
                  <button
                    type="button"
                    title={`Search Google for "${item.label}"`}
                    onClick={(e) =>
                      handleSearch(item.searchQuery || `${item.label} JavaScript Node.js`, e)
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: "2px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                    }}
                  >
                    <ExternalLink
                      size={11}
                      color={card.color}
                      style={{
                        opacity: isItemHovered || isItemSelected ? 1 : 0.45,
                        transition: "opacity 0.15s",
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint - Clickable to open card notebook */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onCardClick?.(card, e);
        }}
        title="Click card to open in Concept Notebook"
        style={{
          padding: "6px 14px",
          borderTop: isDark
            ? "1px solid rgba(255, 255, 255, 0.05)"
            : "1px solid rgba(0, 0, 0, 0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "9.5px",
          color: isDark ? "rgba(255,255,255,0.45)" : "#64748b",
          cursor: "pointer",
        }}
      >
        <span>Click card or item for notebook • ↗ search</span>
        <span style={{ color: card.color, fontWeight: 700 }}>{card.items.length} items</span>
      </div>
    </div>
  );
};
