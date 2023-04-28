import { Component } from 'react';
import { Row, Col } from '@nutui/nutui-react-taro';
import Api from '@/api';
import productIcon from '@/assets/image/productIcon.png';
import messageIcon from '@/assets/image/messageIcon.png';
import aboutIcon from '@/assets/image/aboutIcon.png';
import Card from '@/components/card';
import Taro from '@tarojs/taro';

class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      mainUrl: '',
      products: [],
    };
  }

  componentDidMount() {
  }

  componentWillUnmount() {}

  componentDidShow() {
    Api.getHomeInfoApi().then((res) => {
      this.setState({
        mainUrl: res.data.mainUrl,
        products: res.data.products.map((ele) => ({
          imgUrl: ele.productMainUrl,
          title: ele.title,
          shortDesc: ele.shortDesc,
          id: ele.id
        })),
      });
    });
  }

  componentDidHide() {}

  render() {
    const { mainUrl, products } = this.state;
    return (
      <div className="py-8px px-12px bg-white  h-screen">
        {/* 主图 */}
        <div className="p">
          <img
            className="w-full h-140px rounded-12px"
            src={
              mainUrl ||
              'https://prototype.apicloud-system.com/canvas/1f00369a-9901-453b-9fa7-6a5b4d26987e.png'
            }
          />
        </div>
        <Row type="flex" justify="space-around" gutter="8" className="mt-16px">
          <Col span="6" className="flex flex-col justify-center items-center">
            <img
              className="w-44px h-44px"
              src={productIcon}
              onClick={() => {
                Taro.navigateTo({ url: '/pages/home/products/index' });
              }}
            />
            <span>产品展示</span>
          </Col>
          <Col span="6" className="flex flex-col justify-center items-center">
            <img
              className="w-44px h-44px"
              src={messageIcon}
              onClick={() => {
                Taro.navigateTo({ url: '/pages/home/companyNews/index' });
              }}
            />
            <span>企业动态</span>
          </Col>
          <Col span="6" className="flex flex-col justify-center items-center">
            <img
              className="w-44px h-44px"
              src={aboutIcon}
              onClick={() => {
                Taro.navigateTo({ url: '/pages/home/aboutUs/index' });
              }}
            />
            <span>关于我们</span>
          </Col>
        </Row>
        {products?.map((ele) => (
          <Card
            className="mb-20px"
            imgUrl={ele.imgUrl}
            title={ele.title}
            shortDesc={
              ele.shortDesc ||
              '我们常说，白酒会有陈香、浓香、糟香、曲香、馊香、窖香、泥香和我们常说，白酒会有陈香、浓香、糟香、曲香、馊香、窖香、泥香和'
            }
            id={ele.id}
          />
        ))}
      </div>
    );
  }
}
export default Index;
