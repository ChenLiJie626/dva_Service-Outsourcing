import React from 'react';
import { Modal } from 'antd';
import $$ from 'cmn-utils';
import config from '@/config';

class BaseComponent extends React.Component {
  notice = config.notice; // 消息通知

  /**
   * history api 路由跳转
   */
  get history() {
    return this.props.history;
  }

  /**
   * 新增
   */
  onAdd = () => {
    this.setState({
      record: null,
      visible: true
    });
  };

  /**
   * 修改
   * @param {object} 表单记录
   */
  onUpdate = record => {
    this.setState({
      record,
      visible: true
    });
  };

  /**
   * 删除
   * @param {object | array} 表单记录, 批量删除时为数组
   */
  onDelete = record => {
    if (!record) return;
    if ($$.isArray(record) && !record.length) return;

    const content = `您是否要删除这${
      $$.isArray(record) ? record.length : ''
    }项？`;

    Modal.confirm({
      title: '注意',
      content,
      onOk: () => {
        this.handleDelete($$.isArray(record) ? record : [record]);
      },
      onCancel() {}
    });
  };

  onPassed = record => {
    if (!record) return;
    if ($$.isArray(record) && !record.length) return;

    const content = `您是否要通过这${
        $$.isArray(record) ? record.length : ''
    }项？`;

    Modal.confirm({
      title: '注意',
      content,
      onOk: () => {
        this.handlePass($$.isArray(record) ? record : [record]);
      },
      onCancel() {}
    });
  };

  handleAdd() {
    /* 子类重写 */
  }
  handleUpdate() {
    /* 子类重写 */
  }
  handleDelete(records) {
    /* 子类重写 */
  }
  handlePass(records){
    /* 子类重写 */
  }

}

export default BaseComponent;
