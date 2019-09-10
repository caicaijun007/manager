import React, { PureComponent, Fragment } from 'react';
import Axios from '../../utils/axios';
import { Card, Modal, Button, message, Badge, BackTop } from 'antd';
import Table from '../../components/Table';

class HightTable extends PureComponent {

    state = {
        dataSource: [],
        dataSource2: [],
        page: 1,
        page_size: 10,
        total_count: 0,
        showSizeChanger: true,
        showQuickJumper: true
    }

    componentDidMount() {
        this.request();
        this.request2();
    }

    request = (page, pageSize) => {
        Axios.ajax({
            url: '/table_list',
            data: {
                params: {
                    page: page ? page : this.state.page,
                    total: pageSize ? pageSize : this.state.page_size
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    return item.key = index;
                });
                this.setState({
                    dataSource: res.result,
                })
            }
        });
    }

    request2 = (page, pageSize) => {
        Axios.ajax({
            url: '/table_list',
            data: {
                params: {
                    test: true,
                    page: page ? page : this.state.page,
                    total: pageSize ? pageSize : this.state.page_size
                }
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    return item.key = index;
                });
                this.setState({
                    dataSource2: res.result,
                })
            }
        });
    }

    // 改变分页显示条数
    changePage = (page, pageSize = false) => {
        this.request(page, pageSize);
    }

    handleChange = (pagination, filters, sorter) => {
        console.log("::" + sorter)
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleDelete = (item) => {
        let id = item.id;
        Modal.confirm({
            title: '确认',
            content: `您确认要删除此条数据吗？id=${id}`,
            onOk: () => {
                message.success('删除成功');
                this.request();
            }
        })
    }

    render() {
        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
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
                width: 80,
                render(sex) {
                    return sex === '1' ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 180,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '海边吹风',
                        '3': '公园散步',
                        '4': '一起登山',
                        '5': '到处逛街',
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 160,
                render(data) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[data];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 100
            },
            {
                title: '地址',
                dataIndex: 'address'
            }
        ];

        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
                fixed: 'left'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                width: 120,
                fixed: 'left'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === '1' ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 120,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '海边吹风',
                        '3': '公园散步',
                        '4': '一起登山',
                        '5': '到处逛街',
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 120,
                render(data) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[data];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time1',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time2',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time3',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time4',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time5',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time6',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time7',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time8',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time9',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time10',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time11',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time12',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time13',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time14',
                width: 120
            },
            {
                title: '测试',
                dataIndex: 'time15',
                width: 120,
                fixed: 'right'
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80,
                fixed: 'right'
            }
        ];

        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
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
                width: 80,
                render(sex) {
                    return sex === '1' ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter: (a, b) => a.age - b.age
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 120,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '海边吹风',
                        '3': '公园散步',
                        '4': '一起登山',
                        '5': '到处逛街',
                    }
                    return config[state];
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 120,
                render(data) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸',
                    }
                    return config[data];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            }
        ];

        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id',
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
                width: 80,
                render(sex) {
                    return sex === '1' ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 120,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '海边吹风',
                        '3': '公园散步',
                        '4': '一起登山',
                        '5': '到处逛街',
                    }
                    return config[state];
                }
            },
            {
                title: 'type',
                dataIndex: 'interest',
                width: 80,
                render(data) {
                    let config = {
                        '1': <Badge status='success' text='成功' />,
                        '2': <Badge status='error' text='报错' />,
                        '3': <Badge status='default' text='正常' />,
                        '4': <Badge status='processing' text='进行中' />,
                        '5': <Badge status='warning' text='警告' />
                    }
                    return config[data];
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 80
            },
            {
                title: '操作',
                width: 180,
                render: (text, item) => {
                    return <div>
                        <Button size="small" type='primary' icon='edit'>编辑</Button>
                        <Button size="small" type='danger' icon='delete' onClick={() => { this.handleDelete(item) }}>删除</Button>
                    </div>
                }
            }
        ];

        return (
            <Fragment>
                <BackTop />
                <Card title="头部固定" className='card-wrapper'>
                    <Table
                        tableType='default'
                        columns={columns}
                        dataSource={this.state.dataSource}
                        scroll={{ y: 240 }}
                    />
                </Card>
                <Card title="左右侧固定" className='card-wrapper'>
                    <Table
                        tableType='default'
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        scroll={{ x: 2410 }}
                    />
                </Card>
                <Card title="表格排序" className='card-wrapper'>
                    <Table
                        tableType='default'
                        columns={columns3}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="操作按钮" className='card-wrapper'>
                    <Table
                        tableType='default'
                        columns={columns4}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </Fragment>
        );
    }
}

export default HightTable;