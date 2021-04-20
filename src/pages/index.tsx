import "bootstrap/dist/css/bootstrap.min.css";
import { time } from "node:console";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import changeAllBarsColor from "../utils/changeAllBarColors";
import changeBarColor from "../utils/changeBarColor";
import { checkSorting } from "../utils/checkSorting";
import getRandomValues from "../utils/getRandomValues";
import sleep from "../utils/sleep";
import { swap } from "../utils/swap";

export default function Home() {
  const [values, setValues] = useState([]);
  const [nValues, setNValues] = useState(100);
  const [algorithmIsRunning, setAlgorithmIsRunning] = useState(false);
  const [sortType, setSortType] = useState("Bubble sort");
  const sortTypes = [
    "Bubble sort",
    "Selection sort",
    "Merge sort",
    "Quick sort",
  ];
  const pivots = [];
  const compareValues = [];
  const indexes = [];
  const barMaxHeight = 300;
  const [speed, setSpeed] = useState(1);

  async function handleType(type) {
    let sort;
    setAlgorithmIsRunning(() => true);
    changeAllBarsColor("white");

    switch (type) {
      case "Merge sort":
        sort = new Merge();
        await sort.mergeSortHelper(
          values,
          0,
          values.length - 1,
          values.slice()
        );
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
          changeAllBarsColor("white");
          changeBarColor(i, "red");
          changeBarColor(i - 1, "blue");
          if (array[i] < array[i - 1]) {
            let swapArray = await swap(array, i, i - 1, speed);
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
      let minimumnElement: number;

      for (let i = 0; i < this.n; i++) {
        minimumnElement = i;

        for (let j = i; j < this.n; j++) {
          changeAllBarsColor("white");
          changeBarColor(minimumnElement, "blue");
          changeBarColor(j, "red");
          await sleep(speed);

          if (array[j] < array[minimumnElement]) {
            minimumnElement = j;
          }
        }

        let swapArray = await swap(array, i, minimumnElement, speed);
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
        compareValues.push(i);
        changeAllBarsColor("white");
        indexes.map((idx) => {
          if (idx != pivotIndex) {
            changeBarColor(idx, "aqua");
          }
        });

        compareValues.map((values) => {
          if (values != pivotIndex) {
            changeBarColor(values, "green");
          }
        });

        pivots.map((pivot) => changeBarColor(pivot, "tomato"));

        await sleep(speed);

        if (array[i] < pivotValue) {
          let swapArray = await swap(array, i, pivotIndex, 0);
          await setValues(() => [...swapArray]);

          pivots.splice(pivots.indexOf(pivotIndex), 1);
          pivotIndex++;
          pivots.push(pivotIndex);
        }
        compareValues.splice(compareValues.indexOf(i), 1);
      }

      let swapArray = await swap(array, pivotIndex, end, speed);
      setValues(() => [...swapArray]);

      for (let j = start; j < end; j++) {
        indexes.splice(indexes.indexOf(j), 1);
      }

      return pivotIndex;
    }
  }

  class Merge {
    constructor() {}

    async mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray) {
      if (startIdx === endIdx) return;
      const middleIdx = Math.floor((startIdx + endIdx) / 2);
      this.mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray);
      this.mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray);
      this.merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray);
    }

    async merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray) {
      let k = startIdx;
      let i = startIdx;
      let j = middleIdx + 1;
      let copyArray = mainArray;
      await sleep(speed);
      while (i <= middleIdx && j <= endIdx) {
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
          copyArray[k++] = auxiliaryArray[i++];
          setValues(() => [...copyArray]);
        } else {
          copyArray[k++] = auxiliaryArray[j++];
          setValues(() => [...copyArray]);
        }
      }

      while (i <= middleIdx) {
        copyArray[k++] = auxiliaryArray[i++];
        setValues(() => [...copyArray]);
      }

      while (j <= endIdx) {
        copyArray[k++] = auxiliaryArray[j++];
        setValues(() => [...copyArray]);
      }
    }
  }

  useEffect(() => {
    setValues(() => getRandomValues(150, barMaxHeight));
    document.querySelector<HTMLElement>(".btn-0").style.backgroundColor =
      "#343a40";
    document.querySelector<HTMLElement>(".btn-0").style.color = "white";
  }, []);

  useEffect(() => {
    setValues(() => getRandomValues(nValues, barMaxHeight));
  }, [nValues]);

  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg navbar-light bg-light"
        expand="lg"
      >
        <button
          disabled={algorithmIsRunning}
          className="btn btn-outline-dark"
          onClick={() =>
            setValues(() => getRandomValues(nValues, barMaxHeight))
          }
        >
          Change Data
        </button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="m-0 p-0 d-flex align-items-center flex-wrap my-4">
            {sortTypes.map((type, index) => (
              <button
                disabled={algorithmIsRunning}
                key={index}
                className={`mx-2 my-lg-0 my-2 btn btn-outline btn-types btn-${index}`}
                onClick={() => {
                  setSortType(() => type);
                  document
                    .querySelectorAll<HTMLElement>(".btn-types")
                    .forEach((btn) => {
                      btn.style.backgroundColor = "transparent";
                      btn.style.color = "#343a40";
                    });
                  document.querySelector<HTMLElement>(
                    `.btn-${index}`
                  ).style.backgroundColor = "#343a40";
                  document.querySelector<HTMLElement>(
                    `.btn-${index}`
                  ).style.color = "white";
                }}
              >
                {type}
              </button>
            ))}
            <div className="m-0 p-0 mx-2">
              <p className="m-0">
                <small className="font-weight-bold">ARRAY SIZE</small>
              </p>
              <input
                disabled={algorithmIsRunning}
                type="range"
                min="10"
                max="150"
                defaultValue={nValues}
                onChange={(event) =>
                  setNValues(() => parseInt(event.target.value))
                }
              />
            </div>
            <div className="m-0 p-0 mx-2">
              <p className="m-0">
                <small className="font-weight-bold">SPEED</small>
              </p>
              <input
                disabled={algorithmIsRunning}
                type="range"
                min="1"
                max="501"
                step="10"
                defaultValue={speed}
                onChange={(event) =>
                  setSpeed(() => parseInt(event.target.value))
                }
              />
            </div>
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

      <div className="container bar-container w-100 d-flex">
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
