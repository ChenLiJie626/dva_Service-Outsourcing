import React from 'react';
import {connect, router} from 'dva';
import {Layout, Tabs, Descriptions, Badge, Table, Progress, InputNumber,Popconfirm, Button, message} from 'antd';
import Carousel from 'nuka-carousel';
import Slider from "react-slick";
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
import Image from 'components/Image';
const { Content } = Layout;
const { TabPane } = Tabs;
const { Link } = router;
import './index.less';


const columns = [
    {
        title: '',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '进度',
        dataIndex: 'status',
        key: 'status',
    },
]

@connect(({ crudDetail, loading }) => ({
  crudDetail,
  loading: loading.models.crudDetail
}))

export default class extends BaseComponent {


  render() {

      const { crudDetail, loading, dispatch } = this.props;
      const { data, activity_info } = crudDetail;
      let people_limit, people_registered, people_enrolled, people_quitted, activity_img, activity_intro
      if(activity_info !== null){
          people_limit = activity_info.people_limit
          people_registered = activity_info.people_registered
          people_enrolled = activity_info.people_enrolled
          people_quitted = activity_info.people_quitted
          activity_img = activity_info.activity_img
          activity_intro = activity_info.activity_intro
      }
      let img_vase = 'data:image/png;base64,'+data
      function confirm(e) {
          // console.log(people_limit,666);
          dispatch({
              type: 'crudDetail/update_person',
              payload: people_limit
          }).then(result => {
              if(result === true){
                  message.success('修改成功');
              }
          });
      }
      const div1 = (a,b) =>{
          // console.log(a.people_registered,b.people_limit,a/b)
          return Math.floor(a.people_registered/b.people_limit * 100)
      }
      const div2 = (a,b) =>{
          // console.log(a.people_registered,b.people_limit,a/b)
          return Math.floor(a.people_enrolled/b.people_registered * 100)
      }
      const div3 = (a,b) =>{
          // console.log(a.people_registered,b.people_limit,a/b)
          return Math.floor(a.people_quitted/b.people_registered * 100)
      }
      const datasource = [
          {
              key: '1',
              name: '注册人数',
              status: <Progress type="circle" percent={div1({people_registered},{people_limit})}  width={80} />,
          },
          {
              key: '2',
              name: '签到人数',
              status: <Progress type="circle" percent={div2({people_enrolled},{people_registered})}  width={80} />,
          },
          {
              key: '3',
              name: '签退人数',
              status: <Progress type="circle" percent={div3({people_quitted},{people_registered})}  width={80} />,
          },
      ]
      const onChange = (value) =>{
          people_limit = value
      }


    return (
      <Layout className="full-layout page blank-page">
        <Content>
            <Carousel height="250px">
                <img src={activity_img} />
                <img src={activity_img} />
                <img src={activity_img} />
                <img src={activity_img} />
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
                    <TabPane tab="活动概述" key="2">
                        <Descriptions title="足球比赛" bordered>
                            <Descriptions.Item label="人数限制">
                                <InputNumber size="large" min={1} max={100} defaultValue={people_limit} onChange={onChange}/>
                                <Popconfirm
                                    title="确定修改?"
                                    onConfirm={confirm}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Button type="primary" style={{'margin-left':'15px'}}>
                                        修改
                                    </Button>
                                </Popconfirm>
                            </Descriptions.Item>
                            <Descriptions.Item label="状态" span={3}>
                                <Badge status="processing" text="正火热举办中" />
                                <br/>
                                {/*<Badge status="error" text="已下架"/>*/}
                            </Descriptions.Item>
                            <Descriptions.Item label="简介">
                                {activity_intro}
                            </Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="活动进度" key="3">
                        <Table columns={columns} dataSource={datasource} />
                    </TabPane>
                </Tabs>
            </div>


        </Content>
      </Layout>
    );
  }
}
