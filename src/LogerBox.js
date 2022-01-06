import { useEffect } from "react";
import { LOGER_ID } from "./consts";

const moConfig = { attributes: false, childList: true, subtree: false };
const moCallback = (mutationsList) => {
  const mutation = mutationsList.at(-1);
  const $lastElement = mutation.target.lastChild;

  if ($lastElement) {
    $lastElement.scrollIntoView({
      behavior: "auto"
    });
  }
};

const domObserver = new MutationObserver(moCallback);

const LogerBox = () => {
  useEffect(() => {
    domObserver.observe(document.getElementById(LOGER_ID), moConfig);

    return () => {
      domObserver.disconnect();
    };
  }, []);

  return (
    <section className="homeView__logerBox">
      <header>Loger:</header>
      <div id={LOGER_ID} className="homeView__logerBox__value"></div>
    </section>
  );
};

export default LogerBox;
