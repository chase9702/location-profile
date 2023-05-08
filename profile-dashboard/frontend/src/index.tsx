import React from "react";
import * as ReactDom from 'react-dom'
import {Provider} from 'react-redux';
import {applyMiddleware, createStore, Store, compose} from 'redux';
import rootReducer, {StoreState} from './reducers';
import thunk from 'redux-thunk';
import {taskMiddleware} from 'react-palm/tasks';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, taskMiddleware];
export const store: Store<StoreState> = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

import App from "./App";

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
document.getElementById('root')
)
;

