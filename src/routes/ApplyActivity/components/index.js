import {connect} from "dva";
import BaseComponent from "components/BaseComponent";
import {Col, Layout, Row, Form, message, DatePicker, Button, Input} from "antd";
import React from "react";
const { Content } = Layout;
const { RangePicker } = DatePicker;

let ac = new BMap.Autocomplete({"input" : "position"});
@connect()
export default class extends BaseComponent {
    formRef = React.createRef();
    constructor() {
        super();
        this.state = {
            position : "",
        }
    }

    onFinish = (values) =>{
        console.log(values)
        message.success('提交成功')
    }

    render() {

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

        return (
            <Layout className="full-layout page blank-page">
                <Content>
                    <Row gutter={20}>
                        <Col offset={4} md={16}>
                            <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 14 }}
                                layout="horizontal"
                                ref={this.formRef}
                                onFinish={this.onFinish}
                            >
                                <Form.Item label="活动名称" name="activityName">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="承办学院" name="collegeName">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="负责人" name="directorName">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="地点" name="position" id="position">
                                    <Input />
                                </Form.Item>
                                <Form.Item label="起止时间" name="time">
                                    <RangePicker showTime />
                                </Form.Item>
                                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                    <Button type="primary" htmlType="submit" >
                                        提交
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                </Content>
            </Layout>
        )
    }
}
