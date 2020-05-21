import { combineReducers } from "redux";
import { setupCognito, cognito } from 'react-cognito';


export interface IApplicationState {
     cognito: any;
}

export const rootReducer = combineReducers({
     cognito,
});