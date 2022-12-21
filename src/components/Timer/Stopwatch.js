import React, {Component} from 'react';
import {Button} from "antd";
import Auxiliary from "../../util/Auxiliary";
import moment from 'moment';

let running;
class Stopwatch extends Component {

  state={
    time: 0,
    stop: false,
    laps: [],
  };

  changeStopwatch = () => {
    if(this.state.stop) {
      clearInterval(running);
      this.setState({...this.state, stop: false});
    } else {
      running = setInterval(() => {
        this.setState({...this.state, time: this.state.time+1, stop: true});
      }, 1000);
    }
  }

  markLap = () => {
    let laps = this.state.laps;
    laps.push(this.state.time);
    this.setState({...this.state, laps: laps});
  }

  reset = () => {
    clearInterval(running);
    this.setState({...this.state, stop: false, time: 0, laps: []});
  }

  render () {
    return (
      <Auxiliary>
        <h1>{moment.utc(this.state.time*1000).format((this.state.time*1000) < 60000 ? "ss[s]" : (this.state.time*1000) < 3600000 ? "mm[m] ss[s]" : "HH[h] mm[m] ss[s]")}</h1>
        {this.state.laps.map((lap, index) => (
          <div>
            <h2>
              Lap {index+1}: {moment.utc(lap*1000).format((lap*1000) < 60000 ? "ss[s]" : (lap*1000) < 3600000 ? "mm[m] ss[s]" : "HH[h] mm[m] ss[s]")}
            </h2>
          </div>
        ))}
        <div>
          <Button className="start-button" type="primary" onClick={this.changeStopwatch}>{this.state.stop ? "Stop" : "Start" }</Button>
          <Button className="start-button" onClick={this.markLap} disabled={this.state.time === 0}>LAP</Button>
          <Button onClick={this.reset}>RESET</Button>
        </div>
      </Auxiliary>
    )
  }
}

export default Stopwatch;
