import TocNav from "./TocNav";
import { useArticlePageDetection, useResponsiveVisibility } from "../hooks";
import { changeLayout } from "../change_layout";
import { useEffect } from "react";

export default function App() {
  const isArticlePage = useArticlePageDetection();
  const isHidden = useResponsiveVisibility();

  useEffect(() => {
    if (!isArticlePage || isHidden) return;
    changeLayout();

    const observer = new ResizeObserver(() => {
      changeLayout();
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [isArticlePage, isHidden]);

  return <TocNav />;
}
