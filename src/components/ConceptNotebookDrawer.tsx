"use client";

import React, { useRef, useEffect, useState } from "react";
import { SpiderNode } from "@/data/concepts";
import { PositionedNode } from "@/utils/spiderLayout";
import { getConceptStory } from "@/data/conceptStories";
import {
  ExternalLink,
  X,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Terminal,
  Bookmark,
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
}) => {
  const isDark = theme === "dark";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Accordion state: set of expanded node IDs
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    return new Set(selectedNodes.map((n) => n.id));
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  // Auto-expand any newly selected/attached nodes and scroll to them
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

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGoogleSearch = (node: SpiderNode) => {
    const query = node.searchQuery || `${node.label} JavaScript Node.js`;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!isOpen || selectedNodes.length === 0) return null;

  const allExpanded = expandedIds.size === selectedNodes.length;

  // Twitter/X Design Tokens
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
    <aside
      aria-label="Concept Notebook"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(480px, 94vw)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        backgroundColor: bgMain,
        borderLeft: `1px solid ${borderSubtle}`,
        boxShadow: isDark
          ? "-8px 0 35px rgba(0, 0, 0, 0.85)"
          : "-4px 0 25px rgba(0, 0, 0, 0.08)",
        fontFamily: twitterFont,
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* ---------------------------------------------------- */}
      {/* TWITTER-STYLE DRAWER HEADER                          */}
      {/* ---------------------------------------------------- */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${borderSubtle}`,
          backgroundColor: bgMain,
          position: "sticky",
          top: 0,
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: isDark ? "#16181c" : "#f7f9f9",
              border: `1px solid ${borderPill}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: twitterBlue,
            }}
          >
            <Bookmark size={16} />
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                color: textPrimary,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>Thread Notebook</span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "1px 8px",
                  borderRadius: "9999px",
                  backgroundColor: isDark ? "rgba(29, 155, 240, 0.15)" : "rgba(29, 155, 240, 0.1)",
                  color: twitterBlue,
                }}
              >
                {selectedNodes.length} {selectedNodes.length === 1 ? "Post" : "Posts"}
              </span>
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: textSecondary,
              }}
            >
              Connected knowledge thread
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/* Expand / Collapse All Pill */}
          <button
            onClick={handleToggleAll}
            title={allExpanded ? "Collapse All Cards" : "Expand All Cards"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: "5px 12px",
              borderRadius: "9999px",
              background: "transparent",
              border: `1px solid ${borderPill}`,
              color: textPrimary,
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "#16181c" : "#eff3f4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <ChevronsUpDown size={12} color={twitterBlue} />
            <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
          </button>

          {selectedNodes.length > 1 && (
            <button
              onClick={onClearAll}
              title="Clear all attached concepts"
              style={{
                padding: "6px 8px",
                borderRadius: "9999px",
                background: "transparent",
                border: "none",
                color: textSecondary,
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#f4212e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textSecondary;
              }}
            >
              <Trash2 size={14} />
            </button>
          )}

          <button
            onClick={onClose}
            title="Close Notebook"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
              color: textPrimary,
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "#16181c" : "#eff3f4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* TWITTER-STYLE THREAD STREAM                          */}
      {/* ---------------------------------------------------- */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 16px 80px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        {selectedNodes.map((node, index) => {
          const story = getConceptStory(node, allNodes);
          const parent = node.parentId ? allNodes.find((n) => n.id === node.parentId) : undefined;
          const children = allNodes.filter((n) => n.parentId === node.id);
          const isLast = index === selectedNodes.length - 1;
          const isExpanded = expandedIds.has(node.id);

          // Subtle category monogram color
          const catColor =
            node.category === "v8"
              ? "#f91880" // Twitter Hot Pink
              : node.category === "scope"
              ? "#ffd400" // Twitter Gold
              : node.category === "node"
              ? "#00ba7c" // Twitter Mint
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
                gap: "12px",
                position: "relative",
              }}
            >
              {/* ---------------------------------------------- */}
              {/* LEFT COLUMN: AVATAR & VERTICAL THREAD LINE     */}
              {/* ---------------------------------------------- */}
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

              {/* ---------------------------------------------- */}
              {/* RIGHT COLUMN: TWEET CARD BODY                  */}
              {/* ---------------------------------------------- */}
              <div
                style={{
                  flex: 1,
                  paddingBottom: isLast ? "16px" : "20px",
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    borderRadius: "14px",
                    backgroundColor: bgMain,
                    border: `1px solid ${borderSubtle}`,
                    overflow: "hidden",
                    transition: "border-color 0.15s ease",
                  }}
                >
                  {/* CARD HEADER (Twitter Post Header) */}
                  <div
                    onClick={() => toggleAccordion(node.id)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    style={{
                      padding: "12px 14px",
                      cursor: "pointer",
                      userSelect: "none",
                      backgroundColor: isDark ? "rgba(255,255,255,0.015)" : "#fafbfc",
                      borderBottom: isExpanded ? `1px solid ${borderSubtle}` : "none",
                    }}
                  >
                    {/* Header Row: Title, Metadata, Search Button */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            flexWrap: "wrap",
                            lineHeight: 1.3,
                          }}
                        >
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: 700,
                              color: textPrimary,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {node.label}
                          </span>

                          {/* Verified-style Badge */}
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              padding: "1px 6px",
                              borderRadius: "9999px",
                              backgroundColor: isDark ? "rgba(29, 155, 240, 0.15)" : "rgba(29, 155, 240, 0.1)",
                              color: twitterBlue,
                            }}
                          >
                            {story.badge || "Concept"}
                          </span>

                          <span
                            style={{
                              fontSize: "13px",
                              color: textSecondary,
                              fontWeight: 400,
                            }}
                          >
                            @stage{node.level}
                          </span>
                        </div>

                        {/* Tagline */}
                        <p
                          style={{
                            margin: "4px 0 0 0",
                            fontSize: "14px",
                            color: textSecondary,
                            lineHeight: 1.4,
                          }}
                        >
                          {story.tagline}
                        </p>
                      </div>

                      {/* Header Actions: Google Search & Close */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          flexShrink: 0,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Twitter Pill Button for Google Search */}
                        <button
                          onClick={() => handleGoogleSearch(node)}
                          title={`Search Google for ${node.label}`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            backgroundColor: "transparent",
                            border: `1px solid ${borderPill}`,
                            color: textPrimary,
                            fontSize: "12px",
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
                          <ExternalLink size={10} color={twitterBlue} />
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
                    {/* 2-SECTION BADGES: PARENT & CHILDREN (Twitter Pills) */}
                    {/* -------------------------------------------------- */}
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* SECTION 1: PARENT BADGE with 🗿 / 🗼 */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: textSecondary }}>
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
                              fontSize: "12px",
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
                              fontSize: "12px",
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
                            fontSize: "12px",
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
                                    gap: "4px",
                                    padding: "2px 8px",
                                    borderRadius: "9999px",
                                    backgroundColor: pillBg,
                                    border: `1px solid ${borderPill}`,
                                    color: textPrimary,
                                    fontSize: "12px",
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
                              fontSize: "12px",
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
                  {/* EXPANDED CONTENT: CLEAN TWITTER THREAD ARTICLE     */}
                  {/* -------------------------------------------------- */}
                  {isExpanded && (
                    <div style={{ padding: "14px 16px 18px 16px" }}>
                      {/* 1. THE FUNNY REAL-WORLD STORY (Twitter Tweet Font: 15px, 1.5 line-height) */}
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginBottom: "6px",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: textSecondary,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                          }}
                        >
                          <span>🍿</span>
                          <span>The Story</span>
                        </div>

                        <div
                          style={{
                            fontSize: "15px",
                            lineHeight: 1.55,
                            color: textPrimary,
                            whiteSpace: "pre-line",
                          }}
                        >
                          {story.funnyStory}
                        </div>
                      </div>

                      {/* 2. DEVELOPER EMBED: CLEAN GITHUB/TWITTER CODE CARD */}
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            borderRadius: "10px",
                            backgroundColor: isDark ? "#16181c" : "#f6f8fa",
                            border: `1px solid ${borderSubtle}`,
                            overflow: "hidden",
                          }}
                        >
                          {/* Code Bar */}
                          <div
                            style={{
                              padding: "6px 12px",
                              borderBottom: `1px solid ${borderSubtle}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <Terminal size={13} color={textSecondary} />
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  color: textSecondary,
                                  fontFamily: "monospace",
                                }}
                              >
                                {story.codeExample.title || "javascript-runtime.js"}
                              </span>
                            </div>

                            <button
                              onClick={() => handleCopyCode(node.id, story.codeExample.code)}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "4px",
                                padding: "2px 8px",
                                borderRadius: "9999px",
                                background: "transparent",
                                border: `1px solid ${borderPill}`,
                                color: textSecondary,
                                fontSize: "11px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              {copiedId === node.id ? (
                                <>
                                  <Check size={11} color="#00ba7c" />
                                  <span style={{ color: "#00ba7c" }}>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={11} />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Code Content */}
                          <pre
                            style={{
                              margin: 0,
                              padding: "12px 14px",
                              fontSize: "12.5px",
                              fontFamily:
                                "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
                              color: isDark ? "#e2e8f0" : "#24292f",
                              lineHeight: 1.5,
                              overflowX: "auto",
                            }}
                          >
                            <code>{story.codeExample.code}</code>
                          </pre>

                          {/* Output Line */}
                          {story.codeExample.output && (
                            <div
                              style={{
                                padding: "8px 14px",
                                borderTop: `1px solid ${borderSubtle}`,
                                backgroundColor: isDark ? "#0f1419" : "#ffffff",
                                fontSize: "12px",
                                fontFamily: "monospace",
                                color: twitterBlue,
                              }}
                            >
                              <span style={{ color: textSecondary }}>Output: </span>
                              {story.codeExample.output}
                            </div>
                          )}
                        </div>

                        <p
                          style={{
                            margin: "6px 0 0 0",
                            fontSize: "13px",
                            color: textSecondary,
                            lineHeight: 1.4,
                          }}
                        >
                          💡 {story.codeExample.explanation}
                        </p>
                      </div>

                      {/* 3. TWITTER QUOTE-TWEET STYLE: KEY TAKEAWAY */}
                      <div
                        style={{
                          padding: "10px 14px",
                          borderRadius: "12px",
                          border: `1px solid ${borderSubtle}`,
                          backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f7f9f9",
                          fontSize: "14px",
                          color: textPrimary,
                          lineHeight: 1.45,
                        }}
                      >
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: 700,
                            color: textSecondary,
                            marginBottom: "2px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <span>🎯</span>
                          <span>Key Takeaway</span>
                        </div>
                        <div>{story.takeaway}</div>
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
  );
};
