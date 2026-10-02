"use client";

import React from "react";
import { ConceptCategory, CONCEPT_TABS } from "@/data/concepts";
import { ViewMode } from "@/utils/spiderLayout";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Crosshair,
  Layers,
  HelpCircle,
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
  const [showHelp, setShowHelp] = React.useState(false);
  const isDark = theme === "dark";

  return (
    <>
      {/* Top Left Floating Minimal Bar: Search + Google Tip */}
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

      {/* Top Right End: Concept Select + View Mode (Spider/Tree) + Theme (Light/Dark) */}
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
        {/* 1. Concept Dropdown */}
        <label
          htmlFor="category-select"
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
          id="category-select"
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

        {/* 2. Toggle Spider View vs Tree View */}
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
        </div>

        <div
          style={{
            width: "1px",
            height: "20px",
            background: "var(--border-subtle)",
            margin: "0 2px",
          }}
        />

        {/* 3. Toggle Dark / Light Theme */}
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

      {/* Floating Bottom Navigation / Control Bar */}
      <div
        className="glass-panel"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          padding: "5px 7px",
          borderRadius: "12px",
          zIndex: 40,
        }}
      >
        {/* Zoom controls */}
        <button
          id="btn-zoom-out"
          onClick={onZoomOut}
          title="Zoom Out"
          style={{
            width: "32px",
            height: "32px",
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
            padding: "0 6px",
            height: "32px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            color: "var(--text-main)",
            fontFamily: "var(--font-mono)",
            fontSize: "11.5px",
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
            width: "32px",
            height: "32px",
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
            height: "20px",
            background: "var(--border-subtle)",
            margin: "0 2px",
          }}
        />

        {/* Recenter button */}
        <button
          id="btn-recenter"
          onClick={onRecenter}
          title="Center Canvas"
          style={{
            width: "32px",
            height: "32px",
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

        {/* Reset web layout */}
        <button
          id="btn-reset-layout"
          onClick={onResetLayout}
          title="Reset layout formation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "0 8px",
            height: "32px",
            borderRadius: "6px",
            background: "transparent",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          <RotateCcw size={13} />
          <span>Reset {viewMode === "tree" ? "Tree" : "Spider"}</span>
        </button>

        {/* Toggle level 3 details */}
        <button
          id="btn-toggle-details"
          onClick={onToggleLevel3}
          title={showLevel3 ? "Hide Sub-details" : "Show Sub-details"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            padding: "0 8px",
            height: "32px",
            borderRadius: "6px",
            background: showLevel3 ? (isDark ? "rgba(56, 189, 248, 0.2)" : "#e0f2fe") : "transparent",
            color: showLevel3 ? (isDark ? "#38bdf8" : "#0284c7") : "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 600,
          }}
        >
          <Layers size={13} />
          <span>Details</span>
        </button>

        {/* Help button */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          title="Help & Shortcuts"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: showHelp ? "var(--toggle-bg)" : "transparent",
            color: "var(--text-dim)",
          }}
        >
          <HelpCircle size={15} />
        </button>
      </div>

      {/* Floating Help Modal */}
      {showHelp && (
        <div
          className="glass-panel"
          style={{
            position: "fixed",
            bottom: "74px",
            right: "20px",
            width: "310px",
            borderRadius: "12px",
            padding: "16px",
            zIndex: 60,
            color: "var(--text-main)",
            fontSize: "12px",
            lineHeight: 1.6,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
              fontWeight: 700,
              fontSize: "13px",
              color: isDark ? "#38bdf8" : "#0284c7",
            }}
          >
            <span>Navigation & Shortcuts</span>
            <button
              onClick={() => setShowHelp(false)}
              style={{
                background: "transparent",
                color: "var(--text-dim)",
                fontSize: "14px",
              }}
            >
              ✕
            </button>
          </div>
          <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <li>
              <strong>Click Keyword:</strong> Opens Google Search for that exact keyword so you learn immediately without reading long text walls.
            </li>
            <li>
              <strong>Spider / Tree Toggle:</strong> Switch between radial spider-web view and top-down hierarchical tree view.
            </li>
            <li>
              <strong>Dark / Light Toggle:</strong> Switch seamlessly between Dark Theme and Light Mode.
            </li>
            <li>
              <strong>Drag Keyword:</strong> Freely reposition any node in the open 2D canvas.
            </li>
            <li>
              <strong>Pan & Zoom:</strong> Drag empty canvas to pan, mouse wheel or <kbd>+</kbd>/<kbd>-</kbd> to zoom.
            </li>
          </ul>
        </div>
      )}

      {/* Floating Bottom Left Helper reminder */}
      <div
        className="glass-panel"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "6px 12px",
          borderRadius: "8px",
          fontSize: "11px",
          color: "var(--text-dim)",
          pointerEvents: "none",
        }}
      >
        <span>💡 <strong>Click:</strong> Google Search</span>
        <span>•</span>
        <span><strong>Drag node:</strong> Move in 2D</span>
        <span>•</span>
        <span><strong>Drag canvas:</strong> Pan</span>
      </div>
    </>
  );
};
