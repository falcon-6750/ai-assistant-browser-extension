import clsx from "clsx";

import styles from "./avatar.module.css";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string;
}

export function Avatar({ initials, className, ...rest }: AvatarProps) {
  return (
    <div className={clsx(styles.avatar, className)} {...rest}>
      {initials}
    </div>
  );
}
