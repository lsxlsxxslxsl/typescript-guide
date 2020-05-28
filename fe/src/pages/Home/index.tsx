import { Button, message } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './home.css';

class Home extends Component {
  state = {
    isLogin: true,
    loading: true
  };

  componentDidMount() {
    axios.get('/api/isLogin').then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          loading: false
        });
      } else {
        this.setState({
          loading: false
        });
      }
    });
  }

  handleLogoutClick = () => {
    axios.get('/api/logout').then((res) => {
      if (res.data?.data) {
        this.setState({
          isLogin: false
        });
      } else {
        message.error('退出失败');
      }
    });
  };

  render() {
    const { isLogin, loading } = this.state;
    console.log('主页', isLogin, loading)
    if (isLogin) {
      if (!loading) {
        return (
          <div className="home-page">
            <Button type="primary" style={{ marginLeft: '5px' }}>
              爬取
            </Button>
            <Button type="primary">展示</Button>
            <Button type="primary" onClick={this.handleLogoutClick}>
              退出
            </Button>
          </div>
        );
      }
      return null;
    }
    return <Redirect to="/login" />;
  }
}

export default Home;
