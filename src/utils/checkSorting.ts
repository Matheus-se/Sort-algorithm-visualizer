import sleep from "./sleep";

export async function checkSorting(array: number[], start: number, end: number) {
  for (let j = start; j < end; j++) {
    await sleep(1);
    document.querySelector<HTMLElement>(`.bar-${j}`).style.backgroundColor =
      "limeGreen";
  }
}
