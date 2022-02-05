function changeLayout() {
  // mainを左に寄せる
  let main = document.getElementsByTagName("main")[0];
  main.style.marginRight = '22%';

  // 記事の幅を広げる
  let articleBody = document.getElementsByClassName("p-article__body")[0];
  if (articleBody) {
    articleBody.style.width = '90%';
    articleBody.style.marginLeft = 'auto';
  }

  // ヘッダー画像はもとのサイズのままにする
  let figure = document.getElementsByClassName('o-noteEyecatch')[0];
  if (figure) {
    figure.style.width = '620px';
    figure.style.marginLeft = 'auto';
    figure.style.marginRight = 'auto';
  }
}


function addIds() {
  // tocbotを機能させるためにhタグにidを付与する
  let h1tags = document.getElementsByTagName("h1");
  let h2tags = document.getElementsByTagName("h2");
  let h3tags = document.getElementsByTagName("h3");
  let hntags = [h1tags, h2tags, h3tags];
  var j;
  Array.prototype.forEach.call(hntags, function(htags, i) {
    j = 0;
    Array.prototype.forEach.call(htags, function(tag) {
      if (tag.id === '') {
        tag.id = `h${i}-${j}`;
        j += 1;
      }
    });
  });
}


function addTocElements() {
  // ToCが生成されるnavタグの追加
  if (document.getElementById('js-toc') === null) {
    let nav = document.createElement('nav');
    nav.classList.add('js-toc');
    nav.id = 'js-toc';
    nav.style.marginLeft = 'auto';
    nav.style.width = '20%';
    let body = document.getElementsByTagName("body")[0];
    body.append(nav);
  }
  // ToCを生成するためにhタグを探索する対象を指定する
  let article = document.getElementsByClassName("p-article__content")[0];
  if (article) {
    if (!article.classList.contains('js-toc-content')) {
      article.classList.add('js-toc-content');
    }
  }
}


function removeTocElements() {
  var toc = document.getElementById('js-toc');
  if (toc !== null) {
    toc.remove();
  }
}


function initTocbot() {
  tocbot.init({
    scrollSmoothOffset: -128,
    hasInnerContainers: true,
  });
}


function mainProcess() {
  const articleBodies = document.getElementsByClassName("p-article__body");
  const isArticlePage = (articleBodies.length > 0);
  if (isArticlePage) {
    changeLayout();
    addIds();
    addTocElements();
    initTocbot();
  } else {
    removeTocElements();
  }
}


function main() {
  mainProcess();

  // ページ遷移がDOMの変化として行われるため、DOMの変化を検知して再実行する
  const target = document.getElementById('__nuxt');
  const observer = new MutationObserver(records => {
    mainProcess();
  });
  observer.observe(target, {
    subtree: true,
    childList: true
  });
}

main();