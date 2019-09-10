import React, { PureComponent } from 'react';
import { Card, Row, Col, Modal } from 'antd';
import './ui.less';

class Gallery extends PureComponent {

    state = {
        visible: false
    }

    openGallery = (imgSrc) => {
        this.setState({
            visible: true,
            currentImg: `/gallery/${imgSrc}`
        })
    }

    render() {
        const imgs = [
            ['1.jpg', '2.jpg', '3.jpg'],
            ['4.jpg', '5.jpg', '6.jpg'],
            ['7.jpg', '8.jpg', '9.jpg'],
            ['10.jpg', '11.jpg', '12.jpg'],
            ['13.jpg', '14.jpg', '15.jpg'],
            ['16.jpg', '17.jpg', '18.jpg']
        ]
        const imgList = imgs.map((list) => list.map((item, index) =>
            <Card
                key={index}
                style={{ marginBottom: 10 }}
                cover={<img alt='' src={'/gallery/' + item} onClick={() => this.openGallery(item)} />}
            >
                <Card.Meta
                    title="React Antd"
                    description="good good study"
                />
            </Card>
        ))

        return (
            <div className="card-wrapper">
                <Row>
                    <Col md={4}>
                        {imgList[0]}
                    </Col>
                    <Col md={4}>
                        {imgList[1]}
                    </Col>
                    <Col md={4}>
                        {imgList[2]}
                    </Col>
                    <Col md={4}>
                        {imgList[3]}
                    </Col>
                    <Col md={4}>
                        {imgList[4]}
                    </Col>
                    <Col md={4}>
                        {imgList[5]}
                    </Col>
                </Row>
                <Modal
                    width={600}
                    height={300}
                    visible={this.state.visible}
                    title="图片欣赏"
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    footer={null}
                >
                    {<img src={this.state.currentImg} alt="" style={{ width: '100%' }} />}
                </Modal>
            </div>
        )
    }
}

export default Gallery;