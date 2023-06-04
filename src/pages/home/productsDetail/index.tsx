import { Component } from 'react';
import Api from '@/api';
import Taro from '@tarojs/taro';
import { RichText, Image, ScrollView } from '@tarojs/components';

class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      detail: {},
    };
  }

  componentDidMount() {
    const { id, type }: any = Taro.getCurrentInstance().router?.params || {};
    if (type === 'product') {
      Api.getProductByIdApi(id).then((res) => {
        this.setState({
          detail: res.data,
        });
      });
    } else {
      Api.getActionByIdApi(id).then((res) => {
        this.setState({
          detail: res.data,
        });
      });
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { detail } = this.state;
    return (
      <ScrollView
        scrollY
        scrollWithAnimation
        scrollX={false}
        className="bg-white h-screen w-screen"
      >
        <div className="text-18px text-gray-600 font-bold pt-18px pb-12px px-12px">
          {detail?.title}
        </div>
        <div className="h-6px bg-gray-100 my-10px mx-12px"/>
        <div className="flex justify-between items-center mt-4px px-12px">
          <Image
            src={detail?.productMainUrl || detail?.actionMainUrl}
            className="w-full"
          />
        </div>
        <div className="h-6px bg-gray-100 my-10px mx-12px"/>
        <div className="mt-4px px-12px pb-20px">
          <RichText nodes={detail?.htmlContent} />
        </div>
      </ScrollView>
    );
  }
}
export default Index;
