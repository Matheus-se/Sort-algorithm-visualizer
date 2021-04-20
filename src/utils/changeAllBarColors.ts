export default function changeAllBarsColor(color: string) {
  document.querySelectorAll<HTMLElement>(`.value-bar`).forEach((bar) => {
    bar.style.backgroundColor = color;
  });
}
