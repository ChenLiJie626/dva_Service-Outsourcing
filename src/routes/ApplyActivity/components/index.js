import {connect} from "dva";
import BaseComponent from "components/BaseComponent";
import {Col, Layout, Row, Form, message, DatePicker, Button, Input, Upload, InputNumber, Slider} from "antd";
import { UploadOutlined  } from '@ant-design/icons';
import React from "react";
const { Content } = Layout;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

let ac = new BMap.Autocomplete({"input" : "position"});


@connect(({ applyActivity, loading }) => ({
    applyActivity,
    loading: loading.models.applyActivity
}))
export default class extends BaseComponent {
    formRef = React.createRef();

    constructor() {
        super();
        this.state = {
            position : "",
            fileList: [],
            inputValue: 1,
            url: null
        }
    }
    onChange = value => {
        this.setState({
            inputValue: value,
        });
    };

    handleChange = ({ fileList ,event, file}) => {

        if(file.response !== undefined && file.response !== null){
            this.setState({url: file.response.data.url})
        }
        this.setState({fileList})
    };


    render() {
        const {  loading, dispatch } = this.props;
        const onFill = (value) => {
            this.formRef.current.setFieldsValue({
                position : value
            });
        };
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
            var _value = e.fromitem.value;
            var value = "";
            if (e.fromitem.index > -1) {
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }

            value = "";
            if (e.toitem.index > -1) {
                _value = e.toitem.value;
                value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
            }
            onFill(value)
        });

        const { fileList, inputValue } = this.state;


        const onFinish = (values) =>{
            values.people_limit = this.state.inputValue

            values = {
                ...values,
                activity_img: this.state.url,
                startTime: new Date(values.time[0]).getTime(),
                endTime: new Date(values.time[1]).getTime()
            }
            console.log(values)
            dispatch({
                type: 'applyActivity/createActivity',
                payload: {
                    values
                }
            });

        }
        return (
            <Layout className="full-layout page blank-page">
                <Content>
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        ref={this.formRef}
                        onFinish={onFinish}
                    >
                    <Row gutter={10}>
                        <Col md={11}>
                            <Form.Item label="活动名称" name="activityName">
                                <Input />
                            </Form.Item>
                            <Form.Item label="承办学院" name="collegeName">
                                <Input />
                            </Form.Item>
                            <Form.Item label="负责人学号" name="auditor_id">
                                <Input />
                            </Form.Item>
                            <Form.Item label="地点" name="position" id="position">
                                <Input />
                            </Form.Item>
                            <Form.Item label="起止时间" name="time">
                                <RangePicker showTime />
                            </Form.Item>

                        </Col>
                        <Col md={13}>
                            <Form.Item label="活动图片" name="activityImg">
                            <Upload
                                action="http://localhost//activity/minio/upload"
                                accept="image/jpeg"
                                fileList={fileList}
                                listType="picture"
                                onChange={this.handleChange}
                            >
                                {fileList.length >= 1 ? null : <Button icon={<UploadOutlined />}>点击上传图片</Button>}
                            </Upload>
                            </Form.Item>
                            <Form.Item label="最大人数" name="people_limit" >
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={1}
                                            max={20}
                                            onChange={this.onChange}
                                            value={typeof inputValue === 'number' ? inputValue : 0}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <InputNumber
                                            min={1}
                                            max={20}
                                            style={{ margin: '0 16px' }}
                                            value={inputValue}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item label="活动描述" name="activity_intro">
                                <TextArea placeholder="textarea with clear icon" allowClear style={{height : "145px"}}/>
                            </Form.Item>
                        </Col>

                    </Row>
                        <Row>
                            <Col>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                                    <Button type="primary" htmlType="submit" loading={loading}>
                                        提交
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                </Form>
                </Content>
            </Layout>
        )
    }
}
