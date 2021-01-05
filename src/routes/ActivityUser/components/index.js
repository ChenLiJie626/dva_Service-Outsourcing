import React from 'react';
import {connect, routerRedux} from 'dva';
import {Layout, Button, message, Timeline} from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content} = Layout;

var style = {
    margin : 50
}
@connect()
export default class extends BaseComponent {

    render() {


        return (
            <Layout className="full-layout crud-page">

                <Content>
                    <Timeline mode='left' style={style}>
                        <Timeline.Item label="2015-09-01">足球比赛</Timeline.Item>
                        <Timeline.Item label="2015-09-01 09:12:11">足球比赛</Timeline.Item>
                        <Timeline.Item>足球比赛</Timeline.Item>
                        <Timeline.Item label="2015-09-01 09:12:11">足球比赛</Timeline.Item>
                    </Timeline>
                </Content>

            </Layout>
        );
    }
}
