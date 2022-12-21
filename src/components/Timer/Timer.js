import React, {Component} from 'react';
import {Button, TimePicker} from "antd";
import Auxiliary from "../../util/Auxiliary";
import Sound from "react-sound";
import soundfile from "../../alert.mp3";
import moment from 'moment';

let running;
class Timer extends Component {

  state={
    time: 3600,
    start: true,
    loading: true,
  };

  runTimer = () => {
    running = setInterval(() => {
      if(this.state.time > 0) {
        this.setState({...this.state, time: this.state.time-1});
      } else {
        clearInterval(running)
      }
    }, 1000);
  }

  componentDidMount() {
    this.runTimer();
    this.setState({...this.state, loading: false});
  }

  setTimer = (time, timeString) => {
    if(time) {
      let timer = moment(time, 'HH:mm:ss: A').diff(moment().startOf('day'), 'seconds');
      this.setState({...this.state, time: timer});
    }
  }

  changeTimer = () => {
    if(this.state.start) {
      clearInterval(running);
      this.setState({...this.state, start: false});
    } else {
      this.runTimer();
      this.setState({...this.state, start: true});
    }
  }

  reset = () => {
    clearInterval(running);
    this.setState({...this.state, time: 3600, loading: true},() => {
      if(this.state.start)
        this.runTimer();
      this.setState({...this.state, loading: false});
    })
  }

  render() {
    return(
      <Auxiliary>
        {this.state.time === 0 ? <Sound url={soundfile} playStatus={Sound.status.PLAYING}/> : null}
        {this.state.loading ? "Please Wait..." : <TimePicker className="gx-mb-4" placeholder="Set Timer" onChange={this.setTimer} defaultValue={moment('01:00:00', 'HH:mm:ss')}/>}
        <h1>
          {moment.utc(this.state.time*1000).format("HH[h] mm[m] ss[s]")}
        </h1>
        <Button className="start-button" type="primary" onClick={this.changeTimer}>{this.state.start ? "Stop" : "Start" }</Button>
        <Button onClick={this.reset}>RESET</Button>
      </Auxiliary>
    )
  }
}

export default Timer;
