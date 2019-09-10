import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Modal, message } from 'antd';
import Axios from '../../utils/axios';
import Utils from '../../utils/utils';
import clearUserInfo from '../../utils/clearLoginInfo';
import Register from '../register';
import Pagination from '../../components/Pagination';
import EditForm from './userEditForm';
import Table from '../../components/Table';
import './main.less';

class User extends PureComponent {

    state = {
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
    }

    request = (page, pageSize) => {
        Axios.ajax({
            url: '/user_list',
            data: {
                params: {
                    page: page ? page : this.state.page,
                    total: pageSize ? pageSize : this.state.page_size
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                this.setState({
                    dataSource: res.result,
                    page: res.page,
                    page_size: res.page_size,
                    total_count: res.total_count
                })
            }
        })
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
                            _this.request();
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

        const pagination = { ...this.state }

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
                            <Card title='用户列表' className='card-wrapper'>
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
                        )
                }
            </Fragment>
        );
    }
}

export default User;