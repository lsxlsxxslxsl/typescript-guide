import { Button, message } from 'antd';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import request from '../../request';
import './home.css';

interface State {
  isLogin: boolean;
  loading: boolean;
  data: responseResult.DataStructure;
}

class Home extends Component {
  state: State = {
    isLogin: true,
    loading: true,
    data: {}
  };

  componentDidMount() {
    request.get('/api/isLogin').then((res) => {
      const data: responseResult.isLogin = res.data;
      if (!data) {
        this.setState({
          isLogin: false,
          loaded: true
        });
      } else {
        this.setState({
          loaded: true
        });
      }
    });

    request.get('/api/showData').then((res) => {
      const data:responseResult.showData = res.data;
      if (data) {
        this.setState({ data });
      }
    });
  }

  handleLogoutClick = async () => {
    const res = await request.get('/api/logout');
    const data:responseResult.logout = res.data
    if (data) {
      this.setState({
        isLogin: false
      });
    } else {
      message.error('退出失败');
    }
  };

  handleCrowllerClick = async () => {
    const res = await request.get('/api/getData');
    let data: responseResult.getData = res.data;
    if (data) {
      message.success('爬取成功');
    } else {
      message.error('爬取失败');
    }
  };

  getOption: () => echarts.EChartOption = () => {
    const { data } = this.state;
    const courseNames: string[] = [];
    const times: string[] = [];
    const tempData: {
      [key: string]: number[];
    } = {};
    for (let i in data) {
      const item = data[i];
      times.push(moment(Number(i)).format('MM-DD HH:mm'));
      item.forEach((innerItem) => {
        const { title, count } = innerItem;
        if (!~courseNames.findIndex((item) => item === title)) {
          courseNames.push(title);
        }
        tempData[title] ? tempData[title].push(count) : (tempData[title] = [count]);
      });
    }
    const result: echarts.EChartOption.Series[] = [];
    for (let i in tempData) {
      result.push({
        name: i,
        type: 'line',
        data: tempData[i]
      });
    }
    return {
      title: {
        text: '课程在线学习人数'
      },
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: courseNames
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: times
      },
      yAxis: {
        type: 'value'
      },
      series: result
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
              <Button
                type="primary"
                style={{ marginRight: '25px' }}
                onClick={this.handleCrowllerClick}
              >
                爬取
              </Button>
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
