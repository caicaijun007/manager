import React, { PureComponent, Fragment } from 'react';
import { Card, Spin, Alert, BackTop } from 'antd';

class Loadings extends PureComponent {

    state = {
    }


    render() {
        return (
            <Fragment>
                <BackTop />
                <Card title='Spin各种大小' className='card-wrapper'>
                    <Spin size="small" />
                    <Spin style={{ marginLeft: 16, marginRight: 16 }} />
                    <Spin size="large" />
                </Card>
                <Card title='Alert警告提示' className='card-wrapper'>
                    <Alert className='alert' message="success" type="success" showIcon />
                    <Alert className='alert' message="info" type="info" showIcon />
                    <Alert className='alert' message="warning" type="warning" showIcon />
                    <Alert className='alert' message="error" type="error" showIcon />
                    <Alert
                        className='alert'
                        message="success"
                        description="success提示"
                        type="success"
                    />
                    <Alert
                        className='alert'
                        message="info"
                        description="info提示"
                        type="info"
                    />
                    <Alert
                        className='alert'
                        message="warning"
                        description="warning提示"
                        type="warning"
                        closable
                    />
                    <Alert
                        className='alert'
                        message="error"
                        description="error提示"
                        type="error"
                        closable
                    />
                </Card>
                <Card title='Spin、Alert结合使用' className='card-wrapper'>
                    <Spin tip="Loading...">
                        <Alert
                            message="loading"
                            description="loading and alert"
                            type="info"
                        />
                    </Spin>
                </Card>
            </Fragment>
        );
    }
}

export default Loadings;