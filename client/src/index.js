import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/es/integration/react';
import Spinner from "./components/Spinner/Spinner";

const { persistor, store } = configureStore();

const onBeforeLift = () => {
    console.log('ON BUFFER LIFT!')
    // take some action before the gate lifts
}


ReactDOM.render(
    <Provider store={store}>
        <PersistGate
            loading={<Spinner isLoading={true}/>}
            onBeforeLift={onBeforeLift}
            persistor={persistor}>
            <App></App>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
