import React from 'react';
import {connect, routerRedux} from 'dva';
import {Layout, Button, message, Timeline} from 'antd';
import BaseComponent from 'components/BaseComponent';
import DataTable from "components/DataTable";
import createColumns from "./columns";
const { Content, Footer } = Layout;
const Pagination = DataTable.Pagination;
var style = {
    margin : 50
}
@connect(({ ActivityCreater, loading }) => ({
    ActivityCreater,
    loading: loading.models.ActivityCreater
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: []
    };
    render() {
        const { ActivityCreater, loading, dispatch } = this.props;
        const { pageData, employees } = ActivityCreater;
        const columns = createColumns(this, employees);
        const { rows, record, visible } = this.state;
        const dataTableProps = {
            loading,
            columns,
            rowKey: 'id',
            dataItems: pageData,
            selectType: 'checkbox',
            showNum: true,
            isScroll: true,
            selectedRowKeys: rows.map(item => item.id),
            onChange: ({ pageNum, pageSize }) => {
                dispatch({
                    type: 'crud/getPageInfo',
                    payload: {
                        pageData: pageData.jumpPage(pageNum, pageSize)
                    }
                });
            },
            onSelect: (keys, rows) => this.setState({ rows })
        };
        return (
            <Layout className="full-layout crud-page">

                <Content>
                    <DataTable {...dataTableProps} />
                </Content>
                <Footer>
                    <Pagination {...dataTableProps} />
                </Footer>

            </Layout>
        );
    }
}
