import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Radio, Icon } from 'antd';
import './ui.less';
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const ButtonGroup = Button.Group;

class Btn extends PureComponent {

    state = {
        size: 'large'
    }

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {
        const { size } = this.state;
        return (
            <Fragment>
                <Card title='按钮类型' className='card-wrapper'>
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="link">Link</Button>
                    <Button type="primary" ghost>Primary</Button>
                    <Button type="danger" ghost>Danger</Button>
                    <Button disabled>disabled</Button>
                </Card>
                <Card title='按钮尺寸' className='card-wrapper'>
                    <RadioGroup value={size} onChange={this.handleSizeChange}>
                        <RadioButton value="large">Large</RadioButton>
                        <RadioButton value="default">Default</RadioButton>
                        <RadioButton value="small">Small</RadioButton>
                    </RadioGroup>
                    <p></p>
                    <Button type="primary" size={size}>Primary</Button>
                    <Button size={size}>Default</Button>
                    <Button type="dashed" size={size}>Dashed</Button>
                    <Button type="danger" size={size}>Danger</Button>
                    <Button type="link" size={size}>Link</Button>
                    <Button disabled size={size}>disabled</Button>
                </Card>
                <Card title='加载中' className='card-wrapper'>
                    <Button type="primary" loading>Loading</Button>
                    <Button type="dashed" loading>Loading</Button>
                    <Button type="danger" loading>Loading</Button>
                    <Button loading>Loading</Button>
                    <Button type="primary" loading />
                    <Button type="primary" shape="circle" loading />
                    <Button type="danger" shape="circle" loading />
                    <Button type="primary" shape="round" loading />
                    <Button type="danger" shape="round" loading />
                </Card>
                <Card title='按扭组合' className='card-wrapper'>
                    <ButtonGroup className='button-wrapper'>
                        <Button>取消</Button>
                        <Button>确定</Button>
                    </ButtonGroup>
                    <ButtonGroup className='button-wrapper'>
                        <Button type="primary"><Icon type="left" />上一页</Button>
                        <Button type="primary">下一页<Icon type="right" /></Button>
                    </ButtonGroup>
                    <ButtonGroup className='button-wrapper'>
                        <Button type="primary" icon="cloud" />
                        <Button type="primary" icon="cloud-download" />
                    </ButtonGroup>
                </Card>
                <Card title='图标按钮' className='card-wrapper'>
                    <Button type="primary" icon="search">搜索</Button>
                    <Button icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                    <Button icon="download">下载</Button>
                    <Button type="primary" shape='circle' icon="search" />
                    <Button icon="search" shape='circle' />
                    <Button type="primary" shape='round' icon="search">搜索</Button>
                    <Button icon="search" shape='round'>搜索</Button>
                    <Button type="primary" icon="plus">创建</Button>
                    <Button type="primary" icon="edit">编辑</Button>
                    <Button type="primary" icon="delete">删除</Button>

                </Card>
            </Fragment >
        );
    }
}

export default Btn;