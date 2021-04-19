import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { checkSorting } from "../utils/checkSorting";
import sleep from "../utils/sleep";
import { swap } from "../utils/swap";

export default function Home() {
  const [values, setValues] = useState([]);
  const [algorithmIsRunning, setAlgorithmIsRunning] = useState(false);
  const [sortType, setSortType] = useState("Bubble sort");
  const sortTypes = [
    "Bubble sort",
    "Selection sort",
    "Merge sort",
    "Quick sort",
  ];
  const pivots = [];
  const indexes = [];

  async function handleType(type) {
    let sort;
    setAlgorithmIsRunning(() => true);

    switch (type) {
      case "Merge sort":
        sort = new Bubble();
        await sort.bubbleSort(values);
        break;
      case "Bubble sort":
        sort = new Bubble();
        await sort.bubbleSort(values);
        break;
      case "Quick sort":
        sort = new Quick();
        await sort.quickSort(values, 0, values.length - 1);
        break;
      case "Selection sort":
        sort = new Selection();
        await sort.selectionSort(values);
        break;
    }

    await checkSorting(values, 0, values.length);
    setAlgorithmIsRunning(() => false);
  }

  class Bubble {
    n: number;

    constructor() {
      this.n = values.length;
    }

    async bubbleSort(array: number[]) {
      let arrayIsNotSorted = true;

      do {
        arrayIsNotSorted = false;
        for (let i = 1; i < this.n; i++) {
          document
            .querySelectorAll<HTMLElement>(`.value-bar`)
            .forEach((bar) => {
              bar.style.backgroundColor = "white";
            });
          document.querySelector<HTMLElement>(
            `.bar-${i}`
          ).style.backgroundColor = "red";
          if (array[i] < array[i - 1]) {
            let swapArray = await swap(array, i, i - 1);
            setValues(() => [...swapArray]);
            arrayIsNotSorted = true;
          }
        }
        this.n -= 1;
      } while (arrayIsNotSorted);
    }
  }

  class Selection {
    n: number;

    constructor() {
      this.n = values.length;
    }

    async selectionSort(array: number[]) {
      let minumunElement: number;

      for (let i = 0; i < this.n; i++) {
        minumunElement = i;

        for (let j = i; j < this.n; j++) {
          // componentizar
          document
            .querySelectorAll<HTMLElement>(`.value-bar`)
            .forEach((bar) => {
              bar.style.backgroundColor = "white";
            });
          document.querySelector<HTMLElement>(
            `.bar-${minumunElement}`
          ).style.backgroundColor = "blue";
          document.querySelector<HTMLElement>(
            `.bar-${j}`
          ).style.backgroundColor = "red";
          await sleep(1);

          if (array[j] < array[minumunElement]) {
            minumunElement = j;
          }
        }

        let swapArray = await swap(array, i, minumunElement);
        setValues(() => [...swapArray]);
      }
    }
  }

  class Quick {
    constructor() {}

    async quickSort(array: number[], start: number, end: number) {
      if (start >= end) {
        return;
      }

      let index = await this.partition(array, start, end);
      pivots.splice(pivots.indexOf(index), 1);

      await Promise.all([
        this.quickSort(array, start, index - 1),
        this.quickSort(array, index + 1, end),
      ]);
    }

    async partition(array: number[], start: number, end: number) {
      for (let j = start; j < end; j++) {
        indexes.push(j);
      }


      let pivotValue = array[end];
      let pivotIndex = start;
      pivots.push(pivotIndex);

      for (let i = start; i < end; i++) {
        document.querySelectorAll<HTMLElement>(`.value-bar`).forEach((bar) => {
          bar.style.backgroundColor = "white";
        });
        
      indexes.map(
        (idx) => {
            if (idx != pivotIndex) {
              document.querySelector<HTMLElement>(`.bar-${idx}`).style.backgroundColor = "aqua";
            };
          }
      );

        pivots.map(
          (pivot) =>
            (document.querySelector<HTMLElement>(`.bar-${pivot}`).style.backgroundColor =
              "tomato")
        );

        if (array[i] < pivotValue) {
          let swapArray = await swap(array, i, pivotIndex);
          await setValues(() => [...swapArray]);

          pivots.splice(pivots.indexOf(pivotIndex), 1);
          pivotIndex++;
          pivots.push(pivotIndex);
        }
      }

      let swapArray = await swap(array, pivotIndex, end);
      setValues(() => [...swapArray]);

      for (let j = start; j < end; j++) {
        indexes.splice(indexes.indexOf(j), 1);
      }

      return pivotIndex;
    }
  }

  class Merge {
    constructor() {}

    mergeSort(array) {
      if (array.length > 1) {
        const half = Math.floor(array.length / 2);
        const firstHalf = this.mergeSort(array.slice(0, half));
        const secondHalf = this.mergeSort(array.slice(half));
        const sortedArray = [];

        for (let i = 0; i < firstHalf.length; i++) {}
      } else {
        return array;
      }
    }
  }

  function getRandomValues(n, max) {
    setValues(() =>
      Array.from({ length: n }, () => Math.floor(Math.random() * max))
    );
  }

  useEffect(() => {
    getRandomValues(100, 300);
  }, []);

  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-light"
        expand="lg"
      >
        <button
          disabled={algorithmIsRunning}
          className="btn btn-outline-dark"
          onClick={() => getRandomValues(100, 300)}
        >
          Change Data
        </button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="m-0 p-0">
            {sortTypes.map((type, index) => (
              <button
                disabled={algorithmIsRunning}
                key={index}
                className={`mx-2 my-lg-0 my-2 btn btn-outline btn-types btn-${index}`}
                onClick={() => {
                  setSortType(() => type);
                  document.querySelectorAll<HTMLElement>('.btn-types').forEach(button => {
                    button.style.backgroundColor = "transparent";
                    button.style.color = "#34a40";
                  });
                  document.querySelector<HTMLElement>(`.btn-${index}`).style.backgroundColor = "#343a40";
                  document.querySelector<HTMLElement>(`.btn-${index}`).style.color = "white";
                }}
              >
                {type}
              </button>
            ))}
          </div>
        </Navbar.Collapse>
        <button
          disabled={algorithmIsRunning}
          className="btn btn-outline-dark"
          onClick={() => handleType(sortType)}
        >
          Sort
        </button>
      </Navbar>

      <div className="container w-100 d-flex">
        {values &&
          values.map((barHeight, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                backgroundColor: "white",
                height: `${barHeight}px`,
              }}
              className={`bar-${index} value-bar border`}
            ></div>
          ))}
      </div>
    </>
  );
}
