import React from 'react';
import { connect } from 'dva';
import { Layout, Tag, Tabs } from 'antd';
import BaseComponent from 'components/BaseComponent';
import CSSAnimate from 'components/CSSAnimate';
import Icon from 'components/Icon';
import './index.less';
const { Content, Sider } = Layout;
const TabPane = Tabs.TabPane;


@connect(({ dashboard }) => ({
  dashboard
}))
export default class Dashboard extends BaseComponent {
  render() {
    const { dashboard } = this.props;
    const { bar1, bar2 } = dashboard;
    return (
      <Layout className="full-layout page css-animate-page">
          <Sider
              width={0}
              className="css-animate-page-sider"
          >
              <div className="header">

              </div>

          </Sider>
        <Content>

            <CSSAnimate
                id="animateMe"
                type="rotateIn"
            >
                欢迎来到活动管理系统！
            </CSSAnimate>
        </Content>
      </Layout>
    );
  }
}


