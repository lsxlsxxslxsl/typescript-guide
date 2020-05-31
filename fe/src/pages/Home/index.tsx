import { Button, message } from 'antd';
import axios from 'axios';
import ReactEcharts from 'echarts-for-react';
import moment from 'moment';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './home.css';

interface LineData {
  name: string;
  type: string;
  data: number[];
}

interface CourseItem {
  title: string;
  count: number;
}
interface State {
  isLogin: boolean;
  loading: boolean;
  data: {
    [key: string]: CourseItem[];
  };
}

class Home extends Component {
  state: State = {
    isLogin: true,
    loading: true,
    data: {}
  };

  async componentDidMount() {
    const { data } = await axios.get('/api/isLogin');
    if (!data?.data) {
      this.setState({
        isLogin: false,
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });
    }

    const res = await axios.get('/api/showData');
    if (res.data?.data) {
      this.setState({
        data: res.data.data
      });
    }
  }

  handleLogoutClick = async () => {
    const { data } = await axios.get('/api/logout');
    if (data?.data) {
      this.setState({
        isLogin: false
      });
    } else {
      message.error('退出失败');
    }
  };

  handleCrowllerClick = async () => {
    const { data } = await axios.get('/api/getData');
    if (data?.data) {
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
    const result: LineData[] = [];
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
