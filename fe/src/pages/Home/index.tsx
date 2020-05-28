import { Button } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './home.css';

class Home extends Component {
  state = {
    isLogin: true,
    loading: false
  };

  componentDidMount() {
    axios.get('/api/isLogin').then((res) => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          loading: true
        });
      }
    });
  }

  render() {
    const { isLogin, loading } = this.state;

    if (isLogin) {
      if (!loading) {
        return (
          <div className="home-page">
            <Button type="primary" style={{ marginLeft: '5px' }}>
              爬取
            </Button>
            <Button type="primary">展示</Button>
            <Button type="primary">退出</Button>
          </div>
        );
      }
      return null;
    }
    return <Redirect to="/login" />;
  }
}

export default Home;
