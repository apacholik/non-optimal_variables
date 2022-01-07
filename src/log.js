import { LOGER_ID } from "./consts";

export const logerStateManager = (() => {
  const state = {
    // exUUID: {
    //   count: {
    //     total: 3,
    //     fOrV: 2,
    //     otherFOrV: 1,
    //   },
    //   values: [
    //     {
    //       name: "fOrV",
    //       renderNo: 1,
    //     },
    //     {
    //       name: "fOrV",
    //       renderNo: 2,
    //     },
    //     {
    //       name: "otherFOrV",
    //       renderNo: 1,
    //     },
    //   ],
    //   element: document.createElement("div")
    // },
  };

  const syncExElements = () => {
    const $loger = document.getElementById(LOGER_ID);
    if ($loger) {
      Object.values(state).forEach((partOfState) => {
        if (!$loger.querySelector(partOfState.element.id)) {
          $loger.appendChild(partOfState.element);
        }
      });
    }
  };

  const createIfNo = (exUUID, expectedCount = null) => {
    if (!state[exUUID]) {
      const $exElement = document.createElement("div");
      $exElement.id = `#ex_${exUUID}`;
      $exElement.innerHTML = `
        <div class="measure"><div style="height: 0%"></div></div>
          <div title="${exUUID}" class="label-y">${exUUID}</div>
      `;

      state[exUUID] = {
        count: {
          total: 0
        },
        expectedCount,
        values: [],
        element: $exElement
      };

      syncExElements();
    }
  };

  return {
    create: createIfNo,
    add: (exUUID, obj) => {
      createIfNo(exUUID);

      const partOfState = state[exUUID];

      partOfState.values.push(obj);
      if (!partOfState.count[obj.name]) {
        partOfState.count[obj.name] = 1;
      } else {
        partOfState.count[obj.name] += 1;
      }

      partOfState.count.total += 1;

      const $measure = partOfState.element.querySelector(".measure");
      $measure.children[0].style.height = `${
        (partOfState.count.total / partOfState.expectedCount) | 1
      }%`;
    },
    count: (exUUID) => {
      return state[exUUID].count;
    }
  };
})();

function log({ created, title, type, no, experimentId }) {
  // console.table([
  //   format(created, "HH:mm:ss.SSS"),
  //   experimentId,
  //   type,
  //   no,
  //   title
  // ]);

  logerStateManager.add(experimentId, {
    name: title,
    renderNo: no
  });

  // const $loger = document.getElementById(LOGER_ID);
  // const exElementId = `#ex_${experimentId}`;
  // console.log("loger!", $loger);
  // if ($loger) {
  // const x = $loger.querySelector(exElementId);

  // if (x) {
  // } else {
  //   const $exElement = document.createElement("div");
  //   $exElement.id = exElementId;
  //   $exElement.innerHTML = `
  //   <div class="measure"><div style="height: 30%"></div></div>
  //     <div title="${experimentId}" class="label-y">${experimentId}</div>
  //   `;
  //   $loger.appendChild($exElement);
  // }
  // }
}

export default log;
