import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("App");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
