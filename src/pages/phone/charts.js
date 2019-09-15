import React, { PureComponent, Fragment } from 'react';
import { Card } from 'antd';
import Search from '../../components/Search';
import Axios from '../../utils/axios';
import { connect } from 'react-redux';
import { searchData } from '../../store/actionCreater';
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../../configs/theme.config';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import moment from 'moment';
import './phone.less';
const colorList = {
    '1': '梦幻蓝',
    '2': '魅惑红',
    '3': '优雅黑',
    '4': '土豪金',
    '5': '华丽白'
}

class PhoneCharts extends PureComponent {

    state = {
        search: localStorage.getItem("_search") ? JSON.parse(localStorage.getItem("_search")) : [],
        dataSource: [],
        page: 1,
        page_size: 10,
        total_count: 0,
        showSizeChanger: true,
        showQuickJumper: true
    }

    UNSAFE_componentWillMount() {
        echarts.registerTheme('manager', echartTheme);
    }

    componentDidMount() {
        this.request();
    }

    request = (page, pageSize, search = this.state.search) => {
        Axios.ajax({
            url: '/phone_list',
            data: {
                params: {
                    charts: true,
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

    getOption = () => {
        let s = this.state.search;
        let optionData = !s.product_color || s.product_color === '0' ? [
            '梦幻蓝',
            '魅惑红',
            '优雅黑',
            '土豪金',
            '华丽白'
        ] : [colorList[s.product_color]];
        let option = {
            title: {
                text: '手机价格型号趋势对比'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['华为', '小米', 'OPPO', '三星', 'apple']
            },
            xAxis: {
                data: optionData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '华为',
                    type: 'bar',
                    data: this.state.dataSource['华为']
                },
                {
                    name: '小米',
                    type: 'bar',
                    data: this.state.dataSource['小米']
                },
                {
                    name: 'OPPO',
                    type: 'bar',
                    data: this.state.dataSource['OPPO']
                },
                {
                    name: '三星',
                    type: 'bar',
                    data: this.state.dataSource['三星']
                }
                ,
                {
                    name: 'apple',
                    type: 'bar',
                    data: this.state.dataSource['apple']
                }
            ]
        }

        return option;
    }

    getOption2 = () => {
        let s = this.state.search;
        let optionData = !s.product_color || s.product_color === '0' ? [
            '梦幻蓝',
            '魅惑红',
            '优雅黑',
            '土豪金',
            '华丽白'
        ] : [colorList[s.product_color]];
        let option = {
            title: {
                text: '手机价格型号趋势对比'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['华为', '小米', 'OPPO', '三星', 'apple']
            },
            xAxis: {
                data: optionData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '华为',
                    type: 'line',
                    data: this.state.dataSource['华为']
                },
                {
                    name: '小米',
                    type: 'line',
                    data: this.state.dataSource['小米']
                },
                {
                    name: 'OPPO',
                    type: 'line',
                    data: this.state.dataSource['OPPO']
                },
                {
                    name: '三星',
                    type: 'line',
                    data: this.state.dataSource['三星']
                }
                ,
                {
                    name: 'apple',
                    type: 'line',
                    data: this.state.dataSource['apple']
                }
            ]
        }

        return option;
    }

    render() {

        const { search } = this.state;

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
            }
        ];

        return (
            <Fragment>
                <Card className='card-wrapper'>
                    <Search searchConfig={searchConfig} searchDataSubmit={this.searchDataSubmit} />
                </Card>
                <Card className='card-wrapper card-diffrent'>
                    <ReactEcharts option={this.getOption()} theme='manager' />
                </Card>
                <Card className='card-wrapper card-diffrent'>
                    <ReactEcharts option={this.getOption2()} theme='manager' />
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

export default connect(mapStateToProps)(PhoneCharts);