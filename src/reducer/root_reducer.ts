export type RootState = {
  lines: [];
  constraints: {
    excludedLetters: [];
    includedLetters: [];
    incorrectPositions: [];
    letterCounts: [];
  };
  suggestedWords: {
    allWords: [];
    displayedWords: [];
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

export const initialState: RootState = {
  lines: [],
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
