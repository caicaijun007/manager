import React, { PureComponent, Fragment } from 'react';
import { Layout, Avatar, Breadcrumb, Button } from 'antd';
import { connect } from 'react-redux';
import menuChange from '../../configs/menu.config';
import clearLoginInfo from '../../utils/clearLoginInfo';
import './header.less';
const { Header } = Layout;

class HeaderLayout extends PureComponent {

    state = {
        userName: localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo"))['_username'] : '菜菜君'
    }

    // 注销
    onLogout = () => {
        clearLoginInfo();
        window.location.hash = '/#/login';
    }
    // 面包屑
    getBreadCrumb = () => {
        let route = this.props.currentKey;

        let routeRrr = (route[0] !== undefined) ? route[0].split('/') : [];
        if (routeRrr.length > 2) {
            let routeItem = '/' + routeRrr[1];
            return <Breadcrumb.Item>{'/ ' + menuChange[routeItem] + ' / ' + menuChange[route]}</Breadcrumb.Item>
        } else if (menuChange[route]) {
            return <Breadcrumb.Item>{'/ ' + menuChange[route]}</Breadcrumb.Item>
        }
        return <Breadcrumb.Item>{'/ ' + route}</Breadcrumb.Item>
    }

    render() {
        return (
            <Fragment>
                <Header className='header'>
                    <span> <Avatar className='icon' icon="user" />{this.state.userName}</span>
                    <Button type='link' onClick={this.onLogout}>注销</Button>
                </Header>
                <Breadcrumb className='bread'>
                    {this.getBreadCrumb()}
                </Breadcrumb>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentKey: state.selectedKeys
    }
}

export default connect(mapStateToProps)(HeaderLayout);