import clsx from "clsx";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";

import styles from "./button.module.css";

export interface ButtonProps extends RACButtonProps {
  isIcon?: boolean;
  isInlineSubmit?: boolean;
}

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={clsx(
        styles.button,
        props.className,
        props.isIcon && styles.isIcon,
        props.isInlineSubmit && styles.isInlineSubmit
      )}
    />
  );
}
