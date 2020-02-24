import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import groupReducer from './group/group.reducer';

const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  group: groupReducer,
});

export default persistReducer(persistConfig, rootReducer);