import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import OAuth from 'oauth-1.0a';
import { persistStore } from 'redux-persist';



const history = createHistory()
const middlewareRouter = routerMiddleware(history)

export default function configureStore() {
    let store = createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(middlewareRouter, thunk.withExtraArgument({OAuth}))
    );
    let persistor = persistStore(store)
    return { persistor, store }
}