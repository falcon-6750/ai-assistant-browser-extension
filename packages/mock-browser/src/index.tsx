import styles from "./index.module.css";

import { ArrowDownTray } from "./icons/ArrowDownTray";
import { ArrowLeft } from "./icons/ArrowLeft";
import { ArrowRight } from "./icons/ArrowRight";
import { EllipsisVertical } from "./icons/EllipsisVertical";
import { Globe } from "./icons/Globe";
import { Refresh } from "./icons/Refresh";
import { Sparkle } from "./icons/Sparkle";

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

export function MockBrowser({ extensionName = "Falcon AI Extension" }) {
  return (
    <div className={styles.window}>
      <div className={styles.toolbar}>
        <div className={styles.tabRegion}>
          <div className={styles.tabGroup}>
            <div className={styles.tab}>
              <Globe className={styles.icon} />
              GA Tech
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
          <input
            className={styles.locationBar}
            value="https://www.gatech.edu"
          />
          <div className={styles.iconGroup}>
            <button
              className={`${styles.iconButton} ${styles.extensionButton}`}
              aria-label={`Open ${extensionName}`}
              title={`Open ${extensionName}`}
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
    </div>
  );
}
