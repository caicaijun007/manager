import React, { PureComponent, Fragment } from 'react';
import { Card, BackTop } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../../../configs/theme.config';
// import echarts from 'echarts';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折线图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import '../echart.less';

class Bar extends PureComponent {

    UNSAFE_componentWillMount() {
        echarts.registerTheme('manager', echartTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: '用户订单量'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                }
            ]
        }

        return option;
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '用户订单量'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['Jerry订单量', 'Lucy订单量']
            },
            xAxis: {
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Jerry订单量',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                },
                {
                    name: 'Lucy订单量',
                    type: 'line',
                    stack: '总量',
                    data: [
                        1000,
                        2000,
                        5500,
                        6000,
                        8000,
                        10000,
                        12000
                    ]
                }
            ]
        }

        return option;
    }

    getOption3 = () => {
        let option = {
            title: {
                text: '用户订单量'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [
                    '周一',
                    '周二',
                    '周三',
                    '周四',
                    '周五',
                    '周六',
                    '周日'
                ]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [
                        1000,
                        2000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ],
                    areaStyle: {}
                }
            ]
        }

        return option;
    }

    render() {
        return (
            <Fragment>
                <BackTop />
                <Card title='折线图表之一' className='card-wrapper'>
                    <ReactEcharts option={this.getOption()} theme='manager' />
                </Card>
                <Card title='折线图表之二' className='card-wrapper'>
                    <ReactEcharts option={this.getOption2()} theme='manager' />
                </Card>
                <Card title='折线图表之三' className='card-wrapper'>
                    <ReactEcharts option={this.getOption3()} theme='manager' />
                </Card>
            </Fragment>
        );
    }
}

export default Bar;