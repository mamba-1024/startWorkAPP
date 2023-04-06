import { Component } from 'react'
import 'windi.css';
import { ConfigProvider } from '@nutui/nutui-react-taro';
import './app.scss'


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
