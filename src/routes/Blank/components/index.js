import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
const { Content } = Layout;
import { Map ,Markers} from 'react-amap';


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
            center: randomPosition()
        }
        this.markersEvents = {
            click(e, marker){
                // 通过高德原生提供的 getExtData 方法获取原始数据
                const extData = marker.getExtData();
                const index = extData.myIndex;
                console.log(extData)

            }
        }
    }
  render() {

      const position = { longitude: 120.040108, latitude: 30.228653}//需要定位的经纬度

      return (
      <Layout className="full-layout page blank-page">
        <Content style={{width: '100%', height: '400px'}}>
            <Map plugins={['ToolBar']} center={this.state.center} zoom={15} >
                <Markers
                    markers={this.state.markers}
                    events={this.markersEvents}
                />
            </Map>
        </Content>
      </Layout>
    );
  }
}
