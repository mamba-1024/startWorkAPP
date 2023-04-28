import { Component } from 'react';
import Api from '@/api';
import Card from '@/components/card';

class Index extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    Api.getProductApi().then((res) => {
      this.setState({
        products: res.data.map((ele) => ({
          imgUrl: ele.productMainUrl,
          title: ele.title,
          shortDesc: ele.shortDesc,
          id: ele.id
        })),
      });
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { products } = this.state;
    return (
      <div className="py-8px px-12px bg-white  h-screen">
        {products?.map((ele) => (
          <Card
            max={true}
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
