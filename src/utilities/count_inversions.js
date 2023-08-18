export default function count_inversions(array) {
  let count;

  count = 0;

  for (let i = 0; i < array.length - 1; i++)
    for (let j = i + 1; j < array.length; j++) if (array[i] > array[j]) count++;
  return count;
}
