import "./styles_LogerBox.css";
// import { useEffect } from "react";
import { LOGER_ID } from "./consts";

// const moConfig = { attributes: false, childList: true, subtree: false };
// const scrollToLastElement = (mutationsList) => {
//   const mutation = mutationsList.at(-1);
//   const $lastElement = mutation.target.lastChild;

//   if ($lastElement) {
//     $lastElement.scrollIntoView({
//       behavior: "auto"
//     });
//   }
// };

// const domObserver = new MutationObserver(scrollToLastElement);

const LogerBox = () => {
  // useEffect(() => {
  //   const x= document.getElementById(LOGER_ID);

  //   if (!x) {
  //     return;
  //   }

  //   domObserver.observe(x, moConfig);

  //   return () => {
  //     domObserver.disconnect();
  //   };
  // }, []);

  return (
    <section className="logerBox">
      <header>Loger:</header>
      <div id={LOGER_ID}>
        {/* <div id="exId_1">
          <div className="measure"></div>
          <div className="label-y">c66ef1c3-ce12-41b5-a588-8aaeba715b31</div>
        </div> */}
      </div>
    </section>
  );
};

export default LogerBox;
