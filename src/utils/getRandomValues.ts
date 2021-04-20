import changeAllBarsColor from "./changeAllBarColors";

export default function getRandomValues(n: number, max: number) {
    changeAllBarsColor("white");
    return Array.from({ length: n }, () => Math.floor(Math.random() * max));
  }