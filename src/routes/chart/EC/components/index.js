import React from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Icon from 'components/Icon';
import Panel from 'components/Panel';
import SideLayout from '../../components/SideLayout';

@connect()
export default class extends BaseComponent {
  state = {
    activeKey: 'Radar',
    chartTypes: [

      {
        title: '学院活动分布',
        icon: 'RadarChartOutlined',
        key: 'Radar',
        components: ['./Radar']
      },
      {
        title: '3D',
        icon: 'RadarChartOutlined',
        key: '3D',
        components: ['./3D']
      }
    ]
  };

  onSelect = activeKey => {
    this.setState({
      activeKey
    });
  };

  render() {
    const { chartTypes, activeKey } = this.state;
    const sideContent = (
      <List
        className="charts-type-list"
        dataSource={chartTypes}
        renderItem={item => (
          <List.Item
            actions={[<Icon type="EllipsisOutlined" antd />]}
            onClick={e => this.onSelect(item.key)}
          >
            <Icon type={item.icon} antd />
            {item.title}
          </List.Item>
        )}
      />
    );
    const active = chartTypes.filter(item => item.key === activeKey)[0];
    return (
      <SideLayout
        title="ECharts 图表"
        author="chenlj"
        sideContent={sideContent}
      >
        {active.components.map((item, index) => {
          const Chart = require(`${item}`).default;
          return (
            <Panel
              key={index}
              title={
                <div>
                  <Icon type={active.icon} antd />&nbsp;
                  {active.title}
                </div>
              }
              height={400}
            >
              <Chart />
            </Panel>
          );
        })}
      </SideLayout>
    );
  }
}

