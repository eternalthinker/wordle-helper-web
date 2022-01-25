import { Constraints, MAX_SUGGESTED_WORDS, Word } from "./root_state";

const commonLettersMap: Record<string, number> = {
  e: 11.16,
  a: 8.45,
  r: 7.58,
  i: 7.54,
  o: 7.16,
  t: 6.95,
  n: 6.65,
  s: 5.74,
  l: 5.49,
  c: 4.54,
  u: 3.63,
  d: 3.38,
};

const getCommonLetterScore = (
  word: string,
  excludedLetters: Set<string>
): number => {
  let score = 0;
  // Push plurals down to the bottom
  if (word[word.length - 1] === "s") {
    return score;
  }
  // Push possible past tense to the bottom
  if (word[word.length - 2] === "e" && word[word.length - 1] === "d") {
    return score;
  }
  const wordSet = new Set<string>(word.split(""));
  wordSet.forEach((letter) => {
    if (excludedLetters.has(letter)) {
      return;
    }
    if (commonLettersMap[letter] != null) {
      score += commonLettersMap[letter];
    }
  });
  return score;
};

const intersection = (s1: Set<string>, s2: Set<string>) => {
  const result = new Set<string>();
  s1.forEach((elem) => {
    if (s2.has(elem)) {
      result.add(elem);
    }
  });
  return result;
};

const stableSort = (
  list: string[],
  comparator: (a: string, b: string) => number
) => {
  const idxList: [string, number][] = list.map((elem, i) => [elem, i]);
  const stableComparator = (a: [string, number], b: [string, number]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  };
  idxList.sort(stableComparator);
  const sortedList: string[] = [];
  idxList.forEach((item) => {
    sortedList.push(item[0]);
  });
  return sortedList;
};

export const getSuggestedWords = (
  wordList: string[],
  constraints: Constraints,
  currentInputLine: number
) => {
  const allWords: string[] = [];
  for (let i = 0; i < wordList.length; ++i) {
    const word = wordList[i];
    let skipWord = false;
    const wordSet = new Set<string>(word.split(""));

    if (intersection(wordSet, constraints.excludedLetters).size > 0) {
      continue;
    }

    if (
      intersection(wordSet, constraints.includedLetters).size !==
      constraints.includedLetters.size
    ) {
      continue;
    }

    for (let j = 0; j < word.length; ++j) {
      const letter = word[j];
      if (constraints.incorrectPositions[j].has(letter)) {
        skipWord = true;
        break;
      }
    }
    if (skipWord) {
      continue;
    }

    allWords.push(word);
  }

  let displayedWords = allWords.slice(0, MAX_SUGGESTED_WORDS);
  if (currentInputLine < 3) {
    // Stable sort displayedWords
    displayedWords = stableSort(displayedWords, (a, b) => {
      return (
        getCommonLetterScore(b, constraints.excludedLetters) -
        getCommonLetterScore(a, constraints.excludedLetters)
      );
    });
  }

  return {
    allWords,
    displayedWords,
  };
};
