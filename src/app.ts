import { Component } from 'react'
import { ConfigProvider } from '@nutui/nutui-react-taro';

import './app.scss'

const darkTheme = {
  nutuiBrandColor: 'green',
  nutuiBrandColorStart: 'green',
  nutuiBrandColorEnd: 'green',
}

class App extends Component<any, any> {
  componentDidMount() {
    console.log('APP DidMount')
  }

  componentDidShow() {
    console.log('APP Show')
  }

  componentDidHide() {
    console.log('APP Hide')
  }


  render() {
    return this.props.children
  }
}
export default App
