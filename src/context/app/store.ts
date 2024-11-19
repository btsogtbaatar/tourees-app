import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import { reactotron } from '../../../ReactotronConfig';

import authSlice from '../../modules/Auth/slice/authSlice';
import notificationSlice from '../../modules/Notification/slice/notificationSlice';
import taskSlice from '../../modules/Request/slice/taskSlice';
import preferenceSlice from '../../modules/Shared/slice/preferenceSlice';

// TODO: Distinguish persistence slices
const rootReducer = combineReducers({
  auth: authSlice,
  preference: preferenceSlice,
  notification: notificationSlice,
  task: taskSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks for Redux Persist compatibility
    }),
  enhancers: getDefaultEnhancers => {
    return __DEV__
      ? getDefaultEnhancers().concat(reactotron.createEnhancer())
      : getDefaultEnhancers();
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export default store;
