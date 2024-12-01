import styles from "./combo-box.module.css";

import {
  Button,
  ComboBox as RACComboBox,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";
import { ChevronUp } from "@repo/icons/chevron-up";

export interface ComboBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    id: string;
    label: string;
    value: string;
  }[];
  label: string;
  placeholder?: string;
}

export function ComboBox({
  className,
  items,
  label,
  placeholder,
}: ComboBoxProps) {
  return (
    <RACComboBox className={className}>
      <div className={styles.inputContainer}>
        <Input
          aria-label={label}
          className={styles.input}
          placeholder={placeholder}
        />
        <Button className={styles.button}>
          <ChevronUp className={styles.buttonIcon} />
        </Button>
      </div>
      <Popover className={styles.popover} placement="top left">
        <ListBox className={styles.listBox}>
          {items.map((item) => (
            <ListBoxItem className={styles.listBoxItem} key={item.id}>
              {item.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </RACComboBox>
  );
}
