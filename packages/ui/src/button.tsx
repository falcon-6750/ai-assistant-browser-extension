import clsx from "clsx";
import {
  Button as RACButton,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";

import styles from "./button.module.css";

export function Button(props: RACButtonProps) {
  return (
    <RACButton {...props} className={clsx(styles.button, props.className)} />
  );
}
