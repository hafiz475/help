"use client";

import React, { useState, useEffect } from "react";
import { ConceptCategory, CONCEPT_TABS } from "@/data/concepts";
import { ViewMode } from "@/utils/spiderLayout";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Crosshair,
  Layers,
  ExternalLink,
  Search,
  X,
  Sun,
  Moon,
  Share2,
  GitBranch,
} from "lucide-react";

interface CanvasControlsProps {
  currentCategory: ConceptCategory;
  onSelectCategory: (category: ConceptCategory) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchCount: number;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onRecenter: () => void;
  onResetLayout: () => void;
  showLevel3: boolean;
  onToggleLevel3: () => void;
}

export const CanvasControls: React.FC<CanvasControlsProps> = ({
  currentCategory,
  onSelectCategory,
  viewMode,
  onToggleViewMode,
  theme,
  onToggleTheme,
  searchQuery,
  onSearchChange,
  matchCount,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onRecenter,
  onResetLayout,
  showLevel3,
  onToggleLevel3,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isDark = theme === "dark";

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* ========================================================= */}
      {/* TOP HEADER CONTROLS (RESPONSIVE FOR MOBILE & DESKTOP)     */}
      {/* ========================================================= */}
      {isMobile ? (
        /* MOBILE UNIFIED TOP BAR (iPhone 12 & Smartphones) */
        <div
          style={{
            position: "fixed",
            top: "max(12px, env(safe-area-inset-top, 12px))",
            left: "10px",
            right: "10px",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          <div
            className="glass-panel"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "6px",
              padding: "5px 8px",
              borderRadius: "12px",
            }}
          >
            {/* Concept Dropdown */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <select
                id="category-select"
                value={currentCategory}
                onChange={(e) => onSelectCategory(e.target.value as ConceptCategory)}
                style={{
                  width: "100%",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--text-main)",
                  background: "var(--select-bg)",
                  border: "1px solid var(--border-subtle)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {CONCEPT_TABS.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Spider / Tree / Group View Toggle Button */}
            <button
              id="btn-view-toggle-mobile"
              onClick={() =>
                onToggleViewMode(
                  viewMode === "spider" ? "tree" : viewMode === "tree" ? "group" : "spider"
                )
              }
              title={`Current: ${viewMode}. Tap to switch view mode`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                padding: "6px 8px",
                borderRadius: "8px",
                fontSize: "11px",
                fontWeight: 600,
                background: "var(--toggle-bg)",
                color: isDark ? "#38bdf8" : "#0284c7",
                border: "1px solid var(--border-subtle)",
                flexShrink: 0,
              }}
            >
              {viewMode === "spider" ? (
                <Share2 size={13} />
              ) : viewMode === "tree" ? (
                <GitBranch size={13} />
              ) : (
                <Layers size={13} />
              )}
              <span>
                {viewMode === "spider"
                  ? "Spider"
                  : viewMode === "tree"
                  ? "Tree"
                  : "Group"}
              </span>
            </button>

            {/* Dark / Light Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Theme"}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--toggle-bg)",
                border: "1px solid var(--border-subtle)",
                flexShrink: 0,
              }}
            >
              {isDark ? <Sun size={14} color="#f59e0b" /> : <Moon size={14} color="#6366f1" />}
            </button>

            {/* Mobile Search Toggle Button */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              title="Search keywords"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isMobileSearchOpen ? (isDark ? "rgba(56,189,248,0.2)" : "#e0f2fe") : "var(--toggle-bg)",
                border: "1px solid var(--border-subtle)",
                color: isMobileSearchOpen ? (isDark ? "#38bdf8" : "#0284c7") : "var(--text-main)",
                flexShrink: 0,
              }}
            >
              <Search size={14} />
            </button>
          </div>

          {/* Expandable Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div
              className="glass-panel"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 10px",
                borderRadius: "10px",
                gap: "8px",
              }}
            >
              <Search size={14} color="var(--text-dim)" />
              <input
                id="search-keywords-input-mobile"
                type="text"
                placeholder="Search keywords in web..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  height: "26px",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-main)",
                  fontSize: "12px",
                }}
              />
              {searchQuery ? (
                <button
                  onClick={() => onSearchChange("")}
                  style={{
                    background: "transparent",
                    color: "var(--text-dim)",
                    padding: "2px",
                  }}
                >
                  <X size={13} />
                </button>
              ) : null}
              {searchQuery && (
                <span
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: matchCount > 0 ? (isDark ? "#38bdf8" : "#0284c7") : "#ef4444",
                  }}
                >
                  {matchCount}
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        /* DESKTOP TOP CONTROLS */
        <>
          {/* Top Left Search Input */}
          <div
            style={{
              position: "fixed",
              top: "16px",
              left: "20px",
              zIndex: 40,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              className="glass-panel"
              style={{
                display: "flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: "10px",
                gap: "8px",
                width: "220px",
              }}
            >
              <Search size={14} color="var(--text-dim)" />
              <input
                id="search-keywords-input"
                type="text"
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: "100%",
                  height: "26px",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-main)",
                  fontSize: "12px",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  style={{
                    background: "transparent",
                    color: "var(--text-dim)",
                    padding: "2px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {searchQuery ? (
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  color: matchCount > 0 ? (isDark ? "#38bdf8" : "#0284c7") : "#ef4444",
                }}
              >
                {matchCount} match{matchCount === 1 ? "" : "es"}
              </span>
            ) : (
              <div
                className="glass-panel"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  padding: "6px 10px",
                  borderRadius: "10px",
                  fontSize: "11px",
                  color: isDark ? "#38bdf8" : "#0284c7",
                  fontWeight: 600,
                }}
              >
                <ExternalLink size={11} />
                <span>Click any node = Google Search</span>
              </div>
            )}
          </div>

          {/* Top Right End: Concept Select + View Toggle + Theme Toggle */}
          <div
            className="glass-panel"
            style={{
              position: "fixed",
              top: "16px",
              right: "20px",
              zIndex: 40,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 8px",
              borderRadius: "12px",
            }}
          >
            <label
              htmlFor="category-select-desktop"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--text-dim)",
                paddingLeft: "4px",
              }}
            >
              CONCEPT:
            </label>
            <select
              id="category-select-desktop"
              value={currentCategory}
              onChange={(e) => onSelectCategory(e.target.value as ConceptCategory)}
              style={{
                padding: "5px 10px",
                borderRadius: "8px",
                fontSize: "12.5px",
                fontWeight: 600,
                color: "var(--text-main)",
                background: "var(--select-bg)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                cursor: "pointer",
              }}
            >
              {CONCEPT_TABS.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.name}
                </option>
              ))}
            </select>

            <div
              style={{
                width: "1px",
                height: "20px",
                background: "var(--border-subtle)",
                margin: "0 2px",
              }}
            />

            {/* View Mode Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "var(--toggle-bg)",
                borderRadius: "8px",
                padding: "2px",
              }}
            >
              <button
                id="btn-view-spider"
                onClick={() => onToggleViewMode("spider")}
                title="Spider Radial View"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: viewMode === "spider" ? 700 : 500,
                  background: viewMode === "spider" ? "var(--toggle-active-bg)" : "transparent",
                  color: viewMode === "spider" ? (isDark ? "#38bdf8" : "#0284c7") : "var(--text-muted)",
                  boxShadow: viewMode === "spider" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                <Share2 size={12} />
                <span>Spider</span>
              </button>

              <button
                id="btn-view-tree"
                onClick={() => onToggleViewMode("tree")}
                title="Hierarchical Tree View"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: viewMode === "tree" ? 700 : 500,
                  background: viewMode === "tree" ? "var(--toggle-active-bg)" : "transparent",
                  color: viewMode === "tree" ? (isDark ? "#38bdf8" : "#0284c7") : "var(--text-muted)",
                  boxShadow: viewMode === "tree" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                <GitBranch size={12} />
                <span>Tree</span>
              </button>

              <button
                id="btn-view-group"
                onClick={() => onToggleViewMode("group")}
                title="Group / Stack Card View"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: viewMode === "group" ? 700 : 500,
                  background: viewMode === "group" ? "var(--toggle-active-bg)" : "transparent",
                  color: viewMode === "group" ? (isDark ? "#38bdf8" : "#0284c7") : "var(--text-muted)",
                  boxShadow: viewMode === "group" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                <Layers size={12} />
                <span>Group</span>
              </button>
            </div>

            <div
              style={{
                width: "1px",
                height: "20px",
                background: "var(--border-subtle)",
                margin: "0 2px",
              }}
            />

            {/* Theme Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={onToggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Theme"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "5px 9px",
                borderRadius: "8px",
                fontSize: "12px",
                fontWeight: 600,
                background: "var(--toggle-bg)",
                color: "var(--text-main)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              {isDark ? <Sun size={13} color="#f59e0b" /> : <Moon size={13} color="#6366f1" />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
          </div>
        </>
      )}

      {/* ========================================================= */}
      {/* FLOATING BOTTOM CONTROLS (ZOOM / RECENTER / RESET)        */}
      {/* ========================================================= */}
      <div
        className="glass-panel"
        style={{
          position: "fixed",
          bottom: "max(14px, env(safe-area-inset-bottom, 14px))",
          right: "12px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "5px 6px",
          borderRadius: "12px",
          zIndex: 40,
        }}
      >
        <button
          id="btn-zoom-out"
          onClick={onZoomOut}
          title="Zoom Out"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            color: "var(--text-muted)",
          }}
        >
          <ZoomOut size={15} />
        </button>

        <button
          id="btn-zoom-reset"
          onClick={onResetZoom}
          title="Reset Zoom to 100%"
          style={{
            padding: "0 5px",
            height: "30px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            color: "var(--text-main)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          id="btn-zoom-in"
          onClick={onZoomIn}
          title="Zoom In"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            color: "var(--text-muted)",
          }}
        >
          <ZoomIn size={15} />
        </button>

        <div
          style={{
            width: "1px",
            height: "18px",
            background: "var(--border-subtle)",
            margin: "0 2px",
          }}
        />

        <button
          id="btn-recenter"
          onClick={onRecenter}
          title="Center Canvas"
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            color: "var(--text-muted)",
          }}
        >
          <Crosshair size={15} />
        </button>

        <button
          id="btn-reset-layout"
          onClick={onResetLayout}
          title="Reset layout formation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "0 7px",
            height: "30px",
            borderRadius: "6px",
            background: "transparent",
            color: "var(--text-muted)",
            fontSize: "11px",
            fontWeight: 500,
          }}
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>
    </>
  );
};
