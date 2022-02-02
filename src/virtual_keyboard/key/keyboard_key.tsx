import styles from "./keyboard_key.module.css";

export const KeyboardKey = ({
  displayString,
  onClick,
}: {
  displayString: string;
  onClick: () => void;
}) => {
  return (
    <div className={styles.keyboardKey} onClick={onClick}>
      <span className={styles.displayString}>{displayString}</span>
    </div>
  );
};
