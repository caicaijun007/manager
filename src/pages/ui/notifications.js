import React, { PureComponent, Fragment } from 'react';
import { Card, Button, notification, Select } from 'antd';
import './ui.less';
const { Option } = Select;

class Notifications extends PureComponent {

    state = {}

    handleOpen = () => {
        notification.open({
            message: 'react',
            description: 'react and antd',
            onClick: () => {
                console.log('notification')
            },
            onClose: () => {
                console.log('notification')
            }
        });
    }

    openNotification = (type) => {
        notification[type]({
            message: 'react',
            description: 'react and antd'
        });
    }

    render() {
        const options = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
        return (
            <Fragment>
                <Card title='基本使用' className='card-wrapper'>
                    <Button type='primary' onClick={this.handleOpen}>Open</Button>
                </Card>
                <Card title="带图标通知提醒框" className="card-wrapper">
                    <Button onClick={() => this.openNotification('success')}>Success</Button>
                    <Button onClick={() => this.openNotification('info')}>Info</Button>
                    <Button onClick={() => this.openNotification('warning')}>Warning</Button>
                    <Button onClick={() => this.openNotification('error')}>Error</Button>
                </Card>
                <Card title="不同位置通知提醒框" className="card-wrapper">
                    <Select
                        style={{ width: 120, marginRight: 16 }}
                        defaultValue="topRight"
                        onChange={placement => {
                            notification.config({
                                placement
                            });
                        }}
                    >
                        {options.map(item => (
                            <Option key={item} value={item}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                    <Button type='primary' onClick={this.handleOpen}>Open</Button>
                </Card>
            </Fragment>
        );
    }
}

export default Notifications;