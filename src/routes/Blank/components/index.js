import  React,{Component} from 'react';
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
    lng: 120.040108 + Math.random() *0.003,
    lat: 30.228653 + Math.random()*0.003
})
const randomMarker = (len) => (
    Array(len).fill(true).map((e, idx) => ({
        position: randomPosition()
    }))
);
@connect()
export default class extends BaseComponent {
    constructor(){
        super();
        this.state = {
            markers: randomMarker(10),
            point: new BMapGL.Point(120.040108, 30.228653)
        }
    }
    componentDidMount() {
        console.log(this.state)
        var map = new BMapGL.Map('container');
        var point = this.state.point
        map.centerAndZoom(point, 18);
        map.enableScrollWheelZoom(true);
        var navi3DCtrl = new BMapGL.NavigationControl3D();  // 添加3D控件
        map.addControl(navi3DCtrl);

        for(var i = 0; i < 10; i++){
            var pos = randomPosition()
            var marker = new BMapGL.Marker(pos)
            map.addOverlay(marker)
            var opts = {
                width: 200,
                height: 100,
                title: '活动名称'
            };
            var infoWindow = new BMapGL.InfoWindow('地址：北京市东城区王府井大街88号乐天银泰百货八层', opts);
            marker.addEventListener('click', this.showModal);
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
        return(
            <Layout className="full-layout page blank-page">
                <Content style={{width: '100%', height: '400px'}} id="container">
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
        )
  }
}
