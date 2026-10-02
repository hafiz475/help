"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ConceptCategory } from "@/data/concepts";
import { CanvasControls } from "@/components/CanvasControls";

// Dynamically import SpiderCanvas with SSR disabled to guarantee zero hydration mismatch
const SpiderCanvas = dynamic(
  () => import("@/components/SpiderCanvas").then((mod) => mod.SpiderCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          color: "#64748b",
          fontSize: "14px",
          fontWeight: 600,
        }}
      >
        Loading Spider Canvas...
      </div>
    ),
  }
);

export default function Home() {
  const [currentCategory, setCurrentCategory] = useState<ConceptCategory>("v8");
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(0.88);
  const [showLevel3, setShowLevel3] = useState(true);
  const [showSpiderRings, setShowSpiderRings] = useState(true);
  const [recenterTrigger, setRecenterTrigger] = useState(0);
  const [resetLayoutTrigger, setResetLayoutTrigger] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectCategory = (category: ConceptCategory) => {
    setCurrentCategory(category);
    setSearchQuery("");
    setRecenterTrigger((prev) => prev + 1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev * 1.2, 2.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev * 0.8, 0.2));
  };

  const handleResetZoom = () => {
    setZoom(1.0);
  };

  const handleRecenter = () => {
    setRecenterTrigger((prev) => prev + 1);
  };

  const handleResetLayout = () => {
    setResetLayoutTrigger((prev) => prev + 1);
  };

  const handleToggleLevel3 = () => {
    setShowLevel3((prev) => !prev);
  };

  if (!mounted) {
    return (
      <main
        style={{
          width: "100vw",
          height: "100vh",
          background: "#f8fafc",
        }}
      />
    );
  }

  return (
    <main
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* 2D Open World Spider Web Canvas */}
      <SpiderCanvas
        currentCategory={currentCategory}
        searchQuery={searchQuery}
        zoom={zoom}
        setZoom={setZoom}
        showLevel3={showLevel3}
        showSpiderRings={showSpiderRings}
        recenterTrigger={recenterTrigger}
        resetLayoutTrigger={resetLayoutTrigger}
        onMatchCountChange={setMatchCount}
      />

      {/* Floating Canvas Controls with Dropdown Headings */}
      <CanvasControls
        currentCategory={currentCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        matchCount={matchCount}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetZoom={handleResetZoom}
        onRecenter={handleRecenter}
        onResetLayout={handleResetLayout}
        showLevel3={showLevel3}
        onToggleLevel3={handleToggleLevel3}
      />
    </main>
  );
}
