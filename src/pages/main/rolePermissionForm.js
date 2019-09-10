import React, { PureComponent } from 'react';
import { Form, Input, Select, Tree } from 'antd';
import menuConfig from '../../configs/router.config';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 18
    }
}

class PermissonForm extends PureComponent {

    state = {}

    getMenuList = (data) => {
        return data.map((item) => {
            if (item.routes) {
                return (
                    <TreeNode title={item.name} key={item.path}>
                        {this.getMenuList(item.routes)}
                    </TreeNode>
                );
            }
            return <TreeNode title={item.name} key={item.path} />;
        });
    }

    // 设置选中的节点，通过父组件方法再传递回来
    onCheck = (checkedKeys) => {
        this.props.checkMenuInfo(checkedKeys);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { roleDetail, menuInfo } = this.props;

        return (
            <Form>
                <FormItem label='角色名' {...formItemLayout}>
                    <Input disabled placeholder={roleDetail.role_name} />
                </FormItem>
                <FormItem label='使用状态' {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            initialValue: roleDetail.status
                        })(
                            <Select>
                                <Option value='1'>开启</Option>
                                <Option value='0'>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label='选择权限' {...formItemLayout}>
                    <Tree
                        checkable
                        defaultExpandAll
                        onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
                        checkedKeys={menuInfo || []}>
                        <TreeNode title="平台权限" key="plat">
                            {this.getMenuList(menuConfig)}
                        </TreeNode>
                    </Tree>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create({})(PermissonForm);