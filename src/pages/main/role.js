import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Modal, message } from 'antd';
import Axios from '../../utils/axios';
import Utils from '../../utils/utils';
import menuChange from '../../configs/menu.config';
import clearLoginInfo from '../../utils/clearLoginInfo';
import Pagination from '../../components/Pagination';
import PermissonForm from './rolePermissionForm';
import RoleForm from './roleForm';
import Table from '../../components/Table';
import Search from '../../components/Search';
import { connect } from 'react-redux';
import { searchData } from '../../store/actionCreater';
import './main.less';

class Role extends PureComponent {

    state = {
        search: localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : [],
        roleList: [],
        showCreateRole: false,
        showSetPermission: false,
        page: 1,
        page_size: 10,
        total_count: 0,
        showSizeChanger: true,
        showQuickJumper: true
    }

    componentDidMount() {
        this.request();
        this.getRoleList();
    }

    request = (page, pageSize, search = this.state.search) => {
        Axios.ajax({
            url: '/role_list',
            data: {
                params: {
                    page: page ? page : this.state.page,
                    total: pageSize ? pageSize : this.state.page_size,
                    ...search
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    return item.key = index;
                });
                localStorage.setItem("_search", JSON.stringify(search));
                const { dispatch } = this.props;
                dispatch(searchData(search));
                this.setState({
                    dataSource: res.result,
                    selectedRowKeys: '',
                    selectedRows: null,
                    page: res.page,
                    page_size: res.page_size,
                    total_count: res.total_count
                })
            }
        })
    }
    // 获取角色列表
    getRoleList = () => {
        Axios.ajax({
            url: '/role_list',
            data: {
                params: {
                    type: 1
                }
            }
        }).then(res => {
            if (res.code === 0) {
                let roleList = [{ 'key': '1000', 'value': '全部' }];
                let tempList = {};
                res.result.forEach(item => {
                    tempList = {
                        'key': item.role_id,
                        'value': item.role_name
                    }
                    roleList.push(tempList);
                });
                this.setState({ roleList });
            }
        })
    }
    // 接受子组件传回来的查询参数，重新查询数据
    searchDataSubmit = (search) => {
        this.request(1, this.state.page_size, search);
    }
    // 改变分页显示条数
    changePage = (page, pageSize = false) => {
        this.request(page, pageSize);
    }

    changeRow = (selectedRowKeys, selectedRows) => {
        selectedRowKeys = [selectedRowKeys];
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    onCreateRole = () => {
        this.setState({
            showCreateRole: true
        })
    }

    createRole = () => {
        const _this = this;
        let data = this.roleForm.props.form.getFieldsValue();
        data.authorize_user = JSON.parse(localStorage.getItem("_userinfo"))['_username'];
        Axios.ajax({
            url: '/create_role',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    showCreateRole: false
                })
                this.roleForm.props.form.resetFields();
                _this.request(1);
                message.info('创建成功');
            }
        })
    }

    onSetPermission = () => {
        if (!this.state.selectedRows) {
            Modal.info({
                title: '提示信息',
                content: '请选择一个角色'
            })
            return;
        }
        let menuInfo = this.state.selectedRows.menus;
        menuInfo = menuInfo ? menuInfo.split(',') : [];
        this.setState({
            menuInfo,
            showSetPermission: true,
            roleDetail: this.state.selectedRows
        })
    }

    setPermission = () => {
        const _this = this;
        let data = this.permissonForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedRows.role_id;
        data.menus = this.state.menuInfo;
        Axios.ajax({
            url: '/edit_permission',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    showSetPermission: false
                });
                if (data.role_id === 1001) {
                    clearLoginInfo();
                    window.location.hash = '/#/login';
                    message.success('设置成功');
                } else {
                    _this.request();
                    message.success('设置成功');
                }

            }
        });
    }

    onDeleteRole = () => {
        const _this = this;
        if (!this.state.selectedRows) {
            Modal.info({
                title: '提示信息',
                content: '请选择一个角色'
            })
            return;
        }

        const { role_id, role_name } = this.state.selectedRows;
        Modal.confirm({
            title: '删除操作',
            content: `你确定要删除"${role_name}"角色吗？`,
            onOk() {
                Axios.ajax({
                    url: '/delete_role',
                    data: {
                        params: {
                            role_id
                        }
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        _this.request(1);
                        message.success('删除成功');
                    }
                });
            },
            onCancel() { }
        });
    }

    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'role_id',
                width: 100
            },
            {
                title: '角色名称',
                dataIndex: 'role_name',
                width: 150
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render(time) { return Utils.dateFormate(time) },
                width: 150
            },
            {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status === '1') {
                        return "启用"
                    } else {
                        return "停用"
                    }
                },
                width: 100
            },
            {
                title: '权限',
                dataIndex: 'menus',
                render(menus) {
                    return menus.split(',').map((item) => {
                        if (menuChange[item]) {
                            return menuChange[item];
                        }
                        return '';
                    }).filter((item) => {
                        return item;
                    }).join('/');
                },
                width: 250
            },
            {
                title: '授权人',
                dataIndex: 'authorize_user',
                width: 100
            }
        ];

        const { selectedRowKeys, search, roleList } = this.state;
        const pagination = { ...this.state };

        const searchConfig = [
            {
                searchType: 'select',
                label: '角色名',
                dateKey: 'role_name',
                initValue: search.role_name ? search.role_name : '1000',
                optionList: roleList
            },
            {
                searchType: 'select',
                label: '使用状态',
                dateKey: 'status',
                initValue: search.status ? search.status : '100',
                optionList: [
                    { 'key': '100', 'value': '全部' },
                    { 'key': '1', 'value': '启用' },
                    { 'key': '0', 'value': '停用' }
                ]
            },
            {
                searchType: 'input',
                label: '授权人',
                dateKey: 'authorize_user',
                initValue: search.authorize_user ? search.authorize_user : ''
            }
        ];

        return (
            <Fragment>
                <Card className='card-wrapper'>
                    <Search searchConfig={searchConfig} searchDataSubmit={this.searchDataSubmit} />
                </Card>
                <Card className='card-wrapper card-diffrent'>
                    <Button type='primary' icon='plus' onClick={this.onCreateRole}>创建角色</Button>
                    <Button type='primary' icon='edit' onClick={this.onSetPermission}>设置权限</Button>
                    <Button type='danger' icon='delete' onClick={this.onDeleteRole}>删除</Button>
                    <Table
                        tableType='radio'
                        columns={columns}
                        dataSource={this.state.dataSource}
                        changeRow={this.changeRow}
                        selectedRowKeys={selectedRowKeys}
                    />
                    <Pagination callback={this.changePage} pagination={pagination} />
                </Card>
                <Modal
                    title='创建角色'
                    visible={this.state.showCreateRole}
                    okText="确定"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            showCreateRole: false
                        })
                        this.roleForm.props.form.resetFields();
                    }}
                    onOk={this.createRole}>
                    <RoleForm wrappedComponentRef={(inst) => { this.roleForm = inst }} />
                </Modal>
                <Modal
                    title='设置权限'
                    visible={this.state.showSetPermission}
                    okText="确定"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({
                            showSetPermission: false
                        })
                    }}
                    onOk={this.setPermission}>
                    <PermissonForm
                        wrappedComponentRef={(inst) => { this.permissonForm = inst }}
                        roleDetail={this.state.roleDetail}
                        menuInfo={this.state.menuInfo || []}
                        checkMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            });
                        }}
                    />
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(Role);