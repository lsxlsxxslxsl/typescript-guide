import { Button, Form, Icon, Input, message } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import qs from 'qs';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import request from '../../request';
import './login.css';

interface FormFields {
  password: string;
}
interface Props {
  form: WrappedFormUtils<FormFields>;
}

class LoginForm extends Component<Props> {
  state = {
    isLogin: false
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await request.post(
          '/api/login',
          qs.stringify({
            password: values.password
          }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        const data: responseResult.login = res.data;
        if (data) {
          this.setState({
            isLogin: true
          });
        } else {
          message.error('登录失败');
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLogin } = this.state;
    return isLogin ? (
      <Redirect to="/" />
    ) : (
      <div className="login-page">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

export default WrappedLoginForm;
