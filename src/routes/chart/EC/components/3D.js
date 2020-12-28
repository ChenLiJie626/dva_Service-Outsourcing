import  React from 'react';
import {connect} from 'dva';
import 'echarts-gl'
import ReactEcharts from "echarts-for-react";
import {Col, Layout, Row, DatePicker, Form, Button, Select, Tag} from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from "components/Panel";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;





function tagRender(props) {
    const { label, closable, onClose } = props;

    return (
        <Tag color='blue' closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
            {label}
        </Tag>
    );
}

@connect(({ chart, loading }) => ({
    chart,
    loading: loading.models.chart
}))
export default class extends BaseComponent {
    constructor() {
        super();
        this.state = {
            dates: [],
            value: null,
        }
    }



    render() {
        // const { chart, loading, dispatch } = this.props;
        // const { college } = chart
        // let college_options = []
        // for(var i = 0; i < college.length; i++){
        //     college_options.push({'value': college[i].name})
        // }


        const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
            '7a', '8a', '9a','10a','11a',
            '12p', '1p', '2p', '3p', '4p', '5p',
            '6p', '7p', '8p', '9p', '10p', '11p'];
        const days = ['Saturday', 'Friday', 'Thursday',
            'Wednesday', 'Tuesday', 'Monday', 'Sunday'];
        const data = [[0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],[1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],[2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4],[3,0,7],[3,1,3],[3,2,0],[3,3,0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,1],[3,9,0],[3,10,5],[3,11,4],[3,12,7],[3,13,14],[3,14,13],[3,15,12],[3,16,9],[3,17,5],[3,18,5],[3,19,10],[3,20,6],[3,21,4],[3,22,4],[3,23,1],[4,0,1],[4,1,3],[4,2,0],[4,3,0],[4,4,0],[4,5,1],[4,6,0],[4,7,0],[4,8,0],[4,9,2],[4,10,4],[4,11,4],[4,12,2],[4,13,4],[4,14,4],[4,15,14],[4,16,12],[4,17,1],[4,18,8],[4,19,5],[4,20,3],[4,21,7],[4,22,3],[4,23,0],[5,0,2],[5,1,1],[5,2,0],[5,3,3],[5,4,0],[5,5,0],[5,6,0],[5,7,0],[5,8,2],[5,9,0],[5,10,4],[5,11,1],[5,12,5],[5,13,10],[5,14,5],[5,15,7],[5,16,11],[5,17,6],[5,18,0],[5,19,5],[5,20,3],[5,21,4],[5,22,2],[5,23,0],[6,0,1],[6,1,0],[6,2,0],[6,3,0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,1],[6,11,0],[6,12,2],[6,13,1],[6,14,3],[6,15,4],[6,16,0],[6,17,0],[6,18,0],[6,19,0],[6,20,1],[6,21,2],[6,22,2],[6,23,6]];

        const option = {
            tooltip: {},
            visualMap: {
                max: 20,
                inRange: {
                    color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
                }
            },
            xAxis3D: {
                type: 'category',
                data: hours,
            },
            yAxis3D: {
                type: 'category',
                data: days
            },
            zAxis3D: {
                type: 'value'
            },
            grid3D: {
                boxWidth: 200,
                boxDepth: 80,
                light: {
                    main: {
                        intensity: 1.2
                    },
                    ambient: {
                        intensity: 0.3
                    }
                }
            },
            series: [{
                type: 'bar3D',
                data: data.map(function (item) {
                    return {
                        value: [item[1], item[0], item[2]]
                    }
                }),
                shading: 'color',

                label: {
                    show: false,
                    textStyle: {
                        fontSize: 16,
                        borderWidth: 1
                    }
                },

                itemStyle: {
                    opacity: 0.4
                },

                emphasis: {
                    label: {
                        textStyle: {
                            fontSize: 20,
                            color: '#900'
                        }
                    },
                    itemStyle: {
                        color: '#900'
                    }
                }
            }]
        }
        const option1 = {
            title: {
                text: '多雷达图'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left: 'center',
                data: ['某软件', '某主食手机', '某水果手机', '降水量', '蒸发量']
            },
            radar: [
                {
                    indicator: [
                        {text: '品牌', max: 100},
                        {text: '内容', max: 100},
                        {text: '可用性', max: 100},
                        {text: '功能', max: 100}
                    ],
                    center: ['25%', '40%'],
                    radius: 80
                },
                {
                    indicator: [
                        {text: '外观', max: 100},
                        {text: '拍照', max: 100},
                        {text: '系统', max: 100},
                        {text: '性能', max: 100},
                        {text: '屏幕', max: 100}
                    ],
                    radius: 80,
                    center: ['50%', '60%'],
                },
                {
                    indicator: (function (){
                        var res = [];
                        for (var i = 1; i <= 12; i++) {
                            res.push({text: i + '月', max: 100});
                        }
                        return res;
                    })(),
                    center: ['75%', '40%'],
                    radius: 80
                }
            ],
            series: [
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    areaStyle: {},
                    data: [
                        {
                            value: [60, 73, 85, 40],
                            name: '某软件'
                        }
                    ]
                },
                {
                    type: 'radar',
                    radarIndex: 1,
                    areaStyle: {},
                    data: [
                        {
                            value: [85, 90, 90, 95, 95],
                            name: '某主食手机'
                        },
                        {
                            value: [95, 80, 95, 90, 93],
                            name: '某水果手机'
                        }
                    ]
                },
                {
                    type: 'radar',
                    radarIndex: 2,
                    areaStyle: {},
                    data: [
                        {
                            name: '降水量',
                            value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                        },
                        {
                            name: '蒸发量',
                            value: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                        }
                    ]
                }
            ]
        };
        const disabledDate = current => {
            let dates = this.state.dates
            if (!dates || dates.length === 0) {
                return false;
            }
            const tooLate = dates[0] && current.diff(dates[0], 'days') > 7;
            const tooEarly = dates[1] && dates[1].diff(current, 'days') > 7;
            return tooEarly || tooLate;
        };
        return(
            <ReactEcharts
                option={option}
            />

        )
    }
}
