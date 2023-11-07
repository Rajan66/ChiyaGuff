import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import {applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers'

// ReactDOM.render(<App />, document.getElementById('root'))

const store = createStore(reducers,compose(applyMiddleware(thunk)))

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);