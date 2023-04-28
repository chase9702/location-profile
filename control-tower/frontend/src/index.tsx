import React from "react";
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store, compose } from 'redux';
import rootReducer, { StoreState } from './reducers';
import thunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
export const store: Store<StoreState> = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

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

