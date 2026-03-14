import { useEffect } from "react";
import styled from "styled-components";
import tocbot from "tocbot";
import { TOC_ID } from "../constants";
import { useArticlePageDetection, useResponsiveVisibility } from "../hooks";
import {
  addIdsToHeadings,
  changeTocScrollability,
  markArticleContent,
} from "../layout";

const Nav = styled.nav<{ $collapsed: boolean }>`
  float: right;
  width: 20%;
  position: fixed;
  padding: 1em;
  top: 94px;
  right: 1em;
  margin-left: auto;
  transform-origin: top right;
  transform: ${({ $collapsed }) => ($collapsed ? "scale(0)" : "scale(1)")};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  transition: transform 0.4s ease, opacity 0.4s ease;
  pointer-events: ${({ $collapsed }) => ($collapsed ? "none" : "auto")};
`;

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
    <Nav
      id={TOC_ID}
      className={TOC_ID}
      $collapsed={collapsed}
      hidden={isHidden}
    />
  );
}
