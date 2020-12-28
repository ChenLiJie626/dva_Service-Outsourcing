import React from 'react';
import EC from 'components/Charts/ECharts/EC';
import 'echarts/lib/chart/radar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

function getOption() {
  return {
    title: {
      text: '学院活动分布'
    },
    tooltip: {},
    legend: {
      data: ['已通过的活动', '待审批的活动']
    },
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '计算机学院', max: 6500 },
        { name: '人文学院', max: 16000 },
        { name: '管理学院', max: 30000 },
        { name: '信息学院', max: 38000 },
        { name: '法学院', max: 52000 },
      ]
    },
    series: [
      {
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [
          {
            value: [4300, 10000, 28000, 35000, 50000, 19000],
            name: '已通过的活动'
          },
          {
            value: [5000, 14000, 28000, 31000, 42000, 21000],
            name: '待审批的活动'
          }
        ]
      }
    ]
  };
}

export default props => <EC option={getOption()} />;
