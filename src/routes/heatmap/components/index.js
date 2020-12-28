import  React,{Component} from 'react';
import {connect, router} from 'dva';
import { Layout, Modal } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;


const randomPosition = () => ({
    lng: 120.040108 + Math.random() *0.003,
    lat: 30.228653 + Math.random()*0.003,
    count: 30
})
@connect()
export default class extends BaseComponent {
    constructor(){
        super();

    }
    componentDidMount() {
        // 百度地图API功能
        // 创建Map实例
        const map = new BMap.Map("container");
        // 初始化地图，设置中心点坐标和地图级别
        const point = new BMap.Point(120.040108, 30.228653)
        map.centerAndZoom(point, 16);
        // 允许滚轮缩放
        map.enableScrollWheelZoom();

        var points =[];
        for(var i=0;i<10;i++){
            points.push(randomPosition())
        }
        console.log(points)
        const heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
        map.addOverlay(heatmapOverlay);
        heatmapOverlay.setDataSet({data:points,max:100});




    }

    render() {
        return(
            <Layout className="full-layout page blank-page">
                <Content style={{width: '100%', height: '400px'}} id="container">
                </Content>
            </Layout>
        )
  }
}
