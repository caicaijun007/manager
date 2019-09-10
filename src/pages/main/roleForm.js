import React, { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

class RoleForm extends PureComponent {

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <FormItem label='角色名' {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type='text' placeholder='请输入角色名' />
                        )
                    }
                </FormItem>
                <FormItem label='使用状态'{...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            initialValue: 1
                        })(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}

export default Form.create({})(RoleForm);