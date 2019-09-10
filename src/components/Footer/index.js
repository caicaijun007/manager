import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import './footer.less';
const { Footer } = Layout;

class FooterLayout extends PureComponent {

    render() {
        return (
            <Footer className='footer'>Study React and Ant Design @ caicaijun</Footer>
        );
    }
}

export default FooterLayout;