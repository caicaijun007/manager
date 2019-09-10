import React, { PureComponent } from 'react';
import { Card, Carousel } from 'antd';
import './ui.less';

class Carousels extends PureComponent {

    render() {
        return (
            <div>
                <Card title="文字背景轮播" className="card-wrapper">
                    <Carousel autoplay effect="fade">
                        <div><h3>React</h3></div>
                        <div><h3>Vue</h3></div>
                        <div><h3>Angular</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="card-wrapper card-slide">
                    <Carousel autoplay effect="fade">
                        <div><img src="/gallery/1.jpg" alt="" /></div>
                        <div><img src="/gallery/2.jpg" alt="" /></div>
                        <div><img src="/gallery/3.jpg" alt="" /></div>
                        <div><img src="/gallery/4.jpg" alt="" /></div>
                    </Carousel>
                </Card>
            </div>
        )
    }
}

export default Carousels;