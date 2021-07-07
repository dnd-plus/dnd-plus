export function declOfNum(
  number: number,
  /** ['склонение для числа 0', 'склонение для числа 1', 'склонение для числа 2'] */
  titles: [string, string, string],
  addNumber = true,
) {
  titles = [titles[1], titles[2], titles[0]]
  const cases = [2, 0, 1, 1, 1, 2]
  // magic
  const title =
    titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ]

  return addNumber ? `${number} ${title}` : title
}
