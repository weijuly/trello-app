import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import TrelloPage from './trello/TrelloPage';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../lib/openiconic/font/css/open-iconic-bootstrap.min.css';
import 'react-datetime/css/react-datetime.css';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Reducer from './trello/reducers';

const store = createStore(Reducer);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={TrelloPage}/>
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

