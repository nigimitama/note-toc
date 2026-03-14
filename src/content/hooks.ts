import { useEffect, useState } from "react";
import { NUXT_ROOT_ID, SELECTORS } from "./constants";
import { DEFAULT_SETTINGS, Settings, getSettings } from "../shared/settings";

const BREAKPOINT_WIDTH = 921;

export function useArticlePageDetection(): boolean {
  const [isArticlePage, setIsArticlePage] = useState(false);

  useEffect(() => {
    const checkArticlePage = () => {
      const articleBodies = document.getElementsByClassName(
        SELECTORS.articleBody,
      );
      setIsArticlePage(articleBodies.length > 0);
    };

    checkArticlePage();

    // ページ遷移がDOMの変化として行われるため、DOMの変化を検知して再実行する
    const target = document.getElementById(NUXT_ROOT_ID);
    if (!target) return;

    const observer = new MutationObserver(checkArticlePage);
    observer.observe(target, { subtree: true, childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return isArticlePage;
}

export function useResponsiveVisibility(): boolean {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const hasEnoughWidth = document.body.clientWidth > BREAKPOINT_WIDTH;
      setIsHidden(!hasEnoughWidth);
    };

    updateVisibility();

    const resizeObserver = new ResizeObserver(updateVisibility);
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return isHidden;
}

export function useSettings(): Settings {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    getSettings().then(setSettings);

    const listener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      setSettings((prev) => ({
        ...prev,
        ...Object.fromEntries(
          Object.entries(changes).map(([k, v]) => [k, v.newValue]),
        ),
      }));
    };

    chrome.storage.sync.onChanged.addListener(listener);
    return () => chrome.storage.sync.onChanged.removeListener(listener);
  }, []);

  return settings;
}
