import React, { PureComponent } from 'react';
import { Form, Input, Radio, InputNumber, Checkbox, Button, message } from 'antd';
import Axios from '../../utils/axios';
import Utils from '../../utils/utils';
import './register.less';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioGroup = Radio.Group;

class Register extends PureComponent {

    state = {}

    onSubmit = (e) => {
        e && e.preventDefault();
        const { isLogin, changeOption } = this.props;
        this.props.form.validateFields((err, value) => {
            if (!err) {
                let userInfo = this.props.form.getFieldsValue();
                userInfo.password = Utils.encrypt(userInfo.password);
                Axios.ajax({
                    url: '/register',
                    method: 'POST',
                    data: {
                        params: {
                            ...userInfo
                        }
                    }
                }).then((res) => {
                    if (res.code === 0) {
                        if (isLogin) {
                            changeOption();
                            message.success(`用户名：${userInfo.username} 注册成功！`);
                        } else {
                            window.location.hash = '/#/login';
                            message.success(`用户名：${userInfo.username} 注册成功！`);
                        }
                    }
                })
            }
        })
    }

    onReturn = () => {
        const { isLogin, changeOption } = this.props;
        if (isLogin) {
            changeOption();
        } else {
            window.location.hash = '/#/login';
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: 24,
                sm: 6
            },
            wrapperCol: {
                xs: 24,
                sm: 12
            }
        }
        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span: 12,
                    offset: 6
                }
            }
        }
        const rowObject = {
            minRows: 4, maxRows: 6
        }

        return (
            <div className='register-container'>
                <div className='register-form'>
                    <div className='register-title'>注册用户</div>
                    <Form layout='horizontal'>
                        <FormItem label='用户名' {...formItemLayout}>
                            {
                                getFieldDecorator('username', {
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
                                            pattern: /^\w+$/g,
                                            message: '用户名必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </FormItem>
                        <FormItem label='密码' {...formItemLayout}>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        },
                                        {
                                            min: 6,
                                            max: 12,
                                            message: '长度不在范围内'
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '密码必须为字母或者数字'
                                        }
                                    ]
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue: 1
                                })(
                                    <RadioGroup>
                                        <Radio value={1}>男</Radio>
                                        <Radio value={2}>女</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '太空宇宙'
                                })(
                                    <TextArea
                                        autosize={rowObject}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('read', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>我已阅读过<Button type='link' className='link'>简单协议</Button></Checkbox>
                                )
                            }
                            {
                                this.props.isLogin ? <Button type="link" className='return-button' onClick={this.onReturn}>返回用户列表</Button> :
                                    <Button type="link" className='return-button' onClick={this.onReturn}>返回登录</Button>
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.onSubmit}>注册</Button>
                        </FormItem>
                    </Form>

                </div>
            </div>
        )
    }
}

export default Form.create()(Register);