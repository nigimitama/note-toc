import TocNav from "./TocNav";
import { useArticlePageDetection, useResponsiveVisibility } from "../hooks";
import { changeLayout } from "../change_layout";
import { useEffect, useState } from "react";

export default function App() {
  const isArticlePage = useArticlePageDetection();
  const isHidden = useResponsiveVisibility();
  const [isTocCollapsed, setIsTocCollapsed] = useState(false);

  useEffect(() => {
    if (!isArticlePage || isHidden) return;
    changeLayout();

    const observer = new ResizeObserver(() => {
      changeLayout();
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [isArticlePage, isHidden]);

  return (
    <>
      <TocNav collapsed={isTocCollapsed} />
      {isArticlePage && !isHidden && (
        <button
          onClick={() => setIsTocCollapsed((v) => !v)}
          style={{
            position: "fixed",
            top: "80px",
            right: "1em",
            zIndex: 1000,
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
            padding: "2px 8px",
            color: "#666",
          }}
          title={isTocCollapsed ? "目次を表示" : "目次を非表示"}
        >
          {isTocCollapsed ? "目次▼" : "✕"}
        </button>
      )}
    </>
  );
}
