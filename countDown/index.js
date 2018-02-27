/**
 * @desc CountDown （时间）倒计时
 * @author ws
 * @date 2017-12-28
 * 1. color,fontSize 字体颜色 大小
 * 2. timeEnd 计时结束后的回调
 * 3. time 计时总秒数
**/

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styles from './style'

export default class CountDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: this.props.time         // 显示的时间
    }
    this.timeer = this.props.time   // 控制state更新的时间
  }

  componentDidMount() {
    this.countDown()
  }

  componentWillUnmount() {
    clearInterval(this.time)
  }

  countDown() {
    clearInterval(this.time)
    // 当时间小于一天时进行计时
    if(this.timeer < 86400) {
      this.time = setInterval(() => {
        if(this.timeer <= 0){
          // 时间为 0 时停止计时
          clearInterval(this.time)
        }else {
          // 倒计时
          this.timeer = this.timeer - 1
          if(this.timeer < 3600) {
            // 当时间小于 1小时 开始每一秒更新一次 state
            this.setState({
              time: this.timeer
            })
          }else if(this.state.time - this.timeer > 60){
            // 当时间大于 1小时 每一分钟更新一次 state
            this.setState({
              time: this.timeer
            })
          }
        }
      }, 1000)
    }
  }

  handleTime(time) {
    // 大于2天 显示 大于两天
    // 大于1天 显示 天数和小时
    // 大于1小时 显示到 分
    // 小于1小时 显示到 秒
    // 小于0 显示 已结束
    if(time >= 172800) {
      return '剩余时间大于2天'
    }else if (time >= 86400) {
      const h = Math.floor((time - 86400)/60/60)
      // const m = Math.floor((time - 86400 - h * 60 * 60)/60)
      // const s = time - 86400 - h * 60 * 60  - m * 60
      return `剩余1天${h}小时`
    }else if (time >= 3600) {
      const h = Math.floor(time/60/60)
      const m = Math.floor((time - h * 60 * 60)/60)
      //const s = time - h * 60 * 60  - m * 60
      return `剩余${h}小时${m}分钟`
    }else if (time >= 60) {
      const m = Math.floor(time/60)
      const s = time - m * 60
      return `剩余${m}分钟${s}秒`
    }else if (time > 0) {
      return `剩余${time}秒`
    }else {
      return '已结束'
    }

  }

  render() {
    return (
      <View style={styles.content}>
        <Text style={{color: this.props.color, fontSize: this.props.fontSize}}>
          {this.handleTime(this.state.time)}
        </Text>
      </View>
    )
  }
}

CountDown.propTypes = {
  time: PropTypes.number.isRequired,
  timeEnd: PropTypes.func,
  fontSize: PropTypes.number,
  color: PropTypes.string,
}

CountDown.defaultProps = {
  time: 0,            //计时总的秒数
  color: '#333',
  fontSize: 14,
  timeEnd: () => {},
}
