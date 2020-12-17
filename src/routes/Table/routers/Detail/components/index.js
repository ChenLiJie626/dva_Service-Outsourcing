import React from 'react';
import { connect } from 'dva';
import { Layout, Tabs} from 'antd';
import Carousel from 'nuka-carousel';
import Slider from "react-slick";
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Image from 'components/Image';
const { Content } = Layout;
const { TabPane } = Tabs;

import './index.less';
import bg1 from 'assets/images/bg1.jpg';
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
@connect(({ crudDetail, loading }) => ({
  crudDetail,
  loading: loading.models.crudDetail
}))

export default class extends BaseComponent {
  render() {
    const { crudDetail, loading, dispatch } = this.props;
    const { data } = crudDetail;
    let img_vase = 'data:image/png;base64,'+data
    return (
      <Layout className="full-layout page blank-page">
        <Content>
            <Carousel>
                <img src={bg1} />
                <img src={bg1} />
                <img src={bg1} />
                <img src={bg1} />
            </Carousel>
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="二维码签到" key="1">
                        <Panel title="二维码预览">
                          <Image
                              style={{ width: 200 }}
                              src={img_vase}
                              previewList={[
                                  img_vase
                              ]}
                          />
                        </Panel>
                    </TabPane>
                    <TabPane tab="活动进度" key="2">
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                        <p>Content of Tab Pane 2</p>
                    </TabPane>
                    <TabPane tab="活动概述" key="3">
                        <p>Content of Tab Pane 3</p>
                        <p>Content of Tab Pane 3</p>
                        <p>Content of Tab Pane 3</p>
                    </TabPane>
                </Tabs>
            </div>

        </Content>
      </Layout>
    );
  }
}
