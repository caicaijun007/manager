import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Modal, message } from 'antd';
import Axios from '../../utils/axios';
import Utils from '../../utils/utils';
import clearUserInfo from '../../utils/clearLoginInfo';
import Register from '../register';
import Pagination from '../../components/Pagination';
import EditForm from './userEditForm';
import Table from '../../components/Table';
import Search from '../../components/Search';
import { connect } from 'react-redux';
import { searchData } from '../../store/actionCreater';
import './main.less';

class User extends PureComponent {

    state = {
        search: localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : [],
        roleList: [],
        showEditUserForm: false,
        showCreateUserForm: false,
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
            url: '/user_list',
            data: {
                params: {
                    page: page ? page : this.state.page,
                    total: pageSize ? pageSize : this.state.page_size,
                    ...search
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                localStorage.setItem("_search", JSON.stringify(search));
                const { dispatch } = this.props;
                dispatch(searchData(search));
                this.setState({
                    dataSource: res.result,
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

    onEdit = (item, type) => {
        const _this = this;
        if (type === 'edit') {
            // 编辑
            this.setState({
                showEditUserForm: true,
                userInfo: item
            })
        } else if (type === 'delete') {
            // 删除
            let uid = item.uid;
            let user_name = item.user_name;
            Modal.confirm({
                title: '删除操作',
                content: `你确定要删除"${user_name}"用户吗？`,
                onOk() {
                    Axios.ajax({
                        url: '/delete_user',
                        data: {
                            params: {
                                uid
                            }
                        }
                    }).then((res) => {
                        if (res.code === 0) {
                            _this.request(1);
                            message.success('删除成功');
                        }
                    })
                },
                onCancel() { }
            });
        }
    }

    onEditUserInfo = () => {
        const _this = this;
        const userDetail = this.editForm.props.form.getFieldsValue();
        userDetail.uid = this.state.userInfo.uid;
        Axios.ajax({
            url: '/edit_user_info',
            data: {
                params: {
                    ...userDetail
                }
            }
        }).then(res => {
            if (res.code === 0) {
                this.setState({
                    showEditUserForm: false
                });

                let user = localStorage.getItem("_userinfo") ? JSON.parse(localStorage.getItem("_userinfo"))['_username'] : 'caicaijun';
                if (this.state.userInfo.user_name === user) {
                    clearUserInfo();
                    window.location.hash = '/#/login';
                    message.success('设置成功');
                } else {
                    _this.request();
                    message.success('设置成功');
                }
            }
        })
    }

    render() {
        const columns = [
            {
                title: '用户ID',
                dataIndex: 'uid',
                width: 80
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                width: 120
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 60,
                render(sex) {
                    return sex === '1' ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 60
            },
            {
                title: '联系地址',
                dataIndex: 'address',
                width: 160
            },
            {
                title: '角色ID',
                dataIndex: 'role_id',
                width: 80
            },
            {
                title: '角色名',
                dataIndex: 'role_name',
                width: 100
            },
            {
                title: '最后登录时间',
                dataIndex: 'last_login_time',
                render(time) { return Utils.dateFormate(time) },
                width: 160
            },
            {
                title: '操作',
                width: 180,
                render: (text, item) => {
                    return <div>
                        <Button type='primary' icon='edit' onClick={() => { this.onEdit(item, 'edit') }}>编辑</Button>
                        <Button type='danger' icon='delete' onClick={() => { this.onEdit(item, 'delete') }}>删除</Button>
                    </div>
                }
            }
        ];

        const { search, roleList } = this.state;
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
                label: '性别',
                dateKey: 'sex',
                initValue: search.sex ? search.sex : '100',
                optionList: [
                    { 'key': '100', 'value': '全部' },
                    { 'key': '1', 'value': '男' },
                    { 'key': '0', 'value': '女' }
                ]
            },
            {
                searchType: 'input',
                label: '用户名',
                dateKey: 'user_name',
                initValue: search.user_name ? search.user_name : ''
            },
            {
                searchType: 'input_number',
                label: '年龄',
                dateKey: 'age',
                initValue: search.age ? search.age : ''
            }
        ];

        return (
            <Fragment>
                {
                    this.state.showCreateUserForm ? <Card title='注册列表' className='card-wrapper'>
                        <Register isLogin={true} changeOption={() => {
                            this.setState({ showCreateUserForm: false });
                            this.request();
                        }} />
                    </Card> :
                        (
                            <Fragment>
                                <Card className='card-wrapper'>
                                    <Search searchConfig={searchConfig} searchDataSubmit={this.searchDataSubmit} />
                                </Card>
                                <Card className='card-wrapper card-diffrent'>

                                    <Button type='primary' icon='plus' onClick={() => {
                                        this.setState({ showCreateUserForm: true })
                                    }}>创建用户</Button>
                                    <Table
                                        tableType='default'
                                        rowKey='uid'
                                        columns={columns}
                                        dataSource={this.state.dataSource}
                                    />
                                    <Pagination callback={this.changePage} pagination={pagination} />
                                    <Modal
                                        title='编辑信息'
                                        visible={this.state.showEditUserForm}
                                        okText="确定"
                                        cancelText="取消"
                                        onCancel={() => {
                                            this.setState({
                                                showEditUserForm: false
                                            })
                                            this.editForm.props.form.resetFields();
                                        }}
                                        onOk={this.onEditUserInfo}>
                                        <EditForm
                                            userInfo={this.state.userInfo}
                                            wrappedComponentRef={(inst) => { this.editForm = inst }}
                                        />
                                    </Modal>
                                </Card>
                            </Fragment>
                        )
                }
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(User);