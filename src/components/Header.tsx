"use client";

import React from "react";
import { CONCEPT_TABS, ConceptCategory } from "@/data/concepts";
import {
  Cpu,
  GitFork,
  Network,
  Compass,
  Search,
  X,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  currentCategory: ConceptCategory;
  onSelectCategory: (category: ConceptCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  matchCount: number;
  totalNodes: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  matchCount,
  totalNodes,
}) => {
  const getTabIcon = (id: ConceptCategory) => {
    switch (id) {
      case "v8":
        return <Cpu size={16} />;
      case "scope":
        return <GitFork size={16} />;
      case "node":
        return <Network size={16} />;
      case "all":
        return <Compass size={16} />;
    }
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        background: "rgba(7, 9, 14, 0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      {/* Brand & Quick Title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 16px rgba(56, 189, 248, 0.35)",
          }}
        >
          <Sparkles size={20} color="#ffffff" />
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <h1
              style={{
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "#ffffff",
              }}
            >
              JS / NODE.JS SPIDER
            </h1>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                textTransform: "uppercase",
                padding: "2px 6px",
                borderRadius: "4px",
                background: "rgba(56, 189, 248, 0.15)",
                color: "#38bdf8",
                letterSpacing: "0.05em",
              }}
            >
              2D Open World
            </span>
          </div>
          <div style={{ fontSize: "11px", color: "var(--text-dim)" }}>
            Drag & drop keywords • Click to Google Search
          </div>
        </div>
      </div>

      {/* Main Category Tabs - 3 Main Concepts */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "rgba(15, 23, 42, 0.6)",
          padding: "4px 6px",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        {CONCEPT_TABS.map((tab) => {
          const isActive = currentCategory === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              onClick={() => onSelectCategory(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 14px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: isActive ? 600 : 500,
                color: isActive ? "#ffffff" : "var(--text-muted)",
                background: isActive
                  ? `linear-gradient(135deg, ${tab.color}26 0%, ${tab.color}10 100%)`
                  : "transparent",
                border: isActive
                  ? `1px solid ${tab.color}80`
                  : "1px solid transparent",
                boxShadow: isActive
                  ? `0 0 16px ${tab.color}25`
                  : "none",
              }}
            >
              <span style={{ color: isActive ? tab.color : "inherit" }}>
                {getTabIcon(tab.id)}
              </span>
              <span>{tab.name}</span>
              <span
                style={{
                  fontSize: "10px",
                  padding: "1px 6px",
                  borderRadius: "999px",
                  background: isActive ? `${tab.color}33` : "rgba(255, 255, 255, 0.05)",
                  color: isActive ? "#ffffff" : "var(--text-dim)",
                }}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Search Input & Google hint */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "220px",
          }}
        >
          <Search
            size={15}
            color="var(--text-dim)"
            style={{ position: "absolute", left: "10px", pointerEvents: "none" }}
          />
          <input
            id="search-keywords-input"
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: "100%",
              height: "34px",
              paddingLeft: "32px",
              paddingRight: searchQuery ? "28px" : "12px",
              borderRadius: "8px",
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "var(--text-main)",
              fontSize: "12px",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              style={{
                position: "absolute",
                right: "8px",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-dim)",
                padding: "2px",
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {searchQuery ? (
          <div
            style={{
              fontSize: "11px",
              color: matchCount > 0 ? "#38bdf8" : "#f87171",
              fontWeight: 600,
            }}
          >
            {matchCount} match{matchCount === 1 ? "" : "es"}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              padding: "6px 10px",
              borderRadius: "8px",
              background: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              fontSize: "11px",
              fontWeight: 500,
            }}
          >
            <ExternalLink size={12} />
            <span>Click node = Google Search</span>
          </div>
        )}
      </div>
    </header>
  );
};
