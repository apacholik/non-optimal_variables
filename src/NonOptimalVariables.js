import log from "./log";
import { CREATE_VAR, DELETE_VAR, LOGER_ID } from "./consts";
import { useEffect, useRef, useState } from "react";

const registry = new FinalizationRegistry((heldValue) => {
  log({
    title: heldValue.name,
    created: new Date(),
    type: DELETE_VAR,
    no: heldValue.no
  });
});

const NonOptimalVariables = () => {
  const nonOptimalVal = {
    counter: 1_000_000,
    label: "How many loops to make: "
  };
  const [counter, setCounter] = useState(1);
  const [isDo, setIsDo] = useState(false);
  const loop = useRef(null);

  log({
    title: "nonOptimalVal",
    created: new Date(),
    type: CREATE_VAR,
    no: counter
  });

  registry.register(nonOptimalVal, {
    no: counter,
    name: "nonOptimalVal"
  });

  const startExperiment = () => {
    const $loger = document.getElementById(LOGER_ID);
    $loger.innerHTML = "";
    $loger.dataset.created = 0;
    $loger.dataset.deleted = 0;

    setCounter(1);
    setIsDo(true);
  };

  log({
    title: "startExperiment",
    created: new Date(),
    type: CREATE_VAR,
    no: counter
  });

  registry.register(startExperiment, {
    no: counter,
    name: "startExperiment"
  });

  useEffect(() => {
    if (isDo) {
      const fingerprint = setInterval(() => {
        setCounter((currentVal) => {
          if (currentVal >= loop.current.value - 1) {
            clearInterval(fingerprint);
            setIsDo(false);
          }

          return currentVal + 1;
        });
      }, 1);
    }
  }, [isDo]);

  return (
    <div>
      <label htmlFor="loop">{nonOptimalVal.label}</label>
      <input
        id="loop"
        ref={loop}
        maxLength="9"
        size="10"
        defaultValue={nonOptimalVal.counter}
        type="number"
      />{" "}
      <button onClick={startExperiment} type="button">
        START
      </button>
      <br />
      <br />
      The loop was performed{" "}
      <input readOnly size="10" value={counter} type="input" /> times.
    </div>
  );
};

export default NonOptimalVariables;
