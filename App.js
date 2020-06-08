import * as React from 'react';

import { Provider } from 'react-redux'
import Store from './store/configureStore'

import AppComponent from './components/AppComponent'

export default function App() {

  return (
    <Provider store={Store}>
      <AppComponent/>
    </Provider>
  );
}
