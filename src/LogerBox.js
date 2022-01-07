import "./styles_LogerBox.css";
import { useEffect } from "react";
import { LOGER_ID } from "./consts";

const moConfig = { attributes: false, childList: true, subtree: false };
const scrollToLastElement = (mutationsList) => {
  const mutation = mutationsList.at(-1);
  const $lastElement = mutation.target.lastChild;

  if ($lastElement) {
    $lastElement.scrollIntoView({
      behavior: "auto"
    });
  }
};

const domObserver = new MutationObserver(scrollToLastElement);

const LogerBox = () => {
  useEffect(() => {
    domObserver.observe(document.getElementById(LOGER_ID), moConfig);

    return () => {
      domObserver.disconnect();
    };
  }, []);

  return (
    <section className="logerBox">
      <header>Loger:</header>
      <table>
        <thead>
          <tr>
            <th>Counter value</th>
            <th>Name</th>
            <th>Deleted ?</th>
          </tr>
        </thead>
        <tbody id={LOGER_ID} data-deleted="0"></tbody>
        <tfoot>
          <tr>
            <td id="countDeleted">0</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
};

export default LogerBox;
