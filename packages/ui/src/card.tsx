import clsx from "clsx";

import styles from "./card.module.css";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isBordered?: boolean;
}

export function Card({
  children,
  className,
  isBordered = false,
  ...rest
}: CardProps) {
  return (
    <article
      className={clsx(
        styles.card,
        isBordered && styles.cardBordered,
        className
      )}
      {...rest}
    >
      {children}
    </article>
  );
}
