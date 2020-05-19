import { rootReducer } from '../redux/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { setupCognito } from 'react-cognito';
import { config } from './config';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
setupCognito(store, config);
