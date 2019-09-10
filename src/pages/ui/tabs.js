import React, { PureComponent, Fragment } from 'react';
import { Card, Tabs, message, Icon } from 'antd';
import './ui.less';
const TabPane = Tabs.TabPane;

class Tab extends PureComponent {

    newTabIndex = 0;
    state = {}

    UNSAFE_componentWillMount() {
        const panes = [
            { title: 'Tab one', content: 'Tab one...', key: '1' },
            { title: 'Tab two', content: 'Tab two...', key: '2' },
            {
                title: 'Tab three',
                content: 'Tab three...',
                key: '3',
                closable: false,
            },
        ];
        this.setState({
            activeKey: panes[0].key,
            panes,
        });
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: `Tab ${this.newTabIndex}`, content: `Tab ${this.newTabIndex}...`, key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    handleChange = (key) => {
        message.info(`当前点击了第（${key}）项`);
    }

    render() {
        return (
            <Fragment>
                <Card title='Tab页签' className='card-wrapper'>
                    <Tabs defaultActiveKey='1' onChange={this.handleChange}>
                        <TabPane tab='one' key='1'>tab one</TabPane>
                        <TabPane tab='two' key='2'>tab two</TabPane>
                        <TabPane tab='three' key='3'>tab three</TabPane>
                    </Tabs>
                </Card>
                <Card title='带图标Tab页签' className='card-wrapper'>
                    <Tabs defaultActiveKey='1' onChange={this.handleChange}>
                        <TabPane tab={<span><Icon type='plus' />one</span>} key='1'>tab one</TabPane>
                        <TabPane tab={<span><Icon type='delete' />two</span>} key='2'>tab two</TabPane>
                        <TabPane tab={<span><Icon type='edit' />three</span>} key='3'>tab three</TabPane>
                        <TabPane tab={<span><Icon type='apple' />apple</span>} key='4'>tab apple</TabPane>
                        <TabPane tab={<span><Icon type='android' />android</span>} key='5'>tab android</TabPane>
                    </Tabs>
                </Card>
                <Card title='新增和关闭Tab页签' className='card-wrapper'>
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </Fragment>
        );
    }
}

export default Tab;