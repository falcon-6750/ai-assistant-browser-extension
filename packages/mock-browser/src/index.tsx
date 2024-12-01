import { useState } from "react";

import styles from "./index.module.css";

import { ArrowDownTray } from "@repo/icons/arrow-down-tray";
import { ArrowLeft } from "@repo/icons/arrow-left";
import { ArrowRight } from "@repo/icons/arrow-right";
import { EllipsisVertical } from "@repo/icons/ellipsis-vertical";
import { Globe } from "@repo/icons/globe";
import { Refresh } from "@repo/icons/refresh";
import { Sparkle } from "@repo/icons/sparkle";

enum Label {
  Back = "Click to go back, hold to see history",
  Downloads = "Downloads",
  Forward = "Click to go forward, hold to see history",
  Reload = "Reload this page",
  Settings = "Customize and control browser",
}

function notImplemented(
  e: React.MouseEvent<HTMLButtonElement | HTMLInputElement>
) {
  e.preventDefault();
  alert("Not implemented!");
}

export function MockBrowser({
  children,
  extensionName,
  websiteName,
  websiteUrl,
}: {
  children: React.ReactNode;
  extensionName: string;
  websiteName: string;
  websiteUrl: string;
}) {
  const [isExtensionOpen, setIsExtensionOpen] = useState(false);

  return (
    <div className={styles.window}>
      <div className={styles.toolbar}>
        <div className={styles.tabRegion}>
          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <Globe className={styles.icon} />
              {websiteName}
            </div>
          </div>
        </div>
        <div className={styles.barRegion}>
          <div className={styles.iconGroup}>
            <button
              className={styles.iconButton}
              onClick={notImplemented}
              aria-label={Label.Back}
              title={Label.Back}
            >
              <ArrowLeft className={styles.icon} />
            </button>
            <button
              className={styles.iconButton}
              onClick={notImplemented}
              aria-label={Label.Forward}
              title={Label.Forward}
            >
              <ArrowRight className={styles.icon} />
            </button>
            <button
              className={styles.iconButton}
              onClick={notImplemented}
              aria-label={Label.Reload}
              title={Label.Reload}
            >
              <Refresh className={styles.icon} />
            </button>
          </div>
          <input className={styles.locationBar} value={websiteUrl} />
          <div className={styles.iconGroup}>
            <button
              className={`${styles.iconButton} ${styles.extensionButton}`}
              onClick={() => setIsExtensionOpen(!isExtensionOpen)}
              aria-label={`Open ${extensionName} extension`}
              title={`Open ${extensionName} extension`}
            >
              <Sparkle className={styles.icon} />
            </button>
            <button
              className={styles.iconButton}
              onClick={notImplemented}
              aria-label={Label.Downloads}
              title={Label.Downloads}
            >
              <ArrowDownTray className={styles.icon} />
            </button>
            <button
              className={styles.iconButton}
              onClick={notImplemented}
              aria-label={Label.Settings}
              title={Label.Settings}
            >
              <EllipsisVertical className={styles.icon} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.main}>
        <iframe
          className={`${styles.content} ${isExtensionOpen ? styles.isContentOpen : ""}`}
          src={websiteUrl}
        />
        <div
          className={`${styles.extension} ${isExtensionOpen ? styles.isExtensionOpen : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
