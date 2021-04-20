import sleep from "./sleep";

export async function swap(
  array: number[],
  i: number,
  j: number,
  speed: number
) {
  if (speed != 0) {
    await sleep(speed);
  }
  let data = array;
  [data[i], data[j]] = [data[j], data[i]];

  return data;
}
