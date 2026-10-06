// Label whole words, retaining internal apostrophes and hyphens, but not sentence punctuation.
export function translationWords(text: string) {
  return text
    .trim()
    .split(/\s+/u)
    .map((word) => word.replace(/^\p{P}+|\p{P}+$/gu, ''))
    .filter((word) => /[\p{L}\p{N}]/u.test(word));
}
