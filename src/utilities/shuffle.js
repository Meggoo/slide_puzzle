export default function shuffle(array, swap) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = ~~(Math.random() * (i + 1));

    swap(i, randomIndex, array);
  }
  return array;
}
