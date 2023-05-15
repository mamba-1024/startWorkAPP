import { useState } from 'react';
import { Input, Row, Col, Button, Uploader } from '@nutui/nutui-react-taro';
import Taro, { useLoad } from '@tarojs/taro';
import Api from '@/api';
import { getToken } from '@/utils/index';
import { getVersion } from '@/service';

const details = {
  isAuthenticated: '认证状态',
  name: '姓名',
  idCard: '身份证号码',
  idCardIsUpload: '身份证照片',
  bankName: '银行名称',
  bankCard: '银行卡号',
  auditStatus: '审核状态',
};

const mapping = {
  isAuthenticated: '已认证',
  idCardIsUpload: '已上传',
};

const auditStatusMap = {
  WAIT_AUDIT: '待审核',
  PASS: '审核通过',
  REJECT: '审核不通过',
};

const editInfo = {
  userName: "姓名",
  idCard: "身份证号码",
  bankCard: "银行卡号",
  bankReservePhone: "银行预留手机号",
  frontIdCardUrl: '身份证正面',
  backendIdCardUrl: '身份证反面',
}

// 防止用户重复点击
let isClick = false;

const App = () => {
  // 是否已经实名
  const [verifiedState, setVerifiedState] = useState(false);
  const [state, setState] = useState({
    userName: '',
    idCard: '',
    bankCard: '',
    bankReservePhone: '',
    frontIdCardUrl: '',
    backendIdCardUrl: '',
  });
  const [detailInfo, setDetailInfo] = useState<any>({});

  useLoad(() => {
    const { verified }: any = Taro.getCurrentInstance().router?.params || {};
    setVerifiedState(verified === 'true');
    if (verified === 'true') {
      Api.getUserDetail({ loading: true }).then((res) => {
        setDetailInfo(res.data);
      });
    }
  });

  const onChangeInput = (val, name) => {
    setState({
      ...state,
      [name]: val,
    });
  };

  const handleSubmit = () => {
    if (isClick) return;

    // 判断是否填写完整
    if (Object.keys(editInfo).some((key) => !state[key])) {
      const label: string = Object.keys(editInfo).find(key => !state[key]) as string
      console.log(state)
      Taro.showToast({
        title: `请完善${editInfo[label]}信息`,
        icon: 'error',
      });
      return;
    }
    isClick = true;
    Api.postVerifyUser({ ...state, loading: true }).then(() => {
      Taro.navigateBack();
    });
    isClick = false;
  };

  const handleRewrite = () => {
    setVerifiedState(false);
    setDetailInfo({})
  }

  const beforeXhrUpload = (taroUploadFile: any, options: any) => {
    Taro.showLoading({
      title: '上传中，请稍后...',
      mask: true,
    });
    const uploadTask = taroUploadFile({
      url: options.url,
      filePath: options.taroFilePath,
      fileType: options.fileType,
      header: {
        'Content-Type': 'multipart/form-data',
        ...options.headers,
        Authorization: getToken(),
      },
      formData: options.formData,
      name: options.name,
      success(response: { errMsg: any; statusCode: number; data: string }) {
        if (options.xhrState == response.statusCode) {
          options.onSuccess?.(response, options);
        } else {
          options.onFailure?.(response, options);
        }
      },
      fail(e: any) {
        options.onFailure?.(e, options);
        Taro.showToast({
          title: '图片不合格，请重新上传',
          icon: 'error',
        });
      },
      complete() {
        options.onComplete?.(options);
      }
    });
    options.onStart?.(options);
    uploadTask.progress(
      (res: {
        progress: any;
        totalBytesSent: any;
        totalBytesExpectedToSend: any;
      }) => {
        options.onProgress?.(res, options);
      }
    );
  };
  return verifiedState ? (
    <div className="bg-white mt-10px h-full">
      {Object.keys(details).map((ele) => (
        <div
          key={ele}
          className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-200 border-solid h-50px px-10px"
        >
          <span>{details[ele]}</span>
          <span>
            {auditStatusMap[detailInfo?.[ele]] ||
              mapping[ele] ||
              detailInfo?.[ele]}
          </span>
        </div>
      ))}
      {detailInfo?.auditStatus === 'REJECT' && (
        <div className="flex flex-row justify-between items-center ml-10px mr-10px border-0 border-b-1 border-b-gray-200 border-solid h-50px px-10px">
          <span>拒绝原因</span>
          <span>{detailInfo?.rejectReason}</span>
        </div>
      )}
      {detailInfo?.auditStatus === 'REJECT' && (
        <div className="text-center my-40px px-20px">
          <Button type="primary" block onClick={handleRewrite}>
            重新填写个人信息
          </Button>
      </div>
      )}
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
          inputAlign="right"
        />
        <Input
          name="idCard"
          label="身份证号码"
          placeholder="身份证号码"
          defaultValue={state.idCard}
          required
          onChange={(val) => onChangeInput(val, 'idCard')}
          inputAlign="right"
        />
        <Input
          name="bankCard"
          label="银行卡号"
          placeholder="银行卡号"
          defaultValue={state.bankCard}
          type="digit"
          required
          onChange={(val) => onChangeInput(val, 'bankCard')}
          inputAlign="right"
        />
        <Input
          name="bankReservePhone"
          label="银行预留手机号"
          placeholder="银行预留手机号"
          defaultValue={state.bankReservePhone}
          type="tel"
          required
          inputAlign="right"
          onChange={(val) => onChangeInput(val, 'bankReservePhone')}
        />
        <div className="mt-20px mb-12px pl-25px nut-input nut-input-required">
          身份证正反面:
        </div>
        <Row type="flex" justify="space-around" className="pt-10px">
          <Col span="8" className="flex justify-center">
            <Uploader
              url={getVersion() + '/upload'}
              onBeforeXhrUpload={beforeXhrUpload}
              onBeforeDelete={() => {
                setState({ ...state, frontIdCardUrl: '' });
                return true;
              }}
              onSuccess={(response) => {
                setState({
                  ...state,
                  frontIdCardUrl: response.responseText.data,
                });
                Taro.hideLoading();
              }}
              onFailure={() => {
                Taro.hideLoading();
              }}
              mediaType={["image"]}
            ></Uploader>
          </Col>
          <Col span="8" className="flex justify-center">
            <Uploader
              url={getVersion() + '/upload'}
              onBeforeXhrUpload={beforeXhrUpload}
              onBeforeDelete={() => {
                setState({ ...state, backendIdCardUrl: '' });
                return true;
              }}
              onSuccess={(response) => {
                setState({
                  ...state,
                  backendIdCardUrl: response.responseText.data,
                });
                Taro.hideLoading();
              }}
              onFailure={() => {
                Taro.hideLoading();
              }}
              mediaType={["image"]}
            ></Uploader>
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
