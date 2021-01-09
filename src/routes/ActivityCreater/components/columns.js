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
    name: 'activityName',
    tableItem: {},
    searchItem: {
      group: 'abc'
    },
    formItem: {}
  },
  {
    title: '学院',
    name: 'collegeName',
    tableItem: {},
    searchItem: {},
    formItem: {}
  },
  {
    title: '负责人',
    name: 'directorName',
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
    title: '状态',
    name: 'status',
    tableItem: {},
    formItem: {
    },
    searchItem: {
    }
  }
];
