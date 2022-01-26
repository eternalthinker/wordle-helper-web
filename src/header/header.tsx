import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <button className={styles.helpButton}>?</button>
      <h1>Wordle Helper</h1>
    </header>
  );
};
