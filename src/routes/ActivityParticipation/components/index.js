import { connect } from "dva";
import BaseComponent from "components/BaseComponent";
import {Col, Layout, Row, Form, message, DatePicker, Button, Input} from "antd";
import React from "react";
const { Content } = Layout;
const { RangePicker } = DatePicker;
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
                                
                            </Form>
                        </Col>
                    </Row>

                </Content>
            </Layout>
        )
    }
}
