import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  description: "note.comの記事の右側に目次を追加します。",
  version: pkg.version,
  icons: {
    48: "public/icon48.png",
  },
  permissions: ["contentSettings"],
  content_scripts: [
    {
      js: ["src/content/main.tsx"],
      matches: ["https://note.com/*", "https://note.jp/*"],
      run_at: "document_end",
    },
  ],
});
