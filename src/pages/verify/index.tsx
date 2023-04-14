import { useState } from 'react';
import { Input, Row, Col, Button, Uploader } from '@nutui/nutui-react-taro';
import Taro, { useDidShow } from '@tarojs/taro';
import Api from '@/api';

const details = {
  isAuthenticated: '认证状态',
  name: '姓名',
  idCard: '身份证号码',
  idCardIsUpload: '身份证照片',
  bankName: '银行名称',
  bankCard: '银行卡号',
};

const mapping = {
  isAuthenticated: '已认证',
  idCardIsUpload: '已上传'
}

const App = () => {
  // 是否已经实名
  const { verified }: any = Taro.getCurrentInstance().router?.params || {};
  const [state, setState] = useState({
    userName: '',
    idCard: '',
    bankCard: '',
    bankReservePhone: '',
    frontIdCardUrl: '',
    backendIdCardUrl: '',
  });
  const [detailInfo, setDetailInfo] = useState({})

  useDidShow(() => {
    console.log('verified: ', verified);
    if (verified === 'true') {
      Api.getUserDetail({ loading: true }).then((res) => {
        console.log('getUserDetail: ', res);
        setDetailInfo(res.data)
      });
    }
  });

  const onChangeInput = (val, name) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  const onStart = (options) => {
    console.log('start 触发 ', options);
  };

  const handleSubmit = () => {
    // if (Object.values(state).some((val) => !val)) {
    //   Taro.showToast({
    //     title: '请完善信息',
    //     icon: 'error',
    //   });
    //   return
    // }
    Api.postVerifyUser(state).then(res => {
      console.log('res: ', res)
      Taro.navigateBack()
    })
  };

  return verified === 'true' ? (
    <div className="bg-white mt-10px">
      {Object.keys(details).map((ele) => (
        <div key={ele} className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-200 border-solid h-50px px-10px">
          <span>{details[ele]}</span>
          <span>{mapping[ele] || detailInfo?.[ele]}</span>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <div className="bg-white mt-10px">
        <Input
          name="userName"
          label="姓名"
          placeholder="姓名"
          defaultValue={state.userName}
          required
          onChange={(val) => onChangeInput(val, 'userName')}
        />
        <Input
          name="idCard"
          label="身份证号码"
          placeholder="身份证号码"
          defaultValue={state.idCard}
          required
          onChange={(val) => onChangeInput(val, 'idCard')}
        />
        <Input
          name="bankCard"
          label="银行卡号"
          placeholder="银行卡号"
          defaultValue={state.bankCard}
          type="digit"
          required
          onChange={(val) => onChangeInput(val, 'bankCard')}
        />
        <Input
          name="bankReservePhone"
          label="银行预留手机号"
          placeholder="银行预留手机号"
          defaultValue={state.bankReservePhone}
          type="tel"
          required
          onChange={(val) => onChangeInput(val, 'bankReservePhone')}
        />
        <Row type="flex" justify="space-around" className="mt-12px">
          <Col span="8" className="flex justify-center">
            <Uploader onChange={onStart}></Uploader>
          </Col>
          <Col span="8" className="flex justify-center">
            <Uploader onChange={onStart}></Uploader>
          </Col>
        </Row>
      </div>
      <div className="text-center mt-20px px-20px">
        <Button type="primary" block onClick={handleSubmit}>
          提交
        </Button>
      </div>
    </div>
  );
};
export default App;
