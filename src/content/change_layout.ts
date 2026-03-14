import { SELECTORS, TOC_ID } from "./constants";

function getBody(): HTMLElement {
  return document.body;
}

function calcMarginRight(): number {
  const toc = document.getElementById(TOC_ID);
  if (!toc) return 150;
  const rightPadding = 16 * Number(toc.style.right.replace("em", ""));
  const tocWidth = toc.clientWidth + rightPadding;
  const minMargin = 150;
  return Math.max(tocWidth, minMargin);
}

function calcMarginLeft(): number {
  const sideInfo = document.getElementsByClassName(
    SELECTORS.sideCreatorInfo,
  )[0] as HTMLElement | undefined;
  const minMargin = 200;
  return Math.max(sideInfo?.clientWidth ?? 0, minMargin);
}

export function changeLayout(): void {
  const body = getBody();

  // 記事の幅を広げ、左右にマージンをとる
  const articleBody = document.getElementsByClassName(
    SELECTORS.articleBody,
  )[0] as HTMLElement | undefined;
  if (articleBody) {
    const padding = 48;
    const marginLeftPx = calcMarginLeft();
    const marginRightPx = calcMarginRight();
    articleBody.style.marginLeft = `${marginLeftPx + padding}px`;
    articleBody.style.marginRight = `${marginRightPx + padding}px`;

    const articleWidth =
      body.clientWidth - marginLeftPx - marginRightPx - padding * 2;
    articleBody.style.width = `${articleWidth}px`;
  }

  // ヘッダー画像はもとのサイズのままにする
  const figure = document.getElementsByClassName(SELECTORS.eyecatch)[0] as
    | HTMLElement
    | undefined;
  if (figure) {
    figure.style.width = "620px";
    figure.style.marginLeft = "auto";
    figure.style.marginRight = "auto";
  }
}
