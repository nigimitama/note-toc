import { useEffect } from "react";
import tocbot from "tocbot";
import { TOC_ID } from "../constants";
import { useArticlePageDetection, useResponsiveVisibility } from "../hooks";
import {
  addIdsToHeadings,
  changeTocScrollability,
  markArticleContent,
} from "../layout";

interface TocNavProps {
  collapsed: boolean;
}

export default function TocNav({ collapsed }: TocNavProps) {
  const isArticlePage = useArticlePageDetection();
  const isHidden = useResponsiveVisibility();

  useEffect(() => {
    if (!isArticlePage) {
      tocbot.destroy();
      return;
    }

    addIdsToHeadings();
    markArticleContent();

    tocbot.init({
      scrollSmoothOffset: -128,
      hasInnerContainers: true,
      collapseDepth: 6,
    });

    changeTocScrollability();

    return () => {
      tocbot.destroy();
    };
  }, [isArticlePage]);

  if (!isArticlePage) {
    return <></>;
  }

  return (
    <nav
      id={TOC_ID}
      className={TOC_ID}
      style={{
        right: "2em",
        transformOrigin: collapsed ? "top right" : "top right",
        transform: collapsed ? "scale(0)" : "scale(1)",
        opacity: collapsed ? 0 : 1,
        transition: "transform 0.4s ease, opacity 0.4s ease",
        pointerEvents: collapsed ? "none" : "auto",
      }}
      hidden={isHidden}
    />
  );
}
