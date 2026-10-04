"use client";

import React, { useRef, useEffect, useState } from "react";
import { SpiderNode } from "@/data/concepts";
import { PositionedNode } from "@/utils/spiderLayout";
import { getConceptTakeaways, TakeawayPrompt } from "@/data/conceptStories";
import {
  ExternalLink,
  X,
  Trash2,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Bookmark,
  MessageSquare,
  Search,
} from "lucide-react";

interface ConceptNotebookDrawerProps {
  selectedNodes: PositionedNode[];
  allNodes: SpiderNode[];
  theme: "light" | "dark";
  isOpen: boolean;
  onClose: () => void;
  onSelectNode: (node: SpiderNode) => void;
  onRemoveNode: (nodeId: string) => void;
  onClearAll: () => void;
  onClearAndClose?: () => void;
}

export const ConceptNotebookDrawer: React.FC<ConceptNotebookDrawerProps> = ({
  selectedNodes,
  allNodes,
  theme,
  isOpen,
  onClose,
  onSelectNode,
  onRemoveNode,
  onClearAll,
  onClearAndClose,
}) => {
  const isDark = theme === "dark";

  // Responsive mobile state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 680);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Accordion state: set of expanded node IDs
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    return new Set(selectedNodes.map((n) => n.id));
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  // Auto-expand newly selected/attached nodes and scroll to them
  useEffect(() => {
    if (selectedNodes.length > 0) {
      const latest = selectedNodes[selectedNodes.length - 1];
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.add(latest.id);
        return next;
      });

      if (lastCardRef.current) {
        lastCardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedNodes.length]);

  const toggleAccordion = (nodeId: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const handleToggleAll = () => {
    if (expandedIds.size === selectedNodes.length) {
      setExpandedIds(new Set());
    } else {
      setExpandedIds(new Set(selectedNodes.map((n) => n.id)));
    }
  };

  const handleGoogleSearchPrompt = (prompt: string) => {
    const url = `https://www.google.com/search?q=${encodeURIComponent(prompt)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleGoogleNodeSearch = (node: SpiderNode) => {
    const query = node.searchQuery || `${node.label} JavaScript Node.js`;
    handleGoogleSearchPrompt(query);
  };

  if (!isOpen || selectedNodes.length === 0) return null;

  const allExpanded = expandedIds.size === selectedNodes.length;

  // Classic Twitter Design Tokens
  const twitterFont =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
  const bgMain = isDark ? "#000000" : "#ffffff";
  const borderSubtle = isDark ? "rgb(47, 51, 54)" : "rgb(239, 243, 244)";
  const borderPill = isDark ? "#2f3336" : "#cfd9de";
  const textPrimary = isDark ? "#e7e9ea" : "#0f1419";
  const textSecondary = isDark ? "#71767b" : "#536471";
  const twitterBlue = "#1d9bf0";
  const pillBg = isDark ? "#16181c" : "#f7f9f9";
  const threadLineColor = isDark ? "#333639" : "#cfd9de";

  return (
    <>
      {/* Mobile Backdrop Overlay - Tapping outside closes the drawer */}
      {isMobile && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            zIndex: 49,
          }}
        />
      )}

      <aside
        aria-label="Concept Notebook"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: isMobile ? "100vw" : "min(620px, 45vw)",
          minWidth: isMobile ? "100vw" : "520px",
          maxWidth: "100vw",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          backgroundColor: bgMain,
          borderLeft: isMobile ? "none" : `1px solid ${borderSubtle}`,
          boxShadow: isDark
            ? "-10px 0 40px rgba(0, 0, 0, 0.9)"
            : "-6px 0 30px rgba(0, 0, 0, 0.1)",
          fontFamily: twitterFont,
          transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* ---------------------------------------------------- */}
        {/* TOP BAR: ROBUST, RESPONSIVE, NEVER OVERFLOWS        */}
        {/* ---------------------------------------------------- */}
        <div
          style={{
            padding: isMobile ? "10px 14px" : "14px 18px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderBottom: `1px solid ${borderSubtle}`,
            backgroundColor: bgMain,
            position: "sticky",
            top: 0,
            zIndex: 20,
            flexShrink: 0,
          }}
        >
          {/* Row 1: Brand/Title + Clear & Close Buttons (PINNED TO CORNER) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              gap: "8px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: isDark ? "#16181c" : "#f7f9f9",
                  border: `1px solid ${borderPill}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: twitterBlue,
                  flexShrink: 0,
                }}
              >
                <Bookmark size={15} />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0 }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: isMobile ? "15px" : "17px",
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                    color: textPrimary,
                    whiteSpace: "nowrap",
                  }}
                >
                  Thread Prompts
                </h2>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "1px 7px",
                    borderRadius: "9999px",
                    backgroundColor: isDark ? "rgba(29, 155, 240, 0.15)" : "rgba(29, 155, 240, 0.1)",
                    color: twitterBlue,
                    whiteSpace: "nowrap",
                  }}
                >
                  {selectedNodes.length} {selectedNodes.length === 1 ? "Post" : "Posts"}
                </span>
              </div>
            </div>

            {/* Right: Unblur & Close Actions (Always visible, cannot be pushed off-screen!) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              {/* Dedicated Clear & Unblur Action Button */}
              <button
                onClick={onClearAndClose || onClearAll}
                title="Exit focus, unblur canvas, and close sidebar"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: isMobile ? "4px 8px" : "5px 12px",
                  borderRadius: "9999px",
                  backgroundColor: isDark ? "rgba(244, 33, 46, 0.14)" : "rgba(244, 33, 46, 0.08)",
                  border: isDark ? "1px solid rgba(244, 33, 46, 0.4)" : "1px solid rgba(244, 33, 46, 0.25)",
                  color: isDark ? "#ff6b6b" : "#e11d48",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s ease",
                }}
              >
                <Trash2 size={11} />
                <span>Clear & Unblur</span>
              </button>

              {/* Close Button (X) - FIXED PINNED TOUCH TARGET */}
              <button
                onClick={onClose}
                title="Close sidebar"
                aria-label="Close sidebar"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                  border: `1px solid ${borderPill}`,
                  color: textPrimary,
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "background-color 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#272c30" : "#e7e7e8";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)";
                }}
              >
                <X size={17} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* Row 2: Secondary Controls (Tip & Expand/Collapse All) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "11.5px",
                color: textSecondary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Click any takeaway to Google search prompt
            </span>

            <button
              onClick={handleToggleAll}
              title={allExpanded ? "Collapse All Cards" : "Expand All Cards"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                padding: "3px 10px",
                borderRadius: "9999px",
                background: "transparent",
                border: `1px solid ${borderPill}`,
                color: twitterBlue,
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <ChevronsUpDown size={11} />
              <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SCROLLABLE FEED OF THREAD CARDS                      */}
        {/* ---------------------------------------------------- */}
        <div
          ref={scrollContainerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: isMobile ? "12px 12px 80px 12px" : "16px 20px 80px 20px",
            display: "flex",
            flexDirection: "column",
            gap: isMobile ? "12px" : "0px",
          }}
        >
          {selectedNodes.map((node, index) => {
            const conceptData = getConceptTakeaways(node, allNodes);
            const parent = node.parentId ? allNodes.find((n) => n.id === node.parentId) : undefined;
            const children = allNodes.filter((n) => n.parentId === node.id);
            const isLast = index === selectedNodes.length - 1;
            const isExpanded = expandedIds.has(node.id);

            // Category monogram and color
            const catColor =
              node.category === "v8"
                ? "#f91880"
                : node.category === "scope"
                ? "#ffd400"
                : node.category === "node"
                ? "#00ba7c"
                : twitterBlue;

            const catInitial =
              node.category === "v8"
                ? "V8"
                : node.category === "scope"
                ? "SC"
                : node.category === "node"
                ? "ND"
                : "JS";

            return (
              <div
                key={`${node.id}-${index}`}
                ref={isLast ? lastCardRef : null}
                style={{
                  display: "flex",
                  gap: isMobile ? "0px" : "14px",
                  position: "relative",
                  width: "100%",
                }}
              >
                {/* ---------------------------------------------- */}
                {/* LEFT COLUMN: AVATAR & THREAD LINE (Desktop)    */}
                {/* ---------------------------------------------- */}
                {!isMobile && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "36px",
                      flexShrink: 0,
                    }}
                  >
                    {/* Circular Avatar */}
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: isDark ? "#16181c" : "#f7f9f9",
                        border: `1.5px solid ${catColor}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 800,
                        color: catColor,
                        flexShrink: 0,
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      }}
                    >
                      {catInitial}
                    </div>

                    {/* Vertical Thread Connector Line */}
                    {!isLast && (
                      <div
                        style={{
                          width: "2px",
                          flex: 1,
                          backgroundColor: threadLineColor,
                          margin: "4px 0",
                          minHeight: "24px",
                        }}
                      />
                    )}
                  </div>
                )}

                {/* ---------------------------------------------- */}
                {/* CARD CONTENT (FULL WIDTH ON MOBILE & DESKTOP)  */}
                {/* ---------------------------------------------- */}
                <div
                  style={{
                    flex: 1,
                    paddingBottom: isMobile ? "0px" : isLast ? "16px" : "20px",
                    minWidth: 0,
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "14px",
                      backgroundColor: bgMain,
                      border: `1px solid ${borderSubtle}`,
                      overflow: "hidden",
                      transition: "border-color 0.15s ease",
                      width: "100%",
                    }}
                  >
                    {/* CARD HEADER */}
                    <div
                      onClick={() => toggleAccordion(node.id)}
                      role="button"
                      tabIndex={0}
                      aria-expanded={isExpanded}
                      style={{
                        padding: isMobile ? "10px 12px" : "12px 16px",
                        cursor: "pointer",
                        userSelect: "none",
                        backgroundColor: isDark ? "rgba(255,255,255,0.015)" : "#fafbfc",
                        borderBottom: isExpanded ? `1px solid ${borderSubtle}` : "none",
                      }}
                    >
                      {/* Top Row in Card: Avatar (mobile) + Title + Actions */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "8px",
                          width: "100%",
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              flexWrap: "wrap",
                              lineHeight: 1.3,
                            }}
                          >
                            {/* Inline Avatar on Mobile */}
                            {isMobile && (
                              <div
                                style={{
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "50%",
                                  backgroundColor: isDark ? "#16181c" : "#f7f9f9",
                                  border: `1.5px solid ${catColor}`,
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "9px",
                                  fontWeight: 800,
                                  color: catColor,
                                  flexShrink: 0,
                                  marginRight: "2px",
                                }}
                              >
                                {catInitial}
                              </div>
                            )}

                            <span
                              style={{
                                fontSize: isMobile ? "14.5px" : "16px",
                                fontWeight: 700,
                                color: textPrimary,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {node.label}
                            </span>

                            {/* Category Badge */}
                            <span
                              style={{
                                fontSize: "10.5px",
                                fontWeight: 600,
                                padding: "1px 6px",
                                borderRadius: "9999px",
                                backgroundColor: isDark ? "rgba(29, 155, 240, 0.15)" : "rgba(29, 155, 240, 0.1)",
                                color: twitterBlue,
                              }}
                            >
                              {conceptData.badge || "Concept"}
                            </span>

                            <span
                              style={{
                                fontSize: "12px",
                                color: textSecondary,
                                fontWeight: 400,
                              }}
                            >
                              @stage{node.level}
                            </span>
                          </div>

                          {/* Tagline - FULL WIDTH, NEVER WRAPS WORD-BY-WORD */}
                          <p
                            style={{
                              margin: "4px 0 0 0",
                              fontSize: isMobile ? "12.5px" : "13.5px",
                              color: textSecondary,
                              lineHeight: 1.4,
                              width: "100%",
                              display: "block",
                            }}
                          >
                            {conceptData.tagline}
                          </p>
                        </div>

                        {/* Top-Right Actions */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            flexShrink: 0,
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleGoogleNodeSearch(node)}
                            title={`Search Google for ${node.label}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px",
                              padding: isMobile ? "3px 8px" : "4px 10px",
                              borderRadius: "9999px",
                              backgroundColor: "transparent",
                              border: `1px solid ${borderPill}`,
                              color: textPrimary,
                              fontSize: isMobile ? "11px" : "12px",
                              fontWeight: 700,
                              cursor: "pointer",
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = isDark ? "#16181c" : "#eff3f4";
                              e.currentTarget.style.borderColor = twitterBlue;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.borderColor = borderPill;
                            }}
                          >
                            <span>Google</span>
                            <ExternalLink size={9} color={twitterBlue} />
                          </button>

                          {/* Accordion Arrow Indicator */}
                          <div
                            style={{
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: textSecondary,
                            }}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>

                          {selectedNodes.length > 1 && (
                            <button
                              onClick={() => onRemoveNode(node.id)}
                              title="Remove from thread"
                              style={{
                                padding: "4px",
                                borderRadius: "50%",
                                background: "transparent",
                                border: "none",
                                color: textSecondary,
                                cursor: "pointer",
                              }}
                            >
                              <X size={13} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* -------------------------------------------------- */}
                      {/* 2-SECTION BADGES: PARENT & CHILDREN                */}
                      {/* -------------------------------------------------- */}
                      <div
                        style={{
                          marginTop: "8px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* SECTION 1: PARENT BADGE with 🗿 / 🗼 */}
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "11.5px", fontWeight: 600, color: textSecondary }}>
                            🗿 Parent:
                          </span>

                          {parent ? (
                            <button
                              onClick={() => onSelectNode(parent)}
                              title={`Chain parent: ${parent.label}`}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 8px",
                                borderRadius: "9999px",
                                backgroundColor: pillBg,
                                border: `1px solid ${borderPill}`,
                                color: twitterBlue,
                                fontSize: "11.5px",
                                fontWeight: 600,
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = isDark ? "#1d9bf020" : "#1d9bf010";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = pillBg;
                              }}
                            >
                              <span>🗼</span>
                              <span>{parent.label}</span>
                              {parent.badge && (
                                <span style={{ fontSize: "10px", color: textSecondary }}>
                                  · {parent.badge}
                                </span>
                              )}
                            </button>
                          ) : (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 8px",
                                borderRadius: "9999px",
                                backgroundColor: pillBg,
                                border: `1px solid ${borderPill}`,
                                color: textSecondary,
                                fontSize: "11.5px",
                              }}
                            >
                              <span>🗼</span>
                              <span>Root Origin</span>
                            </span>
                          )}
                        </div>

                        {/* SECTION 2: CHILDREN BADGES with 🗽 / 🗾 / 😀 / 😁 / 😂 / 🗻 */}
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", flexWrap: "wrap" }}>
                          <span
                            style={{
                              fontSize: "11.5px",
                              fontWeight: 600,
                              color: textSecondary,
                              paddingTop: "2px",
                            }}
                          >
                            🗽 Children ({children.length}):
                          </span>

                          {children.length > 0 ? (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", flex: 1 }}>
                              {children.map((child, cIdx) => {
                                const emojis = ["🗽", "🗾", "😀", "😁", "😂", "🗻", "🗼", "🗿"];
                                const emoji = emojis[cIdx % emojis.length];

                                return (
                                  <button
                                    key={child.id}
                                    onClick={() => onSelectNode(child)}
                                    title={`Chain child: ${child.label}`}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "3px",
                                      padding: "2px 7px",
                                      borderRadius: "9999px",
                                      backgroundColor: pillBg,
                                      border: `1px solid ${borderPill}`,
                                      color: textPrimary,
                                      fontSize: "11px",
                                      fontWeight: 500,
                                      cursor: "pointer",
                                      transition: "all 0.15s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.borderColor = twitterBlue;
                                      e.currentTarget.style.color = twitterBlue;
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.borderColor = borderPill;
                                      e.currentTarget.style.color = textPrimary;
                                    }}
                                  >
                                    <span>{emoji}</span>
                                    <span>{child.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 8px",
                                borderRadius: "9999px",
                                backgroundColor: pillBg,
                                border: `1px solid ${borderPill}`,
                                color: textSecondary,
                                fontSize: "11px",
                                fontStyle: "italic",
                              }}
                            >
                              <span>😂</span>
                              <span>Leaf Concept</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* EXPANDED CONTENT: 3 PROMPT TAKEAWAYS               */}
                    {/* -------------------------------------------------- */}
                    {isExpanded && (
                      <div style={{ padding: isMobile ? "10px 12px 14px 12px" : "12px 16px 16px 16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11.5px",
                              fontWeight: 700,
                              color: textSecondary,
                              textTransform: "uppercase",
                              letterSpacing: "0.04em",
                            }}
                          >
                            Top 3 Community Prompts
                          </span>
                          <span style={{ fontSize: "11px", color: textSecondary }}>
                            Click to Google Prompt ↗
                          </span>
                        </div>

                        {/* List of 3 Key Takeaways */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {conceptData.takeaways.map((takeaway, tIdx) => (
                            <div
                              key={takeaway.id || tIdx}
                              onClick={() => handleGoogleSearchPrompt(takeaway.searchPrompt)}
                              role="button"
                              tabIndex={0}
                              title={`Search Google: "${takeaway.searchPrompt}"`}
                              style={{
                                padding: "10px 12px",
                                borderRadius: "10px",
                                border: `1px solid ${borderSubtle}`,
                                backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#ffffff",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                                display: "flex",
                                flexDirection: "column",
                                gap: "6px",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = twitterBlue;
                                e.currentTarget.style.backgroundColor = isDark ? "#16181c" : "#f7f9f9";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = borderSubtle;
                                e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.02)" : "#ffffff";
                              }}
                            >
                              {/* Takeaway Text (Strictly <= 100 characters) */}
                              <div
                                style={{
                                  fontSize: isMobile ? "13.5px" : "14.5px",
                                  lineHeight: 1.45,
                                  color: textPrimary,
                                  fontWeight: 500,
                                }}
                              >
                                {takeaway.text}
                              </div>

                              {/* Takeaway Footer: Emoji Reactions & Action */}
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginTop: "2px",
                                }}
                              >
                                {/* Emojis Reaction Count */}
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "3px",
                                      fontSize: "11.5px",
                                      fontWeight: 700,
                                      color: textPrimary,
                                      backgroundColor: isDark ? "#1f242c" : "#eff3f4",
                                      padding: "2px 7px",
                                      borderRadius: "9999px",
                                    }}
                                  >
                                    <span>{takeaway.emoji}</span>
                                    <span>{takeaway.reactionCount}</span>
                                  </span>

                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "3px",
                                      fontSize: "11px",
                                      color: textSecondary,
                                    }}
                                  >
                                    <MessageSquare size={11} />
                                    <span>{takeaway.commentCount}</span>
                                  </span>
                                </div>

                                {/* Search Prompt Trigger Hint */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "3px",
                                    fontSize: "11px",
                                    color: twitterBlue,
                                    fontWeight: 600,
                                  }}
                                >
                                  <Search size={11} />
                                  <span>Google Prompt ↗</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
