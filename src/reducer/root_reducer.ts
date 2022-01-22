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

export type Action = {
  type: "letter_status";
  payload: {
    lineIndex: number;
    letterIndex: number;
    status: string;
  };
};

export const rootReducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case "letter_status": {
      return state;
    }
    default: {
      return state;
    }
  }
};

const initWord: WordLine = {
  word: new Array(5).fill({ letter: undefined, status: "input" }),
  status: "input",
};

export const initialState: RootState = {
  wordle: {
    wordLines: [initWord],
    currentInputLine: 0,
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
