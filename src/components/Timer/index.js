import React, {Component} from 'react';
import { Card, Tabs } from "antd";
import Timer from "./Timer";
import Stopwatch from "./Stopwatch";
import Auxiliary from "../../util/Auxiliary";
import { ClockCircleOutlined, HourglassOutlined, GithubOutlined } from '@ant-design/icons';

const TabPane = Tabs.TabPane;

class HrTimer extends Component {
  render() {
    return (
      <Auxiliary>
        <Card title=<span className="Heading" style={{color:"red"}}>Codeclause Timer And Stopwatch</span>>
          <Tabs type="card"style={{color:"red"}} >
            <TabPane tab=<span><ClockCircleOutlined style={{color:"Blue"}} />Timer</span> key="timer">
              <Timer />
            </TabPane>
            <TabPane tab=<span><HourglassOutlined style={{color:"Green"}}/>Stopwatch</span> key="stopwatch">
              <Stopwatch />
            </TabPane>
          </Tabs>
        </Card>
        <a href="https://github.com/Sudhir878786/CodeClause_Timer_And_StopWatch" target="_blank">
          by Sudhir Sharma
          <GithubOutlined style={{fontSize: 20, margin: 10, color: "#3f3f3f"}}/>
        </a>
      </Auxiliary>
    )
  }
}

export default HrTimer;
