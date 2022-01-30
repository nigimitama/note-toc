function widen() {
  let articleBody = document.getElementsByClassName("p-article__body")[0];
  articleBody.style.width = "80%";
}


function addToc() {
  let articleWrapper = document.getElementsByClassName("p-article__articleWrapper")[0];
  let nav = document.createElement('nav');
  nav.classList.add('js-toc');
  articleWrapper.append(nav);

  let article = document.getElementsByClassName("p-article__content")[0];
  article.classList.add('js-toc-content');

  tocbot.init();
}

function main() {
  widen();
  // addToc();
}


main();
// window.setTimeout(addToc(), 3000);
// window.setTimeout(main(), 3000);
