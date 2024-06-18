import {configureStore} from '@reduxjs/toolkit';
import rootreducer from '../reducers/rootreducer';

const store = configureStore({
  reducer: rootreducer,
});

export default store;
