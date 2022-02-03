import classNames from "classnames";
import styles from "./keyboard_key.module.css";

export const KeyboardKey = ({
  displayString,
  onClick,
  fontSize = "regular",
}: {
  displayString: string;
  onClick: () => void;
  fontSize?: "regular" | "small";
}) => {
  return (
    <button
      className={classNames(styles.keyboardKey, {
        [styles.fontSmall]: fontSize === "small",
      })}
      onClick={onClick}
    >
      {displayString}
    </button>
  );
};
