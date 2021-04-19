import sleep from "./sleep";

export async function swap(array:number[], i: number, j: number) {
    await sleep(1);
    let data = array;
    [data[i], data[j]] = [data[j], data[i]];

    return data;
}