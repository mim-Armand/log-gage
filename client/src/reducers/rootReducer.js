// import {combineReducers} from 'redux';
import stuff from './stuffReducer';
import {  routerReducer } from 'react-router-redux'
import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native;

const persistConfig = {
    key: 'root',
    storage,
}

// const rootReducer = combineReducers({
//     stuff,
//     router: routerReducer
// });



const rootReducer = persistCombineReducers(persistConfig,
        {
            stuff,
            router: routerReducer
        });

export default rootReducer;