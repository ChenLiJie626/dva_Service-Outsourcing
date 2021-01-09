import React from 'react';
import {connect, routerRedux} from 'dva';
import {Layout, Button, message, Timeline, Empty} from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content} = Layout;

var style = {
    margin : 100
}

@connect(({ ActivityUser, loading }) => ({
    ActivityUser,
    loading: loading.models.ActivityUser
}))
export default class extends BaseComponent {

    render() {
        const { ActivityUser, loading, dispatch } = this.props;
        const { activity } = ActivityUser;

        return (
            <Layout className="full-layout crud-page">

                <Content>
                    <div style={style}>
                    {activity === null ? <Empty/> :

                        <Timeline mode='left'>
                            {activity.map((item, index) =>
                            <Timeline.Item key={item.id} label={item.startTime + " - " + item.endTime}>{item.name}</Timeline.Item>)}
                        </Timeline>
                    }
                    </div>
                </Content>

            </Layout>
        );
    }
}
