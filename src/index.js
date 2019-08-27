import React from 'react';
import { render } from 'react-dom';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as routes from './routes';
import staticRoutes from './staticRoutes';
import './styles.scss';
import StaticContainer from './components/StaticContainer';

Loadable.preloadReady().then(() => {
    render(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={routes.Welcome} />
                <Route path="/help" component={routes.Main} />
                <Route path={staticRoutes} component={StaticContainer} />
            </Switch>
        </BrowserRouter>,
        document.getElementById('root')
    );
});
if (module.hot) {
    module.hot.accept();
}