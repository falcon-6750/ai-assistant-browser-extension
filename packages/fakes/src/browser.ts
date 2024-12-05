import type { Browser } from "@repo/extension";

export const fakeBrowser = {
  getSelection: async () => {
    return "";
  },
} satisfies Browser;
