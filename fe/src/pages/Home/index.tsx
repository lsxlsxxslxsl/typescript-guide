import { Button, message } from 'antd';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
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

  getOption: () => echarts.EChartOption = () => {
    return {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  };

  render() {
    const { isLogin, loading } = this.state;
    console.log('主页', isLogin, loading);
    if (isLogin) {
      if (!loading) {
        return (
          <div className="home-page">
            <div className="buttons">
              <Button type="primary" style={{ marginLeft: '5px' }}>
                爬取
              </Button>
              <Button type="primary">展示</Button>
              <Button type="primary" onClick={this.handleLogoutClick}>
                退出
              </Button>
            </div>
            <ReactEcharts option={this.getOption()} />
          </div>
        );
      }
      return null;
    }
    return <Redirect to="/login" />;
  }
}

export default Home;
