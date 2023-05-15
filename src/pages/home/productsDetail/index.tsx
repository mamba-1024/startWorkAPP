import { Component } from 'react';
import Api from '@/api';
import Taro from '@tarojs/taro';
import { RichText } from '@tarojs/components';

class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      htmlContent: '',
    };
  }

  componentDidMount() {
    const { id, type }: any = Taro.getCurrentInstance().router?.params || {};
    if (type === 'product') {
      Api.getProductByIdApi(id).then((res) => {
        this.setState({
          htmlContent: res.data.htmlContent,
        });
      });
    } else {
      Api.getActionByIdApi(id).then((res) => {
        this.setState({
          htmlContent: res.data.htmlContent,
        });
      });
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { htmlContent } = this.state;
    return (
      <div className="py-8px px-12px bg-white  h-screen">
        <RichText nodes={htmlContent} />
      </div>
    );
  }
}
export default Index;
