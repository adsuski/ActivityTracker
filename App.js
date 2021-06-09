import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStore,combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import RoutesNavigator from './navigation/RoutesNavigator';
import routesReducer from './store/routes-reducer';
import coordsReducer from './store/coords-reducer';
import {init} from './helpers/db';

init().then(()=>{
  console.log('Initialiazed database');
}).catch(err=>{
  console.log('Initialiazing db failed');
  console.log(err);
});


const rootReducer=combineReducers({
  routes:routesReducer,
  coords:coordsReducer
});

const store =createStore(rootReducer,applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
  <RoutesNavigator/>
  </Provider>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
