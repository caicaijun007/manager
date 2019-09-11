import React, { PureComponent } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import BaseLayout from './components/BaseLayout';
import ContentLayout from './components/Content';
import App from './App';
import Btn from './pages/ui/btn';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousels from './pages/ui/carousel';
import Login from './pages/form/login';
import Register from './pages/form/register';
import BasicTable from './pages/table/basicTable';
import HightTable from './pages/table/hightTable';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/text';
import Role from './pages/main/role';
import User from './pages/main/user';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Demo from './pages/demo';

class Router extends PureComponent {

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/' render={() =>
                            <BaseLayout>
                                <Switch>
                                    <Route path='/home' component={ContentLayout} />
                                    <Route path='/ui/btn' component={Btn} />
                                    <Route path='/ui/modals' component={Modals} />
                                    <Route path='/ui/loadings' component={Loadings} />
                                    <Route path='/ui/notification' component={Notifications} />
                                    <Route path='/ui/messages' component={Messages} />
                                    <Route path='/ui/tabs' component={Tabs} />
                                    <Route path='/ui/gallery' component={Gallery} />
                                    <Route path='/ui/carousel' component={Carousels} />
                                    <Route path='/form/login' component={Login} />
                                    <Route path='/form/register' component={Register} />
                                    <Route path='/table/basic' component={BasicTable} />
                                    <Route path='/table/hight' component={HightTable} />
                                    <Route path='/charts/bar' component={Bar} />
                                    <Route path='/charts/pie' component={Pie} />
                                    <Route path='/charts/line' component={Line} />
                                    <Route path='/text' component={Rich} />
                                    <Route path='/main/role' component={Role} />
                                    <Route path='/main/user' component={User} />
                                    <Route path='/demo' component={Demo} />
                                    <Redirect to="/login" />
                                </Switch>
                            </BaseLayout>
                        } />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}

export default Router;