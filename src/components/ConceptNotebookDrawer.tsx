"use client";

import React, { useRef, useEffect } from "react";
import { SpiderNode } from "@/data/concepts";
import { PositionedNode } from "@/utils/spiderLayout";
import { getConceptStory } from "@/data/conceptStories";
import {
  ExternalLink,
  BookOpen,
  X,
  Trash2,
  Copy,
  Check,
  Sparkles,
  GitBranch,
  CornerDownRight,
  ArrowRight,
  Terminal,
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
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastCardRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest attached concept card
  useEffect(() => {
    if (selectedNodes.length > 0 && lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedNodes.length]);

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

  return (
    <aside
      aria-label="Concept Notebook"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(460px, 92vw)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDark ? "rgba(10, 14, 26, 0.94)" : "rgba(255, 255, 255, 0.96)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderLeft: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: isDark
          ? "-15px 0 45px rgba(0, 0, 0, 0.7), -1px 0 0 rgba(255, 255, 255, 0.05)"
          : "-10px 0 40px rgba(0, 0, 0, 0.12)",
        transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* ---------------------------------------------------- */}
      {/* DRAWER TOP BAR                                       */}
      {/* ---------------------------------------------------- */}
      <div
        style={{
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.08)",
          backgroundColor: isDark ? "rgba(15, 23, 42, 0.6)" : "rgba(248, 250, 252, 0.8)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              background: isDark ? "rgba(245, 158, 11, 0.18)" : "rgba(245, 158, 11, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f59e0b",
            }}
          >
            <BookOpen size={18} />
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "15px",
                fontWeight: 800,
                letterSpacing: "-0.01em",
                color: isDark ? "#ffffff" : "#0f172a",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Spider Notebook</span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  padding: "2px 7px",
                  borderRadius: "999px",
                  backgroundColor: isDark ? "rgba(56, 189, 248, 0.2)" : "rgba(2, 132, 199, 0.12)",
                  color: isDark ? "#38bdf8" : "#0284c7",
                }}
              >
                {selectedNodes.length} {selectedNodes.length === 1 ? "Dot" : "Dots"} Connected
              </span>
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: isDark ? "rgba(255,255,255,0.5)" : "var(--text-dim)",
              }}
            >
              Click related dots to chain concepts into your story
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {selectedNodes.length > 1 && (
            <button
              onClick={onClearAll}
              title="Clear all attached concepts"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 10px",
                borderRadius: "6px",
                background: "transparent",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)",
                color: isDark ? "#94a3b8" : "#64748b",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <Trash2 size={12} />
              <span>Clear</span>
            </button>
          )}

          <button
            onClick={onClose}
            title="Close Notebook"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
              border: "none",
              color: isDark ? "#cbd5e1" : "#475569",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SCROLLABLE CONCEPTS FEED                             */}
      {/* ---------------------------------------------------- */}
      <div
        ref={scrollContainerRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {selectedNodes.map((node, index) => {
          const story = getConceptStory(node, allNodes);
          const parent = node.parentId ? allNodes.find((n) => n.id === node.parentId) : undefined;
          const children = allNodes.filter((n) => n.parentId === node.id);
          const isLast = index === selectedNodes.length - 1;

          // Concept theme color
          const accentColor =
            node.category === "v8"
              ? "#ff6b6b"
              : node.category === "scope"
              ? "#fde047"
              : node.category === "node"
              ? "#34d399"
              : "#f59e0b";

          return (
            <div
              key={`${node.id}-${index}`}
              ref={isLast ? lastCardRef : null}
              style={{
                borderRadius: "14px",
                backgroundColor: isDark ? "rgba(15, 23, 42, 0.75)" : "#ffffff",
                border: isDark
                  ? `1.5px solid ${accentColor}40`
                  : `1.5px solid ${accentColor}60`,
                boxShadow: isDark
                  ? `0 8px 30px rgba(0,0,0,0.4), 0 0 20px ${accentColor}15`
                  : `0 6px 24px rgba(0,0,0,0.06), 0 0 15px ${accentColor}20`,
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
            >
              {/* CARD TOP BANNER */}
              <div
                style={{
                  padding: "14px 16px",
                  background: isDark
                    ? `linear-gradient(135deg, ${accentColor}20 0%, rgba(15, 23, 42, 0.9) 100%)`
                    : `linear-gradient(135deg, ${accentColor}15 0%, #ffffff 100%)`,
                  borderBottom: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    {story.badge && (
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          padding: "2px 7px",
                          borderRadius: "4px",
                          backgroundColor: `${accentColor}25`,
                          color: accentColor,
                        }}
                      >
                        {story.badge}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: "10.5px",
                        color: isDark ? "rgba(255,255,255,0.4)" : "#64748b",
                        fontWeight: 500,
                      }}
                    >
                      Stage {node.level} Concept
                    </span>
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: isDark ? "#ffffff" : "#0f172a",
                    }}
                  >
                    {story.title}
                  </h3>

                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: isDark ? "rgba(255,255,255,0.7)" : "#475569",
                      lineHeight: 1.35,
                    }}
                  >
                    "{story.tagline}"
                  </p>
                </div>

                {/* ATTACHED GOOGLE SEARCH BUTTON */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button
                    onClick={() => handleGoogleSearch(node)}
                    title={`Search Google for ${node.label}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "6px 10px",
                      borderRadius: "7px",
                      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                      border: `1px solid ${accentColor}55`,
                      color: isDark ? "#ffffff" : "#0f172a",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${accentColor}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
                    }}
                  >
                    <span>Google ↗</span>
                    <ExternalLink size={11} color={accentColor} />
                  </button>

                  {selectedNodes.length > 1 && (
                    <button
                      onClick={() => onRemoveNode(node.id)}
                      title="Detach from notebook"
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        background: "transparent",
                        border: "none",
                        color: isDark ? "#94a3b8" : "#94a3b8",
                        cursor: "pointer",
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* CARD BODY */}
              <div style={{ padding: "16px" }}>
                {/* 1. LINEAGE TRAIL (Parent -> Current -> Children) */}
                <div
                  style={{
                    marginBottom: "16px",
                    padding: "8px 12px",
                    borderRadius: "8px",
                    backgroundColor: isDark ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.03)",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.05)" : "1px solid rgba(0, 0, 0, 0.05)",
                    fontSize: "11.5px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <GitBranch size={13} color={accentColor} />
                    <span style={{ fontWeight: 600, color: isDark ? "#94a3b8" : "#64748b" }}>
                      Connected Path:
                    </span>

                    {parent ? (
                      <button
                        onClick={() => onSelectNode(parent)}
                        title={`Focus 1st stage parent: ${parent.label}`}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          color: isDark ? "#60a5fa" : "#0284c7",
                          fontWeight: 600,
                          fontSize: "11.5px",
                          textDecoration: "underline",
                        }}
                      >
                        {parent.label}
                      </button>
                    ) : (
                      <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>Root Hub</span>
                    )}

                    <ArrowRight size={11} color="#94a3b8" />

                    <span
                      style={{
                        fontWeight: 800,
                        color: accentColor,
                        padding: "1px 6px",
                        borderRadius: "4px",
                        backgroundColor: `${accentColor}18`,
                      }}
                    >
                      {node.label}
                    </span>

                    {children.length > 0 && (
                      <>
                        <ArrowRight size={11} color="#94a3b8" />
                        <span style={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                          {children.length} {children.length === 1 ? "Child" : "Children"}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* 2. THE FUNNY STORY */}
                <div style={{ marginBottom: "18px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "8px",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: isDark ? "#f1f5f9" : "#1e293b",
                    }}
                  >
                    <span>🍿</span>
                    <span>The Funny Real-World Story</span>
                  </div>

                  <div
                    style={{
                      fontSize: "12.5px",
                      lineHeight: 1.6,
                      color: isDark ? "#cbd5e1" : "#334155",
                      whiteSpace: "pre-line",
                      padding: "12px 14px",
                      borderRadius: "8px",
                      backgroundColor: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
                      borderLeft: `3px solid ${accentColor}`,
                    }}
                  >
                    {story.funnyStory}
                  </div>
                </div>

                {/* 3. FUNNY & PRACTICAL CODE EXAMPLE */}
                <div style={{ marginBottom: "18px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: isDark ? "#f1f5f9" : "#1e293b",
                      }}
                    >
                      <Terminal size={14} color={accentColor} />
                      <span>{story.codeExample.title}</span>
                    </div>

                    <button
                      onClick={() => handleCopyCode(node.id, story.codeExample.code)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        background: "transparent",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                        color: isDark ? "#94a3b8" : "#64748b",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {copiedId === node.id ? (
                        <>
                          <Check size={11} color="#22c55e" />
                          <span style={{ color: "#22c55e" }}>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={11} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Code Block */}
                  <div
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#090d16",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "6px 10px",
                        backgroundColor: "#0d1322",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f59e0b" }} />
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981" }} />
                      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", marginLeft: "4px" }}>
                        javascript-runtime.js
                      </span>
                    </div>

                    <pre
                      style={{
                        margin: 0,
                        padding: "12px",
                        fontSize: "11.5px",
                        fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, monospace",
                        color: "#e2e8f0",
                        lineHeight: 1.5,
                        overflowX: "auto",
                      }}
                    >
                      <code>{story.codeExample.code}</code>
                    </pre>

                    {story.codeExample.output && (
                      <div
                        style={{
                          padding: "8px 12px",
                          backgroundColor: "#0b0f19",
                          borderTop: "1px dashed rgba(255, 255, 255, 0.1)",
                          fontSize: "11px",
                          fontFamily: "monospace",
                          color: "#38bdf8",
                        }}
                      >
                        <span style={{ color: "#94a3b8" }}>Output: </span>
                        {story.codeExample.output}
                      </div>
                    )}
                  </div>

                  <p
                    style={{
                      margin: "6px 0 0 0",
                      fontSize: "11px",
                      color: isDark ? "rgba(255,255,255,0.5)" : "#64748b",
                      lineHeight: 1.4,
                    }}
                  >
                    💡 {story.codeExample.explanation}
                  </p>
                </div>

                {/* 4. ATTACH CONNECTED DOTS (Interactive Pills to chain concepts) */}
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: isDark ? "#f1f5f9" : "#1e293b",
                      marginBottom: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Sparkles size={13} color={accentColor} />
                    <span>Connect More Dots into Notebook:</span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {/* Parent dot pill */}
                    {parent && (
                      <button
                        onClick={() => onSelectNode(parent)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "4px 9px",
                          borderRadius: "6px",
                          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                          border: `1px solid ${accentColor}40`,
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        <span style={{ fontSize: "10px", color: accentColor }}>▲ Parent:</span>
                        <span>{parent.label}</span>
                      </button>
                    )}

                    {/* Children dot pills */}
                    {children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => onSelectNode(child)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "4px 9px",
                          borderRadius: "6px",
                          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                          border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)",
                          color: isDark ? "#e2e8f0" : "#1e293b",
                          fontSize: "11px",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = accentColor;
                          e.currentTarget.style.backgroundColor = `${accentColor}15`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)";
                          e.currentTarget.style.backgroundColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
                        }}
                      >
                        <CornerDownRight size={10} color={accentColor} />
                        <span>{child.label}</span>
                        {child.badge && (
                          <span
                            style={{
                              fontSize: "9px",
                              color: accentColor,
                              fontWeight: 700,
                            }}
                          >
                            [{child.badge}]
                          </span>
                        )}
                      </button>
                    ))}

                    {children.length === 0 && !parent && (
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                        All primary spokes connected.
                      </span>
                    )}
                  </div>
                </div>

                {/* 5. MEMORY TAKEAWAY */}
                <div
                  style={{
                    marginTop: "14px",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    backgroundColor: isDark ? "rgba(245, 158, 11, 0.08)" : "rgba(245, 158, 11, 0.06)",
                    border: "1px solid rgba(245, 158, 11, 0.2)",
                    fontSize: "11.5px",
                    color: isDark ? "#fef08a" : "#b45309",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>🎯</span>
                  <span><strong>Key Takeaway:</strong> {story.takeaway}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
