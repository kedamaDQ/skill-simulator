import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import rootReducer from './reducers';
import loadPolyfills from './load_polyfills';
import SkillSimulatorContainer from './containers/skill_simulator';

//import registerServiceWorker from './registerServiceWorker';

loadPolyfills();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <SkillSimulatorContainer />
  </Provider>,
  document.getElementById('root')
);

//registerServiceWorker();
