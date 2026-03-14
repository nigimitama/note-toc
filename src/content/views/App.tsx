import { useEffect, useState } from "react";
import TocNav from "./TocNav";
import TocToggleButton from "./TocToggleButton";
import {
  useArticlePageDetection,
  useResponsiveVisibility,
  useSettings,
} from "../hooks";
import { changeLayout } from "../change_layout";

export default function App() {
  const isArticlePage = useArticlePageDetection();
  const isHidden = useResponsiveVisibility();
  const settings = useSettings();
  const [isTocCollapsed, setIsTocCollapsed] = useState(false);

  useEffect(() => {
    if (!isArticlePage || isHidden || !settings.changeLayoutEnabled) return;
    changeLayout();

    const observer = new ResizeObserver(() => {
      changeLayout();
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [isArticlePage, isHidden, settings.changeLayoutEnabled]);

  return (
    <>
      <TocNav collapsed={isTocCollapsed} />
      {isArticlePage && !isHidden && (
        <TocToggleButton
          collapsed={isTocCollapsed}
          onToggle={() => setIsTocCollapsed((v) => !v)}
        />
      )}
    </>
  );
}
