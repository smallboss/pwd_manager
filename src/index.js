import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from "react-tap-event-plugin";

import App from './components/App.js';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import store from './redux/store';


injectTapEventPlugin();


const history = syncHistoryWithStore(hashHistory, store);

render(
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <Route path="/" component={App}>
                    <IndexRoute                component={Login       } onEnter={Login.onEnter    }/>
                    <Route path="registration" component={Registration}                                />
                    <Route path="dashboard"    component={Dashboard   } onEnter={Dashboard.onEnter}/>
                    <Redirect from="*" to='/' />
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
);
