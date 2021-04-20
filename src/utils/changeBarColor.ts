export default function changeBarColor(index: number, color: string) {
    document.querySelector<HTMLElement>(`.bar-${index}`).style.backgroundColor = color;
}