function main() {
  mainProcess();

  // SPAのページ遷移をうまく追えないためこうしてみる
  const target = document.getElementById('__nuxt');
  const observer = new MutationObserver(records => {
    mainProcess();
  })
  observer.observe(target, {
    subtree: true,
    childList: true
  })
}

// SPAのページ遷移をうまく追えないため導入したがいまいち機能してるかわからん（console.logが機能してない）
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(`updated: ${tab.url}`);
  if (changeInfo.status === "complete") {
    console.log(`completely updated: ${tab.url}`);
    chrome.scripting.executeScript(
      {
        target: {tabId: tabId},
        func: main,
      }
    );
  }
});
