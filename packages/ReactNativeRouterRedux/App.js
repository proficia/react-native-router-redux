import React from 'react';
import createHistory from 'history/createMemoryHistory';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import createStore from './redux';
import Root from './routes/Root';

const INITIAL_STATE = {};

const history = createHistory();

const store = createStore(INITIAL_STATE, history);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store} >
        <Router history={history}>
          <Root />
        </Router>
      </Provider>
    );
  }
}
