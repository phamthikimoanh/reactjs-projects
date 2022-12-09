import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index.js';

// Configure the store
const store = configureStore({
	reducer: rootReducer,
});
