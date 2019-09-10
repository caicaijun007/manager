import React, { PureComponent } from 'react';
import { Card, Button, message } from 'antd';
import './ui.less';

class Messages extends PureComponent {

    showMessage = type => {
        message[type]("学习React Antd基础知识")
    }

    handleMessage = type => {
        message[type]('学习React Antd基础知识', 5);
    }

    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-wrapper">
                    <Button type="primary" onClick={() => this.showMessage('success')}>Success</Button>
                    <Button onClick={() => this.showMessage('info')}>Info</Button>
                    <Button onClick={() => this.showMessage('warning')}>Warning</Button>
                    <Button onClick={() => this.showMessage('error')}>Error</Button>
                    <Button onClick={() => this.showMessage('loading')}>Loading</Button>
                </Card>
                <Card title="定时关闭全局提示框" className="card-wrapper">
                    <Button type="primary" onClick={() => this.handleMessage('info')}>Open</Button>
                    <Button onClick={() => this.handleMessage('loading')}>Loading</Button>
                </Card>
            </div>
        )
    }
}

export default Messages;