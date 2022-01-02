import * as React from 'react';
import Color from 'color';

import { Provider } from 'react-redux'
import Store from './store/configureStore'

import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';

import AppComponent from './components/AppComponent'

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const uiTheme = {
  palette: {
    primaryColor: '#54e48c',
    primaryTextColor: "blue",
  }
};

let customFonts = {
  'VentiCF-Ultra': require('./assets/fonts/venti/VentiCF-Ultra.otf'),
  'VentiCF-Bold': require('./assets/fonts/venti/VentiCF-Bold.otf'),
  'VentiCF-Medium': require('./assets/fonts/venti/VentiCF-Medium.otf'),
  'VentiCF-Thin': require('./assets/fonts/venti/VentiCF-Thin.otf')
};

export default class App extends React.Component {

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <ThemeContext.Provider value={getTheme(uiTheme)}>
          <Provider store={Store}>
            <AppComponent />
          </Provider>
        </ThemeContext.Provider>

      )
    } else {
      return <AppLoading />;
    }

  }
}
