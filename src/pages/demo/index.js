import React, { PureComponent, Fragment } from 'react';
import { Card } from 'antd';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Search from '../../components/Search';
import Axios from '../../utils/axios';
import { connect } from 'react-redux';
import { searchData } from '../../store/actionCreater';
import moment from 'moment';
import './index.less';

class Demo extends PureComponent {

    state = {
        search: localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : [],
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

    request = (page, pageSize, search = this.state.search) => {
        Axios.ajax({
            url: '/phone_list',
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
                })
                localStorage.setItem("_search", JSON.stringify(search));
                const { dispatch } = this.props;
                dispatch(searchData(search));
                this.setState({
                    search,
                    dataSource: res.result,
                    page: res.page,
                    page_size: res.page_size,
                    total_count: res.total_count
                })
            }
        })
    }

    searchDataSubmit = (search) => {
        if (search.product_time) {
            search.product_time = moment(search.product_time).format('YYYY-MM-DD');
        }
        this.request(1, this.state.page_size, search);
    }

    // 改变分页显示条数
    changePage = (page, pageSize = false) => {
        this.request(page, pageSize);
    }

    render() {
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id'
            },
            {
                title: '手机型号',
                dataIndex: 'product_name'
            },
            {
                title: '款式',
                dataIndex: 'product_color',
                render(color) {
                    let config = {
                        '1': '梦幻蓝',
                        '2': '魅惑红',
                        '3': '优雅黑',
                        '4': '土豪金',
                        '5': '华丽白'
                    };
                    return config[color];
                }
            },
            {
                title: '价格',
                dataIndex: 'product_price',
                sorter: (a, b) => a.product_price - b.product_price,
                render(price) {
                    return `$${price}`
                }
            },
            {
                title: '库存',
                dataIndex: 'product_store',
                render(store) {
                    return store === '1' ? '有' : '无';
                }
            },
            {
                title: '发布日期',
                dataIndex: 'product_time'
            }
        ];

        const { search } = this.state;
        const pagination = { ...this.state };

        const searchConfig = [
            {
                searchType: 'select',
                label: '手机型号',
                dateKey: 'product_name',
                initValue: search.product_name ? search.product_name : '0',
                optionList: [
                    { 'key': '0', 'value': '全部' },
                    { 'key': '1', 'value': '华为' },
                    { 'key': '2', 'value': '小米' },
                    { 'key': '3', 'value': 'OPPO' },
                    { 'key': '4', 'value': '三星' },
                    { 'key': '5', 'value': 'apple' }
                ]
            },
            {
                searchType: 'select',
                label: '款式',
                dateKey: 'product_color',
                initValue: search.product_color ? search.product_color : '0',
                optionList: [
                    { 'key': '0', 'value': '全部' },
                    { 'key': '1', 'value': '梦幻蓝' },
                    { 'key': '2', 'value': '魅惑红' },
                    { 'key': '3', 'value': '优雅黑' },
                    { 'key': '4', 'value': '土豪金' },
                    { 'key': '5', 'value': '华丽白' }
                ]
            },
            {
                searchType: 'input_number',
                label: '价格',
                dateKey: 'product_price',
                initValue: search.product_price
            },
            {
                searchType: 'radio_group',
                label: '库存',
                dateKey: 'product_store',
                initValue: search.product_store ? search.product_store : '1',
                radioList: [
                    { 'key': '1', 'value': '有' },
                    { 'key': '0', 'value': '无' }
                ]
            },
            {
                searchType: 'date_picker',
                label: '发布日期',
                dateKey: 'product_time',
                initValue: search.product_time,
                showTime: false
            }
        ];

        return (
            <Fragment>
                <Card className='card-wrapper'>
                    <Search searchConfig={searchConfig} searchDataSubmit={this.searchDataSubmit} />
                </Card>
                <Card className='card-wrapper card-diffrent'>
                    <Table
                        tableType='default'
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                    <Pagination callback={this.changePage} pagination={pagination} />
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}

export default connect(mapStateToProps)(Demo);