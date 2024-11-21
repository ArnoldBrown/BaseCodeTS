import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import { store } from './redux/store';
import { theme } from './theme';

const App: React.FC = () => (
  <ReduxProvider store={store}>
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  </ReduxProvider>
);

export default App;
