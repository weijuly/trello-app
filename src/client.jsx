import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import TrelloPage from './trello/TrelloPage';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={TrelloPage}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
