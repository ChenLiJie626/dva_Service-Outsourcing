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
import './index.less';
import $$ from "cmn-utils";
const { Content, Header, Footer } = Layout;
const Pagination = DataTable.Pagination;

@connect(({ crud1, loading }) => ({
    crud1,
    loading: loading.models.crud1
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: []
    };

    handleDelete = records => {
        const { rows } = this.state;
        const status = 'fail'
        console.log('Delete')
        this.props.dispatch({
            type: 'crud1/update',
            payload: {
                records,
                status,
                success: () => {
                    // 如果操作成功，在已选择的行中，排除删除的行
                    this.setState({
                        rows: rows.filter(
                            item => !records.some(jtem => jtem.id === item.id)
                        )
                    });
                    message.success('更新成功')
                }
            }
        });
    };
    handlePass = records => {
        const { rows } = this.state;
        const status = 'pass'
        console.log('Pass')
        this.props.dispatch({
            type: 'crud1/update',
            payload: {
                records,
                status,
                success: () => {
                    // 如果操作成功，在已选择的行中，排除删除的行
                    this.setState({
                        rows: rows.filter(
                            item => !records.some(jtem => jtem.id === item.id)
                        )
                    });
                    message.success('更新成功')
                }
            }
        });
    };
    componentDidMount() {
        //权限管理
        let user = $$.getStore('user');
        if(user.role !== '1'){
            this.props.dispatch(routerRedux.replace('/403'));
        }
    }
    render() {
        const { crud1, loading, dispatch } = this.props;
        const { pageData, employees } = crud1;
        const columns = createColumns(this, employees);
        const { rows, record, visible } = this.state;

        const searchBarProps = {
            columns,
            onSearch: values => {
                dispatch({
                    type: 'crud1/getPageInfo',
                    payload: {
                        pageData: pageData.filter(values).jumpPage(1, 10)
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
                    type: 'crud1/getPageInfo',
                    payload: {
                        pageData: pageData.jumpPage(pageNum, pageSize)
                    }
                });
            },
            onSelect: (keys, rows) => this.setState({ rows })
        };
        const modalFormProps = {
            loading,
            record,
            visible,
            columns,
            modalOpts: {
                width: 700
            },
            onCancel: () => {
                this.setState({
                    record: null,
                    visible: false
                });
            },
            // 新增、修改都会进到这个方法中，
            // 可以使用主键或是否有record来区分状态
            onSubmit: values => {
                dispatch({
                    type: 'crud1/save',
                    payload: {
                        values,
                        success: () => {
                            this.setState({
                                record: null,
                                visible: false
                            });
                        }
                    }
                });
            }
        };

        return (
            <Layout className="full-layout crud-page">
                <Header>
                    <Toolbar
                        appendLeft={
                            <Button.Group>
                                <Button disabled={!rows.length}
                                        onClick={e => this.onPassed(rows)}
                                        icon={<PlusOutlined />}
                                        type="primary"
                                >
                                    通过
                                </Button>
                                <Button
                                    disabled={!rows.length}
                                    onClick={e => this.onDelete(rows)}
                                    icon={<DeleteOutlined />}
                                >
                                    删除
                                </Button>
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
                <ModalForm {...modalFormProps} />
            </Layout>
        );
    }
}
