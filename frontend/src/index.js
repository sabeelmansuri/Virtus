import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap-social';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { toast } from 'react-toastify';

toast.configure({
    autoClose: 3000,
    draggable: false,
    closeButton: false,
    draggablePercent: 100,
    position: 'top-right',
    style: {top: '40px'}
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
