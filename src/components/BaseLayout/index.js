import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { switchMenuOption } from '../../store/actionCreater';
import clearLoginInfo from '../../utils/clearLoginInfo';
import MenuSider from '../MenuSider';
import Header from '../Header';
import Footer from '../Footer';

class BaseLayout extends PureComponent {
    state = {}

    returnLogin = () => {
        clearLoginInfo();
        window.location.hash = '/#/login';
    }

    render() {

        //拦截哈希路由地址改变，越权操作
        let roleMenuList = localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo"))['_menus'] : '';
        roleMenuList = roleMenuList.split(',');
        let route = window.location.hash.replace(/#|\?.*$/g, '');

        let flag = roleMenuList.indexOf(route);
        if ((route !== '/login' || route !== '/register') && flag === -1) {
            this.returnLogin();
        }
        // 强制关闭浏览器，重新打开,需要重新登录
        if (localStorage.getItem("_logouttime")) {
            this.returnLogin();
        }
        // 保存角色权限
        const { dispatch } = this.props;
        dispatch(switchMenuOption(route));
        localStorage.setItem("_menuitem", JSON.stringify([route]));

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <MenuSider />
                <Layout>
                    <Header />
                    {this.props.children}
                    <Footer />
                </Layout>
            </Layout>
        );
    }
}

export default connect()(BaseLayout);