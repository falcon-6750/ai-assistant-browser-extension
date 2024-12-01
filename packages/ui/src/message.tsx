import clsx from "clsx";

import { Avatar } from "./avatar";
import { Card } from "./card";

import styles from "./message.module.css";

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
  author: string;
  initials: string;
  isBordered?: boolean;
}

export function Message({
  children,
  className,
  author,
  initials,
  ...rest
}: MessageProps) {
  return (
    <Card className={clsx(className)} {...rest}>
      <div className={styles.message}>
        <Avatar initials={initials} />
        <div className={styles.messageContent}>
          <p className={styles.messageAuthor}>{author}</p>
          <div className={styles.messageText}>{children}</div>
        </div>
      </div>
    </Card>
  );
}
