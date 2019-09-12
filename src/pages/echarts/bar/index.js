import React, { PureComponent, Fragment } from 'react';
import { Card, BackTop } from 'antd';
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../../../configs/themeRGB.config';
// import echarts from 'echarts';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱形图
import 'echarts/lib/chart/bar';
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
                    type: 'bar',
                    data: [
                        2000,
                        1000,
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
                data: ['jack', 'marry', 'tom']
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
                    name: 'Jack',
                    type: 'bar',
                    data: [
                        2000,
                        1000,
                        1500,
                        3000,
                        2000,
                        1200,
                        800
                    ]
                },
                {
                    name: 'Marry',
                    type: 'bar',
                    data: [
                        1000,
                        2000,
                        1200,
                        2000,
                        3000,
                        1500,
                        900
                    ]
                },
                {
                    name: 'Tom',
                    type: 'bar',
                    data: [
                        1500,
                        2500,
                        3000,
                        1000,
                        2000,
                        1200,
                        600
                    ]
                }
            ]
        }

        return option;
    }

    render() {
        return (
            <Fragment>
                <BackTop />
                <Card title='柱形图表之一' className='card-wrapper'>
                    <ReactEcharts option={this.getOption()} theme='manager' style={{ height: 500 }} />
                </Card>
                <Card title='柱形图表之二' className='card-wrapper'>
                    <ReactEcharts option={this.getOption2()} theme='manager' style={{ height: 500 }} />
                </Card>
            </Fragment>
        );
    }
}

export default Bar;