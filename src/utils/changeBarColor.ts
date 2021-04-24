export default function changeBarColor(index: number, color: string) {
    let bar = document.querySelector<HTMLElement>(`.bar-${index}`);
    if (bar) {
        bar.style.backgroundColor = color;
    }
}