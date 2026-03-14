import { SELECTORS, TOC_ID } from "./constants";

export function changeTocScrollability(): void {
  const offset = 128;
  const windowHeight = window.innerHeight - offset;
  const nav = document.getElementById(TOC_ID);
  const ol = document.querySelector(`#${TOC_ID} > ol`) as HTMLElement | null;
  if (nav && ol && windowHeight < ol.clientHeight) {
    nav.style.overflowY = "auto";
  }
}

export function addIdsToHeadings(): void {
  const headingLevels = ["h1", "h2", "h3", "h4"] as const;

  for (const [levelIndex, tagName] of headingLevels.entries()) {
    const headings = document.getElementsByTagName(tagName);
    let counter = 0;
    for (const heading of headings) {
      if (heading.id === "") {
        heading.id = `h${levelIndex}-${counter}`;
        counter += 1;
      }
    }
  }
}

export function markArticleContent(): void {
  const article = document.getElementsByClassName(SELECTORS.articleContent)[0];
  if (article && !article.classList.contains("js-toc-content")) {
    article.classList.add("js-toc-content");
  }
}
