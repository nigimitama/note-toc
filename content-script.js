function widen() {
  let articleBody = document.getElementsByClassName("p-article__body")[0];
  articleBody.style.width = "70%";
}


function AddIds() {
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


function addToc() {

  let articleWrapper = document.getElementsByTagName("body")[0];
  let nav = document.createElement('nav');
  nav.classList.add('js-toc');
  articleWrapper.append(nav);

  let article = document.getElementsByClassName("p-article__content")[0];
  article.classList.add('js-toc-content');

  tocbot.init();
}


function main() {
  // widen();
  AddIds();
  window.addEventListener('scroll', AddIds);
  addToc();
}


main();
