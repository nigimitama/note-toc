function addIds() {
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
  if (document.getElementById('js-toc') === null) {
    let nav = document.createElement('nav');
    nav.classList.add('js-toc');
    nav.id = 'js-toc';
    nav.style.marginLeft = 'auto';
    nav.style.width = '20%';
    let body = document.getElementsByTagName("body")[0];
    body.append(nav);
  }
  let article = document.getElementsByClassName("p-article__content")[0];
  if (!article.classList.contains('js-toc-content')) {
    article.classList.add('js-toc-content');
  }
}


function initTocbot() {
  tocbot.init({
    headingsOffset: 60,
    scrollSmoothOffset: -128,
    hasInnerContainers: true,
  });
}


function changeLayout() {
  // mainを左に寄せる
  let main = document.getElementsByTagName("main")[0];
  main.style.marginRight = '22%';

  // 記事の幅を広げる
  let articleBody = document.getElementsByClassName("p-article__body")[0];
  articleBody.style.width = '90%';
  articleBody.style.marginLeft = 'auto';

  // ヘッダー画像はもとのサイズのままにする
  let figure = document.getElementsByClassName('o-noteEyecatch')[0];
  figure.style.width = '620px';
  figure.style.marginLeft = 'auto';
  figure.style.marginRight = 'auto';
}


function main() {
  changeLayout();

  addIds();
  addTocElements();
  tocbot.init({
    scrollSmoothOffset: -128,
    hasInnerContainers: true,
  });

  // componentsが更新されて変更したDocがもとに戻される事があるので以下で対応
  window.addEventListener('scroll', function(){
    addIds();
    addTocElements();
  });
}


main();
