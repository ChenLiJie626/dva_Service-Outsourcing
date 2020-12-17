import React from 'react';
import {connect, router} from 'dva';
import { Layout, Modal } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;
import {Map, Marker, NavigationControl, AutoComplete} from 'react-bmapgl';
import Icon from "components/Icon";
const { Link } = router;

//120.03395,30.223157
//120.047455,30.234021
const randomPosition = () => ({
    longitude: 120.03395 + Math.random() *0.003,
    latitude: 30.223157 + Math.random()*0.003
})
const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
        position: randomPosition()
    }))
);
@connect()
export default class extends BaseComponent {
    //120.040108,30.228653
    constructor(){
        super();
        this.state = {
            markers: randomMarker(10),
            center: {lng: 120.040108, lat: 30.228653},
            visible: false
        }
        this.SearchComplete = value => {
            console.log(value)
        }
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
  render() {

      var myGeo = new BMapGL.Geocoder();
      const onSearchComplete = value => {
          let Poi = value.item.value
          Poi = Poi.province + Poi.city + Poi.district + Poi.street + Poi.business
          myGeo.getPoint(Poi, function (point) {
              if (point) {
                  console.log(point)
              } else {
                  alert('您选择的地址没有解析到结果！');
              }
          })
      }
      return (
      <Layout className="full-layout page blank-page">
        <Content style={{width: '100%', height: '400px'}}>

            <Map center={this.state.center} zoom="16" enableScrollWheelZoom >
                <Marker position={{lng: 120.040108, lat: 30.228653}} icon={'loc_blue'} onClick={this.showModal}/>
                <NavigationControl />
                <input id="ac" />
                <AutoComplete
                    input="ac"
                    location="杭州"
                    onConfirm={onSearchComplete}

                />
            </Map>
            <Modal
                title="活动名称"
                visible={this.state.visible}
                onOk={this.hideModal}
                onCancel={this.hideModal}
                okText="确认"
                cancelText="取消"
            >
                <p>足球比赛
                    <Link to={"/crud/detail?id=" + 2}>
                        <Icon type="LinkOutlined" antd />
                    </Link>
                </p>

            </Modal>
        </Content>
      </Layout>
    );
  }
}
