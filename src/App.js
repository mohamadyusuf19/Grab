import React, { Component } from 'react';
import createStore from './store/createStore';
import AppContainer from './AppContainer'

class App extends Component {
  renderApp() {
    const initialState = window.__INITIAL_STATE__;
    const store = createStore(initialState);
    return (
      <AppContainer store={store} />
    )
  }

  render() {
    return this.renderApp();
  }
}

export default App;