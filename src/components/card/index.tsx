import { Card } from '@nutui/nutui-react-taro';
import './card.scss';
import Taro from '@tarojs/taro';

interface Props {
  id?: number;
  imgUrl: string;
  title: string;
  shortDesc: string;
  max?: boolean;
  className?: string;
  type?: 'product' | 'action';
}

export default (props: Props) => {
  const {id, imgUrl, title, shortDesc, max = false, className, type } = props;

  const Des = () => {
    return <div className="desc">{shortDesc}</div>;
  };

  const handleDetail = () => {
    if(id) {
      Taro.navigateTo({
        url: `/pages/home/productsDetail/index?id=${id}&type=${type}`
      })
    }
  }

  return (
    <div onClick={handleDetail} className={`card-custom ${max ? 'card-custom-max' : ''} ${className}`}>
      <Card
        imgUrl={imgUrl}
        title={title}
        price=""
        vipPrice=""
        prolistTpl={<Des />}
      />
    </div>
  );
};
