"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ConceptCategory, CONCEPT_TABS } from "@/data/concepts";
import { CS_KNOWLEDGE_TREE, CSTreeLayer, CSTreeTopic } from "@/data/csKnowledgeTree";
import {
  X,
  Search,
  Sparkles,
  Star,
  Compass,
  Lock,
  CheckCircle2,
  FolderTree,
  ArrowRight,
  Layers,
  Binary,
  Code,
  Cpu,
  Network,
  Wrench,
  ShieldCheck,
  Check,
} from "lucide-react";

interface CSTreeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCategory: ConceptCategory;
  onSelectCategory: (category: ConceptCategory) => void;
  theme: "light" | "dark";
}

export const CSTreeModal: React.FC<CSTreeModalProps> = ({
  isOpen,
  onClose,
  currentCategory,
  onSelectCategory,
  theme,
}) => {
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLayerFilter, setActiveLayerFilter] = useState<string>("all");

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const queryLower = searchQuery.trim().toLowerCase();

  const { activeCount, totalTopicsCount } = useMemo(() => {
    let active = 0;
    let total = 0;
    CS_KNOWLEDGE_TREE.forEach((layer) => {
      layer.subcategories.forEach((subcat) => {
        subcat.topics.forEach((topic) => {
          total++;
          if (topic.isAvailable) active++;
        });
      });
    });
    return { activeCount: active, totalTopicsCount: total };
  }, []);

  // Filter layers and topics based on search query and active tab
  const filteredLayers = useMemo(() => {
    return CS_KNOWLEDGE_TREE.map((layer) => {
      // Check layer filter
      if (activeLayerFilter !== "all") {
        if (activeLayerFilter === "active") {
          // Keep only subcategories that contain active topics
          const subcatsWithActive = layer.subcategories
            .map((subcat) => ({
              ...subcat,
              topics: subcat.topics.filter((t) => t.isAvailable),
            }))
            .filter((subcat) => subcat.topics.length > 0);

          return {
            ...layer,
            subcategories: subcatsWithActive,
          };
        } else if (layer.id !== activeLayerFilter) {
          return null;
        }
      }

      if (!queryLower) return layer;

      // Filter subcategories by search
      const matchingSubcategories = layer.subcategories
        .map((subcat) => {
          const matchSubcatTitle = subcat.name.toLowerCase().includes(queryLower);
          const matchingTopics = subcat.topics.filter(
            (topic) =>
              topic.name.toLowerCase().includes(queryLower) ||
              (topic.description && topic.description.toLowerCase().includes(queryLower)) ||
              (topic.badge && topic.badge.toLowerCase().includes(queryLower)) ||
              matchSubcatTitle
          );

          if (matchingTopics.length > 0) {
            return {
              ...subcat,
              topics: matchingTopics,
            };
          }
          return null;
        })
        .filter(Boolean) as CSTreeLayer["subcategories"];

      const matchLayerTitle =
        layer.name.toLowerCase().includes(queryLower) ||
        layer.badge.toLowerCase().includes(queryLower) ||
        layer.description.toLowerCase().includes(queryLower);

      if (matchingSubcategories.length > 0) {
        return {
          ...layer,
          subcategories: matchingSubcategories,
        };
      } else if (matchLayerTitle) {
        return layer;
      }
      return null;
    }).filter(Boolean) as CSTreeLayer[];
  }, [queryLower, activeLayerFilter]);

  if (!isOpen) return null;

  const getLayerIcon = (layerId: string) => {
    switch (layerId) {
      case "layer-1-theory":
        return <Binary size={18} />;
      case "layer-2-programming":
        return <Code size={18} />;
      case "layer-3-systems":
        return <Cpu size={18} />;
      case "layer-4-engineering":
        return <Network size={18} />;
      case "layer-5-specializations":
        return <Layers size={18} />;
      case "layer-6-tools":
        return <Wrench size={18} />;
      default:
        return <ShieldCheck size={18} />;
    }
  };

  const handleSelectTopic = (topic: CSTreeTopic) => {
    if (topic.isAvailable && topic.categoryId) {
      onSelectCategory(topic.categoryId);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: isDark ? "rgba(3, 7, 18, 0.82)" : "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        animation: "fadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "1160px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          borderRadius: "24px",
          background: isDark
            ? "linear-gradient(155deg, rgba(15, 23, 42, 0.96) 0%, rgba(9, 14, 28, 0.98) 100%)"
            : "linear-gradient(155deg, #ffffff 0%, #f8fafc 100%)",
          border: isDark
            ? "1px solid rgba(255, 255, 255, 0.12)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isDark
            ? "0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(56, 189, 248, 0.15)"
            : "0 25px 60px -15px rgba(15, 23, 42, 0.2), 0 0 30px rgba(2, 132, 199, 0.1)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* ========================================================= */}
        {/* MODAL HEADER                                              */}
        {/* ========================================================= */}
        <div
          style={{
            padding: "20px 24px 16px 24px",
            borderBottom: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.06)",
            background: isDark
              ? "linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, transparent 100%)"
              : "linear-gradient(90deg, rgba(2, 132, 199, 0.06) 0%, transparent 100%)",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Top Title Bar with Close Button */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  fontWeight: 800,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isDark ? "#38bdf8" : "#0284c7",
                  background: isDark ? "rgba(56, 189, 248, 0.15)" : "#e0f2fe",
                  padding: "3px 10px",
                  borderRadius: "20px",
                  marginBottom: "8px",
                }}
              >
                <FolderTree size={12} />
                <span>Computer Science Knowledge Universe</span>
              </div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: isDark ? "#ffffff" : "#0f172a",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span>Computer Science Roadmap Tree</span>
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: isDark ? "#94a3b8" : "#64748b",
                  margin: "4px 0 0 0",
                  lineHeight: "1.4",
                }}
              >
                Full modular roadmap across 6 layers & cross-cutting disciplines. Click any active
                topic (★) to instantly load its 2D interactive spider & group cards.
              </p>
            </div>

            <button
              onClick={onClose}
              title="Close modal (Esc)"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.05)",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
                color: isDark ? "#f1f5f9" : "#1e293b",
                cursor: "pointer",
                transition: "all 0.15s ease",
                flexShrink: 0,
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Master Universe Quick-Select Bar + Search Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {/* Master Universe Hero Pill Button */}
            <button
              onClick={() => {
                onSelectCategory("all");
                onClose();
              }}
              title="Open the complete interconnected Spider Knowledge Web with all concepts"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "12px",
                background:
                  currentCategory === "all"
                    ? "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)"
                    : isDark
                    ? "rgba(99, 102, 241, 0.18)"
                    : "#eef2ff",
                border:
                  currentCategory === "all"
                    ? "1.5px solid #818cf8"
                    : "1px solid rgba(99, 102, 241, 0.35)",
                color: currentCategory === "all" ? "#ffffff" : isDark ? "#c7d2fe" : "#4338ca",
                fontWeight: 700,
                fontSize: "12.5px",
                cursor: "pointer",
                boxShadow:
                  currentCategory === "all"
                    ? "0 0 16px rgba(99, 102, 241, 0.45)"
                    : "none",
                transition: "all 0.15s ease",
                flexShrink: 0,
              }}
            >
              <Compass size={15} />
              <span>All Concepts (Full Master Universe)</span>
              {currentCategory === "all" && (
                <span
                  style={{
                    fontSize: "10px",
                    background: "rgba(255,255,255,0.25)",
                    padding: "1px 6px",
                    borderRadius: "6px",
                    fontWeight: 800,
                  }}
                >
                  Active
                </span>
              )}
            </button>

            {/* Search Input */}
            <div
              style={{
                flex: 1,
                minWidth: "240px",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Search
                size={15}
                color={isDark ? "rgba(255,255,255,0.4)" : "#94a3b8"}
                style={{ position: "absolute", left: "12px", pointerEvents: "none" }}
              />
              <input
                type="text"
                placeholder="Search topics, algorithms, engines (e.g., 'V8', 'Scope', 'Big O', 'Node', 'SQL')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  height: "38px",
                  padding: "0 34px 0 36px",
                  borderRadius: "10px",
                  background: isDark ? "rgba(255, 255, 255, 0.05)" : "#f1f5f9",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid #cbd5e1",
                  color: isDark ? "#ffffff" : "#0f172a",
                  fontSize: "12.5px",
                  outline: "none",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    color: isDark ? "#94a3b8" : "#64748b",
                    cursor: "pointer",
                    padding: "2px",
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Layer Filter Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              overflowX: "auto",
              paddingBottom: "2px",
            }}
            className="custom-scrollbar"
          >
            {[
              { id: "all", label: "All Layers" },
              { id: "active", label: `★ Interactive Only (${activeCount})` },
              { id: "layer-1-theory", label: "1. Theory" },
              { id: "layer-2-programming", label: "2. Programming" },
              { id: "layer-3-systems", label: "3. Systems" },
              { id: "layer-4-engineering", label: "4. Engineering" },
              { id: "layer-5-specializations", label: "5. Specializations" },
              { id: "layer-6-tools", label: "6. Frameworks" },
              { id: "layer-cross-cutting", label: "Cross-Cutting" },
            ].map((tab) => {
              const isActive = activeLayerFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLayerFilter(tab.id)}
                  style={{
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "11px",
                    fontWeight: isActive ? 700 : 500,
                    whiteSpace: "nowrap",
                    background: isActive
                      ? isDark
                        ? "rgba(56, 189, 248, 0.22)"
                        : "#0284c7"
                      : isDark
                      ? "rgba(255, 255, 255, 0.04)"
                      : "rgba(0, 0, 0, 0.04)",
                    color: isActive
                      ? isDark
                        ? "#38bdf8"
                        : "#ffffff"
                      : isDark
                      ? "#94a3b8"
                      : "#64748b",
                    border: isActive
                      ? isDark
                        ? "1px solid rgba(56, 189, 248, 0.4)"
                        : "1px solid #0284c7"
                      : "1px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* MODAL BODY (LAYERS HIERARCHY TREE VIEW)                   */}
        {/* ========================================================= */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
          className="custom-scrollbar"
        >
          {filteredLayers.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: isDark ? "#94a3b8" : "#64748b",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: 700 }}>No topics found for &ldquo;{searchQuery}&rdquo;</p>
              <p style={{ fontSize: "13px", marginTop: "6px" }}>
                Try searching for &quot;Big O&quot;, &quot;Scope&quot;, &quot;V8&quot;, &quot;Node&quot;, &quot;OOP&quot;, or clear filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveLayerFilter("all");
                }}
                style={{
                  marginTop: "14px",
                  padding: "6px 16px",
                  borderRadius: "8px",
                  background: isDark ? "#38bdf8" : "#0284c7",
                  color: isDark ? "#000000" : "#ffffff",
                  fontWeight: 700,
                  fontSize: "12px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            filteredLayers.map((layer) => {
              return (
                <div
                  key={layer.id}
                  style={{
                    borderRadius: "18px",
                    background: isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.015)",
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.06)"
                      : "1px solid rgba(0, 0, 0, 0.06)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "18px",
                  }}
                >
                  {/* Layer Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      borderBottom: isDark
                        ? "1px solid rgba(255, 255, 255, 0.05)"
                        : "1px solid rgba(0, 0, 0, 0.04)",
                      paddingBottom: "12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "10px",
                          background: `${layer.color}20`,
                          color: layer.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {getLayerIcon(layer.id)}
                      </div>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <h3
                            style={{
                              fontSize: "15px",
                              fontWeight: 800,
                              color: isDark ? "#ffffff" : "#0f172a",
                              letterSpacing: "-0.01em",
                              margin: 0,
                            }}
                          >
                            {layer.name}
                          </h3>
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              padding: "2px 8px",
                              borderRadius: "6px",
                              background: `${layer.color}18`,
                              color: layer.color,
                            }}
                          >
                            {layer.badge}
                          </span>
                        </div>
                        <p
                          style={{
                            fontSize: "12px",
                            color: isDark ? "#94a3b8" : "#64748b",
                            margin: "2px 0 0 0",
                          }}
                        >
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Subcategories Grid */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "14px",
                    }}
                  >
                    {layer.subcategories.map((subcat) => {
                      return (
                        <div
                          key={subcat.id}
                          style={{
                            borderRadius: "14px",
                            background: isDark
                              ? "rgba(15, 23, 42, 0.55)"
                              : "rgba(255, 255, 255, 0.75)",
                            border: isDark
                              ? "1px solid rgba(255, 255, 255, 0.05)"
                              : "1px solid rgba(0, 0, 0, 0.05)",
                            padding: "14px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {/* Subcategory Title */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "12.5px",
                                fontWeight: 700,
                                color: isDark ? "#f1f5f9" : "#1e293b",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {subcat.name}
                            </span>
                            {subcat.badge && (
                              <span
                                style={{
                                  fontSize: "9px",
                                  fontWeight: 800,
                                  padding: "1px 6px",
                                  borderRadius: "4px",
                                  background: "#f59e0b20",
                                  color: "#f59e0b",
                                  letterSpacing: "0.02em",
                                }}
                              >
                                {subcat.badge}
                              </span>
                            )}
                          </div>

                          {/* Topics List / Badges */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "7px",
                            }}
                          >
                            {subcat.topics.map((topic) => {
                              const isCurrent =
                                topic.categoryId && topic.categoryId === currentCategory;

                              if (topic.isAvailable) {
                                // ACTIVE / INTERACTIVE TOPIC (★)
                                return (
                                  <div
                                    key={topic.id}
                                    onClick={() => handleSelectTopic(topic)}
                                    title={`Click to load "${topic.name}" interactive knowledge web`}
                                    style={{
                                      padding: "10px 12px",
                                      borderRadius: "10px",
                                      background: isCurrent
                                        ? isDark
                                          ? "linear-gradient(90deg, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0.1) 100%)"
                                          : "linear-gradient(90deg, #e0f2fe 0%, #f0f9ff 100%)"
                                        : isDark
                                        ? "rgba(255, 255, 255, 0.05)"
                                        : "rgba(255, 255, 255, 0.9)",
                                      border: isCurrent
                                        ? isDark
                                          ? `1.5px solid ${topic.color || "#38bdf8"}`
                                          : `1.5px solid ${topic.color || "#0284c7"}`
                                        : isDark
                                        ? "1px solid rgba(255, 255, 255, 0.08)"
                                        : "1px solid rgba(0, 0, 0, 0.06)",
                                      boxShadow: isCurrent
                                        ? `0 0 16px ${topic.color || "#38bdf8"}30`
                                        : "none",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: "10px",
                                      cursor: "pointer",
                                      transition: "all 0.15s ease",
                                    }}
                                  >
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "6px",
                                        }}
                                      >
                                        <div
                                          style={{
                                            width: "7px",
                                            height: "7px",
                                            borderRadius: "50%",
                                            background: topic.color || "#38bdf8",
                                            boxShadow: `0 0 6px ${topic.color || "#38bdf8"}`,
                                            flexShrink: 0,
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            fontWeight: 800,
                                            color: isDark ? "#ffffff" : "#0f172a",
                                          }}
                                        >
                                          {topic.name}
                                        </span>
                                        {topic.isStarred && (
                                          <Star
                                            size={11}
                                            fill="#f59e0b"
                                            color="#f59e0b"
                                            style={{ flexShrink: 0 }}
                                          />
                                        )}
                                      </div>
                                      {topic.description && (
                                        <p
                                          style={{
                                            fontSize: "10.5px",
                                            color: isDark ? "#94a3b8" : "#64748b",
                                            margin: "3px 0 0 13px",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {topic.description}
                                        </p>
                                      )}
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                        flexShrink: 0,
                                      }}
                                    >
                                      {isCurrent ? (
                                        <span
                                          style={{
                                            fontSize: "9.5px",
                                            fontWeight: 800,
                                            padding: "2px 6px",
                                            borderRadius: "6px",
                                            background: topic.color || "#0284c7",
                                            color: "#ffffff",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "3px",
                                          }}
                                        >
                                          <Check size={10} /> Active
                                        </span>
                                      ) : (
                                        <span
                                          style={{
                                            fontSize: "9.5px",
                                            fontWeight: 700,
                                            padding: "2px 6px",
                                            borderRadius: "6px",
                                            background: isDark
                                              ? "rgba(34, 197, 94, 0.15)"
                                              : "#dcfce7",
                                            color: isDark ? "#4ade80" : "#15803d",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "3px",
                                          }}
                                        >
                                          <span>Open</span>
                                          <ArrowRight size={10} />
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              } else {
                                // DISABLED / ROADMAP TOPIC
                                return (
                                  <div
                                    key={topic.id}
                                    title="Planned topic in the roadmap (Coming soon)"
                                    style={{
                                      padding: "7px 10px",
                                      borderRadius: "8px",
                                      background: isDark
                                        ? "rgba(255, 255, 255, 0.015)"
                                        : "rgba(0, 0, 0, 0.015)",
                                      border: isDark
                                        ? "1px dashed rgba(255, 255, 255, 0.06)"
                                        : "1px dashed rgba(0, 0, 0, 0.06)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      gap: "8px",
                                      opacity: 0.65,
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "6px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            width: "5px",
                                            height: "5px",
                                            borderRadius: "50%",
                                            background: isDark
                                              ? "rgba(255, 255, 255, 0.25)"
                                              : "#94a3b8",
                                            flexShrink: 0,
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontSize: "11px",
                                            fontWeight: 500,
                                            color: isDark ? "#94a3b8" : "#475569",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                          }}
                                        >
                                          {topic.name}
                                        </span>
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "4px",
                                        flexShrink: 0,
                                      }}
                                    >
                                      <Lock
                                        size={9}
                                        color={isDark ? "rgba(255,255,255,0.3)" : "#94a3b8"}
                                      />
                                      <span
                                        style={{
                                          fontSize: "8.5px",
                                          fontWeight: 600,
                                          color: isDark ? "rgba(255,255,255,0.3)" : "#94a3b8",
                                          letterSpacing: "0.02em",
                                        }}
                                      >
                                        Roadmap
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ========================================================= */}
        {/* MODAL FOOTER                                              */}
        {/* ========================================================= */}
        <div
          style={{
            padding: "12px 24px",
            borderTop: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.06)",
            background: isDark ? "rgba(10, 15, 29, 0.85)" : "#f8fafc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11.5px",
            color: isDark ? "#94a3b8" : "#64748b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                }}
              />
              <strong style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}>{activeCount} Interactive Webs</strong> Available
            </span>
            <span>•</span>
            <span>
              <strong style={{ color: isDark ? "#f1f5f9" : "#0f172a" }}>{totalTopicsCount}</strong> Topics in Roadmap
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span>Press</span>
            <kbd
              style={{
                padding: "2px 6px",
                borderRadius: "4px",
                background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
                border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
                fontSize: "10px",
                fontWeight: 700,
                color: isDark ? "#ffffff" : "#0f172a",
              }}
            >
              ESC
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
