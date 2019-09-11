import React, { PureComponent, Fragment } from 'react';
import { Form, Input, InputNumber, DatePicker, Radio, Select, Button } from 'antd';
import './index.less';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class Search extends PureComponent {

    state = {}

    handleSubmit = (e) => {
        e && e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                let searchInfo = this.props.form.getFieldsValue();
                this.props.searchDataSubmit(searchInfo);
            }
        })
    }

    getItemList = (list, itemType) => {
        let itemList = [];
        list.forEach(item => {
            if (itemType === 'option') {
                itemList.push(<Option value={item.key} key={item.key}>{item.value}</Option>);
            } else if (itemType === 'radio') {
                itemList.push(<Radio value={item.key} key={item.key}>{item.value}</Radio>);
            }

        })

        return itemList;
    }

    getFormList = () => {
        const { getFieldDecorator } = this.props.form;
        let formList = [];
        this.props.searchConfig.forEach(item => {
            if (item.searchType === 'input') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <Input maxLength={8} />)
                        }
                    </FormItem>);
            } else if (item.searchType === 'input_number') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <InputNumber />)
                        }
                    </FormItem>
                );
            } else if (item.searchType === 'select') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <Select className='select-option'>
                                    {this.getItemList(item.optionList, 'option')}
                                </Select>)
                        }
                    </FormItem>
                );
            } else if (item.searchType === 'radio_group') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(
                                <RadioGroup>
                                    {this.getItemList(item.radioList, 'radio')}
                                </RadioGroup>)
                        }
                    </FormItem>
                );
            } else if (item.searchType === 'date_picker') {
                formList.push(
                    <FormItem label={item.label} key={item.dateKey}>
                        {
                            getFieldDecorator(item.dateKey, {
                                initialValue: item.initValue
                            })(<DatePicker className='date-picker' showTime={item.showTime} />)
                        }
                    </FormItem>
                );
            } else { }
        })
        return formList;
    }

    render() {
        return (
            <Fragment>
                <Form layout='inline'>
                    {this.getFormList()}
                    <Button type='primary' onClick={this.handleSubmit}>查询</Button>
                </Form>
            </Fragment>
        );
    }
}

export default Form.create()(Search);