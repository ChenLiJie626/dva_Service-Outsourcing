import React, { Component, Fragment } from 'react';
import { Result } from 'components/Pages';
import { Layout, Button } from 'antd';
const { Content } = Layout;

export default class extends Component {
  render() {
    const actions = (
      <Fragment>
        <Button href="/">返回首页</Button>
      </Fragment>
    );

    const footer = (
      <Fragment>
        <p>
          <a>Need More Help?</a>
        </p>
        <p>
          Misc question two? <a>Response Link</a>
        </p>
      </Fragment>
    );

    const extra = <div>Yoursite.com</div>;

    return (
      <Layout className="full-layout result-page">
        <Content>
          <Result
            title="注册成功"
            type="success"
            actions={actions}
            footer={footer}
            extra={extra}
          >
            恭喜您，注册成功
          </Result>
        </Content>
      </Layout>
    );
  }
}
