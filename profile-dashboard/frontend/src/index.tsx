import React from "react";
import * as ReactDom from 'react-dom'
import {Provider} from 'react-redux';
import {applyMiddleware, legacy_createStore as createStore, Store, compose} from 'redux';
import rootReducer, {StoreState} from './reducers';
import thunk from 'redux-thunk';
import {enhanceReduxMiddleware} from '@kepler.gl/reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = enhanceReduxMiddleware([thunk]);
const enhancers = [applyMiddleware(...middleware)];
export const store: Store<StoreState> = createStore(rootReducer,{}, composeEnhancers(...enhancers));

import App from "./App";

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
;

