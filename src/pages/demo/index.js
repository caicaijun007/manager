import React, { PureComponent, Fragment } from 'react';
import { Card, Form, InputNumber, DatePicker, Radio, Select, Button } from 'antd';
import Table from '../../components/Table';
import Pagination from '../../components/Pagination';
import Axios from '../../utils/axios';
import { connect } from 'react-redux';
import { searchData } from '../../store/actionCreater';
import moment from 'moment';
import './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

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

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                let search = this.props.form.getFieldsValue();
                if (search.product_time) {
                    search.product_time = moment(search.product_time).format('YYYY-MM-DD');
                }
                this.request(this.state.page, this.state.page_size, search);
            }
        })
    }

    // 改变分页显示条数
    changePage = (page, pageSize = false) => {
        this.request(page, pageSize);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
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

        return (
            <Fragment>
                <Card className='card-wrapper'>
                    <Form layout='inline'>
                        <FormItem label='手机型号'>
                            {

                                getFieldDecorator('product_name', {
                                    initialValue: search.product_name ? search.product_name : '0'
                                })(
                                    <Select className='select-option'>
                                        <Option value="0">全部</Option>
                                        <Option value="1">华为</Option>
                                        <Option value="2">小米</Option>
                                        <Option value="3">OPPO</Option>
                                        <Option value="4">三星</Option>
                                        <Option value="5">apple</Option>
                                    </Select>
                                )
                            }

                        </FormItem>
                        <FormItem label='款式'>
                            {
                                getFieldDecorator('product_color', {
                                    initialValue: search.product_color ? search.product_color : '0'
                                })(
                                    <Select className='select-option'>
                                        <Option value="0">全部</Option>
                                        <Option value="1">梦幻蓝</Option>
                                        <Option value="2">魅惑红</Option>
                                        <Option value="3">优雅黑</Option>
                                        <Option value="4">土豪金</Option>
                                        <Option value="5">华丽白</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label='价格'>
                            {
                                getFieldDecorator('product_price', {
                                    initialValue: search.product_price
                                })(
                                    <InputNumber />)
                            }
                        </FormItem>
                        <FormItem label='库存'>
                            {
                                getFieldDecorator('product_store', {
                                    initialValue: search.product_store ? search.product_store : '1'
                                })(
                                    <RadioGroup>
                                        <Radio value='1'>有</Radio>
                                        <Radio value='0'>无</Radio>
                                    </RadioGroup>)
                            }
                        </FormItem>
                        <FormItem label='发布日期'>
                            {
                                getFieldDecorator('product_time', {
                                    initialValue: search.product_time
                                })(
                                    <DatePicker className='date-picker' />)
                            }
                        </FormItem>
                        <Button type='primary' onClick={this.handleSubmit}>查询</Button>
                    </Form>
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

export default connect(mapStateToProps)(Form.create()(Demo));