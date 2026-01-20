import { useEffect, useState } from "react";
import tocbot from "tocbot";

const TOC_ID = "js-toc";

export default function TocNav() {
  const [isArticlePage, setIsArticlePage] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const checkArticlePage = () => {
      const articleBodies = document.getElementsByClassName("p-article__body");
      setIsArticlePage(articleBodies.length > 0);
    };

    const updateVisibility = () => {
      const body = document.getElementsByTagName("body")[0];
      const hasBodyEnoughWidth = body.clientWidth > 921;
      setIsHidden(!hasBodyEnoughWidth);
    };

    checkArticlePage();
    updateVisibility();

    // ページ遷移がDOMの変化として行われるため、DOMの変化を検知して再実行する
    const target = document.getElementById("__nuxt");
    let mutationObserver: MutationObserver | null = null;
    if (target) {
      mutationObserver = new MutationObserver(() => {
        checkArticlePage();
      });
      mutationObserver.observe(target, { subtree: true, childList: true });
    }

    // ウィンドウのリサイズに応じてnote側のレイアウトが変わるので対応する
    const body = document.getElementsByTagName("body")[0];
    const resizeObserver = new ResizeObserver(updateVisibility);
    resizeObserver.observe(body);

    return () => {
      mutationObserver?.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isArticlePage) {
      tocbot.destroy();
      return;
    }

    // tocbotを機能させるためにhタグにidを付与する
    addIdsToHeadings();

    // ToCを生成するためにhタグを探索する対象を指定する
    const article = document.getElementsByClassName("p-article__content")[0];
    if (article && !article.classList.contains("js-toc-content")) {
      article.classList.add("js-toc-content");
    }

    // tocbot初期化
    tocbot.init({
      scrollSmoothOffset: -128,
      hasInnerContainers: true,
      collapseDepth: 6,
    });

    // スクロール可能にする
    changeTocScrollability();

    // レイアウト調整
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
      className={TOC_ID}
      style={{ right: "2em" }}
      hidden={isHidden}
    />
  );
}

function addIdsToHeadings() {
  const h1tags = document.getElementsByTagName("h1");
  const h2tags = document.getElementsByTagName("h2");
  const h3tags = document.getElementsByTagName("h3");
  const h4tags = document.getElementsByTagName("h4");
  const hntags = [h1tags, h2tags, h3tags, h4tags];
  let j: number;
  Array.prototype.forEach.call(hntags, function (htags, i: number) {
    j = 0;
    Array.prototype.forEach.call(htags, function (tag: HTMLElement) {
      if (tag.id === "") {
        tag.id = `h${i}-${j}`;
        j += 1;
      }
    });
  });
}

function changeTocScrollability() {
  const offset = 128;
  const windowHeight = window.innerHeight - offset;
  const nav = document.getElementById("js-toc");
  const ol = document.querySelector("#js-toc > ol") as HTMLElement | null;
  if (nav && ol && windowHeight < ol.clientHeight) {
    nav.style.overflowY = "auto";
  }
}

function changeLayout() {
  // 記事の幅を広げ、左右にマージンをとる
  const articleBody = document.getElementsByClassName("p-article__body")[0] as
    | HTMLElement
    | undefined;
  if (articleBody) {
    const padding = 48;
    const marginLeftPx = calcMarginLeft();
    const marginRightPx = calcMarginRight();
    articleBody.style.marginLeft = `${marginLeftPx + padding}px`;
    articleBody.style.marginRight = `${marginRightPx + padding}px`;

    const body = document.getElementsByTagName("body")[0];
    const articleWidth =
      body.clientWidth - marginLeftPx - marginRightPx - padding * 2;
    articleBody.style.width = `${articleWidth}px`;
  }

  // ヘッダー画像はもとのサイズのままにする
  const figure = document.getElementsByClassName("o-noteEyecatch")[0] as
    | HTMLElement
    | undefined;
  if (figure) {
    figure.style.width = "620px";
    figure.style.marginLeft = "auto";
    figure.style.marginRight = "auto";
  }
}

function calcMarginRight() {
  const toc = document.getElementById("js-toc");
  if (!toc) return 150;
  const rightPadding = 16 * Number(toc.style.right.replace("em", ""));
  const tocWidth = toc.clientWidth + rightPadding;
  const minMargin = 150;
  return Math.max(tocWidth, minMargin);
}

function calcMarginLeft() {
  const sideInfo = document.getElementsByClassName(
    "p-article__sideCreatorInfo",
  )[0] as HTMLElement | undefined;
  const minMargin = 100;
  return Math.max(sideInfo?.clientWidth ?? 0, minMargin);
}
