"use client";

import React from "react";
import { ConceptCategory, CONCEPT_TABS } from "@/data/concepts";
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
} from "lucide-react";

interface CanvasControlsProps {
  currentCategory: ConceptCategory;
  onSelectCategory: (category: ConceptCategory) => void;
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

  return (
    <>
      {/* Top Floating Minimal Bar: Simple Search + Google Tip */}
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
          <Search size={14} color="#64748b" />
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
              color: "#0f172a",
              fontSize: "12px",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              style={{
                background: "transparent",
                color: "#64748b",
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
              color: matchCount > 0 ? "#0284c7" : "#ef4444",
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
              color: "#0284c7",
              fontWeight: 600,
            }}
          >
            <ExternalLink size={11} />
            <span>Click any node = Google Search</span>
          </div>
        )}
      </div>

      {/* Top Right End: Simple Concept Dropdown Box */}
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
          padding: "6px 10px",
          borderRadius: "10px",
        }}
      >
        <label
          htmlFor="category-select"
          style={{
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "#64748b",
          }}
        >
          CONCEPT:
        </label>
        <select
          id="category-select"
          value={currentCategory}
          onChange={(e) => onSelectCategory(e.target.value as ConceptCategory)}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            color: "#0f172a",
            background: "#ffffff",
            border: "1px solid #cbd5e1",
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
          gap: "6px",
          padding: "6px 8px",
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
            color: "#475569",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
            color: "#0f172a",
            fontFamily: "var(--font-mono)",
            fontSize: "11.5px",
            fontWeight: 600,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
            color: "#475569",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <ZoomIn size={15} />
        </button>

        <div
          style={{
            width: "1px",
            height: "22px",
            background: "#e2e8f0",
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
            color: "#475569",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Crosshair size={15} />
        </button>

        {/* Reset web layout */}
        <button
          id="btn-reset-layout"
          onClick={onResetLayout}
          title="Snap nodes back to spider radial formation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "0 8px",
            height: "32px",
            borderRadius: "6px",
            background: "transparent",
            color: "#475569",
            fontSize: "12px",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <RotateCcw size={13} />
          <span>Reset Web</span>
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
            background: showLevel3 ? "#e0f2fe" : "transparent",
            color: showLevel3 ? "#0284c7" : "#475569",
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
            background: showHelp ? "#f1f5f9" : "transparent",
            color: "#64748b",
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
            width: "300px",
            borderRadius: "12px",
            padding: "16px",
            zIndex: 60,
            color: "#0f172a",
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
              color: "#0284c7",
            }}
          >
            <span>Spider Web Guide</span>
            <button
              onClick={() => setShowHelp(false)}
              style={{
                background: "transparent",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              ✕
            </button>
          </div>
          <ul style={{ paddingLeft: "16px", display: "flex", flexDirection: "column", gap: "6px" }}>
            <li>
              <strong>Click Keyword:</strong> Opens Google Search for that exact keyword so you learn immediately without text clutter.
            </li>
            <li>
              <strong>Drag Keyword:</strong> Freely reposition any node in the open 2D canvas.
            </li>
            <li>
              <strong>Pan Canvas:</strong> Click and drag on empty canvas background.
            </li>
            <li>
              <strong>Zoom:</strong> Mouse wheel or use the <kbd>+</kbd> / <kbd>-</kbd> buttons.
            </li>
            <li>
              <strong>Concept Dropdown:</strong> Switch headings to re-center the web on that topic.
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
          color: "#64748b",
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
