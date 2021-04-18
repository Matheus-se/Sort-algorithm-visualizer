import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import sleep from "../utils/sleep";

export default function Home() {
  const [values, setValues] = useState([]);
  const [sortType, setSortType] = useState("Bubble sort");
  const sortTypes = [
    "Bubble sort",
    "Selection sort",
    "Merge sort",
    "Quick sort",
  ];

  function handleType(type) {
    let sort;

    switch (type) {
      case "Merge sort":
        sort = new Bubble();
        sort.bubbleSort(values);
        break;
      case "Bubble sort":
        sort = new Bubble();
        sort.bubbleSort(values);
        break;
      case "Quick sort":
        sort = new Bubble();
        sort.bubbleSort(values);
        break;
      case "Selection sort":
        sort = new Selection();
        sort.selectionSort(values);
        break;
    }
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
          document.querySelectorAll<HTMLElement>(`.value-bar`).forEach((bar) => {
            bar.style.backgroundColor = "white";
          });
          document.querySelector<HTMLElement>(`.bar-${i}`).style.backgroundColor = "red";
          await sleep(1);
          if (array[i] < array[i - 1]) {
            let data = array;
            [data[i], data[i - 1]] = [data[i - 1], data[i]];
            setValues(() => [...data]);
            arrayIsNotSorted = true;
          }
        }
        this.n -= 1;
      } while (arrayIsNotSorted);
      for (let j = 0; j < values.length; j++) {
        document.querySelector<HTMLElement>(`.bar-${j}`).style.backgroundColor = "green";
        await sleep(1);
      }
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
          await sleep(1);

          // componentizar
          document.querySelectorAll<HTMLElement>(`.value-bar`).forEach((bar) => {
            bar.style.backgroundColor = "white";
          });
          document.querySelector<HTMLElement>(
            `.bar-${minumunElement}`
          ).style.backgroundColor = "blue";
          document.querySelector<HTMLElement>(`.bar-${j}`).style.backgroundColor = "red";

          if (array[j] < array[minumunElement]) {
            minumunElement = j;
          }
        }

        // componentizar
        let data = array;
        [data[i], data[minumunElement]] = [data[minumunElement], data[i]];
        setValues(() => [...data]);
      }

      for (let j = 0; j < values.length; j++) {
        document.querySelector<HTMLElement>(`.bar-${j}`).style.backgroundColor = "green";
        await sleep(1);
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
    console.log(values);
  }, []);

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <button
          className="btn btn-outline-dark"
          onClick={() => getRandomValues(100, 300)}
        >
          Change Data
        </button>
        <div className="p-0 m-0">
          {sortTypes.map((type, index) => (
            <button key={index} className="mx-2 btn btn-outline-dark" onClick={() => setSortType(() => type)} >{type}</button>
          ))}
        </div>
        <button
          className="btn btn-outline-dark"
          onClick={() => handleType(sortType)}
        >
          Sort
        </button>
      </nav>

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

