import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Input, Button, Icon, Checkbox, message } from 'antd';
import './form.less';
const FormItem = Form.Item;

class Login extends PureComponent {

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                message.success(`${userInfo.userName} 恭喜登录成功！登陆密码为： ${userInfo.userPwd}`);
            }
        });
        this.props.form.resetFields();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Fragment>
                <Card title="登录行内表单" className="card-wrapper">
                    <Form layout='inline'>
                        <FormItem><Input placeholder='请输入用户名' /></FormItem>
                        <FormItem><Input type='password' placeholder='请输入密码' /></FormItem>
                        <FormItem><Button type='primary'>登录</Button></FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="card-wrapper">
                    <Form layout='horizontal' className='form-login'>
                        <FormItem>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        },
                                        {
                                            min: 6,
                                            max: 12,
                                            message: '长度不在范围内'
                                        },
                                        {
                                            // pattern:new RegExp('^\\w+$','g'),
                                            pattern: /^\w+$/g,
                                            message: '用户名必须为字母或者数字'
                                        }
                                    ]
                                })(<Input prefix={<Icon type="user" />} placeholder='请输入用户名' />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: ''
                                })(<Input prefix={<Icon type="lock" />} type='password' placeholder='请输入密码' />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remenber', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(<Checkbox>记住密码</Checkbox>)
                            }
                            <a href="/">忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type='primary' onClick={this.handleSubmit}>登录</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Fragment>
        );
    }
}

export default Form.create({})(Login);