import log from "./log";
import { useRef, useState } from "react";

const registry = new FinalizationRegistry((heldValue) => {
  log({
    desc: `Deleted <i>${heldValue.name}</i> (#${heldValue.no})`,
    created: new Date()
  });
});

const NonOptimalVariables = () => {
  const nonOptimalVal = {
    counter: 1_000_000,
    label: "How many loops to make: "
  };
  const [counter, setCounter] = useState(1);
  const loop = useRef(null);

  log({
    desc: `Created <i>nonOptimalVal</i> (#${counter})`,
    created: new Date()
  });

  registry.register(nonOptimalVal, {
    no: counter,
    name: "variable nonOptimalVal"
  });

  const startExperiment = () => {
    setCounter(1);

    const fingerprint = setInterval(() => {
      setCounter((currentVal) => {
        if (currentVal >= loop.current.value - 1) {
          console.log(currentVal);
          clearInterval(fingerprint);
        }

        return currentVal + 1;
      });
    }, 50);
  };

  log({
    desc: `Created <i>startExperiment</i> (#${counter})`,
    created: new Date()
  });

  registry.register(startExperiment, {
    no: counter,
    name: "function startExperiment"
  });

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
