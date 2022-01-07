import { LOGER_ID, DELETE_VAR } from "./consts";
import { format } from "date-fns";

const idxRowMaper = {
  no: 1,
  title: 2,
  isDeleted: 3
};

function bumpSup($cell) {
  const $sup = $cell.querySelector("sup");
  if ($sup) {
    const count = Number($sup.innerHTML.match(/[0-9]*/));
    $sup.innerText = `${count + 1}`;
  } else {
    $cell.innerHTML = `X<sup>1<sup>`;
  }
}

function log({ created, title, type, no, experimentId }) {
  const $loger = document.getElementById(LOGER_ID);

  console.table([
    format(created, "HH:mm:ss.SSS"),
    experimentId,
    type,
    no,
    title
  ]);

  if ($loger) {
    const currentExId = $loger.dataset.exId;

    if (currentExId !== experimentId) {
      console.info(`Old experiment is a live! ${experimentId}`);
      return;
    }

    const id = `${title}_${no}_${experimentId}`;
    let $row = $loger.querySelector(`#${id}`);

    if ($row) {
      switch (type) {
        case DELETE_VAR: {
          const $cell = $row.querySelector(
            `td:nth-child(${idxRowMaper.isDeleted})`
          );
          if ($cell.innerHTML === "-") {
            $loger.dataset.deleted = Number($loger.dataset.deleted) + 1;
            $cell.innerHTML = "X";
          } else {
            bumpSup($cell);
          }
          break;
        }
        default:
          console.error("Loger: Unsuported type!");
      }
    } else {
      $row = document.createElement("tr");
      $row.id = id;
      $row.innerHTML = `
        <td>${no}</td>
        <td>${title}</td>
        <td>${DELETE_VAR === type ? "X" : "-"}</td>
      `;
      $loger.appendChild($row);

      if (DELETE_VAR === type) {
        $loger.dataset.deleted = Number($loger.dataset.deleted) + 1;
      }
    }

    const $deleted = document.getElementById("countDeleted");
    $deleted.innerText = $loger.dataset.deleted;
  }
  // else {
  // const message = `[${format(
  //   created,
  //   "HH:mm:ss.SSS"
  // )}] ${type} #${no} ${title}`;
  // console.info("Loger element isn'n created yet. Message:", message);
  // }
}

export default log;
