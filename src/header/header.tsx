import React from "react";
import { HelpScreen } from "../help_screen/help_screen";
import styles from "./header.module.css";

export const Header = () => {
  const [showHelp, setShowHelp] = React.useState(false);

  return (
    <>
      <header className={styles.header}>
        <button onClick={() => setShowHelp(true)} className={styles.helpButton}>
          ?
        </button>
        <h1>Wordle Helper</h1>
      </header>
      {showHelp && <HelpScreen onCloseClick={() => setShowHelp(false)} />}
    </>
  );
};
