import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import './content.less';
const { Content } = Layout;

class ContentLayout extends PureComponent {
    render() {
        return (
            <Content className='content'>
                <div>学习 React 和 Ant Design</div>
            </Content>
        );
    }
}

export default ContentLayout;