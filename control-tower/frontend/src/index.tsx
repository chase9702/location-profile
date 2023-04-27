import React from "react";
// import ReactDOM from "react-dom/client";
import * as ReactDom from 'react-dom';
import App from "./App";
//
// const root = ReactDOM.createRoot(
//     document.getElementById("root") as HTMLElement
// );
// root.render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );jjnkm


ReactDom.render(
    <App/>,
    document.getElementById('root')
);

