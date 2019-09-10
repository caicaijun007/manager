import React, { PureComponent, Fragment } from 'react';
import { Card, Button, Modal } from 'antd';

class Modals extends PureComponent {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    }

    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    }

    handleInfoTip = (type) => {
        Modal[type]({
            title: 'React antd',
            content: (
                <div>
                    <p>学习React antd基础知识...</p>
                    <p>学习React antd基础知识...</p>
                </div>
            ),
            onOk() { },
        });
    }

    handleComfirm = () => {
        Modal.confirm({
            title: 'React antd',
            content: '学习React antd基础知识...',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('errors!'));
            },
            onCancel() { }
        });
    }

    render() {
        return (
            <Fragment>
                <Card title='基本对话框' className='card-wrapper'>
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title='信息提示' className='card-wrapper'>
                    <Button onClick={() => { this.handleInfoTip('info') }}>Info</Button>
                    <Button onClick={() => { this.handleInfoTip('success') }}>Success</Button>
                    <Button onClick={() => { this.handleInfoTip('error') }}>Error</Button>
                    <Button onClick={() => { this.handleInfoTip('warning') }}>Warning</Button>
                </Card>
                <Card title='确认对话框' className='card-wrapper'>
                    <Button onClick={this.handleComfirm}>Confirm</Button>
                    <Button type='primary' onClick={this.handleComfirm}>Confirm</Button>
                </Card>
                <Modal
                    title='open'
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({ showModal1: false })
                    }}
                    onOk={() => {
                        this.setState({ showModal1: false })
                    }}
                >
                    <p>第一个对话框</p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal2}
                    okText="完成"
                    cancelText="取消"
                    onOk={() => {
                        this.setState({ showModal2: false })
                    }}
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}
                >
                    <p>学习React antd基础知识</p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal3}
                    style={{ top: 20 }}
                    onOk={() => {
                        this.setState({ showModal3: false })
                    }}
                    onCancel={() => {
                        this.setState({ showModal3: false })
                    }}
                >
                    <p>学习React antd基础知识</p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal4}
                    centered
                    onOk={() => {
                        this.setState({ showModal4: false })
                    }}
                    onCancel={() => {
                        this.setState({ showModal4: false })
                    }}
                >
                    <p>学习React antd基础知识</p>
                </Modal>
            </Fragment>
        );
    }
}

export default Modals;