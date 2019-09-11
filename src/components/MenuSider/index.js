import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, Redirect } from 'react-router-dom';
import RouteConfig from '../../configs/router.config';
import { connect } from 'react-redux';
import { switchMenuOption } from '../../store/actionCreater';
import './menuSider.less';
const { Sider } = Layout;
const { SubMenu } = Menu;

class MenuSider extends PureComponent {
    state = {
        currentKey: localStorage.getItem("_menuitem") ? JSON.parse(localStorage.getItem("_menuitem")) : ['/home'],
        collapsed: false,
        openKeys: ['/home'],
        rootSubmenuKeys: ['/home']
    }

    handleClick = ({ item, key }) => {
        if (key === this.state.currentKey[0]) {
            return false;
        }

        let currentKey = [key];
        this.setState({
            currentKey
        });

        localStorage.setItem("_menuitem", JSON.stringify(currentKey));
        // 切换菜单，清理上次查询条件
        localStorage.setItem("_search", []);

        const { dispatch } = this.props;
        dispatch(switchMenuOption(item.props.eventKey));
    }
    // 菜单滑动开关
    onCollapse = collapsed => {
        this.setState({ collapsed });
    }
    // 展开父级菜单
    onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    UNSAFE_componentWillMount() {
        // 是否登陆登录，防止未登录越权操作
        let userInfo = localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo")) : false;
        this.setState({
            userInfo
        });
    }

    componentDidMount() {
        let menuList = this.getMenuList(RouteConfig);
        this.setState({
            menuList
        });
    }
    // 菜单递归
    getMenuList = (routeList) => {
        let roleMenuList = this.state.userInfo ? this.state.userInfo._menus : '/home';
        roleMenuList = roleMenuList.split(',');

        return routeList.map(item => {
            if (roleMenuList.indexOf(item.path) === -1) {
                return '';
            }
            if (item.routes) {
                this.state.rootSubmenuKeys.push(item.path);
                return <SubMenu
                    key={item.path}
                    title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.name}</span>
                        </span>
                    }>
                    {this.getMenuList(item.routes)}
                </SubMenu>
            }
            return <Menu.Item key={item.path}>
                <NavLink to={item.path} replace>
                    <Icon type={item.icon} />
                    <span>{item.name}</span>
                </NavLink>
            </Menu.Item>
        });
    }

    render() {
        if (!this.state.userInfo) {
            return <Redirect to='/login' />
        }

        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark"
                    defaultSelectedKeys={this.state.currentKey}
                    onClick={this.handleClick}
                    selectedKeys={this.props.currentKey}
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    mode="inline"
                >
                    {this.state.menuList}
                </Menu>
            </Sider>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentKey: state.selectedKeys
    }
}

export default connect(mapStateToProps)(MenuSider);