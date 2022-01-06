import { LOGER_ID } from "./consts";
import { format } from "date-fns";

function log({ created, desc }) {
  const $loger = document.getElementById(LOGER_ID);
  const message = `[${format(created, "HH:mm:ss.SSS")}] ${desc}`;
  if ($loger) {
    const p = document.createElement("p");
    p.innerHTML = message;
    $loger.appendChild(p);
  } else {
    console.info("Loger element isn'n created yet. Message:", message);
  }
}

export default log;
