export interface Settings {
  changeLayoutEnabled: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  changeLayoutEnabled: true,
};

export async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.sync.get(
    Object.keys(DEFAULT_SETTINGS) as string[],
  );
  return { ...DEFAULT_SETTINGS, ...(result as Partial<Settings>) };
}

export async function saveSettings(settings: Partial<Settings>): Promise<void> {
  await chrome.storage.sync.set(settings);
}
