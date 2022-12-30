const TOC_ID = "js-toc";

function changeLayout() {
  // 記事の幅を広げ、左右にマージンをとる
  let articleBody = document.getElementsByClassName("p-article__body")[0];
  if (articleBody) {
    const padding = 48;
    const marginLeftPx = calcMarginLeft();
    const marginRightPx = calcMarginRight();
    articleBody.style.marginLeft = `${marginLeftPx + padding}px`;
    articleBody.style.marginRight = `${marginRightPx + padding}px`;

    const body = document.getElementsByTagName("body")[0];
    const articleWidth = body.clientWidth - marginLeftPx - marginRightPx - padding * 2;
    articleBody.style.width = `${articleWidth}px`;
  }

  // ヘッダー画像はもとのサイズのままにする
  let figure = document.getElementsByClassName("o-noteEyecatch")[0];
  if (figure) {
    figure.style.width = "620px";
    figure.style.marginLeft = "auto";
    figure.style.marginRight = "auto";
  }
}

function calcMarginRight() {
  // articleの右側の余白を追加するToCに合わせる
  const toc = document.getElementById(TOC_ID);
  const rightPadding = 16 * Number(toc.style["right"].replace("em", ""));
  const tocWidth = toc.clientWidth + rightPadding;
  const minMargin = 150;
  return Math.max(tocWidth, minMargin);
}

function calcMarginLeft() {
  // articleの左側の余白は筆者のプロフィール欄に合わせる
  const sideInfo = document.getElementsByClassName("p-article__sideCreatorInfo")[0];
  const minMargin = 100;
  return Math.max(sideInfo.clientWidth, minMargin);
}

function addIds() {
  // tocbotを機能させるためにhタグにidを付与する
  let h1tags = document.getElementsByTagName("h1");
  let h2tags = document.getElementsByTagName("h2");
  let h3tags = document.getElementsByTagName("h3");
  let h4tags = document.getElementsByTagName("h4");
  let hntags = [h1tags, h2tags, h3tags, h4tags];
  let j;
  Array.prototype.forEach.call(hntags, function (htags, i) {
    j = 0;
    Array.prototype.forEach.call(htags, function (tag) {
      if (tag.id === "") {
        tag.id = `h${i}-${j}`;
        j += 1;
      }
    });
  });
}

function addTocElements() {
  // ToCが生成されるnavタグの追加
  if (document.getElementById(TOC_ID) === null) {
    let nav = document.createElement("nav");
    nav.classList.add(TOC_ID);
    nav.id = TOC_ID;
    nav.style["right"] = "2em";
    let body = document.getElementsByTagName("body")[0];
    body.append(nav);
  }
  // ToCを生成するためにhタグを探索する対象を指定する
  let article = document.getElementsByClassName("p-article__content")[0];
  if (article && !article.classList.contains("js-toc-content")) {
    article.classList.add("js-toc-content");
  }
}

function removeTocElements() {
  let toc = document.getElementById(TOC_ID);
  if (toc !== null) toc.remove();
}

function initTocbot() {
  tocbot.init({
    scrollSmoothOffset: -128,
    hasInnerContainers: true,
    collapseDepth: 6,
  });
}

function changeTocScrollability() {
  // ウィンドウの縦幅よりもToCが大きければスクロール可能にする
  const offset = 128;
  let windowHeight = window.innerHeight - offset;
  let nav = document.getElementById(TOC_ID);
  let ol = document.querySelector(`#${TOC_ID} > ol`);
  if (windowHeight < ol.clientHeight) {
    nav.style.overflowY = "auto";
  }
}

function mainProcess() {
  const articleBodies = document.getElementsByClassName("p-article__body");
  const isArticlePage = articleBodies.length > 0;
  if (isArticlePage) {
    addIds();
    addTocElements();
    initTocbot();
    changeTocScrollability();
    changeLayout();
  } else {
    removeTocElements();
  }
}

function updateLayout() {
  const articleBodies = document.getElementsByClassName("p-article__body");
  const isNotArticlePage = articleBodies.length == 0;
  if (isNotArticlePage) return null;

  const body = document.getElementsByTagName("body")[0];
  const hasBodyEnoughWidth = body.clientWidth > 921;
  let toc = document.getElementById(TOC_ID);
  if (hasBodyEnoughWidth) {
    toc.hidden = false;
    changeLayout();
  } else {
    toc.hidden = true;
  }
}

function main() {
  mainProcess();

  // ページ遷移がDOMの変化として行われるため、DOMの変化を検知して再実行する
  const target = document.getElementById("__nuxt");
  const observer = new MutationObserver(mainProcess);
  observer.observe(target, { subtree: true, childList: true });

  // ウィンドウのリサイズに応じてnote側のレイアウトが変わるので対応する
  const body = document.getElementsByTagName("body")[0];
  const resizeObserver = new ResizeObserver(updateLayout);
  resizeObserver.observe(body, { subtree: true, childList: true });
}

main();
