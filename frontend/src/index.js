import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import "./bootstrap.min.css";
import "./index.css";
import App from "./App";
import BotIcon from "./components/agentC.js";
ReactDOM.render(
  <Provider store={store}>
    <App />
    <BotIcon/>
  </Provider>,
  document.getElementById("root")
);
// import React from "react";
// import ReactDOM from "react-dom/client"; // Updated import for React 18
// import { Provider } from "react-redux";

// import store from "./store";
// import "./bootstrap.min.css";
// import "./index.css";
// import App from "./App";
// import BotIcon from "./components/agentC.js";

// // Create a root and render your app
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <Provider store={store}>
//     <App />
//     {/* <BotIcon /> */}
//   </Provider>
// );

