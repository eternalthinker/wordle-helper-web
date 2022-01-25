export type LetterStatus = "correct" | "misplaced" | "absent" | "input";

export type Letter = {
  letter?: string;
  status: LetterStatus;
};

export type Word = Letter[];

export type WordLineStatus = "completed" | "input";

export type WordLine = {
  word: Word;
  status: WordLineStatus;
};

export type RootState = {
  wordle: {
    wordLines: WordLine[];
    currentInputLine: number;
    currentInputLetter: number;
  };
  constraints: {
    excludedLetters: [];
    includedLetters: [];
    incorrectPositions: [];
    letterCounts: [];
  };
  suggestedWords: {
    allWords: string[];
    displayedWords: string[];
  };
};

export const initWord: WordLine = {
  word: new Array(5).fill({ letter: undefined, status: "input" }),
  status: "input",
};

export const initialState: RootState = {
  wordle: {
    wordLines: [initWord],
    currentInputLine: 0,
    currentInputLetter: -1,
  },
  constraints: {
    excludedLetters: [],
    includedLetters: [],
    incorrectPositions: [],
    letterCounts: [],
  },
  suggestedWords: {
    allWords: [],
    displayedWords: [],
  },
};

export type Action =
  | {
      type: "letter_status";
      payload: {
        lineIndex: number;
        letterIndex: number;
        status: LetterStatus;
      };
    }
  | {
      type: "letter_input";
      payload: {
        letter: string;
      };
    }
  | {
      type: "letter_delete";
    }
  | {
      type: "word_enter";
    };
    