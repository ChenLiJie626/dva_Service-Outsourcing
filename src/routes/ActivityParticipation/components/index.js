import React from 'react';
import {connect, routerRedux} from 'dva';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {Layout, Button, message} from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import { ModalForm } from 'components/Modal';
import createColumns from './columns';
import $$ from "cmn-utils";
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ ActivityParticipation, loading }) => ({
    ActivityParticipation,
    loading: loading.models.ActivityParticipation
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: []
    };
    handlePass = records => {
        const { dispatch } = this.props;
        console.log(records)
        dispatch({
            type: 'ActivityParticipation/update',
            payload: records
        })

    };

    render() {
        const { ActivityParticipation, loading, dispatch } = this.props;
        const { pageData } = ActivityParticipation;
        const columns = createColumns(this);
        const { rows, record, visible } = this.state;

        const searchBarProps = {
            columns,
            onSearch: values => {
                dispatch({
                    type: 'ActivityParticipation/getPageInfo',
                    payload: {
                        pageData: pageData.filter(values).jumpPage(1, 10),
                        type: "search"
                    }
                });
            }
        };

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
                    type: 'ActivityParticipation/getPageInfo',
                    payload: {
                        pageData: pageData.jumpPage(pageNum, pageSize)
                    }
                });
            },
            onSelect: (keys, rows) => this.setState({ rows })
        };

        return (
            <Layout className="full-layout crud-page">
                <Header>
                    <Toolbar
                        appendLeft={
                            <Button.Group>

                            </Button.Group>
                        }
                        pullDown={<SearchBar type="grid" {...searchBarProps} />}
                    >
                        <SearchBar group="abc" {...searchBarProps} />
                    </Toolbar>
                </Header>
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
