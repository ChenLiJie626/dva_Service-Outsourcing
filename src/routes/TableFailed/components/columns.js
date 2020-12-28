import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { router } from 'dva';
const { Link } = router;

export default (self, employees) => [
  {
    title: '活动id',
    name: 'id',
    tableItem: {},
    searchItem: {
      type: 'hidden'
    },
    formItem: {
      type: 'hidden'
    }
  },
  {
    title: '活动名称',
    name: 'name',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {}
  },
  {
    title: '学院',
    name: 'college_id',
    tableItem: {},
    searchItem: {},
    formItem: {}
  },
  {
    title: '负责人',
    name: 'director_id',
    tableItem: {},
    searchItem: {},
    formItem: {}
  },
  {
    title: '开始时间',
    name: 'startTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: '结束时间',
    name: 'endTime',
    tableItem: {},
    formItem: {
      type: 'datetime'
    },
    searchItem: {
      type: 'datetime'
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="修改信息" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          <Button tooltip="通过" onClick={e => self.onPassed(record)}>
            <Icon type="check" />
          </Button>
          <Button tooltip="不通过" onClick={e => self.onDelete(record)}>
            <Icon type="close" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];
