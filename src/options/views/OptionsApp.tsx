import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  DEFAULT_SETTINGS,
  Settings,
  getSettings,
  saveSettings,
} from "../../shared/settings";

const Page = styled.div`
  font-family: sans-serif;
  max-width: 480px;
  margin: 32px auto;
  padding: 0 16px;
  color: #333;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const SettingRow = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

const SettingInfo = styled.div``;

const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const SettingDescription = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 4px;
`;

const Toggle = styled.input`
  width: 36px;
  height: 20px;
  accent-color: #41c9b4;
  cursor: pointer;
  flex-shrink: 0;
`;

export default function OptionsApp() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleChange = (key: keyof Settings, value: boolean) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    saveSettings({ [key]: value });
  };

  return (
    <Page>
      <Title>note目次追加 設定</Title>
      <SettingRow>
        <SettingInfo>
          <SettingLabel>記事の幅を広げる</SettingLabel>
          <SettingDescription>
            記事レイアウトを広げて目次が重ならないようにします
          </SettingDescription>
        </SettingInfo>
        <Toggle
          type="checkbox"
          role="switch"
          checked={settings.changeLayoutEnabled}
          onChange={(e) =>
            handleChange("changeLayoutEnabled", e.target.checked)
          }
        />
      </SettingRow>
    </Page>
  );
}
