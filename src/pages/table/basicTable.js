import React, { PureComponent, Fragment } from 'react';
import Axios from '../../utils/axios';
import { Card, Modal, Button, message, BackTop } from 'antd';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import './table.less';

class BasicTable extends PureComponent {

    state = {
        dataSource: [],
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
                })
                this.setState({
                    dataSource: res.result,
                    selectedRows: null,
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

    changeSelected = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    changeRow = (selectedRowKeys, selectedRows) => {
        selectedRowKeys = [selectedRowKeys];
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    handleDelete = () => {
        let rows = this.state.selectedRows;
        let ids = [];
        rows.map((item) => {
            return ids.push(item.id);
        })

        Modal.confirm({
            title: '删除提示',
            content: `你确定要删除${ids.join(',')}数据吗？`,
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
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === '1' ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
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
                dataIndex: 'interest'
                ,
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
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];

        const { page, page_size, total_count, showSizeChanger, showQuickJumper, selectedRowKeys } = this.state;
        const pagination = {
            page,
            page_size,
            total_count,
            showSizeChanger,
            showQuickJumper
        }

        return (
            <Fragment>
                <BackTop />
                <Card title='基础表格' className='card-wrapper'>
                    <Table
                        tableType='default'
                        rowKey='id'
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
                <Card title="单选表格" className='card-wrapper'>
                    <Table
                        tableType='radio'
                        columns={columns}
                        dataSource={this.state.dataSource}
                        changeRow={this.changeRow}
                        selectedRowKeys={selectedRowKeys}
                    />
                </Card>
                <Card title="多选表格" className='card-wrapper'>
                    <div>
                        <Button type='primary' icon='edit'>编辑</Button>
                        <Button type='danger' icon='delete' onClick={this.handleDelete}>删除</Button>
                    </div>
                    <Table
                        tableType='checkbox'
                        columns={columns}
                        dataSource={this.state.dataSource}
                        changeSelected={this.changeSelected}
                        selectedRowKeys={selectedRowKeys}
                    />
                </Card>
                <Card title="分页表格" className='card-wrapper'>
                    <Table
                        tableType='default'
                        rowKey='id'
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                    <Pagination callback={this.changePage} pagination={pagination} />
                </Card>
            </Fragment>
        );
    }
}

export default BasicTable;