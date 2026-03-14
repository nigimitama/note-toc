import { useEffect } from "react";
import tocbot from "tocbot";
import { TOC_ID } from "../constants";
import { useArticlePageDetection, useResponsiveVisibility } from "../hooks";
import {
  addIdsToHeadings,
  changeLayout,
  changeTocScrollability,
  markArticleContent,
} from "../layout";

export default function TocNav() {
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
    changeLayout();

    return () => {
      tocbot.destroy();
    };
  }, [isArticlePage]);

  useEffect(() => {
    if (isArticlePage && !isHidden) {
      changeLayout();
    }
  }, [isHidden, isArticlePage]);

  if (!isArticlePage) {
    return null;
  }

  return (
    <nav
      id={TOC_ID}
      className={`${TOC_ID} float-right w-1/5 fixed p-4 top-[124px] right-[2em] ml-auto`}
      hidden={isHidden}
    />
  );
}
